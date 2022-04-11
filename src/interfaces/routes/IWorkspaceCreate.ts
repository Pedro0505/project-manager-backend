interface IWorkspaceCreate {
  ownerId: string;
  workspaceName: string;
}

interface IWorkspaceCreateReturn {
  id: string;
  workspaceName: string;
}

interface IRequestWorkspaceBody {
  userId: string,
  workspaceName: string,
}

export { IWorkspaceCreate, IWorkspaceCreateReturn, IRequestWorkspaceBody };
