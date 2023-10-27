import "./Formeditprofile.css";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { axiosSub } from "../../api/axiosClient";
import { images } from "../../assets/img/img";
import { Avatarupdate } from "../../reudux/reduce/AvatarSlice";
import { CartItem } from "../../reudux/reduce/CartSlice";
import { IDataPassword, IDataUser } from "../../types/Type";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const Formeditprofile: React.FC = () => {
  // ====================================================================================> phần khởi tạo
  const [editProfile, setEditProfile] = useState(1);
  const statusChangeuser = useSelector(
    (state: any) => state.ChangeprofileSlice
  );
  const statusChangeuser1 = statusChangeuser.data;
  const [isLoading, setIsLoading] = useState(false);

  // form edit profile
  const [data, setdata] = useState<IDataUser>({
    email: "",
    username: "",
    phoneNumber: "",
    birthday: "",
    address: "",
  });

  // form password
  const [dataPassword, setdataPassword] = useState<IDataPassword>({
    passwords: "",
    Newpassword: "",
    RepeatNewPassword: "",
  });

  // tạo oject rỗng để validate error
  const [passwordserr, setpasswordserr] = useState("");
  const [Newpassworderr, setNewpassworderr] = useState("");
  const [RepeatNewPassworderr, setRepeatNewPassworderr] = useState("");

  const [initialBirthday, setInitialBirthday] = useState<string>("");
  // chỗ lưu link ảnh tạm thời
  const [selectedImage, setSelectedImage] = useState("");
  // chỗ lưu link ảnh chuyển đi
  const [imageAvartar, setImageAvartar] = useState("");
  const dispatch = useDispatch();

  // ẩn hiển password
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // ===================================================================================> bắt đầu gọi api
  const dataLocal = JSON.parse(localStorage.getItem("userLogin") as any);
  const idUser = dataLocal.id;

  // gọi API
  const fetchDataOrder = async () => {
    try {
      const getuserbyId = await axiosSub.get(
        `/api/v1/user/getusebyid/${idUser}`
      );
      const postIdProductOrder1 = getuserbyId.data.dataUser;
      const avatar = postIdProductOrder1.imgavatar;
      const birthdayDay = postIdProductOrder1.birthday.split("T")[0];
      setInitialBirthday(birthdayDay);
      setImageAvartar(avatar);
      setSelectedImage(avatar);
      setdata(postIdProductOrder1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, []);

  // ====================================================================> Xử lý Form Profile

  //tạo link ảnh tạm thời
  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setImageAvartar(selectedFile);
      setSelectedImage(URL.createObjectURL(selectedFile) as any);
    }
  };

  // set trạng thái sang  edit
  const hanldelEditProfile = () => {
    setEditProfile(2);
  };

  // Cập nhật ngày ban đầu trong trạng thái tạm thời
  const handleBirthdayChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialBirthday(e.target.value);
  };

  //nút lấy values trong form
  const handlegetfromProfile = (e: ChangeEvent<HTMLInputElement>) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  // =======================================================================================> Xử lý From Profile
  // nút save editform
  const hanldelSaveEditProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setEditProfile(1);
    // Tạo đối tượng FormData để đưa dữ liệu và file vào
    const formData = new FormData();

    // Đưa các trường thông tin sản phẩm vào FormData
    formData.append("imageAvartar", imageAvartar);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("address", data.address);
    formData.append("birthday", initialBirthday);

    // Gửi dữ liệu lên server bằng Axios
    const datareturn = await axios.patch(
      `http://localhost:8888/api/v1/user/patchuserformprofile/${idUser}`,
      formData
    );

    if (datareturn.status === 200) {
      toast.success("Change Profile in successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false);
      dispatch(Avatarupdate());
      dispatch(CartItem());
    } else {
      setIsLoading(false);
      toast.error("ERROR", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // =======================================================================================> Xử lý From Password

  //nút lấy values trong form password
  const handlegetfromProfilePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "passwords") {
      setpasswordserr("");
    }
    if (e.target.name === "Newpassword") {
      setNewpassworderr("");
    }
    if (e.target.name === "RepeatNewPassword") {
      setRepeatNewPassworderr("");
    }
    setdataPassword({ ...dataPassword, [e.target.name]: e.target.value });
  };

  // nút save password
  const hanldelSaveEditPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      dataPassword.passwords === "" ||
      dataPassword.Newpassword === "" ||
      dataPassword.RepeatNewPassword === "" ||
      dataPassword.Newpassword !== dataPassword.RepeatNewPassword
    ) {
      if (dataPassword.passwords === "") {
        setpasswordserr("PASSWORD MUST NOT BE BLANK");
      }
      if (dataPassword.Newpassword === "") {
        setNewpassworderr("NEW PASSWORD MUST NOT BE BLANK");
      }
      if (dataPassword.RepeatNewPassword === "") {
        setRepeatNewPassworderr("REPERT NEW PASSWORDS MUST NOT BE BLANK");
      }
      if (dataPassword.Newpassword !== dataPassword.RepeatNewPassword) {
        setNewpassworderr("PASSWORD AND NEW PASSWORD DO NOT MATCH");
        setRepeatNewPassworderr("PASSWORD AND NEW PASSWORD DO NOT MATCH");
      }
    } else {
      setIsLoading(true);
      // Tạo đối tượng FormData để đưa dữ liệu và file vào
      const formData = new FormData();

      // Đưa các trường thông tin sản phẩm vào FormData
      formData.append("passwords", dataPassword.passwords);
      formData.append("Newpassword", dataPassword.Newpassword);
      formData.append("RepeatNewPassword", dataPassword.RepeatNewPassword);

      // Gửi dữ liệu lên server bằng Axios
      const datareturn = (await axiosSub.patch(
        `/api/v1/user/patchuserpassword/${idUser}`,
        formData
      )) as any;

      setdataPassword({
        passwords: "",
        Newpassword: "",
        RepeatNewPassword: "",
      });
      setpasswordserr("");
      setNewpassworderr("");
      setRepeatNewPassworderr("");
      setIsLoading(false);
      if (datareturn.status === 200) {
        toast.success(datareturn.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setIsLoading(false);
        toast.error(datareturn.response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const show1 = () => {
    setShowPassword(!showPassword);
  };
  const show2 = () => {
    setShowPassword1(!showPassword1);
  };
  const show3 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="totalprofile1">
      {isLoading && <LoadingComponent />}
      <p>PROFILE</p>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="totalprofile">
        <div className="contentUsername">
          <p>EMAIL : {data?.email}</p>
        </div>
        {statusChangeuser1 && statusChangeuser1 === "1" ? (
          <>
            {/* form edit profile */}
            <form
              action="/addproducts"
              method="post"
              encType="multipart/form-data"
              onSubmit={hanldelSaveEditProfile}
            >
              <div className="formProfile">
                <div className="avatarprofile1">
                  <div className="avatarprofile">
                    <img src={selectedImage} alt="Avatar" />
                    {editProfile === 1 ? null : (
                      <>
                        <label htmlFor="avatar">
                          <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          <i
                            className="fa-solid fa-camera"
                            style={{ color: "#977d67" }}
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
                <div className="formLabelInput">
                  <label htmlFor="email">UserName :</label>
                  <input
                    type="text"
                    id="email"
                    name="username"
                    value={data?.username}
                    onChange={handlegetfromProfile}
                    readOnly={editProfile !== 2}
                  />

                  <label htmlFor="phonenumber">Phone Number:</label>
                  <input
                    type="text"
                    id="phonenumber"
                    name="phoneNumber"
                    value={data?.phoneNumber}
                    onChange={handlegetfromProfile}
                    readOnly={editProfile !== 2}
                  />

                  <label htmlFor="birthday">Birthday:</label>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={initialBirthday}
                    onChange={handleBirthdayChange}
                    readOnly={editProfile !== 2}
                  />

                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={data?.address}
                    onChange={handlegetfromProfile}
                    readOnly={editProfile !== 2}
                  />
                </div>
              </div>
              <div className="btnSubmitFormProfile">
                {editProfile === 1 ? null : (
                  <button id="btnSubmitFormProfile1" type="submit">
                    Save
                  </button>
                )}
              </div>
            </form>
            <div className="btnSubmitFormProfile">
              {editProfile !== 1 ? null : (
                <button
                  id="btnSubmitFormProfile1"
                  onClick={() => hanldelEditProfile()}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            {/* form password */}
            <form onSubmit={hanldelSaveEditPassword}>
              <div className="formProfile">
                <div className="formLabelInput1">
                  <label htmlFor="password">Password:</label>
                  <div className="inputformpassword">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="passwords"
                      className="inpformpassword"
                      placeholder="Please enter here if you want to change your password"
                      value={dataPassword?.passwords}
                      onChange={handlegetfromProfilePassword}
                    />
                    <i onClick={() => show1()} id="btnshowhide">
                      {showPassword ? (
                        <img src={images.View} alt="caption" />
                      ) : (
                        <img src={images.Hide} alt="caption" />
                      )}
                    </i>
                    <span>{passwordserr}</span>
                  </div>

                  <label htmlFor="newpassword">New Password:</label>
                  <div className="inputformpassword">
                    <input
                      type={showPassword1 ? "text" : "password"}
                      className="inpformpassword"
                      id="Newpassword"
                      name="Newpassword"
                      placeholder="Please enter here if you want to change your password"
                      value={dataPassword?.Newpassword}
                      onChange={handlegetfromProfilePassword}
                    />
                    <i onClick={() => show2()} id="btnshowhide">
                      {showPassword1 ? (
                        <img src={images.View} alt="caption" />
                      ) : (
                        <img src={images.Hide} alt="caption" />
                      )}
                    </i>
                    <span>{Newpassworderr}</span>
                  </div>

                  <label htmlFor="Repeatpassword">Repeat new password:</label>
                  <div className="inputformpassword">
                    <input
                      type={showPassword2 ? "text" : "password"}
                      id="RepeatNewPassword"
                      className="inpformpassword"
                      name="RepeatNewPassword"
                      placeholder="Please enter here if you want to change your password"
                      value={dataPassword?.RepeatNewPassword}
                      onChange={handlegetfromProfilePassword}
                    />
                    <i onClick={() => show3()} id="btnshowhide">
                      {showPassword2 ? (
                        <img src={images.View} alt="caption" />
                      ) : (
                        <img src={images.Hide} alt="caption" />
                      )}
                    </i>
                    <span>{RepeatNewPassworderr}</span>
                  </div>
                </div>
              </div>
              <div className="btnSubmitFormProfile">
                <button id="btnSubmitFormProfile1" type="submit">
                  Save
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Formeditprofile;
