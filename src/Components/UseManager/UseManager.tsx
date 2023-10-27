import "./UseManager.css";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import axiosClient from "../../api/axiosClient";
import { IUserManagement } from "../../Types/Type";

const UseManager: React.FC = () => {
  const [data, setdata] = useState<IUserManagement[]>([]);

  const [CallAPI, setCallAPI] = useState(true);
  // gọi API lần đầu
  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axiosClient.get(
        `/api/v1/user/getalluser`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;
      console.log(postIdProductOrder1);

      setdata(postIdProductOrder1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, [CallAPI]);

  function formatDate(date: string) {
    return date.split("T")[0];
  }

  const handleActive = async (id: number) => {
    try {
      const newdata = { status: 1 };
      await axiosClient.patch(`/api/v1/user/patchuser/${id}`, newdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setCallAPI(!CallAPI);
  };

  const handleUnActive = async (id: number) => {
    try {
      const newdata = { status: 2 };
      await axiosClient.patch(`/api/v1/user/patchuser/${id}`, newdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setCallAPI(!CallAPI);
  };

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

  return (
    <div>
      <div className="adminuser">
        <table className="tableuser">
          <tr>
            <th>NO</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>NUMBER PHONE</th>
            <th>ADDRESS</th>
            <th>BIRTHDAY</th>
            <th>ACTION</th>
          </tr>

          {currentProducts.length > 0 &&
            currentProducts.map((data: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>+84 {data.phoneNumber}</td>
                  <td>{data.address}</td>
                  <td>{formatDate(data.birthday)}</td>
                  <td>
                    {data?.status == 1 ? (
                      <>
                        <button
                          id="btnunactive"
                          onClick={() => handleUnActive(data.id)}
                        >
                          UNACTIVE
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          id="btnactiveuser5"
                          onClick={() => handleActive(data.id)}
                        >
                          ACTIVE
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
      {currentProducts.length < 10 ? null : (
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
    </div>
  );
};

export default UseManager;
