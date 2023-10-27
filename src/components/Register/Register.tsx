import "./Register.css";
import "react-toastify/dist/ReactToastify.css";

import FormData from "form-data";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { images } from "../../assets/img/img";
import { register } from "../../reudux/reduce/userSlice";
import { IGetform } from "../../types/Type";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const Register: React.FC = () => {
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogin");
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const [imageAvartar, setImageAvartar] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //tạo oject rỗng chứa from
  const [getform, setgetform] = useState<IGetform>({
    username: "",
    email: "",
    passwords: "",
    phoneNumber: "",
    birthday: "",
    address: "",
  });

  // tạo oject rỗng để validate
  const [username, setusername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [birthday, setbirthday] = useState("");
  const [address, setaddress] = useState("");

  //  chức năng lấy dữ liệu từ form
  const handlegetform = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setusername("");
    }
    if (e.target.name === "email") {
      setErrorEmail("");
    }
    if (e.target.name === "passwords") {
      setErrorPass("");
    }
    if (e.target.name === "phoneNumber") {
      setphoneNumber("");
    }
    if (e.target.name === "birthday") {
      setbirthday("");
    }
    if (e.target.name === "address") {
      setaddress("");
    }
    setgetform({ ...getform, [e.target.name]: e.target.value });
  };

  // chuyển hướng đăng nhập thành công
  const returnHome = () => {
    navigate("/auth/Login");
  };

  //tạo link ảnh tạm thời
  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setImageAvartar(selectedFile);
      setSelectedImage(URL.createObjectURL(selectedFile) as any);
    }
  };

  // kiểm tra validate và chuyển dữ liệu đi
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (
      getform.username === "" ||
      getform.email === "" ||
      getform.passwords === "" ||
      getform.phoneNumber === "" ||
      getform.birthday === "" ||
      getform.address === ""
    ) {
      if (getform.username === "") {
        setusername("USERNAME MUST NOT BE BLANK");
      }
      if (getform.email === "") {
        setErrorEmail("EMAIL MUST NOT BE BLANK");
      }
      if (getform.passwords === "") {
        setErrorPass("PASSWORDS MUST NOT BE BLANK");
      }
      if (getform.phoneNumber === "") {
        setphoneNumber("PHONE NUMBER MUST NOT BE BLANK");
      }
      if (getform.birthday === "") {
        setbirthday("BIRTHDAY MUST NOT BE BLANK ");
      }
      if (getform.address === "") {
        setaddress("ADDRESS MUST NOT BE BLANK");
      }
    } else {
      const formdata = new FormData(); // Tạo đối tượng FormData để đưa dữ liệu và file vào

      // Đưa các trường thông tin sản phẩm vào FormData
      formdata.append("imageAvartar", imageAvartar);
      formdata.append("username", getform.username);
      formdata.append("email", getform.email);
      formdata.append("passwords", getform.passwords);
      formdata.append("phoneNumber", getform.phoneNumber);
      formdata.append("birthday", getform.birthday);
      formdata.append("address", getform.address);

      const data = await dispatch(register(formdata) as any).unwrap();

      if (data?.status === 200) {
        toast.success("Register in successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
        data && setTimeout(returnHome, 2000);
      } else {
        setIsLoading(false);
        toast.error(data?.response?.data?.msg, {
          position: "top-right",
          autoClose: 5000,
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

  return (
    <div className="registercomponent1">
      {isLoading && <LoadingComponent />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
      <div className="registercomponent2">
        <div className="registerimg">
          <img src="https://sassnet.com/images/sass-logo-2.png" alt="caption" />
        </div>
      </div>

      <form
        className="registerform"
        action="/addproducts"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="totalformchooseavatar">
          <div className="formchooseavatar">
            <label htmlFor="" id="labelavatar2">
              AVATAR
            </label>
            <label htmlFor="avatar1" id="labelavatar1">
              <input
                id="avatar1"
                type="file"
                name="imageAvartar"
                onChange={handleImageChange}
              />
              CHOOSE IMAGE
            </label>
          </div>
          <div className="imageAvatar">
            {selectedImage && <img src={selectedImage} alt="Selected" />}
          </div>
        </div>

        <label htmlFor="">USERNAME</label>
        <br />
        <input type="text" name="username" onChange={handlegetform} />
        <span>{username}</span>
        <br />
        <label htmlFor="">EMAIL</label>
        <br />
        <input type="text" name="email" onChange={handlegetform} />
        <span>{errorEmail}</span>
        <br />
        <label htmlFor="">PASSWORD</label>
        <br />
        <div className="validateregister">
          <input
            type={showPassword ? "text" : "password"}
            name="passwords"
            onChange={handlegetform}
          />
          <i onClick={() => show1()} id="btnshowhide2">
            {showPassword ? (
              <img src={images.View} alt="caption" />
            ) : (
              <img src={images.Hide} alt="caption" />
            )}
          </i>
          <span>{errorPass}</span>
        </div>

        <br />
        <label htmlFor="">PHONE NUMBER</label>
        <br />
        <input type="text" name="phoneNumber" onChange={handlegetform} />
        <span>{phoneNumber}</span>
        <br />
        <label htmlFor="">BIRTHDAY</label>
        <br />
        <input type="date" name="birthday" onChange={handlegetform} />
        <span>{birthday}</span>
        <br />
        <label htmlFor="">ADDRESS</label>
        <br />
        <input
          type="text"
          name="address"
          placeholder="DA NANG"
          onChange={handlegetform}
        />
        <span>{address}</span>
        <br />
        <div className="btnregister1">
          <div className="btnregister">
            <button type="submit">REGISTER</button>
          </div>
        </div>

        <div className="btnnextpage">
          <Link className="gotohome" to={"/"}>
            Go to Home
          </Link>
          <Link className="gotohome" to={"/auth/Login"}>
            Go to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
