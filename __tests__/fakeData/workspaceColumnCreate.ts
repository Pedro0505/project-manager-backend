import { IWorkspaceColumnCreateTest } from './interface';

const workspaceColumnCreate: IWorkspaceColumnCreateTest = {
  requestMock: {
    workspaceId: 1,
    title: 'Greeting'
  },

  responseMock: {
    id: 1,
		title: 'Greeting'
  },

  workspaceCreate: {
    ownerId: 1,
    name: 'Projetos Trybe'
  }
};

export { workspaceColumnCreate };
