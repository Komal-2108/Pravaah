import { dbStore } from '../../config/db.js';

/**
 * Practical Assessment Scoring & Skill Graph Ingestion Engine
 */
export const evaluatePracticalAssessment = ({
  assessmentId,
  traineeId,
  userAnswers,
  timeTakenSeconds = 300
}) => {
  const assessment = dbStore.assessments.find(a => a.id === assessmentId) || dbStore.assessments[0];
  const trainee = dbStore.trainees.find(t => t.id === traineeId || t.user_id === traineeId);
  if (!trainee) {
    throw new Error('Trainee not found');
  }

  const expected = assessment.dataset_json.expected_results || {};
  let correctFields = 0;
  let totalFields = Object.keys(expected).length;

  Object.keys(expected).forEach(key => {
    const userVal = parseFloat(userAnswers[key]);
    const expectedVal = parseFloat(expected[key]);
    if (!isNaN(userVal) && Math.abs(userVal - expectedVal) < 1.0) {
      correctFields++;
    }
  });

  // Calculate Accuracy (0-100)
  const accuracyScore = totalFields > 0 ? Math.round((correctFields / totalFields) * 100) : 85;

  // Calculate Completeness (how many required inputs were answered)
  const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k] !== undefined && userAnswers[k] !== '').length;
  const completionScore = totalFields > 0 ? Math.round(Math.min(1.0, answeredCount / totalFields) * 100) : 100;

  // Calculate Time Efficiency (max score within standard time, slight penalty for taking max duration)
  const maxAllowedSeconds = (assessment.duration_minutes || 15) * 60;
  const efficiencyScore = Math.min(100, Math.max(60, Math.round((1 - (timeTakenSeconds / (maxAllowedSeconds * 1.5))) * 100)));

  // Weighted Total Score
  const totalScore = Math.round((accuracyScore * 0.50) + (completionScore * 0.30) + (efficiencyScore * 0.20));
  const passed = totalScore >= (assessment.passing_score || 70);

  // Ingest result into Assessment Attempts
  const attemptRecord = {
    id: `atm-${Date.now()}`,
    assessment_id: assessment.id,
    trainee_id: trainee.id,
    answers_json: userAnswers,
    accuracy_score: accuracyScore,
    completion_score: completionScore,
    efficiency_score: efficiencyScore,
    total_score: totalScore,
    passed: passed,
    submitted_at: new Date().toISOString(),
    offline_synced: true
  };
  dbStore.assessments.push(attemptRecord);

  // Map result back to Trainee Skill Graph Nodes
  const skillsDemonstrated = [];
  (assessment.skill_mappings || []).forEach(skillId => {
    const skillObj = dbStore.skills.find(s => s.id === skillId);
    let traineeSkill = dbStore.trainee_skills.find(ts => ts.trainee_id === trainee.id && ts.skill_id === skillId);

    if (!traineeSkill) {
      traineeSkill = {
        id: `ts-${Date.now()}-${Math.floor(Math.random()*1000)}`,
        trainee_id: trainee.id,
        skill_id: skillId,
        current_level: 50.0,
        evidence_confidence: 60.0,
        status: 'developing',
        last_assessed_at: new Date().toISOString()
      };
      dbStore.trainee_skills.push(traineeSkill);
    }

    if (passed) {
      // Elevate skill level & evidence confidence
      const levelBoost = Math.round((totalScore / 100) * 12);
      traineeSkill.current_level = Math.min(95, traineeSkill.current_level + levelBoost);
      traineeSkill.evidence_confidence = Math.min(96, traineeSkill.evidence_confidence + 15);
      traineeSkill.last_assessed_at = new Date().toISOString();
      if (traineeSkill.current_level >= 75) {
        traineeSkill.status = 'verified';
      }
    }

    // Add Evidence timeline entry
    const evidenceEntry = {
      id: `ev-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      trainee_skill_id: traineeSkill.id,
      trainee_id: trainee.id,
      skill_id: skillId,
      evidence_type: 'practical',
      title: `Practical Task: ${assessment.title}`,
      score: totalScore,
      evidence_data: {
        accuracy: accuracyScore,
        completeness: completionScore,
        efficiency: efficiencyScore,
        time_taken_sec: timeTakenSeconds
      },
      verified_at: new Date().toISOString(),
      verifier_type: 'practical_scoring_engine'
    };
    dbStore.skill_evidence.push(evidenceEntry);

    if (skillObj) {
      skillsDemonstrated.push({
        skill_id: skillObj.id,
        skill_name: skillObj.name,
        new_level: traineeSkill.current_level,
        evidence_confidence: traineeSkill.evidence_confidence,
        status: traineeSkill.status
      });
    }
  });

  // Recalculate Trainee Overall Readiness
  const allUserSkills = dbStore.trainee_skills.filter(ts => ts.trainee_id === trainee.id);
  const avgLevel = Math.round(allUserSkills.reduce((acc, s) => acc + s.current_level, 0) / (allUserSkills.length || 1));
  const avgConf = Math.round(allUserSkills.reduce((acc, s) => acc + s.evidence_confidence, 0) / (allUserSkills.length || 1));
  trainee.employment_readiness = Math.min(100, Math.max(trainee.employment_readiness, avgLevel));
  trainee.evidence_confidence = Math.min(100, Math.max(trainee.evidence_confidence, avgConf));

  return {
    assessment_id: assessment.id,
    title: assessment.title,
    accuracy: accuracyScore,
    completion: completionScore,
    efficiency: efficiencyScore,
    total_score: totalScore,
    passed: passed,
    skills_demonstrated: skillsDemonstrated,
    new_overall_readiness: trainee.employment_readiness,
    new_evidence_confidence: trainee.evidence_confidence
  };
};
