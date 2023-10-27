import "./ExpNotify.css";

import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { axiosClient } from "../../api/axiosClient";
import { CartItem } from "../../reudux/reduce/CartSlice";
import { CartHeader } from "../../reudux/reduce/RefeshtHeaderSlice";

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const ExpNotify: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogout = () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axiosClient({ method: "POST", url: "/api/v1/user/logout" })
        .then(() => {
          deleteCookie("refreshToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userLogin");
          dispatch(CartHeader());
          dispatch(CartItem());
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="wrapper-exp">
      <section className="modal-exp">
        <p>The login session has expired, do you want to login again?</p>
        <div className="expbtn">
          <button id="btnexplogout" onClick={() => handlelogout()}>
            NO
          </button>
          <Link to="auth/login">YES</Link>
        </div>
      </section>
    </div>
  );
};

export default ExpNotify;
