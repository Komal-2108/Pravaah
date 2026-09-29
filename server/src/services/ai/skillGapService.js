import { dbStore } from '../../config/db.js';

/**
 * Skill Gap Intelligence Engine
 * Dynamically computes weighted gap analysis between a target job role and candidate verified skills.
 */
export const calculateSkillGap = (traineeId, targetRoleId) => {
  const trainee = dbStore.trainees.find(t => t.id === traineeId || t.user_id === traineeId);
  if (!trainee) {
    throw new Error('Trainee profile not found');
  }

  const role = dbStore.job_roles.find(r => r.id === targetRoleId) || dbStore.job_roles[0];
  const traineeSkills = dbStore.trainee_skills.filter(ts => ts.trainee_id === trainee.id);

  let totalWeightedScore = 0;
  let totalConfidenceWeighted = 0;
  let totalWeight = 0;
  const gaps = [];

  for (const req of role.required_skills) {
    const userSkill = traineeSkills.find(ts => ts.skill_id === req.skill_id);
    const currentLevel = userSkill ? userSkill.current_level : 0;
    const confidence = userSkill ? userSkill.evidence_confidence : 0;
    const status = userSkill ? userSkill.status : 'gap';

    const normalizedRatio = Math.min(1.0, currentLevel / req.required_level);
    const weightedContribution = req.weight * normalizedRatio;
    totalWeightedScore += weightedContribution;
    totalConfidenceWeighted += req.weight * (confidence / 100.0);
    totalWeight += req.weight;

    const gapAmount = Math.max(0, req.required_level - currentLevel);
    const gapPercentage = Math.round((gapAmount / req.required_level) * 100);

    gaps.push({
      skill_id: req.skill_id,
      skill_code: req.skill_code,
      skill_name: req.name,
      weight_percentage: Math.round(req.weight * 100),
      required_level: req.required_level,
      current_level: currentLevel,
      evidence_confidence: confidence,
      gap_amount: Math.round(gapAmount * 10) / 10,
      gap_percentage: gapPercentage,
      status: currentLevel >= req.required_level ? 'verified' : (currentLevel >= req.required_level * 0.6 ? 'developing' : 'gap')
    });
  }

  // Calculate dynamic overall readiness
  const overallReadiness = Math.round((totalWeightedScore / totalWeight) * 100);
  const overallEvidenceConfidence = Math.round((totalConfidenceWeighted / totalWeight) * 100);

  // Sort major gaps by gap percentage descending
  const majorGaps = gaps
    .filter(g => g.gap_amount > 0)
    .sort((a, b) => (b.gap_amount * (b.weight_percentage / 100)) - (a.gap_amount * (a.weight_percentage / 100)));

  return {
    target_role: {
      id: role.id,
      title: role.title,
      sector: role.sector,
      min_readiness_threshold: role.min_readiness_threshold,
      base_salary_range: role.base_salary_range
    },
    overall_readiness: overallReadiness,
    overall_evidence_confidence: overallEvidenceConfidence,
    meets_threshold: overallReadiness >= role.min_readiness_threshold,
    skill_breakdown: gaps,
    major_gaps: majorGaps.map(g => ({
      skill_name: g.skill_name,
      skill_code: g.skill_code,
      gap_amount: g.gap_amount,
      weight_percentage: g.weight_percentage,
      severity: g.gap_percentage > 50 ? 'Critical' : 'Moderate'
    }))
  };
};
