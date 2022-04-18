interface IWorkspaceColumn {
  workspaceId: string;
  title: string;
  index: number;
}

interface IWorkspaceColumnModel extends IWorkspaceColumn {
  id: string;
}

export { IWorkspaceColumn, IWorkspaceColumnModel };
