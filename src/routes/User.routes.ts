import express from 'express';
import rescue from 'express-rescue';
import { register } from '../controllers/User';

const UserRoutes = express.Router();

UserRoutes.post('/register', rescue(register));

export default UserRoutes;
