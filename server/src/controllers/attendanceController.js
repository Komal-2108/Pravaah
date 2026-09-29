import { dbStore } from '../config/db.js';

export const generateSessionQR = (req, res, next) => {
  try {
    const { training_center_id, topic, duration_hours = 8 } = req.body;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + duration_hours * 60 * 60 * 1000);

    const sessionCode = `SESS-${Date.now().toString().slice(-6)}`;
    const qrToken = `PRV-QR-${sessionCode}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newSession = {
      id: `sess-${Date.now()}`,
      session_code: sessionCode,
      session_qr_token: qrToken,
      training_center_id: training_center_id || dbStore.training_centers[0].id,
      topic: topic || 'Cooperative Accounting & Field Transaction Ledger Verification',
      date: now.toISOString().split('T')[0],
      starts_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      is_active: true
    };

    dbStore.attendance_sessions.push(newSession);

    res.status(201).json({
      success: true,
      message: 'Attendance QR session generated',
      session: newSession
    });
  } catch (err) {
    next(err);
  }
};

export const getActiveSession = (req, res, next) => {
  try {
    const now = new Date();
    const activeSession = dbStore.attendance_sessions.find(s => s.is_active && new Date(s.expires_at) > now);

    if (!activeSession) {
      // Auto create a fresh session if none active
      const sessionCode = `SESS-ANAND-${now.toISOString().slice(0, 10).replace(/-/g, '')}`;
      const fallbackSession = {
        id: 'sess-today',
        session_code: sessionCode,
        session_qr_token: `PRV-QR-${sessionCode}-SECURE-TOKEN-A19F`,
        training_center_id: dbStore.training_centers[0].id,
        topic: 'Cooperative Accounting & Field Transaction Ledger Verification',
        date: now.toISOString().split('T')[0],
        starts_at: new Date(now.getTime() - 2 * 3600000).toISOString(),
        expires_at: new Date(now.getTime() + 8 * 3600000).toISOString(),
        is_active: true
      };
      return res.json({ success: true, session: fallbackSession });
    }

    res.json({ success: true, session: activeSession });
  } catch (err) {
    next(err);
  }
};

export const markAttendance = (req, res, next) => {
  try {
    const { qr_token, device_id, is_offline_event, sync_event_id } = req.body;
    const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
    if (!trainee) {
      return res.status(404).json({ success: false, message: 'Trainee profile not found' });
    }

    // Find session by QR token or use active session
    const session = dbStore.attendance_sessions.find(s => s.session_qr_token === qr_token || s.is_active);
    if (!session) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired Attendance QR code.'
      });
    }

    if (new Date() > new Date(session.expires_at)) {
      return res.status(400).json({
        success: false,
        message: 'This attendance session has already expired.'
      });
    }

    // Check duplicate attendance
    const alreadyMarked = dbStore.attendance.find(a => a.session_id === session.id && a.trainee_id === trainee.id);
    if (alreadyMarked) {
      return res.status(409).json({
        success: false,
        message: 'Attendance already marked for this session.',
        marked_at: alreadyMarked.marked_at
      });
    }

    const newAttendance = {
      id: `att-${Date.now()}`,
      session_id: session.id,
      trainee_id: trainee.id,
      marked_at: new Date().toISOString(),
      device_id: device_id || 'mobile-pwa-device',
      verification_method: is_offline_event ? 'offline_sync' : 'qr_scan',
      is_offline_event: !!is_offline_event,
      sync_event_id: sync_event_id || null,
      is_valid: true
    };

    dbStore.attendance.push(newAttendance);

    res.status(201).json({
      success: true,
      message: '✓ Attendance successfully verified and recorded!',
      attendance: newAttendance,
      session_topic: session.topic
    });
  } catch (err) {
    next(err);
  }
};

export const getAttendanceHistory = (req, res, next) => {
  try {
    const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
    const traineeId = trainee ? trainee.id : (req.query.trainee_id || null);

    let records = dbStore.attendance;
    if (traineeId) {
      records = records.filter(a => a.trainee_id === traineeId);
    }

    const historyWithDetails = records.map(att => {
      const sess = dbStore.attendance_sessions.find(s => s.id === att.session_id) || {};
      const t = dbStore.trainees.find(tr => tr.id === att.trainee_id) || {};
      const u = dbStore.users.find(usr => usr.id === t.user_id) || {};
      return {
        id: att.id,
        trainee_name: u.name || 'Trainee',
        session_topic: sess.topic || 'Daily Skill Session',
        session_code: sess.session_code,
        date: sess.date || att.marked_at.split('T')[0],
        marked_at: att.marked_at,
        verification_method: att.verification_method,
        is_offline_event: att.is_offline_event,
        device_id: att.device_id
      };
    });

    res.json({
      success: true,
      total: historyWithDetails.length,
      attendance: historyWithDetails
    });
  } catch (err) {
    next(err);
  }
};
