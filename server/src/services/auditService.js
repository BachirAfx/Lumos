import { query } from '../db/index.js';

export const logAction = async (actorId, action, targetId, metadata) => {
  await query(
    'INSERT INTO audit_logs (actor_id, action, target_id, metadata) VALUES ($1, $2, $3, $4)',
    [actorId, action, targetId, metadata]
  );
};
