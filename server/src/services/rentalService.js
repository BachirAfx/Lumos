import pool from '../db/index.js';

export const createRentalRequest = async (borrowerId, data) => {
  const { listingId, startDate, endDate, message } = data;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Conflict Detection
    const conflictCheck = await client.query(
      `SELECT 1 FROM rental_requests
       WHERE listing_id = $1
         AND status IN ('PENDING', 'APPROVED')
         AND start_date < $3 AND end_date > $2`,
      [listingId, startDate, endDate]
    );

    if (conflictCheck.rows.length > 0) {
      throw new Error('Listing is already booked for this period.');
    }

    // 2. Insert Request
    const result = await client.query(
      'INSERT INTO rental_requests (listing_id, borrower_id, start_date, end_date, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [listingId, borrowerId, startDate, endDate, message]
    );

    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const approveRentalRequest = async (requestId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Update request
    await client.query("UPDATE rental_requests SET status = 'APPROVED' WHERE request_id = $1", [requestId]);

    // Create actual rental record
    const rental = await client.query(
        'INSERT INTO rentals (request_id, status) VALUES ($1, $2) RETURNING *',
        [requestId, 'ACTIVE']
    );

    await client.query('COMMIT');
    return rental.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
