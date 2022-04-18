interface IUserSafe {
  firstName: string;
  lastName: string;
  email: string;
}

interface IUser extends IUserSafe {
  password: string;
  uuid?: string;
}

interface IUserModel extends IUser {
  id: string;
}

export { IUser, IUserSafe, IUserModel };
