import express from 'express';
import * as Controller from '../controllers/WorkspaceCard';

const WorkspaceCardRoutes = express.Router();

WorkspaceCardRoutes.post('/', Controller.Create);

export { WorkspaceCardRoutes };
