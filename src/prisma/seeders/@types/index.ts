export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IWorkspace {
  name: string;
  owner_id: number;
}

export interface IWorkspaceCollumn {
  workspace_id: number;
  title: string;
}

export interface IWorkspaceCard {
  column_id: number;
  content: string;
  title: string;
}
