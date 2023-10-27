import "./Main.css";

import React from "react";
import { Outlet } from "react-router-dom";

import FooterComponent from "../../components/Common/FooterComponent/FooterComponent";
import HeaderComponent from "../../components/Common/HeaderComponent/HeaderComponent";
import SidebarComponent from "../../components/SideBar/SidebarComponent";

const Main: React.FC = () => {
  return (
    <div>
      <HeaderComponent />
      <div className="wrapper-default">
        <SidebarComponent />
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Main;
