import express from 'express';
import rescue from 'express-rescue';
import { register } from '../controllers/User';
import { validateUserRegister } from '../middlewares';
import auth from '../middlewares/auth';

const UserRoutes = express.Router();

UserRoutes.post('/register', auth, validateUserRegister, rescue(register));

export default UserRoutes;
