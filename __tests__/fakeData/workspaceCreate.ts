import { IWorkspaceTest } from "./interface";

const workspaceCreate: IWorkspaceTest = {
  requestMock: {
    userId: 1,
    workspaceName: 'Projetos Da Trybe',
  },

  responseMock: {
    id: 1,
    workspaceName: 'Projetos Da Trybe',
  },
};

export { workspaceCreate };
