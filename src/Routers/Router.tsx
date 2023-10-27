import React from "react";
import { Route, Routes } from "react-router-dom";

import AddProduct from "../Components/AddProduct/AddProduct";
import EditProduct from "../Components/EditProduct/EditProduct";
import Login from "../Components/Login/Login";
import Odermanager from "../Components/Odermanager/Odermanager";
import ProductsManager from "../Components/ProductsManager/ProductsManager";
import RequireAuth from "../Components/RequireAuth";
import RevenueManages from "../Components/RevenueManages/RevenueManages";
import UseManager from "../Components/UseManager/UseManager";
import Auth from "../layouts/Auth/Auth";
import Main from "../layouts/Main/Main";

const Router: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Main />}>
            <Route path="usermanagers" element={<UseManager />} />
            <Route path="productsmanagers" element={<ProductsManager />} />
            <Route path="orders" element={<Odermanager />} />
            <Route path="revenue" element={<RevenueManages />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="editproduct" element={<EditProduct />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
