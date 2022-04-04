export interface IWorkspaceColumn {
  title: string;
  workspaceId: number;
  index?: number;
}

export interface IWorkspaceColumnUpdate {
  title?: string;
  index?: number;
}

export interface IWorkspaceColumnReturn {
  id: number;
  title: string;
  index?: number;
  workspaceId: number;
}
