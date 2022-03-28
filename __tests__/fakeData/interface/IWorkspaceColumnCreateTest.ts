interface IRequestWorkspaceColumn {
  workspaceId: number,
  title: string,
}

interface IWresponseWorkspaceColumn {
  id: number,
  title: string,
}

interface IWorkspaceCreateRequest {
  ownerId: number,
  name: string
}

interface IWorkspaceColumnCreateTest {
  requestMock: IRequestWorkspaceColumn;
  responseMock: IWresponseWorkspaceColumn;
  workspaceCreate: IWorkspaceCreateRequest;
}

export { IWorkspaceColumnCreateTest, IRequestWorkspaceColumn };
