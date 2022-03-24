interface IWorkspaceColumn {
  title: string;
  workspaceId: number;
}

interface IWorkspaceColumnReturn {
  id: number;
  title: string;
}

export { IWorkspaceColumn, IWorkspaceColumnReturn };
