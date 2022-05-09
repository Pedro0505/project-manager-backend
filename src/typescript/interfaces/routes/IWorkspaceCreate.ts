interface IWorkspaceCreate {
  ownerId: string;
  workspaceName: string;
}

interface IWorkspaceCreateReturn {
  id: string;
  name: string;
}

interface IRequestWorkspaceBody {
  workspaceName: string,
}

export { IWorkspaceCreate, IWorkspaceCreateReturn, IRequestWorkspaceBody };
