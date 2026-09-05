import { query } from '../db/index.js';

export const createListing = async (ownerId, data) => {
  const { title, description, category, pricePerDay, pricePerHour } = data;
  const result = await query(
    'INSERT INTO listings (owner_id, title, description, category, price_per_day, price_per_hour) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [ownerId, title, description, category, pricePerDay, pricePerHour]
  );
  return result.rows[0];
};

export const getAllListings = async (searchQuery) => {
  if (searchQuery) {
    const result = await query(
      "SELECT * FROM listings WHERE to_tsvector('english', title || ' ' || description) @@ plainto_tsquery('english', $1)",
      [searchQuery]
    );
    return result.rows;
  }
  const result = await query('SELECT * FROM listings WHERE status = $1', ['ACTIVE']);
  return result.rows;
};
