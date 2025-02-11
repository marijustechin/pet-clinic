export interface IUser {
  id: string;
  first_name: string;
  email: string;
  role: string;
  address: string;
  phone_number: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
