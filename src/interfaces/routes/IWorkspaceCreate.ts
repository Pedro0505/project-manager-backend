interface IWorkspaceCreate {
  ownerId: string;
  workspaceName: string;
}

interface IWorkspaceCreateReturn {
  id: string;
  workspaceName: string;
}

interface IRequestWorkspaceBody {
  workspaceName: string,
}

export { IWorkspaceCreate, IWorkspaceCreateReturn, IRequestWorkspaceBody };
