import * as authService from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await authService.registerUser(fullName, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
