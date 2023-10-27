import React from "react";
import { Route, Routes } from "react-router-dom";

import CardComponent from "../components/CardComponent/CardComponent";
import Details from "../components/Details/Details";
import Introduction from "../components/Introduction/Introduction";
import LishProduct from "../components/LishProduct/LishProduct";
import Login from "../components/Login/Login";
import PayComponent from "../components/PayComponent/PayComponent";
import PurHistory from "../components/PurHistory/PurHistory";
import Register from "../components/Register/Register";
import Auth from "../layouts/auth/Auth";
import Main from "../layouts/main/Main";
import RequireAuth from "../components/RequireAuth";
import Formeditprofile from "../components/Formeditprofile/Formeditprofile";

const Router: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<Main />}>
          <Route path="" index element={<LishProduct />} />
          <Route path="intro" element={<Introduction />} />
          <Route path="details/:id" element={<Details />} />
          <Route element={<RequireAuth />}>
            <Route path="purchase" element={<PurHistory />} />
            <Route path="cardcomponent" element={<CardComponent />} />
            <Route path="pay" element={<PayComponent />} />
            <Route path="editprofile" element={<Formeditprofile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
