import React from "react";
import { Outlet } from "react-router-dom";

import HeaderComponent from "../../Components/Header/HeaderComponent";

type Props = {};

const Main: React.FC = (props: Props) => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
};

export default Main;
