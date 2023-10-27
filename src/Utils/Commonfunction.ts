import "react-toastify/dist/ReactToastify.css";

import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import { axiosClient } from "../api/axiosClient";
import { PostOrdersAPI } from "../api/OrdersClient";

export const loginWithGoogle = async () => {
  try {
    // Khai báo thông số cho cửa sổ popup
    const width = 600;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    // Mở cửa sổ popup
    const popup = window.open(
      "http://localhost:8888/api/v1/user/google",
      "Login with Google",
      `toolbar=no, location=no, directories=no, status=no, menubar=no,
         scrollbars=yes, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );

    // Lắng nghe sự kiện chuyển hướng của popup
    const checkInterval = setInterval(async () => {
      try {
        if (!popup || popup.closed || popup.closed === undefined) {
          clearInterval(checkInterval);
          toast.error("Login popup was closed.", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }

        if (popup.location.href.includes("localhost:3000")) {
          clearInterval(checkInterval);
          popup.close();

          // Xử lý sau khi nhận token
          const url = new URL(popup.location.href);
          const accessToken = url.searchParams.get("token");

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            const decoded: any = jwtDecode(accessToken);
            const user = decoded;
            // Lấy thông tin người dùng từ server
            if (user) {
              localStorage.setItem("userLogin", JSON.stringify(user));
            }
            const userId = user?.id;
            const orderValue = {
              Users_id: userId,
            };
            const postIdProductOrder = await axiosClient.get(
              `/api/v1/orders/getorders/${userId}`
            );
            const postIdProductOrder1 = postIdProductOrder.data.data;
            const postIdProductOrder2 = postIdProductOrder1[0];

            if (!postIdProductOrder2) {
              await PostOrdersAPI.PostOrders(orderValue);
            }

            toast.success("Successfully logged in with Google!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            window.location.href = "/";
          } else {
            toast.error("Error during Google authentication.", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      } catch (error) {
        // Tránh lỗi security khi truy cập cross-origin
        console.log(error);
      }
    }, 1000);
  } catch (error) {
    console.log(error);
    toast.error("Login with Google failed.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
