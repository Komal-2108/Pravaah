import { dbStore } from '../config/db.js';
import { calculateSkillGap } from '../services/ai/skillGapService.js';

export const getTraineeProfile = (req, res, next) => {
  try {
    const userId = req.user.role === 'trainee' ? req.user.id : req.query.user_id;
    const user = dbStore.users.find(u => u.id === userId);
    const trainee = dbStore.trainees.find(t => t.user_id === userId || t.id === req.query.trainee_id);

    if (!trainee) {
      return res.status(404).json({ success: false, message: 'Trainee profile not found' });
    }

    const center = dbStore.training_centers.find(c => c.id === trainee.training_center_id);
    const targetRole = dbStore.job_roles.find(r => r.id === trainee.target_role_id) || dbStore.job_roles[0];

    // Compute dynamic readiness
    const gapAnalysis = calculateSkillGap(trainee.id, targetRole.id);

    res.json({
      success: true,
      profile: {
        id: trainee.id,
        user_id: trainee.user_id,
        name: user ? user.name : 'Trainee',
        email: user ? user.email : '',
        phone: user ? user.phone : '',
        avatar_url: user ? user.avatar_url : '',
        registration_number: trainee.registration_number,
        training_center: center ? center.name : 'Cooperative Institute',
        center_code: center ? center.code : 'TC-01',
        district: trainee.district,
        state: trainee.state,
        target_role: targetRole,
        employment_readiness: gapAnalysis.overall_readiness,
        evidence_confidence: gapAnalysis.overall_evidence_confidence,
        created_at: trainee.created_at
      }
    });
  } catch (err) {
    next(err);
  }
};

export const updateTargetRole = (req, res, next) => {
  try {
    const { target_role_id } = req.body;
    const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
    if (!trainee) {
      return res.status(404).json({ success: false, message: 'Trainee not found' });
    }

    const targetRole = dbStore.job_roles.find(r => r.id === target_role_id);
    if (!targetRole) {
      return res.status(400).json({ success: false, message: 'Invalid target role ID' });
    }

    trainee.target_role_id = target_role_id;
    const gapAnalysis = calculateSkillGap(trainee.id, targetRole.id);

    res.json({
      success: true,
      message: `Target role updated to ${targetRole.title}`,
      target_role: targetRole,
      gap_analysis: gapAnalysis
    });
  } catch (err) {
    next(err);
  }
};

export const getSkillGraph = (req, res, next) => {
  try {
    const userId = req.user.role === 'trainee' ? req.user.id : (req.query.user_id || 'usr-trainee-001');
    const trainee = dbStore.trainees.find(t => t.user_id === userId || t.id === req.query.trainee_id) || dbStore.trainees[0];

    const traineeSkills = dbStore.trainee_skills.filter(ts => ts.trainee_id === trainee.id);

    const nodes = dbStore.skills.map(skill => {
      const ts = traineeSkills.find(item => item.skill_id === skill.id);
      const level = ts ? ts.current_level : 30.0;
      const confidence = ts ? ts.evidence_confidence : 40.0;
      const status = ts ? ts.status : 'gap';

      const evidenceCount = dbStore.skill_evidence.filter(ev => ev.trainee_id === trainee.id && ev.skill_id === skill.id).length;

      return {
        id: skill.id,
        code: skill.code,
        name: skill.name,
        category: skill.category,
        description: skill.description,
        icon: skill.icon,
        current_level: level,
        evidence_confidence: confidence,
        status: status, // verified, developing, gap, recommended
        evidence_count: evidenceCount,
        last_assessed_at: ts ? ts.last_assessed_at : null
      };
    });

    // Interactive Graph Connections (Hierarchical Domain Graph)
    const links = [
      { source: 'skill-001', target: 'skill-002', label: 'Financial Data Handling' },
      { source: 'skill-001', target: 'skill-003', label: 'Statutory Compliance' },
      { source: 'skill-002', target: 'skill-004', label: 'ERP Ingestion' },
      { source: 'skill-003', target: 'skill-004', label: 'Taxation Reporting' },
      { source: 'skill-004', target: 'skill-005', label: 'Farmer Advisory' },
      { source: 'skill-001', target: 'skill-006', label: 'Procurement Billing' }
    ];

    res.json({
      success: true,
      trainee_id: trainee.id,
      nodes,
      links,
      overall_readiness: trainee.employment_readiness,
      evidence_confidence: trainee.evidence_confidence
    });
  } catch (err) {
    next(err);
  }
};

export const getSkillEvidenceTimeline = (req, res, next) => {
  try {
    const { skill_id } = req.params;
    const userId = req.user.role === 'trainee' ? req.user.id : (req.query.user_id || 'usr-trainee-001');
    const trainee = dbStore.trainees.find(t => t.user_id === userId || t.id === req.query.trainee_id) || dbStore.trainees[0];

    const evidence = dbStore.skill_evidence
      .filter(ev => ev.trainee_id === trainee.id && (skill_id ? ev.skill_id === skill_id : true))
      .sort((a, b) => new Date(a.verified_at) - new Date(b.verified_at));

    const skill = dbStore.skills.find(s => s.id === skill_id);

    res.json({
      success: true,
      skill: skill || null,
      timeline: evidence
    });
  } catch (err) {
    next(err);
  }
};
