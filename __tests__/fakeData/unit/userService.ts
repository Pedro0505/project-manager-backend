export const login = {
  mock: {
    id: 'a3bb213e123b2', 
    firstName: 'Pedro', 
    lastName: 'Silva', 
    email: 'pedro@gmail.com', 
    password: '$argon2d$v=19$m=12,t=3,p=1$bm83enlvdTU0NTAwMDAwMA$ewelLOYW/KJoVS9nu3sHnQ',
    uuid: 'abb213e1asd'
  },
  serviceParams: { email: 'pedro@gmail.com', password: '12345678' },
  jwtResponse: { userId: 'a3bb213e123b2', email: 'pedro@gmail.com' }
};

export const loginUserNotFound = {
  serviceParams: { email: 'wrong@email.com', password: '12345678' },
  responseError: { error: { message: 'email not found' } },
  code: 404
};

export const loginUserWrongPassword = {
  serviceParams: { email: 'pedro@gmail.com', password: 'wrongPassword' },
  responseError: { error: { message: 'wrong password' } },
  code: 401
};

export const service = {
  user: {
    firstName: 'Pedro',
    lastName: 'Silva',
    email: 'pedro@gmail.com', 
    password: '12345678',
    uuid: '921-aec231d2-ea21'
  },
  response: {
    id: 'a3bb213e123b2',
    firstName: 'Pedro',
    lastName: 'Silva',
    email: 'pedro@gmail.com',
    uuid: '921-aec231d2-ea21'
  },
  mockCreate: {
    id: 'a3bb213e123b2',
    email: 'pedro@gmail.com',
    firstName: 'Pedro',
    lastName: 'Silva',
    password: '$argon2d$v=19$m=12,t=3,p=1$bm83enlvdTU0NTAwMDAwMA$ewelLOYW/KJoVS9nu3sHnQ',
    uuid: '921-aec231d2-ea21'
  }
};
