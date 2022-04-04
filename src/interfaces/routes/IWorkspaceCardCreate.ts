interface IWorkspaceCardCreate {
  index?: number;
  content: string;
  title?: string;
  columnId: number
}

interface IWorkspaceCardCreateReturn {
  id: number
  index: number;
  content: string;
  columnId: number
  title: string | null;
}

export { IWorkspaceCardCreate, IWorkspaceCardCreateReturn };
