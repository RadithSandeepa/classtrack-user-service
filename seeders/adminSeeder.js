import pool from '../db.js';
import bcrypt from 'bcrypt';

const seedAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      ['Administrator', 'admin@classtrack.com', hashedPassword, 'admin']
    );

    console.log('Admin user seeded successfully!');
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      console.log('Admin user already exists.');
    } else {
      console.error('Seeding error:', err);
    }
  }
};

export default seedAdmin;