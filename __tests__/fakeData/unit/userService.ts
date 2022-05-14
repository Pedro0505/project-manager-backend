export const login = {
  mock: {
    email: 'pedro@gmail.com', 
    firstName: 'Pedro', 
    id: 'a3bb213e123b2', 
    lastName: 'Silva', 
    password: '$argon2d$v=19$m=12,t=3,p=1$bm83enlvdTU0NTAwMDAwMA$ewelLOYW/KJoVS9nu3sHnQ',
    uuid: 'abb213e1asd' 
  },
  serviceParams: { email: 'pedro@gmail.com', password: '12345678' },
  jwtResponse: { userId: 'a3bb213e123b2', email: 'pedro@gmail.com' }
};

export const loginUserNotFound = {
  serviceParams: { email: 'wrong@email.com', password: '12345678' },
  responseError: { error: { message: 'email not found' } }
};
