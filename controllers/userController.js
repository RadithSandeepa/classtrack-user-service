import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel.js';

// GET /users
export const listUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /users/:id
export const getUser = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /users (register user)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser(name, email, hashedPassword, role);
    res.status(201).json({ message: 'User created', userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /users (login user)
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.getUserByEmail(email);
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token, userId: user.id, role: user.role });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  
  export const changePassword = async (req, res) => {
    const { userId } = req.user; // extracted from auth middleware
    const { oldPassword, newPassword } = req.body;
    try {
      const user = await userModel.getUserById(userId);
      const validOld = await bcrypt.compare(oldPassword, user.password);
      if (!validOld) return res.status(400).json({ message: 'Old password incorrect' });
  
      const hashed = await bcrypt.hash(newPassword, 10);
      await userModel.updatePassword(userId, hashed);
  
      res.json({ message: 'Password updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };