import "./ProductsManager.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { ProductStock } from "../../redux/reduce/Productmanaslice";
import { IProductManagement } from "../../Types/Type";

const ProductsManager: React.FC = () => {
  const dispatch = useDispatch();
  const [data, setdata] = useState<IProductManagement[]>([]);
  const [CallAPI, setCallAPI] = useState(true);
  const navigate = useNavigate();
  // gọi API lần đầu
  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axios.get(
        `http://localhost:8888/api/v1/products/getallproducts`
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

  // Lọc sản phẩm có số lượng ít hơn 5
  const lessThanFive = data?.filter((product) => product.goodsInStock <= 5);

  // Lọc sản phẩm có số lượng lớn hơn hoặc bằng 5
  const greaterThanOrEqualFive = data?.filter(
    (product) => product.goodsInStock > 5
  );
  // đẩy sản phẩm sắp hết hàng lên trên cùng
  const mergedProducts = lessThanFive?.concat(greaterThanOrEqualFive);

  //phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang

  // Tính tổng số trang dựa trên dữ liệu sản phẩm và số sản phẩm trên mỗi trang
  const pageCount = Math.ceil(data.length / productsPerPage);

  // Tính chỉ số của sản phẩm đầu tiên trên trang hiện tại
  const offset = currentPage * productsPerPage;
  const currentProducts = mergedProducts.slice(
    offset,
    offset + productsPerPage
  );

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };
  // gửi id sang trang edit
  const handleEdit = async (id: number) => {
    navigate("/editproduct", { state: { id } });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:8888/api/v1/products/deleteproducts/${id}`
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    dispatch(ProductStock());
    setCallAPI(!CallAPI);
  };

  return (
    <div>
      <div className="adminuser1">
        <div className="addprodut2">
          <Link className="addprodut1" to={"/addproduct"}>
            ADD PRODUCT
          </Link>
        </div>

        <table className="tableuser1">
          <tr>
            <th>NO</th>
            <th>IMAGE</th>
            <th>NAME PRODUCT</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>CONDITION OF GOODS</th>
            <th>QUANTITY IN STOCK</th>
            <th>ACTION</th>
          </tr>

          {currentProducts.length > 0 &&
            currentProducts.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="imgproduct">
                    <img src={item.imgSmall} alt="cap" />
                  </td>
                  <td>{item.nameProduct}</td>
                  <td>{item.price}</td>
                  <td>{item.type} </td>
                  <td>
                    <div className="totalstock">
                      <div>
                        {item.goodsInStock > 5 ? (
                          <>
                            <div id="stocking">STOCKING</div>
                          </>
                        ) : (
                          <>
                            <div id="outofstock">ALMOST OUT OF STOCK</div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{item?.goodsInStock}</td>
                  <td>
                    <button
                      id="btnactiveuser2"
                      onClick={() => handleEdit(item.id)}
                    >
                      EDIT
                    </button>
                    <button
                      id="btnunactive1"
                      onClick={() => handleDelete(item.id)}
                    >
                      DELETE
                    </button>
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

export default ProductsManager;
