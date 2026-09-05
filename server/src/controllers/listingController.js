import * as listingService from '../services/listingService.js';

export const create = async (req, res) => {
  try {
    // req.user.userId comes from verifyToken middleware
    // req.files comes from multer upload middleware
    const listing = await listingService.createListingWithImages(req.user.userId, req.body, req.files);
    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const list = async (req, res) => {
  try {
    const listings = await listingService.getAllListings(req.query.search);
    res.status(200).json(listings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
