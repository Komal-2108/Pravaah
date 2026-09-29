import { dbStore } from '../config/db.js';
import { evaluatePracticalAssessment } from '../services/ai/assessmentService.js';

export const getAssessmentById = (req, res, next) => {
  try {
    const { id } = req.params;
    const assessment = dbStore.assessments.find(a => a.id === id);
    if (!assessment) {
      return res.status(404).json({ success: false, message: 'Assessment not found' });
    }

    // Don't expose expected results to client during task
    const sanitizedDataset = { ...assessment.dataset_json };
    delete sanitizedDataset.expected_results;

    res.json({
      success: true,
      assessment: {
        id: assessment.id,
        course_id: assessment.course_id,
        title: assessment.title,
        type: assessment.type,
        instructions: assessment.instructions,
        duration_minutes: assessment.duration_minutes,
        passing_score: assessment.passing_score,
        skill_mappings: assessment.skill_mappings,
        dataset: sanitizedDataset
      }
    });
  } catch (err) {
    next(err);
  }
};

export const submitPracticalAssessment = (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_answers, time_taken_seconds } = req.body;

    const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
    if (!trainee) {
      return res.status(404).json({ success: false, message: 'Trainee profile not found' });
    }

    const evaluationResult = evaluatePracticalAssessment({
      assessmentId: id,
      traineeId: trainee.id,
      userAnswers: user_answers || {},
      timeTakenSeconds: time_taken_seconds || 240
    });

    res.status(200).json({
      success: true,
      message: evaluationResult.passed ? '🎉 Assessment Passed! Skill Graph updated.' : 'Assessment Completed. Review gap areas.',
      result: evaluationResult
    });
  } catch (err) {
    next(err);
  }
};
