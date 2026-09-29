import { dbStore } from '../config/db.js';

export const getAllCourses = (req, res, next) => {
  try {
    let traineeId = null;
    if (req.user && req.user.role === 'trainee') {
      const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
      if (trainee) traineeId = trainee.id;
    }

    const coursesWithProgress = dbStore.courses.map(c => {
      let progress = 0;
      let status = 'not_started';

      if (traineeId) {
        const cp = dbStore.course_progress.find(p => p.trainee_id === traineeId && p.course_id === c.id);
        if (cp) {
          progress = cp.progress_percentage;
          status = cp.status;
        }
      }

      const impactedSkillNames = (c.skills_impacted || []).map(skId => {
        const s = dbStore.skills.find(sk => sk.id === skId);
        return s ? s.name : skId;
      });

      return {
        ...c,
        progress_percentage: progress,
        status,
        skills_impacted_names: impactedSkillNames
      };
    });

    res.json({
      success: true,
      count: coursesWithProgress.length,
      courses: coursesWithProgress
    });
  } catch (err) {
    next(err);
  }
};

export const getCourseById = (req, res, next) => {
  try {
    const { id } = req.params;
    const course = dbStore.courses.find(c => c.id === id || c.code === id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    let progress = null;
    if (req.user && req.user.role === 'trainee') {
      const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
      if (trainee) {
        progress = dbStore.course_progress.find(p => p.trainee_id === trainee.id && p.course_id === course.id);
      }
    }

    const skillsImpacted = (course.skills_impacted || []).map(skId => {
      return dbStore.skills.find(sk => sk.id === skId);
    }).filter(Boolean);

    res.json({
      success: true,
      course: {
        ...course,
        skills_impacted_details: skillsImpacted,
        user_progress: progress || { progress_percentage: 0, status: 'not_started' }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const updateProgress = (req, res, next) => {
  try {
    const { id } = req.params;
    const { progress_percentage, status } = req.body;

    const trainee = dbStore.trainees.find(t => t.user_id === req.user.id);
    if (!trainee) {
      return res.status(404).json({ success: false, message: 'Trainee profile not found' });
    }

    let cp = dbStore.course_progress.find(p => p.trainee_id === trainee.id && p.course_id === id);
    if (!cp) {
      cp = {
        id: `cp-${Date.now()}`,
        trainee_id: trainee.id,
        course_id: id,
        progress_percentage: progress_percentage || 0,
        status: status || 'in_progress',
        last_accessed_at: new Date().toISOString(),
        offline_synced: true
      };
      dbStore.course_progress.push(cp);
    } else {
      cp.progress_percentage = progress_percentage;
      cp.status = status || (progress_percentage >= 100 ? 'completed' : 'in_progress');
      cp.last_accessed_at = new Date().toISOString();
    }

    // If completed, add Evidence record for skills impacted
    if (cp.progress_percentage === 100) {
      const course = dbStore.courses.find(c => c.id === id);
      if (course) {
        (course.skills_impacted || []).forEach(skId => {
          const alreadyLogged = dbStore.skill_evidence.some(ev => ev.trainee_id === trainee.id && ev.skill_id === skId && ev.evidence_type === 'course' && ev.title.includes(course.title));
          if (!alreadyLogged) {
            dbStore.skill_evidence.push({
              id: `ev-crs-${Date.now()}-${skId}`,
              trainee_id: trainee.id,
              skill_id: skId,
              evidence_type: 'course',
              title: `Course Completed: ${course.title}`,
              score: 100.0,
              evidence_data: { duration_hours: course.duration_hours, course_code: course.code },
              verified_at: new Date().toISOString(),
              verifier_type: 'system_engine'
            });

            // Boost Skill Level & Confidence
            let userSkill = dbStore.trainee_skills.find(ts => ts.trainee_id === trainee.id && ts.skill_id === skId);
            if (userSkill) {
              userSkill.current_level = Math.min(95, userSkill.current_level + 15);
              userSkill.evidence_confidence = Math.min(95, userSkill.evidence_confidence + 20);
              if (userSkill.current_level >= 75) userSkill.status = 'verified';
            }
          }
        });
      }
    }

    res.json({
      success: true,
      message: 'Course progress updated successfully',
      progress: cp
    });
  } catch (err) {
    next(err);
  }
};

export const downloadCoursePackage = (req, res, next) => {
  try {
    const { id } = req.params;
    const course = dbStore.courses.find(c => c.id === id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const packageBundle = {
      course_id: course.id,
      code: course.code,
      title: course.title,
      title_hi: course.title_hi,
      description: course.description,
      modules: course.modules,
      assessments: dbStore.assessments.filter(a => a.course_id === course.id),
      package_version: '1.2.0',
      downloaded_at: new Date().toISOString(),
      offline_cache_duration_days: 30
    };

    res.json({
      success: true,
      message: `Offline package for ${course.title} generated`,
      package: packageBundle
    });
  } catch (err) {
    next(err);
  }
};
