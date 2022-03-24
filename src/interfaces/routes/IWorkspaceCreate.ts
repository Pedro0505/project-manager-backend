interface IWorkspaceCreate {
  owerId: number;
  workspaceName: string;
}

interface IWorkspaceCreateReturn {
  id: number;
  workspaceName: string;
}

export { IWorkspaceCreate, IWorkspaceCreateReturn };
