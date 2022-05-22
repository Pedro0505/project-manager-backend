export const create = {
  body: { workspaceName: 'Projeto TFC' },
  tokenData: {  email: 'pedro@gmail.com', userId: '9e1e71ff-1643-4d4c-822a-98d5e0f609d1' },
  mock: { id: 'b4b79696-c2a3-476f-be0c-bf11fc06839e', name: 'Projeto TFC' },
  service: { id: 'b4b79696-c2a3-476f-be0c-bf11fc06839e', name: 'Projeto TFC' },
  callService: { ownerId: '9e1e71ff-1643-4d4c-822a-98d5e0f609d1', workspaceName: 'Projeto TFC' }
}

export const exclude = {
  params: { id: '675e28e9-2f9b-48ac-831e-4ed9a296e842' },
  tokenData: {  email: 'pedro@gmail.com', userId: '9e1e71ff-1643-4d4c-822a-98d5e0f609d1' },
  callService: { id: '675e28e9-2f9b-48ac-831e-4ed9a296e842', userId: '9e1e71ff-1643-4d4c-822a-98d5e0f609d1' },
}

export const getAll = {
  mockService: [
		{
			id: '85e57338-db9d-4913-adbf-058b7a68d730',
			name: 'BlogsAPI',
			ownerId: 'e6dea152-388a-49a4-8c70-3cb73b3c97c2'
		},
		{
			id: '3b6b213c-49ef-44e2-b2a3-efe9ef9504ab',
			name: 'Store Manager',
			ownerId: 'e6dea152-388a-49a4-8c70-3cb73b3c97c2'
		}
	],
  tokenData: { email: 'pedro@gmail.com', userId: '9e1e71ff-1643-4d4c-822a-98d5e0f609d1' },
} 

export const getById = {
  tokenData: { email: 'pedro@gmail.com', userId: '9e1e71ff-1643-4d4c-822a-98d5e0f609d1' },
  query: { includeColumns: undefined },
  params: { id: 'c664efec-64f0-4f4b-bbf8-41235998446f' },
  mockService: { id: '85e57338-db9d-4913-adbf-058b7a68d730', name: 'BlogsAPI', ownerId: '9e1e71ff-1643-4d4c-822a-98d5e0f609d1' },
  callService: { id: 'c664efec-64f0-4f4b-bbf8-41235998446f', userId: '9e1e71ff-1643-4d4c-822a-98d5e0f609d1' },
}
