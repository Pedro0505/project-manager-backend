interface IWorkspaceCard {
  columnId: string;
  content: string;
  title: string | null;
}

interface IWorkspaceCardModel extends IWorkspaceCard {
  id: string;
  index: number;
}

export { IWorkspaceCard, IWorkspaceCardModel };
