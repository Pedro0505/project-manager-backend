interface IUserSafe {
  firstName: string;
  lastName: string;
  email: string;
}

interface IUser extends IUserSafe {
  password: string;
  uuid?: string;
}

export { IUser, IUserSafe };
