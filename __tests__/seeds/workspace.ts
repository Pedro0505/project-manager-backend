import { IWorkspaceModel } from '../../src/interfaces/prisma';

export const blogsAPI: IWorkspaceModel = {
  id: '85e57338-db9d-4913-adbf-058b7a68d730',
  name: 'BlogsAPI',
  ownerId: 'e6dea152-388a-49a4-8c70-3cb73b3c97c2',
};

export const storeManager = {
  id: 'b92b2836-1ee9-4621-81a4-906a7a80dec9',
  name: 'Store Manager',
  ownerId: '21119b9d-af80-4e9f-8987-047f8f50a5fa',
};

export const allWorkspaces = [blogsAPI, storeManager];
