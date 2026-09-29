import { dbStore } from '../config/db.js';
import { calculateJobMatchesForTrainee } from '../services/ai/jobMatchingService.js';

export const getAllJobs = (req, res, next) => {
  try {
    const { district, job_type, min_salary } = req.query;

    let filtered = dbStore.jobs;
    if (district) {
      filtered = filtered.filter(j => j.district.toLowerCase() === district.toLowerCase());
    }
    if (job_type) {
      filtered = filtered.filter(j => j.job_type.toLowerCase() === job_type.toLowerCase());
    }

    res.json({
      success: true,
      count: filtered.length,
      jobs: filtered
    });
  } catch (err) {
    next(err);
  }
};

export const getJobById = (req, res, next) => {
  try {
    const { id } = req.params;
    const job = dbStore.jobs.find(j => j.id === id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({
      success: true,
      job
    });
  } catch (err) {
    next(err);
  }
};

export const createJob = (req, res, next) => {
  try {
    const { title, organization, location, district, state, salary_range, openings, job_type, description, required_skills, min_readiness } = req.body;

    const employer = dbStore.employers.find(e => e.user_id === req.user.id);

    const newJob = {
      id: `job-${Date.now()}`,
      employer_id: employer ? employer.id : 'emp-001',
      title,
      organization: organization || (employer ? employer.organization_name : 'Cooperative Union'),
      location: location || 'Anand, Gujarat',
      district: district || 'Anand',
      state: state || 'Gujarat',
      salary_range: salary_range || '₹18,000 - ₹24,000 / month',
      openings: openings || 1,
      job_type: job_type || 'Full-Time',
      description: description || 'Responsible for cooperative operational and financial reporting.',
      required_skills: required_skills || [
        { skill_id: 'skill-001', skill_code: 'SKILL_ACC', name: 'Accounting & Ledger Balancing', min_level: 75, weight: 0.4 },
        { skill_id: 'skill-002', skill_code: 'SKILL_XLS', name: 'Advanced Excel & Spreadsheets', min_level: 70, weight: 0.3 },
        { skill_id: 'skill-004', skill_code: 'SKILL_MIS', name: 'Cooperative MIS & ERP Operations', min_level: 65, weight: 0.3 }
      ],
      min_readiness: min_readiness || 70.0,
      status: 'open',
      created_at: new Date().toISOString()
    };

    dbStore.jobs.push(newJob);

    res.status(201).json({
      success: true,
      message: 'Job posting published successfully',
      job: newJob
    });
  } catch (err) {
    next(err);
  }
};
