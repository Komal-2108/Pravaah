import { dbStore } from '../config/db.js';

export const getCertificates = (req, res, next) => {
  try {
    let traineeId = req.query.trainee_id;
    if (!traineeId && req.user && req.user.role === 'trainee') {
      const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
      if (trainee) traineeId = trainee.id;
    }

    let list = dbStore.certificates;
    if (traineeId) {
      list = list.filter(c => c.trainee_id === traineeId);
    }

    res.json({
      success: true,
      count: list.length,
      certificates: list
    });
  } catch (err) {
    next(err);
  }
};

export const issueCertificate = (req, res, next) => {
  try {
    const { trainee_id, course_id, title, skills_certified } = req.body;

    const trainee = dbStore.trainees.find(t => t.id === trainee_id || t.user_id === trainee_id);
    if (!trainee) {
      return res.status(404).json({ success: false, message: 'Trainee not found' });
    }

    const user = dbStore.users.find(u => u.id === trainee.user_id);
    const course = dbStore.courses.find(c => c.id === course_id);
    const center = dbStore.training_centers.find(c => c.id === trainee.training_center_id);

    const hexId = Math.random().toString(16).substring(2, 8).toUpperCase();
    const certNumber = `PRV-2026-${hexId}`;

    const newCert = {
      id: `cert-${Date.now()}`,
      certificate_number: certNumber,
      trainee_id: trainee.id,
      trainee_name: user ? user.name : 'Trainee Candidate',
      course_id: course_id || null,
      course_title: course ? course.title : title,
      issue_date: new Date().toISOString().split('T')[0],
      skills_certified: skills_certified || ['Accounting & Ledger Balancing', 'Cooperative MIS Operations'],
      training_center: center ? center.name : 'Anand Cooperative Skill Development Institute',
      verified_status: true,
      digital_signature_hash: `SHA256:${Math.random().toString(16).substring(2, 14)}${Math.random().toString(16).substring(2, 14)}`,
      qr_verification_url: `/verify/${certNumber}`
    };

    dbStore.certificates.push(newCert);

    // Create Evidence Timeline entry
    (course ? course.skills_impacted : ['skill-001']).forEach(skId => {
      dbStore.skill_evidence.push({
        id: `ev-cert-${Date.now()}-${skId}`,
        trainee_id: trainee.id,
        skill_id: skId,
        evidence_type: 'certificate',
        title: `Certified Credential Issued: ${newCert.course_title} (${certNumber})`,
        score: 95.0,
        evidence_data: { certificate_number: certNumber, center: newCert.training_center },
        verified_at: new Date().toISOString(),
        verifier_type: 'institutional_signature'
      });
    });

    res.status(201).json({
      success: true,
      message: `Certificate ${certNumber} issued successfully`,
      certificate: newCert
    });
  } catch (err) {
    next(err);
  }
};

export const verifyCertificatePublic = (req, res, next) => {
  try {
    const { id } = req.params;
    const cert = dbStore.certificates.find(c => c.certificate_number.toLowerCase() === id.toLowerCase() || c.id === id);

    if (!cert) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: 'Invalid certificate identifier. No verified credential matching this ID was found in the PRAVAAH National Registry.'
      });
    }

    const trainee = dbStore.trainees.find(t => t.id === cert.trainee_id);
    const user = trainee ? dbStore.users.find(u => u.id === trainee.user_id) : null;

    // Log verification event
    const verificationRecord = {
      id: `vrf-${Date.now()}`,
      certificate_id: cert.id,
      verified_at: new Date().toISOString(),
      ip_address: req.ip || '127.0.0.1',
      user_agent: req.headers['user-agent'] || 'Browser'
    };

    res.json({
      success: true,
      verified: true,
      certificate: {
        certificate_number: cert.certificate_number,
        candidate_name: cert.trainee_name || (user ? user.name : 'Verified Candidate'),
        registration_number: trainee ? trainee.registration_number : 'PRV-TR-2026-0000',
        course_title: cert.course_title,
        issue_date: cert.issue_date,
        skills_certified: cert.skills_certified,
        training_center: cert.training_center,
        verified_status: cert.verified_status,
        digital_signature_hash: cert.digital_signature_hash,
        verified_timestamp: verificationRecord.verified_at
      }
    });
  } catch (err) {
    next(err);
  }
};
