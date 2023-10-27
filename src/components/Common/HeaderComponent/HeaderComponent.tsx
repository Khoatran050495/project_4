import "./HeaderComponent.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { axiosClient } from "../../../api/axiosClient";
import { images } from "../../../assets/img/img";
import { changeStatus1 } from "../../../reudux/reduce/ChangeprofileSlice";
import { changeStatus } from "../../../reudux/reduce/HeaderSlice";

const HeaderComponent: React.FC = () => {
  const isUpdate = useSelector((state: any) => state.cartSlice);
  const isUpdateHeader = useSelector((state: any) => state.CartHeader);
  const isUpdateAvatar = useSelector((state: any) => state.Avatarupdate);
  const [data, setdata] = useState<any>();
  const [datauser, setdatauser] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>();

  const datajson = JSON.parse(localStorage.getItem("userLogin") as any);
  const idUser = datajson?.id;

  useEffect(() => {
    setUser(datajson);
  }, [isUpdateHeader]);

  //========================================================================>gọi API order để lấy số lượng đơn hàng
  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axiosClient.get(
        `/api/v1/orders/getorders/${idUser}`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;
      setdata(postIdProductOrder1[0]?.carditem?.length);
    } catch (error) {
      setdata(0);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, [isUpdate]);

  //========================================================================>gọi API user để lấy ảnh
  const fetchDataUser = async () => {
    try {
      const postIdProductOrder = await axiosClient.get(
        `api/v1/user/getusebyid/${idUser}`
      );
      const postIdProductOrder1 = postIdProductOrder.data.dataUser;
      setdatauser(postIdProductOrder1.imgavatar);
    } catch (error) {
      setdata(0);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, [isUpdateAvatar]);

  // totaldata để render

  const handlelogout = () => {
    navigate("/auth/login");
  };

  //  lọc ra cartitem để render
  const handlesearch = (data: string) => {
    dispatch(changeStatus(data));
    navigate("/");
  };

  const handleEditProfile = (data: string) => {
    dispatch(changeStatus1(data));
    navigate("/editprofile");
  };

  return (
    <>
      <div className="navcomponent">
        <img src="https://sassnet.com/images/sass-logo-2.png" alt="caption" />

        <div className="navchoose">
          <ul>
            <li>
              <Link onClick={() => handlesearch("all")} to={"/"}>
                HOME PAGE
              </Link>
            </li>
            <li>
              <Link to={"/intro"}>INTRODUCE</Link>
            </li>
            <li>
              <Link to={"/purchase"}>PURCHASE HISTORY</Link>
            </li>
            <li>
              <Link id="shoppingcart" to={"/cardcomponent"}>
                CART <span>{data ? data : 0}</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navchoose">
          <ul>
            {user ? (
              <>
                <li>
                  <div className="avatarcontainer1">
                    <img id="logoutimg" src={datauser} alt="cap" />
                    <div className="toolcontainer1">
                      <button
                        id="editInformation"
                        onClick={() => handleEditProfile("1")}
                      >
                        CHANGE INFORMATION
                      </button>
                      <button
                        id="editInformation"
                        onClick={() => handleEditProfile("2")}
                      >
                        CHANGE THE PASSWORD
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <button id="logout" onClick={() => handlelogout()}>
                    LOG OUT
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/auth/Login"}>LOG IN</Link>
                </li>
                <li>
                  <Link to={"/auth/register"}>REGISTER</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="linecolor"></div>

      <div className="choosecar">
        <button id="btnchoosecar" onClick={() => handlesearch("rifle")}>
          <div id="img">
            <img src={images.Longgun} alt="caption" />
          </div>
          RIFLE
        </button>
        <button id="btnchoosecar" onClick={() => handlesearch("pistols")}>
          <div id="img">
            <img src={images.Pistols} alt="caption" />
          </div>
          PISTOLS
        </button>
        <button id="btnchoosecar" onClick={() => handlesearch("bullet")}>
          <div id="img2">
            <img src={images.Dan} alt="caption" />
          </div>
          BULLET
        </button>
        <button id="btnchoosecar" onClick={() => handlesearch("armor")}>
          <div id="img3">
            <img src={images.Ao2} alt="caption" />
          </div>
          ARMOR
        </button>
      </div>
    </>
  );
};

export default HeaderComponent;
