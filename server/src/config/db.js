import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { config } from './env.js';

// Initialize Supabase Client if credentials are provided
export let supabase = null;
if (config.supabaseUrl && config.supabaseAnonKey) {
  try {
    supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey || config.supabaseAnonKey);
    console.log('✓ Supabase PostgreSQL client initialized.');
  } catch (err) {
    console.warn('! Supabase initialization warning:', err.message);
  }
}

// In-Memory Cloud / Fallback Store initialized with full SIH Realistic Dataset
const salt = bcrypt.genSaltSync(10);
const defaultPasswordHash = bcrypt.hashSync('password123', salt);

export const dbStore = {
  users: [
    {
      id: 'usr-trainee-001',
      email: 'ramesh@pravaah.org',
      password_hash: defaultPasswordHash,
      role: 'trainee',
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      created_at: new Date('2026-08-01T10:00:00Z').toISOString()
    },
    {
      id: 'usr-trainee-002',
      email: 'sunita@pravaah.org',
      password_hash: defaultPasswordHash,
      role: 'trainee',
      name: 'Sunita Verma',
      phone: '+91 98123 45678',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      created_at: new Date('2026-08-05T10:00:00Z').toISOString()
    },
    {
      id: 'usr-trainee-003',
      email: 'aman@pravaah.org',
      password_hash: defaultPasswordHash,
      role: 'trainee',
      name: 'Aman Singh',
      phone: '+91 97234 56789',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      created_at: new Date('2026-08-10T10:00:00Z').toISOString()
    },
    {
      id: 'usr-trainee-004',
      email: 'priya@pravaah.org',
      password_hash: defaultPasswordHash,
      role: 'trainee',
      name: 'Priya Sharma',
      phone: '+91 96345 67890',
      avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
      created_at: new Date('2026-08-12T10:00:00Z').toISOString()
    },
    {
      id: 'usr-admin-001',
      email: 'admin@pravaah.org',
      password_hash: defaultPasswordHash,
      role: 'admin',
      name: 'Dr. Arvind Patel',
      phone: '+91 98250 12345',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
      created_at: new Date('2026-07-01T10:00:00Z').toISOString()
    },
    {
      id: 'usr-emp-001',
      email: 'employer@amuldairy.coop',
      password_hash: defaultPasswordHash,
      role: 'employer',
      name: 'Vikram Mehta (Amul GCMMF)',
      phone: '+91 99099 88776',
      avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
      created_at: new Date('2026-07-15T10:00:00Z').toISOString()
    },
    {
      id: 'usr-emp-002',
      email: 'recruiter@kashipacs.org',
      password_hash: defaultPasswordHash,
      role: 'employer',
      name: 'Rajeshwar Pandey (Kashi PACS)',
      phone: '+91 94150 11223',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      created_at: new Date('2026-07-20T10:00:00Z').toISOString()
    }
  ],

  training_centers: [
    {
      id: 'center-001',
      name: 'Anand Cooperative Skill Development Institute',
      code: 'TC-GUJ-01',
      district: 'Anand',
      state: 'Gujarat',
      coordinator_name: 'Dr. Arvind Patel',
      contact_phone: '+91 98250 12345',
      active_trainees_count: 142
    },
    {
      id: 'center-002',
      name: 'Varanasi Rural Banking & PACS Training Academy',
      code: 'TC-UP-02',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      coordinator_name: 'Smt. Manju Tripathi',
      contact_phone: '+91 94150 67890',
      active_trainees_count: 98
    }
  ],

  trainees: [
    {
      id: 'trainee-001',
      user_id: 'usr-trainee-001',
      registration_number: 'PRV-TR-2026-0491',
      training_center_id: 'center-001',
      village_block: 'Mogri Gram Panchayat',
      district: 'Anand',
      state: 'Gujarat',
      target_role_id: 'job-role-001', // PACS Accountant
      employment_readiness: 71.0,
      evidence_confidence: 88.0,
      created_at: new Date('2026-08-01T10:00:00Z').toISOString()
    },
    {
      id: 'trainee-002',
      user_id: 'usr-trainee-002',
      registration_number: 'PRV-TR-2026-0512',
      training_center_id: 'center-001',
      village_block: 'Petlad Taluka',
      district: 'Anand',
      state: 'Gujarat',
      target_role_id: 'job-role-003', // Dairy Executive
      employment_readiness: 84.0,
      evidence_confidence: 93.0,
      created_at: new Date('2026-08-05T10:00:00Z').toISOString()
    },
    {
      id: 'trainee-003',
      user_id: 'usr-trainee-003',
      registration_number: 'PRV-TR-2026-0604',
      training_center_id: 'center-002',
      village_block: 'Kashi Vidyapeeth Block',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      target_role_id: 'job-role-002', // MIS Assistant
      employment_readiness: 65.0,
      evidence_confidence: 76.0,
      created_at: new Date('2026-08-10T10:00:00Z').toISOString()
    },
    {
      id: 'trainee-004',
      user_id: 'usr-trainee-004',
      registration_number: 'PRV-TR-2026-0738',
      training_center_id: 'center-002',
      village_block: 'Chiraigaon Block',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      target_role_id: 'job-role-004', // Rural Banking Assistant
      employment_readiness: 78.0,
      evidence_confidence: 85.0,
      created_at: new Date('2026-08-12T10:00:00Z').toISOString()
    }
  ],

  employers: [
    {
      id: 'emp-001',
      user_id: 'usr-emp-001',
      organization_name: 'Gujarat Cooperative Milk Marketing Federation (Amul)',
      organization_type: 'Dairy Cooperative Federation',
      district: 'Anand',
      state: 'Gujarat',
      verified: true,
      contact_person: 'Vikram Mehta'
    },
    {
      id: 'emp-002',
      user_id: 'usr-emp-002',
      organization_name: 'Kashi District Cooperative Credit Union',
      organization_type: 'Primary Agricultural Credit Union',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      verified: true,
      contact_person: 'Rajeshwar Pandey'
    }
  ],

  skills: [
    {
      id: 'skill-001',
      code: 'SKILL_ACC',
      name: 'Accounting & Ledger Balancing',
      category: 'Financial',
      description: 'Double entry bookkeeping, daybook reconciliation, cooperative cashbook maintenance.',
      icon: 'BookOpen',
      weight_factor: 1.20
    },
    {
      id: 'skill-002',
      code: 'SKILL_XLS',
      name: 'Advanced Excel & Spreadsheets',
      category: 'Digital',
      description: 'VLOOKUP, Pivot tables, data validation, cooperative member transaction auditing.',
      icon: 'FileSpreadsheet',
      weight_factor: 1.10
    },
    {
      id: 'skill-003',
      code: 'SKILL_GST',
      name: 'GST & Cooperative Taxation',
      category: 'Regulatory',
      description: 'GST calculation on cooperative goods, portal filing, input tax credit reconciliation.',
      icon: 'Percent',
      weight_factor: 1.25
    },
    {
      id: 'skill-004',
      code: 'SKILL_MIS',
      name: 'Cooperative MIS & ERP Operations',
      category: 'Operational',
      description: 'Cooperative ERP data entry, member credit limits, subsidy disbursement tracking.',
      icon: 'Layers',
      weight_factor: 1.15
    },
    {
      id: 'skill-005',
      code: 'SKILL_COM',
      name: 'Member Communication & Advisory',
      category: 'Communication',
      description: 'Grievance redressing, SHG meeting facilitation, local dialect rural communication.',
      icon: 'MessageSquare',
      weight_factor: 0.90
    },
    {
      id: 'skill-006',
      code: 'SKILL_DAIRY',
      name: 'Dairy Quality & Milk Procurement Testing',
      category: 'Operational',
      description: 'FAT & SNF testing, chilling center dispatch protocols, automated milk collection systems.',
      icon: 'Milk',
      weight_factor: 1.05
    }
  ],

  job_roles: [
    {
      id: 'job-role-001',
      title: 'PACS Accountant',
      sector: 'Primary Agricultural Credit Societies',
      description: 'Manages daily ledger, loan disbursements, KCC records, member deposits, and statutory audit preparation.',
      base_salary_range: '₹18,000 - ₹26,000 / month',
      min_readiness_threshold: 75.0,
      required_skills: [
        { skill_id: 'skill-001', skill_code: 'SKILL_ACC', name: 'Accounting & Ledger Balancing', weight: 0.30, required_level: 85.0 },
        { skill_id: 'skill-002', skill_code: 'SKILL_XLS', name: 'Advanced Excel & Spreadsheets', weight: 0.20, required_level: 80.0 },
        { skill_id: 'skill-003', skill_code: 'SKILL_GST', name: 'GST & Cooperative Taxation', weight: 0.20, required_level: 75.0 },
        { skill_id: 'skill-004', skill_code: 'SKILL_MIS', name: 'Cooperative MIS & ERP Operations', weight: 0.15, required_level: 75.0 },
        { skill_id: 'skill-005', skill_code: 'SKILL_COM', name: 'Member Communication & Advisory', weight: 0.15, required_level: 70.0 }
      ]
    },
    {
      id: 'job-role-002',
      title: 'Cooperative MIS Assistant',
      sector: 'District Cooperative Central Banks',
      description: 'Operates Core Banking System, data uploading to NABARD portal, loan subsidy tracking, and reporting.',
      base_salary_range: '₹16,000 - ₹22,000 / month',
      min_readiness_threshold: 70.0,
      required_skills: [
        { skill_id: 'skill-004', skill_code: 'SKILL_MIS', name: 'Cooperative MIS & ERP Operations', weight: 0.35, required_level: 85.0 },
        { skill_id: 'skill-002', skill_code: 'SKILL_XLS', name: 'Advanced Excel & Spreadsheets', weight: 0.30, required_level: 80.0 },
        { skill_id: 'skill-001', skill_code: 'SKILL_ACC', name: 'Accounting & Ledger Balancing', weight: 0.20, required_level: 70.0 },
        { skill_id: 'skill-005', skill_code: 'SKILL_COM', name: 'Member Communication & Advisory', weight: 0.15, required_level: 65.0 }
      ]
    },
    {
      id: 'job-role-003',
      title: 'Dairy Cooperative Field Executive',
      sector: 'Dairy Producer Cooperatives',
      description: 'Supervises Village Milk Collection Centers, automated FAT/SNF testing units, and member payment records.',
      base_salary_range: '₹15,000 - ₹24,000 / month',
      min_readiness_threshold: 72.0,
      required_skills: [
        { skill_id: 'skill-006', skill_code: 'SKILL_DAIRY', name: 'Dairy Quality & Milk Procurement Testing', weight: 0.40, required_level: 85.0 },
        { skill_id: 'skill-001', skill_code: 'SKILL_ACC', name: 'Accounting & Ledger Balancing', weight: 0.25, required_level: 75.0 },
        { skill_id: 'skill-005', skill_code: 'SKILL_COM', name: 'Member Communication & Advisory', weight: 0.20, required_level: 80.0 },
        { skill_id: 'skill-002', skill_code: 'SKILL_XLS', name: 'Advanced Excel & Spreadsheets', weight: 0.15, required_level: 65.0 }
      ]
    },
    {
      id: 'job-role-004',
      title: 'Rural Banking Assistant',
      sector: 'Regional Rural Banks & SHG Federations',
      description: 'Customer KYC verification, microfinance loan documentation, SHG group ledger audit.',
      base_salary_range: '₹17,000 - ₹25,000 / month',
      min_readiness_threshold: 70.0,
      required_skills: [
        { skill_id: 'skill-001', skill_code: 'SKILL_ACC', name: 'Accounting & Ledger Balancing', weight: 0.30, required_level: 80.0 },
        { skill_id: 'skill-005', skill_code: 'SKILL_COM', name: 'Member Communication & Advisory', weight: 0.25, required_level: 80.0 },
        { skill_id: 'skill-003', skill_code: 'SKILL_GST', name: 'GST & Cooperative Taxation', weight: 0.25, required_level: 70.0 },
        { skill_id: 'skill-002', skill_code: 'SKILL_XLS', name: 'Advanced Excel & Spreadsheets', weight: 0.20, required_level: 70.0 }
      ]
    }
  ],

  courses: [
    {
      id: 'crs-001',
      code: 'CRS-ACC-101',
      title: 'Cooperative Accounting & Daybook Fundamentals',
      title_hi: 'सहकारी लेखांकन एवं दैनिक रोकड़बही',
      description: 'Master double-entry accounting, member credit journals, and balancing cashbooks under PACS guidelines.',
      category: 'Financial',
      duration_hours: 16,
      difficulty: 'Beginner',
      language: 'English / Hindi',
      offline_downloadable: true,
      thumbnail_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      skills_impacted: ['skill-001', 'skill-004'],
      modules: [
        { id: 'mod-101', title: 'Principles of Cooperative Double-Entry System', duration: '45 mins', completed: true },
        { id: 'mod-102', title: 'Daybook Journalizing & Member Ledgers', duration: '60 mins', completed: true },
        { id: 'mod-103', title: 'Reconciliation of Bank Passbooks & Petty Cash', duration: '50 mins', completed: true },
        { id: 'mod-104', title: 'Preparing Monthly Trial Balance for PACS', duration: '55 mins', completed: true }
      ]
    },
    {
      id: 'crs-002',
      code: 'CRS-GST-201',
      title: 'GST Basics & Rural Cooperative Taxation',
      title_hi: 'जीएसटी मूल बातें एवं सहकारी कराधान',
      description: 'Step-by-step practical training on GST rates, electronic cash ledger, and cooperative invoice preparation.',
      category: 'Regulatory',
      duration_hours: 12,
      difficulty: 'Intermediate',
      language: 'English / Hindi',
      offline_downloadable: true,
      thumbnail_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
      skills_impacted: ['skill-003'],
      modules: [
        { id: 'mod-201', title: 'GST Classification for Fertilizer, Seeds & Member Supplies', duration: '40 mins', completed: false },
        { id: 'mod-202', title: 'Generating GST Invoices & E-Way Bills for Mandi Goods', duration: '50 mins', completed: false },
        { id: 'mod-203', title: 'GSTR-3B Filing Workflow & Input Tax Credit Rules', duration: '60 mins', completed: false }
      ]
    },
    {
      id: 'crs-003',
      code: 'CRS-XLS-301',
      title: 'Advanced Excel for Rural Financial Audits',
      title_hi: 'उन्नत एक्सेल एवं डेटा विश्लेषण',
      description: 'Formulae, Pivot Tables, conditional formatting, and audit trial tools tailored for cooperative ledger spreadsheets.',
      category: 'Digital',
      duration_hours: 14,
      difficulty: 'Intermediate',
      language: 'English / Hindi',
      offline_downloadable: true,
      thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      skills_impacted: ['skill-002'],
      modules: [
        { id: 'mod-301', title: 'Dynamic VLOOKUP & XLOOKUP on Member Credit Ledgers', duration: '45 mins', completed: false },
        { id: 'mod-302', title: 'Audit Pivot Tables & Loan Recovery Dashboard Creation', duration: '55 mins', completed: false },
        { id: 'mod-303', title: 'Data Validation Rules & Duplicate Transaction Filters', duration: '50 mins', completed: false }
      ]
    },
    {
      id: 'crs-004',
      code: 'CRS-MIS-102',
      title: 'PACS Computerization & National Portal Data Entry',
      title_hi: 'पैक्स कम्प्यूटरीकरण एवं राष्ट्रीय पोर्टल डेटा प्रविष्टि',
      description: 'Operate the standardized PACS Enterprise Software, loan account opening, and state federation reporting.',
      category: 'Operational',
      duration_hours: 10,
      difficulty: 'Beginner',
      language: 'English / Hindi',
      offline_downloadable: true,
      thumbnail_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
      skills_impacted: ['skill-004'],
      modules: [
        { id: 'mod-401', title: 'PACS Core Software Navigation & Member KYC Ingestion', duration: '35 mins', completed: true },
        { id: 'mod-402', title: 'Disbursement Entries & Subvention Claims', duration: '45 mins', completed: false }
      ]
    },
    {
      id: 'crs-005',
      code: 'CRS-DRY-202',
      title: 'Modern Dairy Procurement & AMCS Operations',
      title_hi: 'आधुनिक दुग्ध संकलन एवं एएमसीएस संचालन',
      description: 'Quality testing, automatic fat-snf analyzers, farmer passbook generation, and cold supply chain protocols.',
      category: 'Operational',
      duration_hours: 15,
      difficulty: 'Beginner',
      language: 'English / Hindi',
      offline_downloadable: true,
      thumbnail_url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=600&auto=format&fit=crop&q=80',
      skills_impacted: ['skill-006'],
      modules: [
        { id: 'mod-501', title: 'AMCS Hardware Setup & Ultrasonic Milk Tester Calibration', duration: '40 mins', completed: true },
        { id: 'mod-502', title: 'Fat & SNF Ratio Pricing Tables & Print Passbooks', duration: '45 mins', completed: true },
        { id: 'mod-503', title: 'BMC (Bulk Milk Cooler) Temperature Logging', duration: '30 mins', completed: true }
      ]
    }
  ],

  // Ramesh's Course Progress
  course_progress: [
    {
      id: 'cp-001',
      trainee_id: 'trainee-001',
      course_id: 'crs-001', // Accounting
      progress_percentage: 100,
      status: 'completed',
      last_accessed_at: new Date('2026-09-28T14:30:00Z').toISOString(),
      offline_synced: true
    },
    {
      id: 'cp-002',
      trainee_id: 'trainee-001',
      course_id: 'crs-004', // MIS
      progress_percentage: 50,
      status: 'in_progress',
      last_accessed_at: new Date('2026-09-29T09:15:00Z').toISOString(),
      offline_synced: true
    },
    {
      id: 'cp-003',
      trainee_id: 'trainee-001',
      course_id: 'crs-002', // GST
      progress_percentage: 10,
      status: 'in_progress',
      last_accessed_at: new Date('2026-09-27T11:00:00Z').toISOString(),
      offline_synced: true
    },
    {
      id: 'cp-004',
      trainee_id: 'trainee-001',
      course_id: 'crs-003', // Advanced Excel
      progress_percentage: 0,
      status: 'not_started',
      last_accessed_at: new Date('2026-09-20T10:00:00Z').toISOString(),
      offline_synced: true
    }
  ],

  // Ramesh's Verified Skill Graph Nodes
  trainee_skills: [
    {
      id: 'ts-001',
      trainee_id: 'trainee-001',
      skill_id: 'skill-001', // Accounting
      current_level: 88.0,
      evidence_confidence: 94.0,
      status: 'verified', // Verified via Course + Quiz + Practical + Certificate
      last_assessed_at: new Date('2026-09-28T16:00:00Z').toISOString()
    },
    {
      id: 'ts-002',
      trainee_id: 'trainee-001',
      skill_id: 'skill-002', // Excel
      current_level: 52.0,
      evidence_confidence: 60.0,
      status: 'developing',
      last_assessed_at: new Date('2026-09-25T11:20:00Z').toISOString()
    },
    {
      id: 'ts-003',
      trainee_id: 'trainee-001',
      skill_id: 'skill-003', // GST
      current_level: 30.0,
      evidence_confidence: 40.0,
      status: 'gap', // Major Gap for PACS Accountant
      last_assessed_at: new Date('2026-09-20T08:00:00Z').toISOString()
    },
    {
      id: 'ts-004',
      trainee_id: 'trainee-001',
      skill_id: 'skill-004', // MIS
      current_level: 68.0,
      evidence_confidence: 72.0,
      status: 'developing',
      last_assessed_at: new Date('2026-09-27T15:30:00Z').toISOString()
    },
    {
      id: 'ts-005',
      trainee_id: 'trainee-001',
      skill_id: 'skill-005', // Communication
      current_level: 75.0,
      evidence_confidence: 80.0,
      status: 'verified',
      last_assessed_at: new Date('2026-09-22T10:00:00Z').toISOString()
    }
  ],

  // Skill Evidence Timeline for Ramesh Kumar
  skill_evidence: [
    {
      id: 'ev-001',
      trainee_id: 'trainee-001',
      skill_id: 'skill-001',
      evidence_type: 'course',
      title: 'Course Completed: Cooperative Accounting & Daybook Fundamentals',
      score: 100.0,
      evidence_data: { duration_hours: 16, completion_date: '2026-09-26' },
      verified_at: new Date('2026-09-26T17:00:00Z').toISOString(),
      verifier_type: 'system_engine'
    },
    {
      id: 'ev-002',
      trainee_id: 'trainee-001',
      skill_id: 'skill-001',
      evidence_type: 'quiz',
      title: 'Double-Entry Reconciliation Theory Quiz',
      score: 86.0,
      evidence_data: { total_questions: 15, correct_answers: 13, time_taken_sec: 420 },
      verified_at: new Date('2026-09-27T11:45:00Z').toISOString(),
      verifier_type: 'automated_grading'
    },
    {
      id: 'ev-003',
      trainee_id: 'trainee-001',
      skill_id: 'skill-001',
      evidence_type: 'practical',
      title: 'Practical Assessment: Cooperative Daybook Audit & Trial Balance',
      score: 91.0,
      evidence_data: { accuracy: 92.5, completeness: 100.0, efficiency: 84.0, dataset_id: 'DS-COOP-09' },
      verified_at: new Date('2026-09-28T14:30:00Z').toISOString(),
      verifier_type: 'practical_scoring_engine'
    },
    {
      id: 'ev-004',
      trainee_id: 'trainee-001',
      skill_id: 'skill-001',
      evidence_type: 'certificate',
      title: 'Certified Cooperative Accounting Specialist (PRV-2026-7F82A1)',
      score: 88.0,
      evidence_data: { cert_id: 'cert-001', verified_by: 'Anand Cooperative Skill Development Institute' },
      verified_at: new Date('2026-09-28T16:00:00Z').toISOString(),
      verifier_type: 'institutional_signature'
    },
    {
      id: 'ev-005',
      trainee_id: 'trainee-001',
      skill_id: 'skill-004',
      evidence_type: 'quiz',
      title: 'PACS Portal Member Ingestion Assessment',
      score: 74.0,
      evidence_data: { total_questions: 10, correct_answers: 8, time_taken_sec: 310 },
      verified_at: new Date('2026-09-27T16:10:00Z').toISOString(),
      verifier_type: 'automated_grading'
    }
  ],

  // Attendance Sessions
  attendance_sessions: [
    {
      id: 'sess-today',
      session_code: 'SESS-ANAND-20260929',
      session_qr_token: 'PRV-QR-ANAND-20260929-SESSION-AUTH-TOKEN-A19F',
      training_center_id: 'center-001',
      topic: 'Cooperative Auditing & Field Transaction Ledger Verification',
      date: '2026-09-29',
      starts_at: new Date('2026-09-29T08:00:00Z').toISOString(),
      expires_at: new Date('2026-09-29T18:00:00Z').toISOString(),
      is_active: true
    }
  ],

  attendance: [
    {
      id: 'att-001',
      session_id: 'sess-today',
      trainee_id: 'trainee-001',
      marked_at: new Date('2026-09-29T09:05:22Z').toISOString(),
      device_id: 'dev-redmi-note-12-ramesh',
      verification_method: 'qr_scan',
      is_offline_event: false,
      sync_event_id: 'evt-sync-att-001',
      is_valid: true
    },
    {
      id: 'att-002',
      session_id: 'sess-today',
      trainee_id: 'trainee-002',
      marked_at: new Date('2026-09-29T09:12:10Z').toISOString(),
      device_id: 'dev-samsung-m32-sunita',
      verification_method: 'qr_scan',
      is_offline_event: false,
      sync_event_id: 'evt-sync-att-002',
      is_valid: true
    }
  ],

  // Practical Assessments
  assessments: [
    {
      id: 'asm-prac-001',
      course_id: 'crs-001',
      title: 'Cooperative Daybook & Cash Reconciliation Task',
      type: 'practical',
      duration_minutes: 15,
      passing_score: 75.0,
      skill_mappings: ['skill-001', 'skill-002'],
      instructions: 'Review the 8 member cash & fertilizer credit transactions below. Identify improper debit/credit entries, calculate the corrected closing cash balance, and compute total credit subsidy disbursement.',
      dataset_json: {
        opening_cash: 45000,
        transactions: [
          { id: 1, date: '2026-09-28', description: 'Member Suresh Bhai KCC Crop Loan Repayment', type: 'Cash Inflow', recorded_amount: 12500, status: 'Verified' },
          { id: 2, date: '2026-09-28', description: 'IFFCO Urea & DAP Fertilizer Stock Purchase', type: 'Cash Outflow', recorded_amount: 18400, status: 'Invoice #8841' },
          { id: 3, date: '2026-09-28', description: 'Member Jignesh Patel Milk Advance Disbursement', type: 'Cash Outflow', recorded_amount: 6000, status: 'Approved Voucher' },
          { id: 4, date: '2026-09-29', description: 'Govt Interest Subvention Subsidy Credit from DCCB', type: 'Bank Credit', recorded_amount: 9800, status: 'RTGS #UBIN912' },
          { id: 5, date: '2026-09-29', description: 'Branch Electricity & Generator Diesel Bill', type: 'Cash Outflow', recorded_amount: 2150, status: 'Receipt #309' },
          { id: 6, date: '2026-09-29', description: 'Member Meenaben SHG Weekly Deposit', type: 'Cash Inflow', recorded_amount: 4500, status: 'Passbook Entry' }
        ],
        expected_results: {
          total_cash_inflow: 17000, // 12500 + 4500
          total_cash_outflow: 26550, // 18400 + 6000 + 2150
          expected_closing_cash: 35450, // 45000 + 17000 - 26550
          total_bank_credit: 9800
        }
      }
    },
    {
      id: 'asm-prac-002',
      course_id: 'crs-002',
      title: 'GST Input Tax Credit & Reverse Charge Settlement',
      type: 'practical',
      duration_minutes: 20,
      passing_score: 75.0,
      skill_mappings: ['skill-003'],
      instructions: 'Calculate the CGST, SGST, and net tax payable on cooperative storage rental vs exempted agricultural produce sales.',
      dataset_json: {
        taxable_services_val: 50000,
        gst_rate_percent: 18,
        input_tax_credit_available: 4500,
        expected_results: {
          cgst_payable: 4500,
          sgst_payable: 4500,
          total_output_tax: 9000,
          net_tax_to_pay_cash: 4500
        }
      }
    }
  ],

  // Jobs Available for Candidates
  jobs: [
    {
      id: 'job-001',
      employer_id: 'emp-002',
      title: 'Junior PACS Accountant & Cashier',
      organization: 'Kashi District Cooperative Credit Union',
      location: 'Varanasi District (Phulpur Branch), UP',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      salary_range: '₹19,500 - ₹25,000 / month',
      openings: 3,
      job_type: 'Full-Time',
      description: 'Looking for a trained PACS accountant capable of managing daily member credit journals, Kisan Credit Card ledgers, and daybook reconciliation.',
      min_readiness: 70.0,
      status: 'open',
      required_skills: [
        { skill_id: 'skill-001', skill_code: 'SKILL_ACC', name: 'Accounting & Ledger Balancing', min_level: 80, weight: 0.35 },
        { skill_id: 'skill-002', skill_code: 'SKILL_XLS', name: 'Advanced Excel & Spreadsheets', min_level: 70, weight: 0.25 },
        { skill_id: 'skill-003', skill_code: 'SKILL_GST', name: 'GST & Cooperative Taxation', min_level: 65, weight: 0.20 },
        { skill_id: 'skill-004', skill_code: 'SKILL_MIS', name: 'Cooperative MIS & ERP Operations', min_level: 60, weight: 0.20 }
      ]
    },
    {
      id: 'job-002',
      employer_id: 'emp-001',
      title: 'Village Milk Collection Center Supervisor',
      organization: 'Amul Dairy Cooperative Federation',
      location: 'Anand District (Borsad Chilling Center), Gujarat',
      district: 'Anand',
      state: 'Gujarat',
      salary_range: '₹18,000 - ₹24,500 / month',
      openings: 5,
      job_type: 'Full-Time',
      description: 'Supervision of 12 village automated milk collection units, fat-testing verification, dairy member payments, and ledger recordkeeping.',
      min_readiness: 72.0,
      status: 'open',
      required_skills: [
        { skill_id: 'skill-006', skill_code: 'SKILL_DAIRY', name: 'Dairy Quality & Milk Procurement Testing', min_level: 80, weight: 0.40 },
        { skill_id: 'skill-001', skill_code: 'SKILL_ACC', name: 'Accounting & Ledger Balancing', min_level: 70, weight: 0.25 },
        { skill_id: 'skill-005', skill_code: 'SKILL_COM', name: 'Member Communication & Advisory', min_level: 75, weight: 0.20 },
        { skill_id: 'skill-002', skill_code: 'SKILL_XLS', name: 'Advanced Excel & Spreadsheets', min_level: 60, weight: 0.15 }
      ]
    },
    {
      id: 'job-003',
      employer_id: 'emp-002',
      title: 'Cooperative MIS & NABARD Data Operator',
      organization: 'Kashi District Cooperative Credit Union',
      location: 'Varanasi Head Office, UP',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      salary_range: '₹17,000 - ₹22,000 / month',
      openings: 2,
      job_type: 'Full-Time',
      description: 'Responsible for daily MIS updates, loan subvention filing, and monthly digital reports to DCCB and NABARD portals.',
      min_readiness: 68.0,
      status: 'open',
      required_skills: [
        { skill_id: 'skill-004', skill_code: 'SKILL_MIS', name: 'Cooperative MIS & ERP Operations', min_level: 80, weight: 0.35 },
        { skill_id: 'skill-002', skill_code: 'SKILL_XLS', name: 'Advanced Excel & Spreadsheets', min_level: 75, weight: 0.30 },
        { skill_id: 'skill-001', skill_code: 'SKILL_ACC', name: 'Accounting & Ledger Balancing', min_level: 65, weight: 0.20 },
        { skill_id: 'skill-005', skill_code: 'SKILL_COM', name: 'Member Communication & Advisory', min_level: 60, weight: 0.15 }
      ]
    }
  ],

  // Certificates
  certificates: [
    {
      id: 'cert-001',
      certificate_number: 'PRV-2026-7F82A1',
      trainee_id: 'trainee-001',
      trainee_name: 'Ramesh Kumar',
      course_id: 'crs-001',
      course_title: 'Cooperative Accounting & Daybook Fundamentals',
      issue_date: '2026-09-28',
      skills_certified: ['Accounting & Ledger Balancing', 'Cooperative MIS Operations'],
      training_center: 'Anand Cooperative Skill Development Institute',
      verified_status: true,
      digital_signature_hash: 'SHA256:7f82a1e944bc30219aa4b7f8092d04323e449a5b4c12',
      qr_verification_url: '/verify/PRV-2026-7F82A1'
    },
    {
      id: 'cert-002',
      certificate_number: 'PRV-2026-8E19B4',
      trainee_id: 'trainee-002',
      trainee_name: 'Sunita Verma',
      course_id: 'crs-005',
      course_title: 'Modern Dairy Procurement & AMCS Operations',
      issue_date: '2026-09-20',
      skills_certified: ['Dairy Quality & Milk Procurement Testing', 'Accounting & Ledger Balancing'],
      training_center: 'Anand Cooperative Skill Development Institute',
      verified_status: true,
      digital_signature_hash: 'SHA256:8e19b4cf00994a317cd5e219ba3390141f5e27a9b833',
      qr_verification_url: '/verify/PRV-2026-8E19B4'
    }
  ],

  // Sync event registry for idempotency & offline conflict resolution
  sync_events: [],

  // Notifications
  notifications: [
    {
      id: 'notif-001',
      user_id: 'usr-trainee-001',
      title: 'Certificate Issued & Digitally Signed',
      message: 'Your credential for Cooperative Accounting (PRV-2026-7F82A1) is now verified and active in your Skill Passport.',
      type: 'success',
      is_read: false,
      created_at: new Date('2026-09-28T16:05:00Z').toISOString()
    },
    {
      id: 'notif-002',
      user_id: 'usr-trainee-001',
      title: 'New Matched Job Opportunity',
      message: 'Kashi District Cooperative Credit Union posted a PACS Accountant role matching 89% of your verified skills.',
      type: 'match',
      is_read: false,
      created_at: new Date('2026-09-29T08:00:00Z').toISOString()
    }
  ]
};
