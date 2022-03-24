interface IUserLogin {
  email: string;
  password: string;
}

interface IUserSafe {
  firstName: string;
  lastName: string;
  email: string;
}

interface IUser extends IUserSafe {
  password: string;
}

export { IUser, IUserSafe, IUserLogin };
