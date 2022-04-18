export interface IWorkspaceColumn {
  title: string;
  workspaceId: string;
  index?: number;
}

export interface IWorkspaceColumnUpdate {
  title?: string;
  index?: number;
}

export interface IWorkspaceColumnReturn {
  id: string;
  title: string;
  index?: number;
  workspaceId: string;
}
