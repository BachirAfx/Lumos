import * as rentalService from '../services/rentalService.js';

export const createRequest = async (req, res) => {
  try {
    const request = await rentalService.createRentalRequest(req.user.userId, req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const approve = async (req, res) => {
    try {
      const rental = await rentalService.approveRentalRequest(req.params.requestId);
      res.status(200).json(rental);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
