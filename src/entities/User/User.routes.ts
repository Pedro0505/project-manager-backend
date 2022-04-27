import express from 'express';
import rescue from 'express-rescue';
import * as Controllers from './controllers';
import { validateUserLogin, validateUserRegister } from '../../middlewares';

const UserRoutes = express.Router();

UserRoutes.post('/register', validateUserRegister, rescue(Controllers.register));
UserRoutes.post('/login', validateUserLogin, rescue(Controllers.login));
UserRoutes.get('/search', rescue(Controllers.findeUserByEmail));

export { UserRoutes };
