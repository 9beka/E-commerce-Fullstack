import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "./Cart.scss";
import { ADD_TO_CART ,DECREASE_CART} from "../../Redux/CartSlicer";
const Cart = () => {
  const { cartData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [size, setSize] = useState("large");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleAddToCart = (id) => {
    console.log(id, "ID FROM handleAddToCart");
    dispatch(ADD_TO_CART(id));
  };
  const handleDecreaseToCart = (id) => {
    console.log(id, "ID FROM handleDecreaseToCart");
    dispatch(DECREASE_CART(id));
  };
  return (
    <>
      <div className="shopping-cart-container">
        <ShoppingCartIcon onClick={showModal} />
        <Modal footer={null} open={isModalOpen} onCancel={handleCancel}>
          <div className="row">
            {cartData?.items?.map((el) => {
              return (
                <div key={el.product._id} className="col-12">
                  <div className="cart__box">
                    <img src={el.product.img} alt="" />
                    <div className="cart__box__column">
                      <div className="cart__box_wrapp_descr">
                        <h2>{el.product.name}</h2>
                        <h2>{el.product.price}$</h2>
                      </div>
                      <div className="cart__btn_wrap">
                        <Button
                        onClick={()=>handleDecreaseToCart(el.product._id)}
                          danger
                          shape="circle"  
                          icon={<MinusOutlined />}
                          size={size}
                        />
                        <p>{el.quantity}</p>
                        <Button
                          onClick={() => handleAddToCart(el.product._id)}
                          type="primary"
                          shape="circle"
                          icon={<PlusOutlined />}
                          size={size}
                        />
                      </div>
                      <h2>Subtotal: {el.total}$</h2>
                    </div>
                  </div>
                </div>

              );
            })}
            <h3>Total amount: {cartData.grandTotal}</h3>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Cart;
