export const create = {
  request: {
    workspaceName: 'TrybeSmith',
  },
  response: {
    workspaceName: 'TrybeSmith',
  },
};

export const getAll = {
  response: [
    {
      id: 'b92b2836-1ee9-4621-81a4-906a7a80dec9',
      name: 'Store Manager',
      ownerId: '21119b9d-af80-4e9f-8987-047f8f50a5fa'
    }
  ]
}

export const getById = {
  response: {
    id: 'b92b2836-1ee9-4621-81a4-906a7a80dec9',
    name: 'Store Manager',
    ownerId: '21119b9d-af80-4e9f-8987-047f8f50a5fa'
  }
};

export const getWithColumns = {
  response: {
    id: 'b92b2836-1ee9-4621-81a4-906a7a80dec9',
    name: 'Store Manager',
    ownerId: '21119b9d-af80-4e9f-8987-047f8f50a5fa',
    columns: [
      {
        id: '67b97db2-0f7a-4f2a-b515-9d7054f94a32',
        index: 1,
        title: 'Para Fazer',
        workspaceId: 'b92b2836-1ee9-4621-81a4-906a7a80dec9',
        cards: [
          {
            id: '1e2caa3a-a668-455b-bc1d-53909ac96933',
            index: 1,
            columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32',
            title: null,
            content: 'Fazer req 3',
          },
          {
            id: 'fbbeef8d-99e3-49a1-895c-beb88592da53',
            index: 2,
            columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32',
            title: null,
            content: 'Fazer req 4',
          },
          {
            id: 'fd14a167-c406-4010-9924-2227b6154fd4',
            index: 3,
            columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32',
            title: null,
            content: 'Fazer req 5',
          },
          {
            id: 'b28f9efa-bfdb-40b2-baea-0daada9420f1',
            index: 4,
            columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32',
            title: null,
            content: 'Fazer req 6',
          }
        ]
      },
      {
        id: '79f9a454-6fda-412d-817b-604176cd1a12',
        index: 2,
        title: 'Fazendo',
        workspaceId: 'b92b2836-1ee9-4621-81a4-906a7a80dec9',
        cards: [
          {
            id: '4f7a5bd9-5968-4b19-bd5a-a15fec16ee64',
            index: 1,
            columnId: '79f9a454-6fda-412d-817b-604176cd1a12',
            title: null,
            content: 'Fazer req 1',
          },
          {
            id: 'f117762f-9d36-44bc-a43d-7ab6300d91e9',
            index: 2,
            columnId: '79f9a454-6fda-412d-817b-604176cd1a12',
            title: null,
            content: 'Fazer req 2',
          }
        ]
      },
      {
        id: 'b9cb23be-aaef-40e6-bfd3-995836073fd7',
        index: 3,
        title: 'Finalizado',
        workspaceId: 'b92b2836-1ee9-4621-81a4-906a7a80dec9',
        cards: [],
      }
    ]
  }
}
