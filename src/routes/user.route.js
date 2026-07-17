import express from 'express'
const router = express.Router();
import { createUser, dashboard, login } from '../controllers/auth.controller.js'
import { registerSchema, loginSchema } from '../validators/auth.validate.js';
import validate from '../middleware/validateUser.js';
import { protect } from '../middleware/protect.js';
import restrictTo from '../middleware/restrict.js';
import { deleteUser, getUserById, getUserByIdAndUpdate } from '../controllers/user.controller.js';

router.post('/signup', validate(registerSchema), createUser);

router.use(protect)
// CRUD OPERATIONS
router
    .route('/:id')
    .get(getUserById)
    .patch(getUserByIdAndUpdate)
    .delete(deleteUser);


export default router;
