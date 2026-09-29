-- =========================================================
-- PRAVAAH - Seed Data for Supabase PostgreSQL
-- Realistic Cooperative & Rural Ecosystem Dataset
-- =========================================================

-- 1. Insert Training Centers
INSERT INTO training_centers (id, name, code, district, state, coordinator_name, contact_phone)
VALUES 
('11111111-1111-1111-1111-111111111101', 'Anand Cooperative Skill Development Institute', 'TC-GUJ-01', 'Anand', 'Gujarat', 'Dr. Arvind Patel', '+91 98250 12345'),
('11111111-1111-1111-1111-111111111102', 'Varanasi Rural Banking & PACS Training Academy', 'TC-UP-02', 'Varanasi', 'Uttar Pradesh', 'Smt. Manju Tripathi', '+91 94150 67890'),
('11111111-1111-1111-1111-111111111103', 'Ranchi Tribal Cooperative Training Center', 'TC-JHK-03', 'Ranchi', 'Jharkhand', 'Shri Birsa Munda', '+91 98350 45678')
ON CONFLICT (code) DO NOTHING;

-- 2. Insert Skills
INSERT INTO skills (id, code, name, category, description, icon, weight_factor)
VALUES 
('22222222-2222-2222-2222-222222222201', 'SKILL_ACC', 'Accounting & Ledger Balancing', 'Financial', 'Double entry bookkeeping, daybook reconciliation, cooperative cashbook maintenance.', 'BookOpen', 1.20),
('22222222-2222-2222-2222-222222222202', 'SKILL_XLS', 'Advanced Excel & Spreadsheets', 'Digital', 'VLOOKUP, Pivot tables, data validation, cooperative member transaction auditing.', 'FileSpreadsheet', 1.10),
('22222222-2222-2222-2222-222222222203', 'SKILL_GST', 'GST & Cooperative Taxation', 'Regulatory', 'GST calculation on cooperative goods, portal filing, input tax credit reconciliation.', 'Percent', 1.25),
('22222222-2222-2222-2222-222222222204', 'SKILL_MIS', 'Cooperative MIS & ERP Operations', 'Operational', 'Cooperative ERP data entry, member credit limits, subsidy disbursement tracking.', 'Layers', 1.15),
('22222222-2222-2222-2222-222222222205', 'SKILL_COM', 'Member Communication & Advisory', 'Communication', 'Grievance redressing, SHG meeting facilitation, local dialect rural communication.', 'MessageSquare', 0.90),
('22222222-2222-2222-2222-222222222206', 'SKILL_DAIRY', 'Dairy Quality & Milk Procurement Testing', 'Operational', 'FAT & SNF testing, chilling center dispatch protocols, automated milk collection systems.', 'Milk', 1.05)
ON CONFLICT (code) DO NOTHING;

-- 3. Insert Job Roles
INSERT INTO job_roles (id, title, sector, description, base_salary_range, min_readiness_threshold)
VALUES 
('33333333-3333-3333-3333-333333333301', 'PACS Accountant', 'Primary Agricultural Credit Societies', 'Manages daily ledger, loan disbursements, KCC records, member deposits, and statutory audit preparation.', '₹18,000 - ₹26,000 / month', 75.00),
('33333333-3333-3333-3333-333333333302', 'Cooperative MIS Assistant', 'District Cooperative Central Banks', 'Operates Core Banking System, data uploading to NABARD portal, loan subsidy tracking, and reporting.', '₹16,000 - ₹22,000 / month', 70.00),
('33333333-3333-3333-3333-333333333303', 'Dairy Cooperative Field Executive', 'Dairy Producer Cooperatives', 'Supervises Village Milk Collection Centers, automated FAT/SNF testing units, and member payment records.', '₹15,000 - ₹24,000 / month', 72.00),
('33333333-3333-3333-3333-333333333304', 'Rural Banking Assistant', 'Regional Rural Banks & SHG Federations', 'Customer KYC verification, microfinance loan documentation, SHG group ledger audit.', '₹17,000 - ₹25,000 / month', 70.00)
ON CONFLICT DO NOTHING;

-- 4. Insert Job Role Skills Mapping (Weights & Required Levels)
-- For PACS Accountant:
INSERT INTO job_role_skills (job_role_id, skill_id, weight_percentage, required_level) VALUES
('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222201', 30.00, 85.00), -- Accounting (30%)
('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222202', 20.00, 80.00), -- Excel (20%)
('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222203', 20.00, 75.00), -- GST (20%)
('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222204', 15.00, 75.00), -- MIS (15%)
('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222205', 15.00, 70.00)  -- Communication (15%)
ON CONFLICT DO NOTHING;

-- 5. Insert Courses
INSERT INTO courses (id, code, title, title_hi, description, category, duration_hours, difficulty, language, offline_downloadable, thumbnail_url)
VALUES 
('44444444-4444-4444-4444-444444444401', 'CRS-ACC-101', 'Cooperative Accounting & Daybook Fundamentals', 'सहकारी लेखांकन एवं दैनिक रोकड़बही', 'Master double-entry accounting, member credit journals, and balancing cashbooks under PACS guidelines.', 'Financial', 16, 'Beginner', 'English / Hindi', TRUE, 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80'),
('44444444-4444-4444-4444-444444444402', 'CRS-GST-201', 'GST Basics & Rural Cooperative Taxation', 'जीएसटी मूल बातें एवं सहकारी कराधान', 'Step-by-step practical training on GST rates, electronic cash ledger, and cooperative invoice preparation.', 'Regulatory', 12, 'Intermediate', 'English / Hindi', TRUE, 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'),
('44444444-4444-4444-4444-444444444403', 'CRS-XLS-301', 'Advanced Excel for Rural Financial Audits', 'उन्नत एक्सेल एवं डेटा विश्लेषण', 'Formulae, Pivot Tables, conditional formatting, and audit trial tools tailored for cooperative ledger spreadsheets.', 'Digital', 14, 'Intermediate', 'English / Hindi', TRUE, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'),
('44444444-4444-4444-4444-444444444404', 'CRS-MIS-102', 'PACS Computerization & National Portal Data Entry', 'पैक्स कम्प्यूटरीकरण एवं राष्ट्रीय पोर्टल डेटा प्रविष्टि', 'Operate the standardized PACS Enterprise Software, loan account opening, and state federation reporting.', 'Operational', 10, 'Beginner', 'English / Hindi', TRUE, 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80'),
('44444444-4444-4444-4444-444444444405', 'CRS-DRY-202', 'Modern Dairy Procurement & AMCS Operations', 'आधुनिक दुग्ध संकलन एवं एएमसीएस संचालन', 'Quality testing, automatic fat-snf analyzers, farmer passbook generation, and cold supply chain protocols.', 'Operational', 15, 'Beginner', 'English / Hindi', TRUE, 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=600&auto=format&fit=crop&q=80')
ON CONFLICT (code) DO NOTHING;
