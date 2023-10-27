import axios from "axios";
export class PostOrdersAPI {
  static PostOrders(param: any) {
    const url = "http://localhost:8888/api/v1/orders/postorders";
    return axios.post(url, param);
  }
}
