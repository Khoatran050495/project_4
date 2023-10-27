import axios from "axios";

import { ILogin } from "../Types/Type";

export class UserAPI {
  static login(param: ILogin) {
    const url = "http://localhost:8888/api/v1/user/login";
    return axios.post(url, param, { withCredentials: true });
  }
}
