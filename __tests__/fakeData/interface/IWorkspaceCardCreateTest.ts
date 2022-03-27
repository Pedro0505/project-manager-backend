interface IRequestWorkspaceCard {
  columnId: number;
  title: string;
  content: string
}

interface IResponseWorkspaceCard {
  id: number;
  title: string;
  content: string
}

interface IRequestWorkspaceColumn {
  workspaceId: number,
  title: string,
}


interface IWorkspaceCardCreateTest {
  requestMock: IRequestWorkspaceCard;
  responseMock: IResponseWorkspaceCard;
  workspaceColumnCreate: IRequestWorkspaceColumn;
}

export { IWorkspaceCardCreateTest };
