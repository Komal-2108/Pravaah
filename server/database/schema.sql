-- =========================================================
-- PRAVAAH - Database Schema for Supabase PostgreSQL
-- Offline-First Skill Intelligence & Verification Platform
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('trainee', 'admin', 'employer')),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Training Centers
CREATE TABLE IF NOT EXISTS training_centers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    coordinator_name VARCHAR(255),
    contact_phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Trainees Table
CREATE TABLE IF NOT EXISTS trainees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    training_center_id UUID REFERENCES training_centers(id) ON DELETE SET NULL,
    village_block VARCHAR(150),
    district VARCHAR(100),
    state VARCHAR(100),
    target_role_id UUID,
    employment_readiness NUMERIC(5,2) DEFAULT 0.00,
    evidence_confidence NUMERIC(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Employers Table
CREATE TABLE IF NOT EXISTS employers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    organization_type VARCHAR(100) NOT NULL, -- Cooperative, Banking, Dairy, Agri-Enterprise
    district VARCHAR(100),
    state VARCHAR(100),
    verified BOOLEAN DEFAULT TRUE,
    contact_person VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    designation VARCHAR(150) NOT NULL,
    center_id UUID REFERENCES training_centers(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Financial, Digital, Regulatory, Operational, Communication
    description TEXT,
    icon VARCHAR(100),
    weight_factor NUMERIC(3,2) DEFAULT 1.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Job Roles Table
CREATE TABLE IF NOT EXISTS job_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    description TEXT,
    base_salary_range VARCHAR(100),
    min_readiness_threshold NUMERIC(5,2) DEFAULT 70.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Job Role Skills Mapping
CREATE TABLE IF NOT EXISTS job_role_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_role_id UUID REFERENCES job_roles(id) ON DELETE CASCADE NOT NULL,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE NOT NULL,
    weight_percentage NUMERIC(5,2) NOT NULL, -- e.g. 30% for Accounting, 20% for Excel
    required_level NUMERIC(5,2) NOT NULL, -- e.g. 80.00
    UNIQUE (job_role_id, skill_id)
);

-- 9. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    title_hi VARCHAR(255),
    description TEXT,
    category VARCHAR(100) NOT NULL,
    duration_hours INT DEFAULT 10,
    difficulty VARCHAR(50) DEFAULT 'Beginner', -- Beginner, Intermediate, Advanced
    language VARCHAR(50) DEFAULT 'English / Hindi',
    offline_downloadable BOOLEAN DEFAULT TRUE,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Course Modules
CREATE TABLE IF NOT EXISTS course_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    sequence_order INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    duration_minutes INT DEFAULT 30,
    content_markdown TEXT,
    skills_covered JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Course Progress
CREATE TABLE IF NOT EXISTS course_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainee_id UUID REFERENCES trainees(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    progress_percentage NUMERIC(5,2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'in_progress', -- not_started, in_progress, completed
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    offline_synced BOOLEAN DEFAULT TRUE,
    UNIQUE (trainee_id, course_id)
);

-- 12. Attendance Sessions (QR Generator)
CREATE TABLE IF NOT EXISTS attendance_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_code VARCHAR(100) UNIQUE NOT NULL,
    session_qr_token VARCHAR(255) NOT NULL,
    training_center_id UUID REFERENCES training_centers(id) ON DELETE CASCADE NOT NULL,
    topic VARCHAR(255) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    starts_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Attendance Records
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES attendance_sessions(id) ON DELETE SET NULL,
    trainee_id UUID REFERENCES trainees(id) ON DELETE CASCADE NOT NULL,
    marked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    device_id VARCHAR(100),
    verification_method VARCHAR(50) DEFAULT 'qr_scan', -- qr_scan, biometric, offline_sync
    is_offline_event BOOLEAN DEFAULT FALSE,
    sync_event_id VARCHAR(100),
    is_valid BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (session_id, trainee_id)
);

-- 14. Assessments Table
CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('mcq', 'practical')),
    dataset_json JSONB DEFAULT '{}'::jsonb,
    instructions TEXT,
    duration_minutes INT DEFAULT 20,
    passing_score NUMERIC(5,2) DEFAULT 70.00,
    skill_mappings JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. Assessment Attempts
CREATE TABLE IF NOT EXISTS assessment_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE NOT NULL,
    trainee_id UUID REFERENCES trainees(id) ON DELETE CASCADE NOT NULL,
    answers_json JSONB DEFAULT '{}'::jsonb,
    accuracy_score NUMERIC(5,2) DEFAULT 0.00,
    completion_score NUMERIC(5,2) DEFAULT 0.00,
    efficiency_score NUMERIC(5,2) DEFAULT 0.00,
    total_score NUMERIC(5,2) DEFAULT 0.00,
    passed BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    offline_synced BOOLEAN DEFAULT TRUE
);

-- 16. Trainee Skills (Current Skill Graph Nodes)
CREATE TABLE IF NOT EXISTS trainee_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainee_id UUID REFERENCES trainees(id) ON DELETE CASCADE NOT NULL,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE NOT NULL,
    current_level NUMERIC(5,2) DEFAULT 0.00, -- 0 to 100
    evidence_confidence NUMERIC(5,2) DEFAULT 0.00, -- 0 to 100
    status VARCHAR(50) DEFAULT 'developing', -- verified, developing, gap, recommended
    last_assessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (trainee_id, skill_id)
);

-- 17. Skill Evidence (Timeline Item)
CREATE TABLE IF NOT EXISTS skill_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainee_skill_id UUID REFERENCES trainee_skills(id) ON DELETE CASCADE,
    trainee_id UUID REFERENCES trainees(id) ON DELETE CASCADE NOT NULL,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE NOT NULL,
    evidence_type VARCHAR(50) NOT NULL CHECK (evidence_type IN ('course', 'quiz', 'practical', 'certificate')),
    title VARCHAR(255) NOT NULL,
    score NUMERIC(5,2),
    evidence_data_json JSONB DEFAULT '{}'::jsonb,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    verifier_type VARCHAR(50) DEFAULT 'system_engine'
);

-- 18. Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID REFERENCES employers(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    district VARCHAR(100),
    state VARCHAR(100),
    salary_range VARCHAR(100),
    openings INT DEFAULT 1,
    job_type VARCHAR(50) DEFAULT 'Full-Time', -- Full-Time, Contract, Apprenticeship
    description TEXT,
    required_skills_json JSONB DEFAULT '[]'::jsonb,
    min_readiness NUMERIC(5,2) DEFAULT 70.00,
    status VARCHAR(50) DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 19. Job Matches
CREATE TABLE IF NOT EXISTS job_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
    trainee_id UUID REFERENCES trainees(id) ON DELETE CASCADE NOT NULL,
    match_percentage NUMERIC(5,2) DEFAULT 0.00,
    verified_skills_count INT DEFAULT 0,
    required_skills_count INT DEFAULT 0,
    main_gap_skill_id UUID REFERENCES skills(id) ON DELETE SET NULL,
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (job_id, trainee_id)
);

-- 20. Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_number VARCHAR(100) UNIQUE NOT NULL, -- e.g. PRV-2026-7F82A1
    trainee_id UUID REFERENCES trainees(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE,
    skills_certified_json JSONB DEFAULT '[]'::jsonb,
    verification_qr_url TEXT,
    verified_status BOOLEAN DEFAULT TRUE,
    digital_signature_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 21. Certificate Verifications Log
CREATE TABLE IF NOT EXISTS certificate_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_id UUID REFERENCES certificates(id) ON DELETE CASCADE NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(100),
    user_agent TEXT
);

-- 22. Sync Events (Offline Idempotency and Conflict Resolution)
CREATE TABLE IF NOT EXISTS sync_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id VARCHAR(150) UNIQUE NOT NULL, -- Client-generated UUID for idempotency
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    device_id VARCHAR(100) NOT NULL,
    event_type VARCHAR(100) NOT NULL, -- 'attendance_mark', 'assessment_submit', 'course_progress'
    payload JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'processed', -- processed, failed, duplicate_skipped
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    retry_count INT DEFAULT 0
);

-- 23. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info', -- info, success, warning, match
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 24. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id VARCHAR(100),
    metadata JSONB DEFAULT '{}'::jsonb,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning-fast lookups
CREATE INDEX IF NOT EXISTS idx_trainee_skills_trainee ON trainee_skills(trainee_id);
CREATE INDEX IF NOT EXISTS idx_skill_evidence_trainee ON skill_evidence(trainee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_session ON attendance(session_id);
CREATE INDEX IF NOT EXISTS idx_sync_events_event_id ON sync_events(event_id);
CREATE INDEX IF NOT EXISTS idx_certificates_number ON certificates(certificate_number);
