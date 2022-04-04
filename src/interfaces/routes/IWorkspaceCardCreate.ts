export interface IWorkspaceCardCreate {
  index?: number;
  content: string;
  title?: string;
  columnId: number;
}

export interface IWorkspaceCardUpdate {
  index?: number;
  content?: string;
  title?: string;
  columnId?: number;
}

export interface IWorkspaceCardResponse {
  id: number;
  index: number;
  content: string;
  columnId: number;
  title: string | null;
}
