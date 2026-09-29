import { dbStore } from '../../config/db.js';
import { calculateSkillGap } from './skillGapService.js';

/**
 * Personalized Learning Path Recommendation Engine
 * Maps skill gaps directly to high-impact courses and provides contextual rationales.
 */
export const getPersonalizedLearningPath = (traineeId, targetRoleId) => {
  const gapAnalysis = calculateSkillGap(traineeId, targetRoleId);
  const trainee = dbStore.trainees.find(t => t.id === traineeId || t.user_id === traineeId);
  const userProgress = dbStore.course_progress.filter(cp => cp.trainee_id === trainee.id);

  const recommendations = [];

  // Iterate over major gaps in priority order
  gapAnalysis.major_gaps.forEach((gap, index) => {
    // Find courses that impact this skill
    const matchingCourses = dbStore.courses.filter(c => {
      const skillsImpacted = c.skills_impacted || [];
      const matchingSkill = dbStore.skills.find(s => s.name === gap.skill_name || s.code === gap.skill_code);
      return matchingSkill && skillsImpacted.includes(matchingSkill.id);
    });

    matchingCourses.forEach(course => {
      const progress = userProgress.find(p => p.course_id === course.id);
      const isCompleted = progress && progress.progress_percentage === 100;
      
      if (!isCompleted) {
        recommendations.push({
          priority: index + 1,
          course_id: course.id,
          course_code: course.code,
          course_title: course.title,
          course_title_hi: course.title_hi,
          category: course.category,
          duration_hours: course.duration_hours,
          difficulty: course.difficulty,
          offline_downloadable: course.offline_downloadable,
          target_skill: gap.skill_name,
          current_progress: progress ? progress.progress_percentage : 0,
          projected_skill_gain: Math.min(35, Math.round(gap.gap_amount * 0.75)),
          rationale: `Recommended Priority ${index + 1} because ${gap.skill_name} is currently your highest weighted skill gap (${gap.gap_amount} pts gap, ${gap.weight_percentage}% role weight) for the ${gapAnalysis.target_role.title} position.`
        });
      }
    });
  });

  return {
    target_role: gapAnalysis.target_role,
    current_readiness: gapAnalysis.overall_readiness,
    recommendation_count: recommendations.length,
    learning_path: recommendations
  };
};
