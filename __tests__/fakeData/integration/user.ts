export const register = {
  request: {
    email: 'simpson@gmail.com',
    firstName: 'Homer',
    lastName: 'Simpson',
    password: 'alishdahsid',
  },
  response: {
    id: '',
    email: 'simpson@gmail.com',
    firstName: 'Homer',
    lastName: 'Simpson',
  },
  requestConflict: {
    firstName: 'Matheus',
    lastName: 'Santos',
    email: 'matheus@gmail.com',
    password: '12345678',
  },
};

export const login = {
  request: {
    email: 'matheus@gmail.com',
    password: '12345678',
  },
  requestUnregisteredEmail: {
    email: 'eren@gmail.com',
    password: '12345678',
  },
  requestWrongPassword: {
    email: 'matheus@gmail.com',
    password: '123456789',
  },
};

export const userEmail = {
  response: {
    id: '21119b9d-af80-4e9f-8987-047f8f50a5fa',
    firstName: 'Matheus',
    lastName: 'Santos',
    email: 'matheus@gmail.com',
    password: '$argon2i$v=19$m=4096,t=3,p=1$X7r4K8ujPAuRdFMiERDJrA$iwBZrXgdJD4+I8gzI/F7ZUlCtc/aQ+XwSnOjOUb521I',
    uuid: null
  }
}
