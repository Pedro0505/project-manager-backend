interface IRequestWorkspace {
  userId: number,
  workspaceName: string,
}

interface IResponseWorkspace {
  id: number,
  workspaceName: string,
}

interface IWorkspaceTest {
  requestMock: IRequestWorkspace;
  responseMock: IResponseWorkspace;
}

export { IWorkspaceTest, IRequestWorkspace };
