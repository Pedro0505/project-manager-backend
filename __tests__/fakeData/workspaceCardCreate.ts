import { IWorkspaceCardCreateTest } from './interface';

const workspaceCardCreate: IWorkspaceCardCreateTest = {
  requestMock: {
    columnId: 1,
    title: 'Teste',
    content: 'Hello World'
  },

  responseMock: {
    id: 1,
    title: 'Teste',
    content: 'Hello World'
  },

  workspaceColumnCreate: {
    workspaceId: 1,
    title: 'teste'
  }
};

export { workspaceCardCreate };
