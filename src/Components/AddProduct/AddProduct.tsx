import { useDispatch } from "react-redux";
import "./AddProduct.css";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductStock } from "../../redux/reduce/Productmanaslice";

const AddProduct: React.FC = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [imgBig, setImgBig] = useState<File | string>("");
  const [imgSmall, setImgSmall] = useState<File | string>("");
  const [getform, setgetform] = useState({
    nameProduct: "",
    price: "",
    type: "",
    goodsInStock: "",
    color: "",
    content: "",
    manufacturer: "",
    caliber: "",
    velocity: "",
    conditions: "",
    ammo_type: "",
    actions: "",
    barrel_style: "",
    fire_mode: "",
    gun_weight: "",
    loudness: "",
    mechanism: "",
    Ammo_Weight: "",
    Pellet_Shape: "",
    Pellet_Quantity: "",
  });

  const handlegetform = (e: ChangeEvent<HTMLInputElement>) => {
    setgetform({ ...getform, [e.target.name]: e.target.value });
  };

  // add product
  const handleaddproduct = async (e: FormEvent<HTMLFormElement>) => {
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
      formData.append("manufacturer", getform.manufacturer);
      formData.append("caliber", getform.caliber);
      formData.append("velocity", getform.velocity);
      formData.append("conditions", getform.conditions);
      formData.append("ammo_type", getform.ammo_type);
      formData.append("actions", getform.actions);
      formData.append("barrel_style", getform.barrel_style);
      formData.append("fire_mode", getform.fire_mode);
      formData.append("gun_weight", getform.gun_weight);
      formData.append("loudness", getform.loudness);
      formData.append("mechanism", getform.mechanism);
      formData.append("Ammo_Weight", getform.Ammo_Weight);
      formData.append("Pellet_Shape", getform.Pellet_Shape);
      formData.append("Pellet_Quantity", getform.Pellet_Quantity);

      // Gửi dữ liệu lên server bằng Axios
      await axios.post(
        "http://localhost:8888/api/v1/products/addproducts",
        formData
      );

      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
    }
    dispath(ProductStock());
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
          onSubmit={handleaddproduct}
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
              name="manufacturer"
              placeholder="TEXT"
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
              name="caliber"
              placeholder="NUMBER"
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">VELOCITY</label>
            <input
              type="text"
              name="velocity"
              placeholder="NUMBER"
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">CONDITIONS</label>
            <input
              type="text"
              name="conditions"
              placeholder="TEXT"
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
              name="ammo_type"
              placeholder="TEXT"
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">ACTIONS</label>
            <input
              type="text"
              name="actions"
              placeholder="TEXT"
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">BARREL STYLE</label>
            <input
              type="text"
              name="barrel_style"
              placeholder="TEXT"
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">FIRE MODE</label>
            <input
              type="text"
              name="fire_mode"
              placeholder="TEXT"
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">GUN WEIGHT</label>
            <input
              type="text"
              name="gun_weight"
              placeholder="NUMBER"
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="tablegrip">
            <label htmlFor="">LOUDNESS</label>
            <input
              type="text"
              name="loudness"
              placeholder="NUMBER"
              onChange={handlegetform}
            />
          </div>
          <br />
          <div className="tablegrip">
            <label htmlFor="">MECHANISM</label>
            <input
              type="text"
              name="mechanism"
              placeholder="TEXT"
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
              name="Ammo_Weight"
              placeholder="NUMBER"
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
              name="Pellet_Shape"
              placeholder="TEXT"
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
              name="Pellet_Quantity"
              placeholder="TEXT"
              onChange={handlegetform}
            />
          </div>
          <br />

          <div className="editform1">
            <div>
              <button id="btnactiveuser" type="submit">
                ADD PRODUCT
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
