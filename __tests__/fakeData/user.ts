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
