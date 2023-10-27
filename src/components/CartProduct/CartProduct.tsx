import "./CartProduct.css";

import React from "react";
import { NavLink } from "react-router-dom";

import { images } from "../../assets/img/img";
import { ICartProductProps } from "../../types/Type";

const CartProduct: React.FC<ICartProductProps> = (props) => {
  const productdata: any = props.products;

  return (
    <>
      {productdata &&
        productdata?.map((product: any, index: any) => (
          <div className="totalcardproduct" key={index}>
            <div className="cardproductimg">
              <img src={product.imgSmall} alt="caption" />
            </div>
            <div className="cardproductcontent">
              <p title={product.nameProduct}>Name: {product.nameProduct}</p>
              <p>Price: {product.price} $</p>
            </div>
            <div className="votestart">
              <div className="votestart1">
                {/* Tạo các thẻ <i> theo số lượng sao */}
                {Array.from({ length: product.totalStart }, (_, i) => (
                  <i
                    key={i}
                    className="fa-solid fa-star"
                    style={{ color: "#ffbb00" }}
                  />
                ))}
                {/* Tạo các thẻ <i> còn lại với màu xám */}
                {Array.from({ length: 5 - product.totalStart }, (_, i) => (
                  <i
                    key={i}
                    className="fa-regular fa-star"
                    style={{ color: "#ccc" }}
                  />
                ))}
              </div>
              <div className="votestart2">
                <p>{product.commentCount}/Reviews</p>
              </div>
            </div>
            {product.goodsInStock > 5 ? (
              <NavLink className="navlinkdetail" to={`details/${product.id}`}>
                DETAIL
              </NavLink>
            ) : (
              <div id="imgsoldout">
                <img src={images.Soudout} />
              </div>
            )}
          </div>
        ))}
      ;
    </>
  );
};

export default CartProduct;
