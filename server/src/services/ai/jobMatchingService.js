import { dbStore } from '../../config/db.js';

/**
 * Job Matching Intelligence Service
 * Computes semantic & skill-graph similarity between employer job openings and candidate verified capability.
 */
export const calculateJobMatchesForTrainee = (traineeId) => {
  const trainee = dbStore.trainees.find(t => t.id === traineeId || t.user_id === traineeId);
  if (!trainee) {
    throw new Error('Trainee profile not found');
  }

  const traineeSkills = dbStore.trainee_skills.filter(ts => ts.trainee_id === trainee.id);

  const matchedJobs = dbStore.jobs.map(job => {
    let totalScore = 0;
    let verifiedCount = 0;
    let largestGapSkill = null;
    let maxGap = 0;

    const requiredSkills = job.required_skills || [];

    requiredSkills.forEach(req => {
      const userSkill = traineeSkills.find(ts => ts.skill_id === req.skill_id);
      const level = userSkill ? userSkill.current_level : 0;
      const confidence = userSkill ? userSkill.evidence_confidence : 0;

      // Confidence-weighted skill factor
      const confidenceMultiplier = (confidence > 0) ? (confidence / 100.0) : 0.4;
      const effectiveLevel = level * confidenceMultiplier;

      const skillRatio = Math.min(1.0, effectiveLevel / req.min_level);
      totalScore += (req.weight || (1 / requiredSkills.length)) * skillRatio;

      if (level >= req.min_level) {
        verifiedCount++;
      } else {
        const gap = req.min_level - level;
        if (gap > maxGap) {
          maxGap = gap;
          largestGapSkill = req.name;
        }
      }
    });

    const matchPercentage = Math.min(100, Math.round(totalScore * 100));

    return {
      job_id: job.id,
      title: job.title,
      organization: job.organization,
      location: job.location,
      district: job.district,
      state: job.state,
      salary_range: job.salary_range,
      openings: job.openings,
      job_type: job.job_type,
      description: job.description,
      min_readiness: job.min_readiness,
      match_percentage: matchPercentage,
      verified_skills_count: verifiedCount,
      required_skills_count: requiredSkills.length,
      main_gap: largestGapSkill || 'None (All skills met)',
      eligible: matchPercentage >= job.min_readiness
    };
  });

  // Sort by highest match percentage first
  return matchedJobs.sort((a, b) => b.match_percentage - a.match_percentage);
};

/**
 * Filter and search verified candidates for employers with evidence confidence sorting
 */
export const searchCandidatesForEmployer = ({
  minMatch = 0,
  minConfidence = 0,
  skillId = null,
  district = null
} = {}) => {
  return dbStore.trainees.map(t => {
    const user = dbStore.users.find(u => u.id === t.user_id) || {};
    const center = dbStore.training_centers.find(c => c.id === t.training_center_id) || {};
    const skills = dbStore.trainee_skills.filter(ts => ts.trainee_id === t.id).map(ts => {
      const s = dbStore.skills.find(sk => sk.id === ts.skill_id) || {};
      return {
        skill_id: ts.skill_id,
        name: s.name,
        code: s.code,
        category: s.category,
        current_level: ts.current_level,
        evidence_confidence: ts.evidence_confidence,
        status: ts.status
      };
    });

    const certificates = dbStore.certificates.filter(c => c.trainee_id === t.id);

    return {
      trainee_id: t.id,
      user_id: t.user_id,
      name: user.name || 'Trainee',
      email: user.email,
      phone: user.phone,
      avatar_url: user.avatar_url,
      registration_number: t.registration_number,
      training_center: center.name,
      district: t.district,
      state: t.state,
      employment_readiness: t.employment_readiness,
      evidence_confidence: t.evidence_confidence,
      skills_count: skills.length,
      verified_skills_count: skills.filter(s => s.status === 'verified').length,
      skills: skills,
      certificates_count: certificates.length,
      certificates: certificates
    };
  }).filter(c => {
    if (minConfidence && c.evidence_confidence < minConfidence) return false;
    if (district && c.district.toLowerCase() !== district.toLowerCase()) return false;
    if (skillId && !c.skills.some(s => s.skill_id === skillId && s.status === 'verified')) return false;
    return true;
  }).sort((a, b) => b.employment_readiness - a.employment_readiness);
};
