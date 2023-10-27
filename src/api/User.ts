import axios from "axios";

import { IGetform, ILogin } from "../types/Type";

export class UserAPI {
  static register(param: IGetform) {
    const url = "http://localhost:8888/api/v1/user/register";
    return axios.post(url, param);
  }
  static login(param: ILogin) {
    const url = "http://localhost:8888/api/v1/user/login";
    return axios.post(url, param, { withCredentials: true });
  }
  //   static getAllUsers() {
  //     const url = "/users";
  //     return axiosClient.get(url);
  //   }
  //   static updateUser(param) {
  //     const url = `/users/${param.id}`;
  //     return axiosClient.patch(url, param);
  //   }
  //   static deleteUser(param) {
  //     const url = `/users/${param}`;
  //     return axiosClient.delete(url);
  //   }
}
