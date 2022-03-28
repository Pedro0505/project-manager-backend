interface IWorkspaceCreate {
  ownerId: number;
  workspaceName: string;
}

interface IWorkspaceCreateReturn {
  id: number;
  workspaceName: string;
}

interface IRequestWorkspaceBody {
  userId: number,
  workspaceName: string,
}

export { IWorkspaceCreate, IWorkspaceCreateReturn, IRequestWorkspaceBody };
