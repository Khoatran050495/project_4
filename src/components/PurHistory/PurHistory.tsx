import "./PurHistory.css";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { axiosClient } from "../../api/axiosClient";
import { IHistory } from "../../types/Type";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const PurHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState<IHistory[]>([]);
  const user = JSON.parse(localStorage.getItem("userLogin") as string);
  const idUser = user?.id;

  // phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  // Tính tổng số trang dựa trên dữ liệu và số dòng trên mỗi trang
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Tính chỉ số của dữ liệu đầu tiên trên trang hiện tại
  const offset = currentPage * itemsPerPage;
  const currentData = data.slice(offset, offset + itemsPerPage);

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  // gọi API lần đầu
  const fetchDataHistory = async () => {
    try {
      const postIdProductOrder = await axiosClient.get(
        `/api/v1/history/posthistory/${idUser}`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;
      setdata(postIdProductOrder1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataHistory();
  }, []);

  function formatDate(date: string) {
    return date.split("T")[0];
  }

  return (
    <div className="cart-page1">
      {isLoading && <LoadingComponent />}
      <div>
        <table className="table-cart1">
          <thead>
            <tr>
              <th>NO</th>
              <th>PRODUCT NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>DATE</th>
              <th>TOTAL MONEY</th>
              <th>PAYMENTS</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.product.nameProduct}</td>
                  <td>{data.product.price.toLocaleString("en-GB")}</td>
                  <td>{data.Quantity}</td>
                  <td>{formatDate(data.createdAt)}</td>
                  <td>{Number(data.Total_Price)?.toLocaleString("en-GB")}</td>
                  <td>
                    {data.Payment == 1 ? (
                      <p>CASH</p>
                    ) : data.Payment == 4 ? (
                      <p>Agribank</p>
                    ) : data.Payment == 4 ? (
                      <p>Agribank</p>
                    ) : data.Payment == 5 ? (
                      <p>Vietcombank</p>
                    ) : (
                      <p>PayPal</p>
                    )}
                  </td>
                  <td className="btnoutlinedanger1">
                    {data.Status_history == 1 ? (
                      <p id="pending">PENDING</p>
                    ) : (
                      <p>SUCCESS</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {currentData.length > 0 ? (
        <>
          {currentData.length < 10 ? null : (
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
          )}
        </>
      ) : (
        <p id="noteorder">No purchase history</p>
      )}
    </div>
  );
};

export default PurHistory;
