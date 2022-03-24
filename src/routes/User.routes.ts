import express from 'express';
import rescue from 'express-rescue';
import * as Controllers from '../controllers/User';
import { validateUserLogin, validateUserRegister } from '../middlewares';

const UserRoutes = express.Router();

UserRoutes.post('/register', validateUserRegister, rescue(Controllers.register));
UserRoutes.post('/login', validateUserLogin, rescue(Controllers.Login));

export { UserRoutes };
