import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WhiteHeader from "../../components/WhiteHeader";
import checkIcon from "../../assets/icons/check.png";

export default function OrderComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderInfo = location.state;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/mypage/orders");  // ✅ 주문 내역 페이지로 이동
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!orderInfo) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <>
      <WhiteHeader />
      <div
        style={{
          maxWidth: "900px",
          margin: "60px auto",
          background: "#fff",
          padding: "60px",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "40px" }}>
          MY SALON
        </h1>

        <div style={{ marginBottom: "30px" }}>
          <img
            src={checkIcon}
            alt="check"
            style={{ width: "100px", height: "100px", margin: "0 auto" }}
          />
        </div>

        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "12px" }}>
          주문이 완료됐습니다!
        </h2>
        <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
          5초 후 주문내역 페이지로 이동합니다
        </p>

        <div
          style={{
            fontSize: "20px",
            textAlign: "left",
            lineHeight: "3.2",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <p><strong style={{ marginRight: "16px" }}>주문번호</strong> {orderInfo.orderNum}</p>
          <p><strong style={{ marginRight: "16px" }}>상품명</strong> {orderInfo.productName}</p>
          <p><strong style={{ marginRight: "16px" }}>수량</strong> {orderInfo.count}개</p>
          <p><strong style={{ marginRight: "16px" }}>총 결제금액</strong> {orderInfo.totalPrice.toLocaleString()}원</p>
          <p><strong style={{ marginRight: "16px" }}>구매자</strong> {orderInfo.buyerName}</p>
          <p><strong style={{ marginRight: "16px" }}>주문일</strong> {orderInfo.orderDate}</p>
        </div>
      </div>
    </>
  );
}
