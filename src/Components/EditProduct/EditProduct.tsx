import "./EditProduct.css";

import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { ProductStock } from "../../redux/reduce/Productmanaslice";
import { IProductForm } from "../../Types/Type";

const EditProduct: React.FC = () => {
  const dispatch = useDispatch();
  const state = useLocation();
  const navigate = useNavigate();
  const dataserch = state?.state?.id;
  const [imgBig, setImgBig] = useState<File | string>("");
  const [imgSmall, setImgSmall] = useState<File | string>("");
  const [getform, setgetform] = useState<IProductForm>({
    nameProduct: "",
    price: "",
    type: "",
    goodsInStock: "",
    color: "",
    content: "",
    spesc_manufacturer: "",
    spesc_caliber: "",
    spesc_velocity: "",
    spesc_conditions: "",
    spesc_ammo_type: "",
    spesc_actions: "",
    spesc_barrel_style: "",
    spesc_fire_mode: "",
    spesc_gun_weight: "",
    spesc_loudness: "",
    spesc_mechanism: "",
    spesc_Ammo_Weight: "",
    spesc_Pellet_Shape: "",
    spesc_Pellet_Quantity: "",
  });

  // gọi api lần đầu theo id
  const hanlegetvaluer1 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/v1/products/getproducts/${dataserch}`
      );
      const data = response.data.data[0];
      setImgBig(data.imgBig);
      setImgSmall(data.imgSmall);
      setgetform(data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  useEffect(() => {
    hanlegetvaluer1();
  }, []);

  // handle onchage
  const handlegetform = (e: ChangeEvent<HTMLInputElement>) => {
    setgetform({
      ...getform,
      [e.target.name]: e.target.value,
    });
  };

  // handle gửi update lên server
  const handlesubmitedit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // Tạo đối tượng FormData để đưa dữ liệu và file vào

      // Đưa các trường thông tin sản phẩm vào FormData
      formData.append("imgBig", imgBig);
      formData.append("imgSmall", imgSmall);
      formData.append("nameProduct", getform.nameProduct);
      formData.append("price", getform.price);
      formData.append("type", getform.type);
      formData.append("goodsInStock", getform.goodsInStock);
      formData.append("color", getform.color);
      formData.append("content", getform.content);

      // Đưa các trường thông tin specs vào FormData
      formData.append("manufacturer", getform.spesc_manufacturer);
      formData.append("caliber", getform.spesc_caliber);
      formData.append("velocity", getform.spesc_velocity);
      formData.append("conditions", getform.spesc_conditions);
      formData.append("ammo_type", getform.spesc_ammo_type);
      formData.append("actions", getform.spesc_actions);
      formData.append("barrel_style", getform.spesc_barrel_style);
      formData.append("fire_mode", getform.spesc_fire_mode);
      formData.append("gun_weight", getform.spesc_gun_weight);
      formData.append("loudness", getform.spesc_loudness);
      formData.append("mechanism", getform.spesc_mechanism);
      formData.append("Ammo_Weight", getform.spesc_Ammo_Weight);
      formData.append("Pellet_Shape", getform.spesc_Pellet_Shape);
      formData.append("Pellet_Quantity", getform.spesc_Pellet_Quantity);

      // Gửi dữ liệu lên server bằng Axios
      await axios.patch(
        `http://localhost:8888/api/v1/products/editproductsadmin/${dataserch}`,
        formData
      );
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
    }
    dispatch(ProductStock());
    navigate("/productsmanagers");
  };

  const handleImgBigChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgBig(e.target.files[0]);
    }
  };

  const handleImgSmallChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgSmall(e.target.files[0]);
    }
  };

  return (
    <div className="editcomponent">
      <div className="editcomponent1">
        <form
          className="editform"
          action="/addproducts"
          method="post"
          encType="multipart/form-data"
          onSubmit={handlesubmitedit}
        >
          <p>PRODUCT INFORMATION</p>
          <div className="tablegrip">
            <label htmlFor="">IMAGE BIG</label>
            <input
              type="file"
              name="imgBig"
              accept="image/*"
              onChange={handleImgBigChange}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">IMAGE SMALL</label>
            <input
              type="file"
              name="imgSmall"
              accept="image/*"
              onChange={handleImgSmallChange}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">NAME PRODUCT</label>
            <input
              type="text"
              name="nameProduct"
              placeholder="TEXT"
              value={getform?.nameProduct}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">PRICE</label>
            <input
              type="text"
              name="price"
              placeholder="NUMBER"
              value={getform?.price}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">CATEGORY</label>
            <input
              type="text"
              name="type"
              placeholder="TEXT"
              value={getform?.type}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">QUANTITY IN STOCK</label>
            <input
              type="text"
              name="goodsInStock"
              placeholder="NUMBER"
              value={getform?.goodsInStock}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">COLOR</label>
            <input
              type="text"
              name="color"
              placeholder="TEXT"
              value={getform?.color}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">DESCRIPTION</label>
            <input
              type="text"
              name="content"
              placeholder="TEXT"
              value={getform?.content}
              onChange={handlegetform}
            />
          </div>
          <br />
          <p>SPECS INFORMATION</p>
          <br />
          <div className="tablegrip">
            <label htmlFor="">
              MANUFACTURER <span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="spesc_manufacturer"
              placeholder="TEXT"
              value={getform?.spesc_manufacturer}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">
              CALIBER<span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="spesc_caliber"
              placeholder="NUMBER"
              value={getform?.spesc_caliber}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">VELOCITY</label>
            <input
              type="text"
              name="spesc_velocity"
              placeholder="NUMBER"
              value={getform?.spesc_velocity}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">CONDITIONS</label>
            <input
              type="text"
              name="spesc_conditions"
              placeholder="TEXT"
              value={getform?.spesc_conditions}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">
              AMMO TYPE<span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="spesc_ammo_type"
              placeholder="TEXT"
              value={getform?.spesc_ammo_type}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">ACTIONS</label>
            <input
              type="text"
              name="spesc_actions"
              placeholder="TEXT"
              value={getform?.spesc_actions}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">BARREL STYLE</label>
            <input
              type="text"
              name="spesc_barrel_style"
              placeholder="TEXT"
              value={getform?.spesc_barrel_style}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">FIRE MODE</label>
            <input
              type="text"
              name="spesc_fire_mode"
              placeholder="TEXT"
              value={getform?.spesc_fire_mode}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">GUN WEIGHT</label>
            <input
              type="text"
              name="spesc_gun_weight"
              placeholder="NUMBER"
              value={getform?.spesc_gun_weight}
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="tablegrip">
            <label htmlFor="">LOUDNESS</label>
            <input
              type="text"
              name="spesc_loudness"
              placeholder="NUMBER"
              value={getform?.spesc_loudness}
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">MECHANISM</label>
            <input
              type="text"
              name="spesc_mechanism"
              placeholder="TEXT"
              value={getform?.spesc_mechanism}
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="tablegrip">
            <label htmlFor="">
              AMMO WEIGHT <span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="spesc_Ammo_Weight"
              placeholder="NUMBER"
              value={getform?.spesc_Ammo_Weight}
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="tablegrip">
            <label htmlFor="">
              PELLET SHAPE<span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="spesc_Pellet_Shape"
              placeholder="TEXT"
              value={getform?.spesc_Pellet_Shape}
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="tablegrip">
            <label htmlFor="">
              PELLET QUANTITY<span id="bulletspec">(BULLET)</span>
            </label>
            <input
              type="text"
              name="spesc_Pellet_Quantity"
              placeholder="TEXT"
              value={getform?.spesc_Pellet_Quantity}
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="editform1">
            <div>
              <button id="btnactiveuser" type="submit">
                EDIT PRODUCT
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
