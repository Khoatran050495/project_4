import "./PayComponent.css";

import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PayPalButtons } from "@paypal/react-paypal-js";

import { axiosClient, axiosSub } from "../../api/axiosClient";
import { images } from "../../assets/img/img";
import { CartItem } from "../../reudux/reduce/CartSlice";
// import { paypaltotalprice } from "../../reudux/reduce/totalprice";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const PayComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userLogin") as string);
  const idUser = user.id;
  const [paymentMethod, setPaymentMethod] = useState("1");
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const dispatch = useDispatch();

  //======================================================================================>gọi useSelecter render lần đầu
  const paypalmoney: any = useSelector<any>((state) => state.totalprice.data);

  // totaldata để render
  const newdata = paypalmoney[0];

  //  lọc ra cartitem để render
  const cartItem = newdata?.carditem;
  console.log(cartItem);

  // tính tổng tiền
  const totalprice = useMemo(() => {
    const total = cartItem?.reduce(
      (pre: any, urr: any) => pre + Number(urr.product.price) * urr.Quantity,
      0
    );
    return total;
  }, [cartItem]);

  //=======================================================================================>ẩn hiện class BANK TRANSFER

  const handleCashChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setShowBankTransfer(event.target.value === "2");
    setPaymentMethod(event.target.value);
  };

  const handleBankTransferChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  //===================================================================================>gửi lên server để lưu vào bảng history
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    // đẩy dữ liệu lên bảng history
    const historyData = cartItem.map((item: any) => ({
      Orders_id: newdata?.Orders_id,
      CartItem_id: item?.CartItem_id,
      Users_id: newdata?.Users_id,
      Product_id: item?.Product_id,
      Payment: paymentMethod,
      Quantity: item?.Quantity,
      Total_Price: Number(item?.Quantity * item?.product.price),
    }));

    //giảm số lượng trong kho
    cartItem.forEach((element: any) => {
      axiosSub.patch(
        `/api/v1/products/editquantityproducts/${element.Quantity}/${element.Product_id}`
      );
    });

    // xóa trong giỏ hàng

    try {
      await axiosClient.post(`/api/v1/history/posthistory`, historyData);
      await axiosClient.delete(`/api/v1/carditem/deletecarditemall/${idUser}`);
      dispatch(CartItem());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
    navigate("/purchase");
  };

  //===============================================================================> xử lý nút paypal
  const handlePaymentSuccess = async () => {
    setIsLoading(true);

    // đẩy dữ liệu lên bảng history
    const historyData = cartItem.map((item: any) => ({
      Orders_id: newdata?.Orders_id,
      CartItem_id: item?.CartItem_id,
      Users_id: newdata?.Users_id,
      Product_id: item?.Product_id,
      Payment: paymentMethod,
      Quantity: item?.Quantity,
      Total_Price: Number(item?.Quantity * item?.product?.price),
    }));

    //giảm số lượng trong kho
    cartItem.forEach((element: any) => {
      axiosSub.patch(
        `/api/v1/products/editquantityproducts/${element.Quantity}/${element.Product_id}`
      );
    });

    // xóa trong giỏ hàng

    try {
      await axiosClient.post(`/api/v1/history/posthistory`, historyData);
      await axiosClient.delete(`/api/v1/carditem/deletecarditemall/${idUser}`);
      dispatch(CartItem());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
    navigate("/purchase");
  };

  return (
    <div className="payment5">
      {isLoading && <LoadingComponent />}
      <div className="payment1">
        <p>SELECT A PAYMENT METHOD</p>
      </div>
      <div className="payment">
        <div className="payment7">
          <div className="payment4">
            <div className="informationuser">
              <p>USER NAME :</p>
              <p>{user.username}</p>

              <p>PHONE NUMBER :</p>
              <p>+84 {user.phoneNumber}</p>

              <p>EMAIL :</p>
              <p>{user.email}</p>

              <p>TOTAL PAYMENT :</p>
              <p>$ {totalprice?.toLocaleString("en-GB")}</p>
            </div>
            <form action="" className="payment3" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="cash">CASH</label>
                <select id="mycash" onChange={handleCashChange}>
                  <option value="1">Cash</option>
                  <option value="2">Transfer</option>
                  <option value="3">PayPal</option>
                </select>
              </div>
              {showBankTransfer && (
                <div className="form-group1">
                  <label htmlFor="bank">BANK TRANSFER</label>
                  <select id="mybank" onChange={handleBankTransferChange}>
                    <option value="">--Select--</option>
                    <option value="4">Agribank</option>
                    <option value="5">VP Bank</option>
                    <option value="6">OCB Bank</option>
                  </select>
                </div>
              )}

              <div className="btnpay1">
                {paymentMethod === "3" ? (
                  <div className="btnpaypal">
                    <PayPalButtons
                      style={{
                        layout: "horizontal",
                        height: 48,
                      }}
                      createOrder={(data, actions) => {
                        {
                          console.log(data);

                          console.log(totalprice);
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "USD",
                                  value: (Math.round(totalprice * 100) /
                                    100) as any, // Sử dụng giá trị totalAmount ở đây
                                },
                                description: `Purchase at ${new Date().toLocaleString()}`,
                              },
                            ],
                          });
                        }
                      }}
                      onApprove={(_, actions): any => {
                        return actions.order
                          ?.capture()
                          .then(() => handlePaymentSuccess());
                      }}
                    />
                  </div>
                ) : (
                  <button type="submit" className="btnpay">
                    SUBMIT
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="imgbank">
            {paymentMethod === "4" ? (
              <img src={images.Agribank} alt="agribank" />
            ) : paymentMethod === "5" ? (
              <img src={images.Vpbank} alt="vpbank" />
            ) : paymentMethod === "6" ? (
              <img src={images.Ocb} alt="ocbbank" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayComponent;
