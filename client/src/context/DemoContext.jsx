import React, { createContext, useContext, useState } from 'react';

const DemoContext = createContext(null);

export const DEMO_STEPS = [
  {
    step: 1,
    title: 'Trainee Ramesh Logs In',
    role: 'trainee',
    path: '/trainee/dashboard',
    instruction: 'Ramesh Kumar opens PRAVAAH on his smartphone. He sees his 71% readiness towards becoming a PACS Accountant.'
  },
  {
    step: 2,
    title: 'Mark QR Attendance (Online)',
    role: 'trainee',
    path: '/trainee/dashboard',
    instruction: 'Scans the training center QR code for today’s session on "Cooperative Auditing".'
  },
  {
    step: 3,
    title: 'Simulate Connectivity Loss (Field Offline)',
    role: 'trainee',
    path: '/trainee/learning',
    instruction: 'Village internet drops. Top indicator switches to ● Offline. Ramesh accesses cached learning modules stored in Dexie IndexedDB.'
  },
  {
    step: 4,
    title: 'Offline Practical Assessment',
    role: 'trainee',
    path: '/trainee/assessment',
    instruction: 'Ramesh completes a live cooperative ledger balancing task offline. Data is saved locally in the sync queue.'
  },
  {
    step: 5,
    title: 'Internet Restored & Atomic Sync',
    role: 'trainee',
    path: '/trainee/sync',
    instruction: 'Connectivity resumes. ↻ Syncing animation starts. Idempotency guarantees no duplicate attendance or scoring errors.'
  },
  {
    step: 6,
    title: 'Evidence-Based Skill Graph Update',
    role: 'trainee',
    path: '/trainee/passport',
    instruction: 'Inspect the interactive Skill Graph. Notice how Accounting turns GREEN (Verified) with 94% Evidence Confidence.'
  },
  {
    step: 7,
    title: 'AI Skill Gap Simulator & Target Role',
    role: 'trainee',
    path: '/trainee/passport',
    instruction: 'Ramesh selects "PACS Accountant". The AI engine pinpoints GST (20% role weight) as the #1 critical gap.'
  },
  {
    step: 8,
    title: 'What-If Career Readiness Simulator',
    role: 'trainee',
    path: '/trainee/passport',
    instruction: 'Toggle "+ GST Course (+8%)" and "+ Advanced Excel (+11%)" to dynamically see projected readiness jump to 90%!'
  },
  {
    step: 9,
    title: 'Verified Job Match & Employer Discovery',
    role: 'employer',
    path: '/employer/dashboard',
    instruction: 'Switch to Amul / Kashi PACS Employer view. Filter candidates by Evidence Confidence (>85%) to discover Ramesh.'
  },
  {
    step: 10,
    title: 'Public Digital Certificate Verification',
    role: 'public',
    path: '/verify/PRV-2026-7F82A1',
    instruction: 'Scan/open the public verification QR link PRV-2026-7F82A1 to see cryptographically signed skill proof.'
  }
];

export const DemoProvider = ({ children }) => {
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startDemo = () => {
    setIsDemoActive(true);
    setCurrentStepIndex(0);
  };

  const nextStep = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsDemoActive(false);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const jumpToStep = (index) => {
    if (index >= 0 && index < DEMO_STEPS.length) {
      setCurrentStepIndex(index);
      setIsDemoActive(true);
    }
  };

  const exitDemo = () => {
    setIsDemoActive(false);
  };

  return (
    <DemoContext.Provider
      value={{
        isDemoActive,
        currentStep: DEMO_STEPS[currentStepIndex],
        currentStepIndex,
        totalSteps: DEMO_STEPS.length,
        steps: DEMO_STEPS,
        startDemo,
        nextStep,
        prevStep,
        jumpToStep,
        exitDemo
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => useContext(DemoContext);
