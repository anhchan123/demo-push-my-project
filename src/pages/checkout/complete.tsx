import React, { FC } from "react";
import "./OrderSuccessPage.scss"; // CSS cho trang
import logo from "../../assets/img/logo.png";

interface IProps {
  name: string;
  phone: string;
}

const OrderSuccessPage: FC<IProps> = ({ name, phone }) => {
  const handleBackToShop = () => {
    // Chuyển người dùng về trang cửa hàng
    window.location.href = "/shop";
  };

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <img src={logo} alt="Success Icon" className="success-icon" />
        <h1>Order Successful!</h1>
        <p>
          Thank you for your purchase. Your order has been placed successfully
          and will be processed soon.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 10,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 300 }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>Name:</span> {sessionStorage.getItem('fullName')}
          </span>
          <span style={{ fontSize: 14, fontWeight: 300 }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>Phone:</span>
            {sessionStorage.getItem('phone')}
          </span>
          <span style={{ fontSize: 14, fontWeight: 300 }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>Phone:</span>
            {sessionStorage.getItem('address')}
          </span>
        </div>
        <button onClick={handleBackToShop} className="back-to-shop-btn">
          Back to Shop
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
