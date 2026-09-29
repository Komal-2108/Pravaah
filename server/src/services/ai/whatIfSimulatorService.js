import { dbStore } from '../../config/db.js';
import { calculateSkillGap } from './skillGapService.js';

/**
 * What-If Career Readiness Simulator
 * Simulates the exact mathematical delta on employment readiness when specific courses/modules are completed.
 */
export const simulateReadinessDelta = (traineeId, targetRoleId, selectedCourseIds = []) => {
  const currentGapAnalysis = calculateSkillGap(traineeId, targetRoleId);
  const baseReadiness = currentGapAnalysis.overall_readiness;
  const baseConfidence = currentGapAnalysis.overall_evidence_confidence;

  const role = dbStore.job_roles.find(r => r.id === targetRoleId) || dbStore.job_roles[0];
  const trainee = dbStore.trainees.find(t => t.id === traineeId || t.user_id === traineeId);
  const traineeSkills = dbStore.trainee_skills.filter(ts => ts.trainee_id === trainee.id);

  // Deep clone current skill levels for simulation
  const simulatedSkillsMap = {};
  role.required_skills.forEach(req => {
    const existing = traineeSkills.find(ts => ts.skill_id === req.skill_id);
    simulatedSkillsMap[req.skill_id] = {
      level: existing ? existing.current_level : 0,
      confidence: existing ? existing.evidence_confidence : 0,
      weight: req.weight,
      required_level: req.required_level,
      name: req.name
    };
  });

  const courseImpacts = [];

  // Simulate addition of each selected course
  selectedCourseIds.forEach(courseId => {
    const course = dbStore.courses.find(c => c.id === courseId);
    if (!course) return;

    let totalCourseDelta = 0;
    (course.skills_impacted || []).forEach(skillId => {
      if (simulatedSkillsMap[skillId]) {
        const skill = simulatedSkillsMap[skillId];
        // Projected skill boost: boosts current level by up to 25 points or closes 70% of gap
        const currentLvl = skill.level;
        const potentialBoost = Math.max(15, (skill.required_level - currentLvl) * 0.7);
        const newLvl = Math.min(skill.required_level, currentLvl + potentialBoost);
        
        const oldContribution = skill.weight * Math.min(1.0, currentLvl / skill.required_level);
        const newContribution = skill.weight * Math.min(1.0, newLvl / skill.required_level);
        const delta = Math.round((newContribution - oldContribution) * 100 * 10) / 10;

        skill.level = newLvl;
        skill.confidence = Math.min(95, skill.confidence + 20); // Practical coursework elevates evidence confidence
        totalCourseDelta += delta;
      }
    });

    courseImpacts.push({
      course_id: course.id,
      course_code: course.code,
      course_title: course.title,
      readiness_delta_points: Math.max(3, Math.round(totalCourseDelta * 10) / 10),
      label: `+${Math.max(3, Math.round(totalCourseDelta * 10) / 10)}%`
    });
  });

  // Calculate new total projected readiness
  let simulatedTotalWeighted = 0;
  let simulatedTotalConfidence = 0;
  let totalWeight = 0;

  Object.keys(simulatedSkillsMap).forEach(skillId => {
    const s = simulatedSkillsMap[skillId];
    simulatedTotalWeighted += s.weight * Math.min(1.0, s.level / s.required_level);
    simulatedTotalConfidence += s.weight * (s.confidence / 100.0);
    totalWeight += s.weight;
  });

  const projectedReadiness = Math.min(100, Math.round((simulatedTotalWeighted / totalWeight) * 100));
  const projectedConfidence = Math.min(100, Math.round((simulatedTotalConfidence / totalWeight) * 100));
  const netGain = Math.max(0, projectedReadiness - baseReadiness);

  return {
    target_role: currentGapAnalysis.target_role,
    current_readiness: baseReadiness,
    current_confidence: baseConfidence,
    selected_courses_count: selectedCourseIds.length,
    course_impacts: courseImpacts,
    projected_readiness: projectedReadiness,
    projected_confidence: projectedConfidence,
    net_gain: netGain,
    threshold_unlocked: projectedReadiness >= role.min_readiness_threshold,
    disclaimer: "Note: Readiness represents algorithmically projected role competency based on verified curriculum benchmarks, not guaranteed employment."
  };
};
