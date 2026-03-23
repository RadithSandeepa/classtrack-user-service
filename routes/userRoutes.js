import express from 'express';
import * as userController from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, requireRole(['admin']), userController.listUsers);
router.get('/:id', authMiddleware, requireRole(['admin']), userController.getUser);
router.post('/', authMiddleware, requireRole(['admin']), userController.createUser);
router.post('/login', userController.loginUser);
router.put('/change-password', authMiddleware, userController.changePassword);

export default router;