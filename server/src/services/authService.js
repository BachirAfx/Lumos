import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../db/index.js';

const SALT_ROUNDS = 10;

export const registerUser = async (fullName, email, password) => {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await query(
    'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, full_name, email',
    [fullName, email, passwordHash]
  );

  return result.rows[0];
};

export const loginUser = async (email, password) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user.user_id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, user: { user_id: user.user_id, full_name: user.full_name, email: user.email } };
};
