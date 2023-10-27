import "./Login.css";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axiosClient from "../../api/axiosClient";
import { login } from "../../redux/reduce/UserSlice";
import { ILogin } from "../../Types/Type";

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const Login: React.FC = () => {
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      axiosClient({ method: "POST", url: "/api/v1/user/logout" })
        .then(() => {
          deleteCookie("refreshToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userLogin");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, seterror] = useState<string | undefined>();
  const [getform, setgetform] = useState<ILogin>({
    email: "",
    passwords: "",
  });

  const handlegetform = (e: ChangeEvent<HTMLInputElement>) => {
    setgetform({
      ...getform,
      [e.target.name]: e.target.value,
    });
    console.log();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let data = await dispatch(login(getform) as any).unwrap();
      if (data.message === "Request failed with status code 401") {
        seterror("User account or password incorrect");
      } else if (data === "error") {
        seterror("You do not have access");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registercomponent">
      <div className="logincomponent1">
        <div className="logincomponent2">
          <div className="loginimg">
            <img
              src="https://sassnet.com/images/sass-logo-2.png"
              alt="caption"
            />
          </div>
        </div>

        <form className="loginform" onSubmit={handleSubmit}>
          <label htmlFor="">EMAIL</label>
          <br />
          <input type="text" name="email" onChange={handlegetform} />
          <br />
          <label htmlFor="">PASSWORD</label>
          <br />
          <input type="password" name="passwords" onChange={handlegetform} />
          <span>{error}</span>
          <br />
          <div className="btnlogin">
            <button type="submit">LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
