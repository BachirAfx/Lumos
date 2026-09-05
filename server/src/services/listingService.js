import cloudinary from '../config/cloudinary.js';
import pool from '../db/index.js';

export const createListingWithImages = async (ownerId, listingData, files) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Insert the Listing
    const listingRes = await client.query(
      'INSERT INTO listings (owner_id, title, description, category, price_per_day, price_per_hour) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [ownerId, listingData.title, listingData.description, listingData.category, listingData.pricePerDay, listingData.pricePerHour]
    );
    const listingId = listingRes.rows[0].listing_id;

    // 2. Upload Images to Cloudinary and link to listing
    if (files && files.length > 0) {
        for (const file of files) {
          // Convert buffer to dataURI for Cloudinary
          const b64 = Buffer.from(file.buffer).toString("base64");
          const dataURI = "data:" + file.mimetype + ";base64," + b64;

          const uploadRes = await cloudinary.uploader.upload(dataURI, { folder: "rovo_listings" });

          await client.query(
            'INSERT INTO listing_images (listing_id, cloudinary_public_id) VALUES ($1, $2)',
            [listingId, uploadRes.public_id]
          );
        }
    }

    await client.query('COMMIT');
    return listingRes.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
