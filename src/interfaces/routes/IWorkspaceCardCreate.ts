interface IWorkspaceCardCreate {
  content: string;
  title: string;
  columnId: number
}

interface IWorkspaceCardCreateReturn {
  id: number
  content: string;
  title: string;
}

export { IWorkspaceCardCreate, IWorkspaceCardCreateReturn };
