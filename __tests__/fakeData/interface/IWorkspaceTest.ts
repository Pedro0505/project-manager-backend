interface requestWorkspace {
  userId: number,
  workspaceName: string,
}

interface responseWorkspace {
  id: number,
  workspaceName: string,
}

interface IWorkspaceTest {
  requestMock: requestWorkspace;
  responseMock: responseWorkspace;
}

export { IWorkspaceTest };
