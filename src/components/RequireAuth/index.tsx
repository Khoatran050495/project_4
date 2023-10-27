import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ExpNotify from "../ExpNotify/ExpNotify";
import jwtDecode from "jwt-decode";

const RequireAuth: React.FC = () => {
  const token: any = localStorage.getItem("accessToken");
  const [exp, setExp] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const date = new Date();
      const decode: any = jwtDecode(token);

      if (decode && decode.exp > date.getTime() / 1000) {
        setExp(false);
      } else {
        setExp(true);
      }
    } catch (error) {
      console.log(error);

      navigate("/auth/login");
    }
  }, []);

  return (
    <>
      {exp && <ExpNotify />}
      <Outlet />
    </>
  );
};

export default RequireAuth;
