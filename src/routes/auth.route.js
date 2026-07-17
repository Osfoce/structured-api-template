import express from 'express'
const router = express.Router();
import {createUser, dashboard, forgotPassword, login, resetPassword } from '../controllers/auth.controller.js'
import {registerSchema, loginSchema} from '../validators/auth.validate.js';
import validate from '../middleware/validateUser.js';
import { protect } from '../middleware/protect.js';
import restrictTo from '../middleware/restrict.js';
// router.get('/', getUser)
// router.get('/id', getUserById)
router.post('/signup', validate(registerSchema), createUser);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password', resetPassword);



router.get('/dashboard', protect, dashboard);
// router.get('/refresh', protect, dashboard)
// router.post('/login', loginUser)


export default router;