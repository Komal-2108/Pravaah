import Dexie from 'dexie';

export class PravaahOfflineDB extends Dexie {
  constructor() {
    super('PravaahOfflineDB');
    
    this.version(1).stores({
      offline_courses: 'id, code, category, downloaded_at',
      offline_progress: '++id, trainee_id, course_id, progress_percentage, status, updated_at',
      offline_attendance: '++id, session_id, trainee_id, qr_token, marked_at, sync_status',
      offline_assessments: '++id, assessment_id, trainee_id, total_score, submitted_at, sync_status',
      sync_queue: 'event_id, user_id, event_type, created_at, sync_status'
    });
  }
}

export const localDb = new PravaahOfflineDB();
