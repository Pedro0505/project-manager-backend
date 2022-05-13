export const login = {
  body: { email: 'pedro@gmail.com', password: '12345678' },
  token: 'aRandomToken',
}

export const register = {
  body: { id: 'a22ab34b5dsadasd',email: 'pedro@gmail.com', password: '12345678', firstName: 'Pedro', lastName: 'Silva', uuid: 'a22ab34b5ad34e3' },
  token: 'aRandomToken'
};

export const findUserByEmail = {
  query: { q: 'pedro@gmail.com' },
  serviceMock: { email: 'pedro@gmail.com', uuid: '1231a32bc3d32a' }
}
