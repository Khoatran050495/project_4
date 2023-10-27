import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { axiosClient } from "../../api/axiosClient";
import { images } from "../../assets/img/img";
import { login } from "../../reudux/reduce/userSlice";
import { ILogin } from "../../types/Type";
import { loginWithGoogle } from "../../Utils/Commonfunction";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
const Login: React.FC = () => {
  //==========================================================================================> gọi APi lần đầu

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

  //========================================================================> tạo biến

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, seterror] = useState<string>();
  const [getform, setgetform] = useState<ILogin>({
    email: "",
    passwords: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [statusformlogin, setstatusformlogin] = useState(1);
  const [getformforgot, setgetformforgot] = useState({
    email: "",
  });
  const [dataiduser, setdataiduser] = useState<number>();
  const [getformsubmitpass, setgetformsubmitpass] = useState({
    yourcode: "",
    newpassword: "",
    repeatpassword: "",
  });

  //=================================================================================> validate form login
  // tạo oject rỗng để validate form login
  const [erroremail, errorsetemail] = useState("");
  const [errorpasswords, setErrorpasswords] = useState("");

  //tạo oject rỗng để validate form getcode
  const [errorgetcode, setErrorgetcode] = useState("");
  const [errorgetcodeAPI, setErrorgetcodeAPI] = useState("");

  //tạo oject rỗng để validate form submit get password
  const [errorsubmitpass, setErrorsubmitpass] = useState("");
  const [errorsubmitnewpass, setErrorsubmitnewpass] = useState("");
  const [errorsubmitrepass, setErrorsubmitrepass] = useState("");

  //========================================================================>lấy dữ liệu login để gửi đi

  const handlegetform = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      errorsetemail("");
      seterror("");
    }
    if (e.target.name === "passwords") {
      setErrorpasswords("");
      seterror("");
    }
    setgetform({
      ...getform,
      [e.target.name]: e.target.value,
    });
  };

  //========================================================================> gửi dữ liệu đi
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (getform.email === "" || getform.passwords === "") {
      if (getform.email === "") {
        setIsLoading(false);
        errorsetemail("Email must not be blank");
      }
      if (getform.passwords === "") {
        setIsLoading(false);
        setErrorpasswords("Password must not be blank");
      }
    } else {
      let data = await dispatch(login(getform) as any).unwrap();
      if (data.message === "Request failed with status code 401") {
        setIsLoading(false);
        seterror("Email or password incorrect");
      } else if (data === "error") {
        setIsLoading(false);
        seterror("You do not have access");
      } else {
        navigate("/");
      }
    }
  };
  //================================================================> mắt ẩn hiện
  const show1 = () => {
    setShowPassword(!showPassword);
  };

  const show2 = () => {
    setShowPassword1(!showPassword1);
  };

  const show3 = () => {
    setShowPassword2(!showPassword2);
  };

  //================================================================> ẩn hiện form lấy password
  const setstatusform = () => {
    setstatusformlogin(2);
  };

  //================================================================> lấy dữ liệu form forgot password
  const handlegetformforgotpassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.name === "email") {
      setErrorgetcode("");
      setErrorgetcodeAPI("");
    }
    setgetformforgot({ ...getformforgot, [e.target.name]: e.target.value });
  };

  //================================================================> gửi dữ liệu form forgot password
  const handleSubmitformforgotpassword = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    if (getformforgot.email === "") {
      setErrorgetcode("Email must not be blank");
    } else {
      try {
        const dataAPI = await axios.post(
          `http://localhost:8888/api/v1/user/postuserforgot`,
          getformforgot
        );
        setgetformforgot({ email: "" });
        setdataiduser(dataAPI.data.dataiduser);
        toast.success("Get code successfully", {
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
        setstatusformlogin(3);
      } catch (error) {
        setIsLoading(false);
        setErrorgetcodeAPI("Email not found");
      }
    }
  };

  //================================================================> lấy dữ liệu form submit password

  const handlegetformsubmitpassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.name === "yourcode") {
      setErrorsubmitpass("");
    }
    if (e.target.name === "newpassword") {
      setErrorsubmitnewpass("");
      setErrorsubmitrepass("");
    }
    if (e.target.name === "repeatpassword") {
      setErrorsubmitrepass("");
      setErrorsubmitnewpass("");
    }
    setgetformsubmitpass({
      ...getformsubmitpass,
      [e.target.name]: e.target.value,
    });
  };

  //================================================================> gửi dữ liệu form forgot password

  const handlesubmitformpassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      getformsubmitpass.yourcode === "" ||
      getformsubmitpass.newpassword === "" ||
      getformsubmitpass.repeatpassword === "" ||
      getformsubmitpass.newpassword !== getformsubmitpass.repeatpassword
    ) {
      if (getformsubmitpass.yourcode === "") {
        setErrorsubmitpass("Code must not be blank");
      }
      if (getformsubmitpass.newpassword === "") {
        setErrorsubmitnewpass("Newpassword must not be blank");
      }
      if (getformsubmitpass.repeatpassword === "") {
        setErrorsubmitrepass("Repeat password must not be blank");
      }
      if (getformsubmitpass.newpassword !== getformsubmitpass.repeatpassword) {
        setErrorsubmitnewpass("Newpassword and repeat password do not match");
        setErrorsubmitrepass("Newpassword and repeat password do not match");
      }
      setIsLoading(false);
    } else {
      try {
        const data = {
          id: dataiduser,
          yourcode: getformsubmitpass.yourcode,
          newpassword: getformsubmitpass.newpassword,
          repeatpassword: getformsubmitpass.repeatpassword,
        };

        const dataAPI = await axios.post(
          `http://localhost:8888/api/v1/user/postsubmituserforgot`,
          data
        );
        toast.success(dataAPI.data.message, {
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
        setstatusformlogin(1);
        setgetformsubmitpass({
          yourcode: "",
          newpassword: "",
          repeatpassword: "",
        });
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (error.response.data.message === "Verification code has expired") {
          setstatusformlogin(2);
        }
      }
    }
  };

  const handleLoginGoogle = async () => {
    await loginWithGoogle();
  };

  return (
    <div>
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
      <div className="logincomponent1">
        <div className="logincomponent2">
          <div className="loginimg">
            <img
              src="https://sassnet.com/images/sass-logo-2.png"
              alt="caption"
            />
          </div>
        </div>

        {statusformlogin === 1 ? (
          <>
            <form className="loginform" onSubmit={handleSubmit}>
              <label htmlFor="">EMAIL</label>
              <br />
              <input
                type="text"
                name="email"
                value={getform.email}
                onChange={handlegetform}
              />
              <span id="spanerror">{erroremail}</span>
              <br />
              <label htmlFor="">PASSWORD</label>
              <br />
              <div className="validatepassword">
                <input
                  type={showPassword ? "text" : "password"}
                  name="passwords"
                  value={getform.passwords}
                  onChange={handlegetform}
                />
                <i onClick={() => show1()} id="btnshowhide1">
                  {showPassword ? (
                    <img src={images.View} alt="caption" />
                  ) : (
                    <img src={images.Hide} alt="caption" />
                  )}
                </i>
                <span id="spanerror">{errorpasswords}</span>
                <span id="spanerror">{error}</span>
              </div>
              <div className="btnlogin">
                <button type="submit">LOGIN</button>
              </div>
            </form>
            <div className="btngoogle3">
              <div className="btngoogle2">
                <p>OR</p>
              </div>
              <div className="btngoogle1">
                <button className="btngoogle" onClick={handleLoginGoogle}>
                  <div className="btngoogleicon">
                    <div className="btngoogleicon1">
                      <i
                        className="fa-brands fa-gofore"
                        style={{ color: "#992c20" }}
                      />
                    </div>
                    <div className="btngoogleicon2">
                      <p>Google</p>
                    </div>
                  </div>
                </button>

                <button className="btngoogle">
                  <div className="btngoogleicon">
                    <div className="btngoogleicon1">
                      <i
                        className="fa-brands fa-twitter"
                        style={{ color: "#992c20" }}
                      />
                    </div>
                    <div className="btngoogleicon2">
                      <p>Twitter</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </>
        ) : statusformlogin === 2 ? (
          <div>
            <form
              className="loginform"
              onSubmit={handleSubmitformforgotpassword}
            >
              <label htmlFor="">EMAIL</label>
              <br />
              <input
                type="text"
                name="email"
                id="inputemail"
                placeholder="Please enter your username to get the code"
                value={getformforgot.email}
                onChange={handlegetformforgotpassword}
              />
              <br />
              <span id="spanerror">{errorgetcode}</span>
              <span id="spanerror">{errorgetcodeAPI}</span>

              <div className="btngetcode">
                <button type="submit">GET CODE</button>
              </div>
            </form>
            <p id="formgetcode">
              * The code will be sent via the email you registered with
            </p>
          </div>
        ) : (
          <form className="loginform" onSubmit={handlesubmitformpassword}>
            <label htmlFor="">YOUR CODE</label>
            <br />
            <input
              type="text"
              name="yourcode"
              id="inputemail"
              placeholder="Please enter your code"
              value={getformsubmitpass.yourcode}
              onChange={handlegetformsubmitpassword}
            />
            <span id="spanerror">{errorsubmitpass}</span>
            <br />
            <label htmlFor="">NEW PASSWORD</label>
            <br />
            <div className="validatepassword">
              <input
                type={showPassword1 ? "text" : "password"}
                name="newpassword"
                id="inputemail"
                placeholder="Please enter your new password"
                value={getformsubmitpass.newpassword}
                onChange={handlegetformsubmitpassword}
              />
              <i onClick={() => show2()} id="btnshowhide1">
                {showPassword1 ? (
                  <img src={images.View} alt="caption" />
                ) : (
                  <img src={images.Hide} alt="caption" />
                )}
              </i>
              <span id="spanerror">{errorsubmitnewpass}</span>
            </div>

            <br />
            <label htmlFor="">REPEAT PASSWORD</label>
            <br />
            <div className="validatepassword">
              <input
                type={showPassword2 ? "text" : "password"}
                name="repeatpassword"
                id="inputemail"
                placeholder="Please re-enter new password"
                value={getformsubmitpass.repeatpassword}
                onChange={handlegetformsubmitpassword}
              />
              <i onClick={() => show3()} id="btnshowhide1">
                {showPassword2 ? (
                  <img src={images.View} alt="caption" />
                ) : (
                  <img src={images.Hide} alt="caption" />
                )}
              </i>
              <span id="spanerror">{errorsubmitrepass}</span>
            </div>

            <div className="btngetcode">
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        )}

        <div className="loginform1">
          <Link className="gotoregister" to={"/auth/register"}>
            Go to Register
          </Link>
          {statusformlogin === 1 ? (
            <button id="forgotPassword" onClick={() => setstatusform()}>
              Forgot Password
            </button>
          ) : null}

          <Link className="gotoregister" to={"/"}>
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
