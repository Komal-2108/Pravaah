import { dbStore } from '../config/db.js';
import { calculateSkillGap } from '../services/ai/skillGapService.js';
import { getPersonalizedLearningPath } from '../services/ai/learningRecommendationService.js';
import { simulateReadinessDelta } from '../services/ai/whatIfSimulatorService.js';
import { calculateJobMatchesForTrainee, searchCandidatesForEmployer } from '../services/ai/jobMatchingService.js';

export const getTargetRoles = (req, res, next) => {
  try {
    res.json({
      success: true,
      roles: dbStore.job_roles
    });
  } catch (err) {
    next(err);
  }
};

export const getSkillGapAnalysis = (req, res, next) => {
  try {
    const { target_role_id, trainee_id } = req.body;
    let effectiveTraineeId = trainee_id;

    if (!effectiveTraineeId && req.user && req.user.role === 'trainee') {
      const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
      effectiveTraineeId = trainee ? trainee.id : 'trainee-001';
    } else if (!effectiveTraineeId) {
      effectiveTraineeId = 'trainee-001';
    }

    const roleId = target_role_id || 'job-role-001';
    const analysis = calculateSkillGap(effectiveTraineeId, roleId);

    res.json({
      success: true,
      analysis
    });
  } catch (err) {
    next(err);
  }
};

export const getLearningRecommendations = (req, res, next) => {
  try {
    const { target_role_id, trainee_id } = req.body;
    let effectiveTraineeId = trainee_id;

    if (!effectiveTraineeId && req.user && req.user.role === 'trainee') {
      const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
      effectiveTraineeId = trainee ? trainee.id : 'trainee-001';
    } else if (!effectiveTraineeId) {
      effectiveTraineeId = 'trainee-001';
    }

    const roleId = target_role_id || 'job-role-001';
    const recommendations = getPersonalizedLearningPath(effectiveTraineeId, roleId);

    res.json({
      success: true,
      ...recommendations
    });
  } catch (err) {
    next(err);
  }
};

export const runWhatIfSimulation = (req, res, next) => {
  try {
    const { target_role_id, selected_course_ids, trainee_id } = req.body;
    let effectiveTraineeId = trainee_id;

    if (!effectiveTraineeId && req.user && req.user.role === 'trainee') {
      const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
      effectiveTraineeId = trainee ? trainee.id : 'trainee-001';
    } else if (!effectiveTraineeId) {
      effectiveTraineeId = 'trainee-001';
    }

    const roleId = target_role_id || 'job-role-001';
    const simulationResult = simulateReadinessDelta(effectiveTraineeId, roleId, selected_course_ids || []);

    res.json({
      success: true,
      simulation: simulationResult
    });
  } catch (err) {
    next(err);
  }
};

export const getJobMatches = (req, res, next) => {
  try {
    let effectiveTraineeId = req.query.trainee_id;

    if (!effectiveTraineeId && req.user && req.user.role === 'trainee') {
      const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
      effectiveTraineeId = trainee ? trainee.id : 'trainee-001';
    } else if (!effectiveTraineeId) {
      effectiveTraineeId = 'trainee-001';
    }

    const matches = calculateJobMatchesForTrainee(effectiveTraineeId);

    res.json({
      success: true,
      total_matches: matches.length,
      matches
    });
  } catch (err) {
    next(err);
  }
};

export const searchCandidates = (req, res, next) => {
  try {
    const { min_confidence, min_readiness, skill_id, district } = req.query;
    const candidates = searchCandidatesForEmployer({
      minMatch: min_readiness ? parseFloat(min_readiness) : 0,
      minConfidence: min_confidence ? parseFloat(min_confidence) : 0,
      skillId: skill_id || null,
      district: district || null
    });

    res.json({
      success: true,
      count: candidates.length,
      candidates
    });
  } catch (err) {
    next(err);
  }
};
