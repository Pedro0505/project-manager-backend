import express from 'express';
import rescue from 'express-rescue';
import * as Controller from '../controllers/Workspace';
import auth from '../middlewares/auth';

const WorkspaceRoutes = express.Router();

WorkspaceRoutes.post('/', auth, rescue(Controller.Create));
WorkspaceRoutes.get('/', auth, rescue(Controller.GetAll));

export { WorkspaceRoutes };
