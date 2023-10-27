import "./Details.css";
import "react-toastify/dist/ReactToastify.css";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { axiosClient, axiosSub } from "../../api/axiosClient";
import { CartItem } from "../../reudux/reduce/CartSlice";

const Details: React.FC = () => {
  //================================================================> khởi tạo biến
  const [data, setData] = useState<any>([]);
  const [iscall, setiscall] = useState(true);
  const getidproduct = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const idproduct = Number(getidproduct.id);
  const [rating, setRating] = useState(0);
  const [comment, setcomment] = useState("");
  const [getcomment, setgetcomment] = useState<[]>([]);
  const User = JSON.parse(localStorage.getItem("userLogin") as string);

  //================================================================> bắt đầu gọi api
  const fetchData = async () => {
    try {
      const response = await axiosSub.get(
        `/api/v1/products/getproducts/${idproduct}`
      );
      const newresponse = response.data.data;
      const product = newresponse[0];
      setData(product);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [iscall]);

  //===================================================================================>add sản phẩm
  const handleAddCart = async (id: number) => {
    if (User) {
      const idUser = User.id;
      console.log(User);

      try {
        await axiosClient.post(`/api/v1/carditem/postcarditem/${id}/${idUser}`);
        navigate("/cardcomponent");
        dispatch(CartItem());
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    } else {
      navigate("/auth/login");
    }
  };

  //==================================================================================>get sao về
  const getstar = async () => {
    try {
      const idUser = User.id;
      const star1: any = await axiosSub.get(
        `/api/v1/comment/getstart/${idproduct}/${idUser}`
      );
      const star2 = star1.data.findstart.start;
      setRating(star2);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  useEffect(() => {
    getstar();
  }, [iscall]);

  //==================================================================================> get comment về

  const hendlegetComment = async () => {
    try {
      const getcomment: any = await axiosSub.get(
        `/api/v1/comment/getcomment/${idproduct}`
      );

      const comment = getcomment.data.findComment;
      const comment1 = comment.filter(
        (findcomment: any) => findcomment.comment !== null
      );
      setgetcomment(comment1);
    } catch (error) {
      console.error("Error getting comment:", error);
    }
  };
  useEffect(() => {
    hendlegetComment();
  }, [iscall]);

  //==================================================================================>vote sao
  const handleVote = (newRating: number) => {
    if (newRating === rating) {
      // Nếu người dùng nhấp vào ngôi sao đã được chọn, giảm điểm
      setRating(rating - 1);
    } else {
      // Nếu người dùng nhấp vào ngôi sao chưa được chọn, cập nhật điểm mới
      setRating(newRating);
    }
  };

  //====================================================================================>handle vote sao
  const handleVoteStartComment = async (id: number) => {
    if (User) {
      const idUser = User.id;
      const ratingstart = {
        star: rating,
      };

      const data: any = await axiosSub.post(
        `/api/v1/comment/poststar/${id}/${idUser}`,
        ratingstart
      );

      if (data.status === 200) {
        toast.success(data?.data.msg, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setiscall(!iscall);
      } else {
        toast.error(data?.response.data.msg, {
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
    } else {
      navigate("/auth/login");
    }
  };

  //==================================================================================> handle lấy comment
  const handlegetvaluecomment = (e: ChangeEvent<HTMLInputElement>) => {
    setcomment(([e.target.name] = e.target.value));
  };

  //=====================================================================================> handle gửi comment đi
  const handlesendcomment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (User) {
      const idproduct = data.id;
      const idUser = User.id;
      const valuecomment = { comment: comment };

      const getapi: any = await axiosSub.post(
        `/api/v1/comment/postcomment/${idproduct}/${idUser}`,
        valuecomment
      );

      if (getapi.status === 200) {
        toast.success(getapi?.data.msg, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setcomment("");
        setiscall(!iscall);
      } else {
        toast.error(getapi?.response.data.msg, {
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
    } else {
      navigate("/auth/login");
    }
  };

  // xét điều kiện hiển thị placeholder comment
  const isUserIdInComments: any = getcomment?.find(
    (idcomment: any) => idcomment?.Users_id === User?.id
  );

  return (
    <div className="detailstotal">
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
      <p>DETAILS</p>
      <div className="detailspay">
        <div className="detailspay1">
          <p>Name: {data.nameProduct}</p>
          <p>Only: $ {data.price}</p>
          <div className="votestartdetails">
            <div className="votestartdetails1">
              {/* Tạo các thẻ <i> theo số lượng sao */}
              {Array.from({ length: data.totalStart }, (_, i) => (
                <i
                  key={i}
                  className="fa-solid fa-star"
                  style={{ color: "#ffbb00" }}
                />
              ))}
              {/* Tạo các thẻ <i> còn lại với màu xám */}
              {Array.from({ length: 5 - data.totalStart }, (_, i) => (
                <i
                  key={i}
                  className="fa-regular fa-star"
                  style={{ color: "#ccc" }}
                />
              ))}
            </div>
            <div className="votestartdetails2">
              <p>{data.commentCount}/Reviews</p>
            </div>
          </div>
          <div className="btnmaddtocart">
            <button onClick={() => handleAddCart(data.id)}>
              <b>ADD TOO CART</b>
            </button>
          </div>
        </div>
        <div className="detailimg">
          <img src={data.imgBig} alt="cap" />
        </div>
      </div>

      <div className="escriptiondetails">
        <p>Description</p>
        <p>{data.content}</p>
      </div>
      <div>
        <p>Specs</p>
        <table className="detailstable">
          <thead>
            <tr>
              {data?.type == "bullet" ? (
                <>
                  <th>Manufacturer</th>
                  <th>Caliber</th>
                  <th>Ammo Type</th>
                  <th>Ammo Weight</th>
                  <th>Pellet Shape</th>
                  <th>Pellet Quantity</th>
                </>
              ) : (
                <>
                  <th>Manufacturer</th>
                  <th>Caliber</th>
                  <th>Velocity</th>
                  <th>Conditions</th>
                  <th>Ammo Type</th>
                  <th>Actions</th>
                  <th>Barrel Style</th>
                  <th>Fire Mode</th>
                  <th>Gun Weight</th>
                  <th>Loudness</th>
                  <th>Mechanism</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              {data?.type == "bullet" ? (
                <>
                  <td>{data.spesc_manufacturer}</td>
                  <td>{data.spesc_caliber}</td>
                  <td>{data.spesc_ammo_type}</td>
                  <td>{data.spesc_Ammo_Weight}</td>
                  <td>{data.spesc_Pellet_Shape}</td>
                  <td>{data.spesc_Pellet_Quantity}</td>
                </>
              ) : (
                <>
                  <td>{data?.spesc_manufacturer}</td>
                  <td>{data?.spesc_caliber}</td>
                  <td>{data?.spesc_velocity}</td>
                  <td>{data?.spesc_conditions}</td>
                  <td>{data?.spesc_ammo_type}</td>
                  <td>{data?.spesc_actions}</td>
                  <td>{data?.spesc_barrel_style}</td>
                  <td>{data?.spesc_fire_mode}</td>
                  <td>{data?.spesc_gun_weight}</td>
                  <td className="hightlow">
                    {data?.spesc_loudness === 1 ? (
                      <p>Low</p>
                    ) : data?.spesc_loudness === 2 ? (
                      <p>Medium</p>
                    ) : (
                      <p>Hight</p>
                    )}
                  </td>
                  <td>{data?.spesc_mechanism}</td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="reviewsstart">
        <p>Reviews</p>
        <div className="reviewsstart1">
          <div className="reviewsstart2">
            <p>Average Customer Review</p>
            {/* <p>{rating}/5 start</p> */}
            <div className="votestartdetails1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleVote(star)}
                  style={{ cursor: "pointer" }}
                >
                  {star <= rating ? (
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#ffbb00" }}
                    />
                  ) : (
                    <i
                      className="fa-regular fa-star"
                      style={{ color: "#ffbb00" }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="votestart">
          <button onClick={() => handleVoteStartComment(data.id)}>
            <b>VOTE START</b>
          </button>
        </div>
      </div>
      <div className="commentTotal">
        <p>COMMENT</p>
        <div className="totalComment2">
          <div className="totalComment1">
            <div className="totalComment">
              {getcomment?.length > 0 ? (
                getcomment?.map((comment: any, index: number) => (
                  <div key={index} className="commenttask">
                    <div>
                      <div className="commenttask1">
                        <img src={comment?.user?.imgavatar} alt="avatar" />
                        <ul>
                          <li>
                            {comment?.user?.username}:
                            <span id="comment1"> {comment?.comment}</span>
                          </li>
                          <li>
                            <div className="votestartdetails1">
                              {/* Tạo các thẻ <i> theo số lượng sao */}
                              {Array.from(
                                { length: comment?.start },
                                (_, i) => (
                                  <i
                                    key={i}
                                    className="fa-solid fa-star"
                                    style={{ color: "#ffbb00" }}
                                  />
                                )
                              )}
                              {/* Tạo các thẻ <i> còn lại với màu xám */}
                              {Array.from(
                                { length: 5 - comment?.start },
                                (_, i) => (
                                  <i
                                    key={i}
                                    className="fa-regular fa-star"
                                    style={{ color: "#ccc" }}
                                  />
                                )
                              )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="commenttask4">
                      <p>{comment?.updatedAt?.split("T")[0]}</p>
                      <p>{comment?.updatedAt?.split("T")[1].split(".")[0]}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>NO COMMENTS YET</p>
              )}
              <div className="empty-space"></div>
            </div>
          </div>
          <div className="commenttask3">
            <form id="formcontent1" onSubmit={handlesendcomment}>
              <input
                type="text"
                id="inputComnent"
                name="comment"
                value={comment}
                placeholder={
                  User?.id === undefined
                    ? "Would you like to comment?"
                    : isUserIdInComments === undefined
                    ? "Would you like to comment?"
                    : "Do you want to edit your comment?"
                }
                onChange={handlegetvaluecomment}
              />
              <button id="btncomment" type="submit">
                {User?.id === undefined ? (
                  <i
                    className="fa-solid fa-paper-plane fa-beat"
                    style={{ color: "#ABBE67" }}
                  />
                ) : isUserIdInComments === undefined ? (
                  <i
                    className="fa-solid fa-paper-plane fa-beat"
                    style={{ color: "#ABBE67" }}
                  />
                ) : (
                  <i
                    className="fa-solid fa-paper-plane fa-beat"
                    style={{ color: "#FFBB00" }}
                  />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
