import { query } from '../db/index.js';

export const createReview = async (reviewerId, data) => {
  const { rentalId, revieweeId, rating, comment } = data;
  const result = await query(
    'INSERT INTO reviews (rental_id, reviewer_id, revieweeId, rating, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [rentalId, reviewerId, revieweeId, rating, comment]
  );
  return result.rows[0];
};
