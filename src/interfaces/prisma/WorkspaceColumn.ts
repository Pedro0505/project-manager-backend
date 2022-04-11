interface IWorkspaceColumn {
  workspaceId: string;
  title: string;
}

interface IWorkspaceColumnModel extends IWorkspaceColumn {
  id: string;
  index: number;
}

export { IWorkspaceColumn, IWorkspaceColumnModel };
