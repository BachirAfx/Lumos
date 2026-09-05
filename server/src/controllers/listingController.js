import * as listingService from '../services/listingService.js';

export const create = async (req, res) => {
  try {
    const listing = await listingService.createListing(req.user.userId, req.body);
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
