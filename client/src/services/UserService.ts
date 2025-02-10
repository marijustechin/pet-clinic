import { AxiosResponse } from "axios";
import { IUser } from "../types/user";
import $api, { API_URL } from "../api";

export default class UserService {
  static userRegistration(
    first_name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.post(`${API_URL}/users`, { first_name, email, password });
  }

  static userLogin(
    email: string,
    password: string
  ): Promise<AxiosResponse<IUser>> {
    return null;
  }
}
