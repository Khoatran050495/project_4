import "./CardComponent.css";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { axiosClient } from "../../api/axiosClient";
import { CartItem } from "../../reudux/reduce/CartSlice";
import { paypaltotalprice } from "../../reudux/reduce/totalprice";
import { ICartItem } from "../../types/Type";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const CardComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState<any>();
  const [fecthAPI, setfecthAPI] = useState(true);
  const id = JSON.parse(localStorage.getItem("userLogin") as string);
  const idUser = id?.id;
  const dispatch = useDispatch();
  // gọi API
  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axiosClient.get(
        `/api/v1/orders/getorders/${idUser}`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;
      dispatch(paypaltotalprice(postIdProductOrder1));
      setdata(postIdProductOrder1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, [fecthAPI]);

  // totaldata để render
  const newdata = data?.[0];

  //  lọc ra cartitem để render
  const cartItem = newdata?.carditem;

  // tính tổng tiền
  const totalprice = useMemo(() => {
    const total = cartItem?.reduce(
      (pre: any, urr: any) => pre + urr.product.price * urr.Quantity,
      0
    );
    return total;
  }, [cartItem]);

  const handlePlus = async (id: number) => {
    setIsLoading(true);
    await axiosClient.post(`/api/v1/carditem/postcarditem/${id}/${idUser}`);
    setfecthAPI(!fecthAPI);
    setIsLoading(false);
  };

  const handleMinus = async (id: number) => {
    setIsLoading(true);
    await axiosClient.post(`/api/v1/carditem/minuscarditem/${id}/${idUser}`);
    setfecthAPI(!fecthAPI);
    dispatch(CartItem());
    setIsLoading(false);
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    await axiosClient.delete(`/api/v1/carditem/deletecarditem/${id}/${idUser}`);
    setfecthAPI(!fecthAPI);
    dispatch(CartItem());
    setIsLoading(false);
  };

  return (
    <div className="cart-page">
      {isLoading && <LoadingComponent />}
      <div>
        <table className="table-cart">
          <thead>
            <tr>
              <th>NO</th>
              <th>PRODUCT PICTURES</th>
              <th>PRODUCT NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL MONEY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cartItem?.map((item: ICartItem, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.product.imgSmall} alt="Ảnh sản phẩm" />
                  </td>
                  <td>{item.product.nameProduct}</td>
                  <td className="text-danger">{Number(item.product.price)}</td>
                  <td className="quantityshoppingcart">
                    <button onClick={() => handleMinus(item.Product_id)}>
                      -
                    </button>
                    <span className="mx-3 bg-white">
                      {Number(item.Quantity)}
                    </span>
                    <button onClick={() => handlePlus(item.Product_id)}>
                      +
                    </button>
                  </td>
                  <td className="fw-bold ">
                    {Number(
                      item?.Quantity * item?.product.price
                    )?.toLocaleString("en-GB")}
                  </td>
                  <td>
                    <button
                      className="btnoutlinedanger"
                      onClick={() => handleDelete(item.Product_id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {cartItem?.length > 0 ? (
        <div className="totalpayment">
          <div className="total-money">
            <b>TOTAL PAYMENT : </b>
            <span className="spantotalpayment">
              {totalprice?.toLocaleString("en-GB")}
            </span>
          </div>
          <Link className="btntoltalpayment" to={"/pay"}>
            PAY
          </Link>
        </div>
      ) : (
        <p id="noteorder">Currently there are no orders</p>
      )}
    </div>
  );
};

export default CardComponent;
