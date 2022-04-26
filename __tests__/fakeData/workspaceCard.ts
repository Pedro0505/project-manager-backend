export const create = {
  request: {
    content: 'Card Created',
    columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32'
  },
  response: {
    content: 'Card Created', 
    columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32', 
    index: 5
  },
};

export const patch = {
  request: {
    columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32',
    content: 'Change content',
    title: 'Change title'
  },
  response: {
		id: '1e2caa3a-a668-455b-bc1d-53909ac96933',
		index: 1,
		content: 'Change content',
		title: 'Change title',
		columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32'
	}
}
