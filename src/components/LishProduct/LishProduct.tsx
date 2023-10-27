import "./LishProduct.css";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

import { axiosSub } from "../../api/axiosClient";
import CartProduct from "../CartProduct/CartProduct";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const LishProduct: React.FC = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //==================================================================================> gét lấy tất cả sản phẩm
  const fetchData = async () => {
    try {
      const response = await axiosSub.get("/api/v1/products/getallproducts");
      const newresponse = response.data.data;
      setData(newresponse);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //=========================================================================>lấy value từ các nút bấm lọc sản phẩm trên thanh Header
  let valueSearch: any = useSelector<any>((state) => state.HeaderSlice);
  let status = valueSearch.status;
  let dataSearch = valueSearch.data;

  useEffect(() => {
    if (dataSearch && dataSearch !== "all") {
      hanlesearch();
    } else {
      fetchData();
    }
  }, [status]);

  //==================================================================================>lọc sản phẩm theo type
  const hanlesearch = async () => {
    try {
      const response = await axiosSub.get(
        `/api/v1/products/getproductstype/${dataSearch}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //======================================================================> lấy value từ các nút bấm lọc sản phẩm trên thanh sidebar
  let valueSearchSidebar: any = useSelector<any>((state) => state.SidebarSlice);
  let statusSidebar = valueSearchSidebar.status;
  let dataSearchSidebar = valueSearchSidebar.data;
  const valueSidebar = dataSearchSidebar.split(",");
  const type = valueSidebar?.[0];

  useEffect(() => {
    if (type == "rifle-pistols" || type == "bullet") {
      hanlegetvaluepriceranger();
    } else if (type == "velocity") {
      hanlegetvaluevelocity();
    } else if (type == "Loudness") {
      hanlegetvalueLoudness();
    } else if (type == "AmmoWeight") {
      hanlegetvalueAmmoWeight();
    } else if (type == "Caliber") {
      hanlegetvalueCaliber();
    }
  }, [statusSidebar]);

  //===================================================================>lọc sản phẩm theo khoản value là : price
  const hanlegetvaluepriceranger = async () => {
    const valueSidebar = dataSearchSidebar.split(",");
    const type = valueSidebar?.[0];
    const pricerange2 = valueSidebar?.[1];

    try {
      const response = await axiosSub.get(
        `/api/v1/products/getproductvalue/${type}/${pricerange2}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //====================================================================>lọc sản phẩm theo khoản value là : Velocity
  const hanlegetvaluevelocity = async () => {
    const valueSidebar = dataSearchSidebar.split(",");
    const velocity = valueSidebar?.[1];
    try {
      const response = await axiosSub.get(
        `/api/v1/products/getproductvelocity/${velocity}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //========================================================================>lọc sản phẩm theo khoản value là : Loudness
  const hanlegetvalueLoudness = async () => {
    const valueSidebar = dataSearchSidebar.split(",");
    const Loudness = valueSidebar?.[1];

    try {
      const response = await axiosSub.get(
        `/api/v1/products/getproductloudness/${Loudness}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //=============================================================================>lọc sản phẩm theo khoản value là : AmmoWeight

  const hanlegetvalueAmmoWeight = async () => {
    const valueSidebar = dataSearchSidebar.split(",");
    const AmmoWeight = valueSidebar?.[1];

    try {
      const response = await axiosSub.get(
        `/api/v1/products/getproductAmmoWeight/${AmmoWeight}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //===============================================================================>lọc sản phẩm theo khoản value là : Caliber
  const hanlegetvalueCaliber = async () => {
    const valueSidebar = dataSearchSidebar.split(",");
    const Caliber = valueSidebar?.[1];
    try {
      const response = await axiosSub.get(
        `/api/v1/products/getproductCaliber/${Caliber}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //==============================================================================================>phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang

  const data1 = data.filter((data: any) => data?.status !== 2);

  // Tính tổng số trang dựa trên dữ liệu sản phẩm và số sản phẩm trên mỗi trang
  const pageCount = Math.ceil(data1.length / productsPerPage);

  // Tính chỉ số của sản phẩm đầu tiên trên trang hiện tại
  const offset = currentPage * productsPerPage;
  const currentProducts = data1.slice(offset, offset + productsPerPage);

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="lishproduct">
      {isLoading && <LoadingComponent />}

      <p>ALL PRODUCTS</p>
      <div className="lishproduct1">
        <CartProduct products={currentProducts} />
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

export default LishProduct;
