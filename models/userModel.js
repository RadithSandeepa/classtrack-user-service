import pool from '../db.js';

export const getAllUsers = async (role = 'teacher') => {
  const [rows] = await pool.query('SELECT id, name, email, created_at FROM users where role = ?', [role]);
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
  return rows[0];
};

export const createUser = async (name, email, hashedPassword, role = 'teacher') => {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role]
  );
  return result.insertId;
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

export const updatePassword = async (userId, hashedPassword) => {
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
};