export const create = {
  request: {
    title: 'Testando',
    workspaceId: 'b92b2836-1ee9-4621-81a4-906a7a80dec9',
  },
  response: {
    title: 'Testando',
    workspaceId: 'b92b2836-1ee9-4621-81a4-906a7a80dec9',
    index: 4,
  },
};

export const put = {
  request: {
    title: 'Changes'
  },

  response: {
    id: '67b97db2-0f7a-4f2a-b515-9d7054f94a32',
    index: 1,
    title: 'Changes',
    workspaceId: 'b92b2836-1ee9-4621-81a4-906a7a80dec9'
  }
}

export const manyUpdate = {
  request: [
    { id: '79f9a454-6fda-412d-817b-604176cd1a12' },
    { id: '67b97db2-0f7a-4f2a-b515-9d7054f94a32' }
  ],

  response: [
		{
			id: '79f9a454-6fda-412d-817b-604176cd1a12',
			index: 0,
			title: 'Fazendo',
			workspaceId: 'b92b2836-1ee9-4621-81a4-906a7a80dec9'
		},
		{
			id: '67b97db2-0f7a-4f2a-b515-9d7054f94a32',
			index: 1,
			title: 'Para Fazer',
			workspaceId: 'b92b2836-1ee9-4621-81a4-906a7a80dec9'
		}
	]
}; 
