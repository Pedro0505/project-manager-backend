import express from 'express';
import rescue from 'express-rescue';
import { register } from '../controllers/User';
import { validateUserRegister } from '../middlewares';

const UserRoutes = express.Router();

UserRoutes.post('/register', validateUserRegister, rescue(register));

export { UserRoutes };
