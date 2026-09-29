import { dbStore } from '../config/db.js';
import { evaluatePracticalAssessment } from '../services/ai/assessmentService.js';

export const syncOfflineEvents = (req, res, next) => {
  try {
    const { events, device_id } = req.body;

    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No sync events provided.'
      });
    }

    const userId = req.user.id;
    const trainee = dbStore.trainees.find(t => t.user_id === userId);

    const processedEvents = [];
    const skippedEvents = [];

    for (const event of events) {
      const { event_id, event_type, payload, created_at } = event;

      // Idempotency Check: Has this event already been processed?
      const existing = dbStore.sync_events.find(e => e.event_id === event_id);
      if (existing) {
        skippedEvents.push({
          event_id,
          reason: 'Duplicate event already processed on server',
          original_processed_at: existing.processed_at
        });
        continue;
      }

      // Process event based on type
      let processingResult = { status: 'success' };

      if (event_type === 'attendance_mark' && trainee) {
        const session = dbStore.attendance_sessions.find(s => s.session_qr_token === payload.qr_token || s.is_active);
        const alreadyMarked = session && dbStore.attendance.find(a => a.session_id === session.id && a.trainee_id === trainee.id);

        if (session && !alreadyMarked) {
          dbStore.attendance.push({
            id: `att-sync-${Date.now()}-${Math.floor(Math.random()*1000)}`,
            session_id: session.id,
            trainee_id: trainee.id,
            marked_at: created_at || new Date().toISOString(),
            device_id: device_id || event.device_id || 'mobile-device',
            verification_method: 'offline_sync',
            is_offline_event: true,
            sync_event_id: event_id,
            is_valid: true
          });
        }
      } else if (event_type === 'assessment_submit' && trainee) {
        processingResult = evaluatePracticalAssessment({
          assessmentId: payload.assessment_id,
          traineeId: trainee.id,
          userAnswers: payload.user_answers || {},
          timeTakenSeconds: payload.time_taken_seconds || 300
        });
      } else if (event_type === 'course_progress' && trainee) {
        let cp = dbStore.course_progress.find(p => p.trainee_id === trainee.id && p.course_id === payload.course_id);
        if (!cp) {
          cp = {
            id: `cp-sync-${Date.now()}`,
            trainee_id: trainee.id,
            course_id: payload.course_id,
            progress_percentage: payload.progress_percentage || 0,
            status: payload.status || 'in_progress',
            last_accessed_at: created_at || new Date().toISOString(),
            offline_synced: true
          };
          dbStore.course_progress.push(cp);
        } else {
          cp.progress_percentage = Math.max(cp.progress_percentage, payload.progress_percentage || 0);
          cp.status = cp.progress_percentage >= 100 ? 'completed' : 'in_progress';
          cp.last_accessed_at = created_at || new Date().toISOString();
        }
      }

      // Record in sync_events ledger
      const syncRecord = {
        id: `syn-${Date.now()}-${Math.floor(Math.random()*1000)}`,
        event_id,
        user_id: userId,
        device_id: device_id || event.device_id || 'mobile-device',
        event_type,
        payload,
        status: 'processed',
        processed_at: new Date().toISOString(),
        processing_result: processingResult
      };

      dbStore.sync_events.push(syncRecord);
      processedEvents.push(syncRecord);
    }

    res.json({
      success: true,
      message: `Sync complete: ${processedEvents.length} events processed, ${skippedEvents.length} duplicates skipped.`,
      summary: {
        total_received: events.length,
        processed_count: processedEvents.length,
        skipped_count: skippedEvents.length,
        synced_at: new Date().toISOString()
      },
      processed_events: processedEvents,
      skipped_events: skippedEvents
    });
  } catch (err) {
    next(err);
  }
};

export const getSyncStatus = (req, res, next) => {
  try {
    const userId = req.user.id;
    const userEvents = dbStore.sync_events.filter(e => e.user_id === userId);

    res.json({
      success: true,
      total_events_synced: userEvents.length,
      last_synced_at: userEvents.length > 0 ? userEvents[userEvents.length - 1].processed_at : null,
      recent_events: userEvents.slice(-10)
    });
  } catch (err) {
    next(err);
  }
};
