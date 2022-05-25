export const workspaceCreate = {
  createMock: { id: '9372eef1-0acd-4899-8fd2-4ecbfdede344', name: 'Criando um novo workspace', ownerId: '36e3920b-4544-4a17-9a86-a882460960af' },
  serviceCall: { ownerId: '36e3920b-4544-4a17-9a86-a882460960af', workspaceName: 'Criando um novo workspace' },
  serviceReturn: { id: '9372eef1-0acd-4899-8fd2-4ecbfdede344', name: 'Criando um novo workspace' },
};

export const exclude = {
  id: '6d6ef621-d0a0-44f2-aee6-5a156aeac16d',
  userId: '3222a682-1d91-48c8-95bb-f89104dc4df5',
};

export const excludeNotFound = {
  id: '6d6ef621-d0a0-44f2-aee6-5a156aeac16d',
  userId: '3222a682-1d91-48c8-95bb-f89104dc4df5',
  code: 404,
  message: 'workspace not found',
};

export const excludeUnauthorized = {
  findFirstMock: { id: 'fd6fb177-ad92-42d9-9020-6c045a64b4c5', name: 'Project Manager', ownerId: '6989d096-c300-4715-b369-cd3baed51c70' },
  serviceCall: {
    id: '6d6ef621-d0a0-44f2-aee6-5a156aeac16d',
    userId: '3222a682-1d91-48c8-95bb-f89104dc4df5',
  },
  code: 401,
  message: 'operation not allowed',
}
