import "./Odermanager.css";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

import axiosClient from "../../api/axiosClient";
import { CartItem } from "../../redux/reduce/OrderSlice";
import { IOdermanagers } from "../../Types/Type";

const Odermanager: React.FC = () => {
  const dispatch = useDispatch();
  const [data, setdata] = useState<IOdermanagers[]>([]);
  const [CallAPI, setCallAPI] = useState(true);

  function formatDate(date: string) {
    return date.split("T")[0];
  }
  // gọi API lần đầu
  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axiosClient.get(
        `/api/v1/history/getallhistory`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;
      setdata(postIdProductOrder1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, [CallAPI]);

  //phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang

  // Tính tổng số trang dựa trên dữ liệu sản phẩm và số sản phẩm trên mỗi trang
  const pageCount = Math.ceil(data.length / productsPerPage);

  // Tính chỉ số của sản phẩm đầu tiên trên trang hiện tại
  const offset = currentPage * productsPerPage;
  const currentProducts = data.slice(offset, offset + productsPerPage);

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleapprove = async (id: number) => {
    try {
      await axiosClient.patch(`/api/v1/history/poststatushistory/${id}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    dispatch(CartItem());
    setCallAPI(!CallAPI);
  };

  return (
    <div>
      <div className="adminuser">
        <table className="tableuser">
          <tr>
            <th>NO</th>
            <th>USERNAME</th>
            <th>NUMBER PHONE</th>
            <th>ADDRESS</th>
            <th>PRODUCT NAME</th>
            <th>COLOR</th>
            <th>ORDER DATE</th>
            <th>QUANTITY</th>
            <th>TOTAL PRICE</th>
            <th>ACTION</th>
          </tr>

          {currentProducts.length > 0 &&
            currentProducts.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data?.user?.username}</td>
                  <td>+84 {data?.user?.phoneNumber}</td>
                  <td>{data?.user?.address}</td>
                  <td>{data?.product?.nameProduct}</td>
                  <td>{data?.product?.color}</td>
                  <td>{formatDate(data?.createdAt)}</td>
                  <td>{data?.Quantity}</td>
                  <td>{data?.Total_Price}</td>
                  <td>
                    {data?.Status_history == 1 ? (
                      <>
                        <button
                          id="notapprove"
                          onClick={() => handleapprove(data?.History_id)}
                        >
                          NOT APPROVED YET
                        </button>
                      </>
                    ) : (
                      <>
                        <button id="approve">APPROVED</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </table>
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default Odermanager;
