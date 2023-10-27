import "./Auth.css";

import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const Auth: React.FC = (props: Props) => {
  return (
    <div className="registercomponent">
      <Outlet />
    </div>
  );
};

export default Auth;
