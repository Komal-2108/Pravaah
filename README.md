# PRAVAAH 🌊
### *From Learning to Livelihood.*

> **PRAVAAH converts training activity into verified skill evidence and connects that evidence to relevant employment opportunities, even when internet connectivity is unreliable.**

---

## 📌 Executive Summary & Core Innovation

PRAVAAH is not merely an LMS or a job board; it is an **Offline-First Skill Intelligence & Verification Ecosystem** specifically engineered for India's cooperative, rural, and agricultural training networks (PACS, Dairy Cooperatives, State Federations).

### The Four Pillars of Innovation:

1. **📴 Offline-First Skill Continuity:**
   - Field trainees can mark attendance, download curriculum packs, complete practical ledger tasks, and record data without an internet connection using **Dexie IndexedDB**.
   - Upon reconnection, an idempotent sync engine verifies and commits transactions to cloud **Supabase PostgreSQL** without duplicate attendance or scoring conflicts.

2. **🕸️ Evidence-Based Skill Graph & Confidence Separation:**
   - Skills are not awarded merely for course completion. We track a verifiable evidence chain:
     $$\text{Course} \rightarrow \text{Quiz} \rightarrow \text{Practical Assessment} \rightarrow \text{Digital Certificate} \rightarrow \text{Verified Skill}$$
   - We explicitly decouple **Demonstrated Skill Level (e.g. 78%)** from **Evidence Confidence (93%)**.

3. **🧠 AI Skill Gap & What-If Career Simulator:**
   - Trainees benchmark against real cooperative job roles (e.g., *PACS Accountant*).
   - The Skill Intelligence Engine calculates weighted gaps:
     $$\text{skill\_gap}_i = \text{required\_level}_i - \text{trainee\_level}_i$$
   - The interactive **What-If Simulator** allows candidates to select potential modules and watch their projected readiness score dynamically increase (e.g., $71\% \xrightarrow{+\text{GST}} 79\% \xrightarrow{+\text{Excel}} 90\%$).

4. **📱 Smartphone as the Edge Device & Cryptographic Verification:**
   - Zero specialized hardware required. Smartphones handle QR attendance, offline caching, and practical ledger assessments.
   - Public certificates (`/verify/:certificateId`) contain SHA-256 digital signature hashes and QR codes for instant institutional verification.

---

## 🏗️ System Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   React + Vite (PWA)                  │
│   Tailwind CSS • Framer Motion • Lucide • Recharts    │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             │                           │
    (Online / Restored)             (Field Offline)
             │                           │
             ▼                           ▼
┌─────────────────────────┐ ┌─────────────────────────┐
│       Express API       │ │    Dexie IndexedDB      │
│  REST • JWT Auth • CORS │ │  Sync Queue • Caching   │
└────────────┬────────────┘ └────────────┬────────────┘
             │                           │ (Atomic Sync)
             ▼                           │
┌─────────────────────────┐              │
│   Supabase PostgreSQL   │◄─────────────┘
│  Tables • Foreign Keys  │
└─────────────────────────┘
```

---

## 🧠 AI / ML Engine Architecture (`/server/src/services/ai/`)

* **`skillGapService.js`**: Computes weighted gap analysis between job benchmarks and trainee verified skill nodes.
* **`learningRecommendationService.js`**: Dynamically maps skill gaps to high-priority courses with contextual rationales.
* **`whatIfSimulatorService.js`**: Calculates projected readiness deltas upon completing selected courses.
* **`jobMatchingService.js`**: Computes semantic role-matching scores for cooperative recruiters.
* **`assessmentService.js`**: Automated grading of practical tasks across **Accuracy (50%)**, **Completeness (30%)**, and **Time Efficiency (20%)**.

---

## 🗄️ Database Schema (`Supabase PostgreSQL`)

* `users` & `trainees` & `employers` & `admins`
* `training_centers`
* `skills` & `job_roles` & `job_role_skills`
* `courses` & `course_modules` & `course_progress`
* `attendance_sessions` & `attendance`
* `assessments` & `assessment_attempts`
* `trainee_skills` (Skill Graph Nodes)
* `skill_evidence` (Verification Timeline)
* `jobs` & `job_matches`
* `certificates` & `certificate_verifications`
* `sync_events` (Offline Idempotency Ledger)

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
# Server will run on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
# Client will run on http://localhost:5173
```

---

## 🏆 Smart India Hackathon (SIH) 3-Minute Judge Demo Flow

Click the **"Start Judge Demo"** button on the top banner or landing page to follow this guided workflow:

1. **Login as Ramesh Kumar** (Trainee aiming for PACS Accountant).
2. **Scan Session Attendance QR** at Anand Training Center.
3. **Simulate Internet Drop** (Click "Simulate Internet Drop" on top status bar).
4. **Complete Practical Assessment Offline** (Daybook balancing task saved to Dexie).
5. **Restore Connectivity** (Watch the ↻ Syncing animation commit changes to cloud).
6. **Inspect the Skill Graph** (Accounting turns green/verified with 94% confidence).
7. **Run AI Skill Gap Simulator** (Target: PACS Accountant; GST identified as #1 gap).
8. **Test What-If Simulator** (Select GST and Advanced Excel to watch score reach 90%).
9. **Switch to Employer View** (Filter candidates by Evidence Confidence >85% to find Ramesh).
10. **Public Certificate Verification** (Open `/verify/PRV-2026-7F82A1` to verify cryptographic authenticity).

---

## 🌐 Production Deployment Guide

### Frontend (Vercel / Netlify)
1. Set Root Directory to `client`
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Set Environment Variable: `VITE_API_URL=https://your-backend-domain.com/api`

### Backend (Render / Railway)
1. Set Root Directory to `server`
2. Build Command: `npm install`
3. Start Command: `node src/server.js`
4. Configure Environment Variables (`PORT`, `JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`).

### Database (Supabase)
1. Create a new Supabase Project.
2. Run `server/database/schema.sql` in the Supabase SQL Editor.
3. Run `server/database/seed.sql` to populate initial demo data.

---

## 📜 License & Acknowledgments
Built for Smart India Hackathon 2026. Empowering rural training institutions, Primary Agricultural Credit Societies (PACS), and dairy cooperatives across India.
