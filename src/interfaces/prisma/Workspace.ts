interface IWorkspace {
  name: string;
  ownerId: string;
}

interface IWorkspaceModel extends IWorkspace {
  id: string;
}

export { IWorkspace, IWorkspaceModel };
