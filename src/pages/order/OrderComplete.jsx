import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WhiteHeader from "../../components/WhiteHeader";
import checkIcon from "../../assets/icons/check.png"; // ✅ 아이콘 사용

export default function OrderComplete() {
  const navigate = useNavigate();

  // 5초 후 이전 페이지로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

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
          // boxShadow 제거 ✅
          textAlign: "center",
        }}
      >
        {/* 상단 로고 */}
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "40px" }}>
          MY SALON
        </h1>

        {/* 체크 아이콘 */}
        <div style={{ marginBottom: "30px" }}>
          <img
            src={checkIcon}
            alt="check"
            style={{ width: "100px", height: "100px", margin: "0 auto" }}
          />
        </div>

        {/* 완료 메시지 */}
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "12px" }}>
          주문이 완료됐습니다!
        </h2>
        <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
          5초 후 이전 페이지로 돌아갑니다
        </p>

        {/* 주문 정보 */}
        <div
          style={{
            fontSize: "20px",
            textAlign: "left",
            lineHeight: "3.2",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <p>
            <strong style={{ marginRight: "16px" }}>상품명</strong> 여름블루 롱 원피스
          </p>
          <p>
            <strong style={{ marginRight: "16px" }}>구매자</strong> 홍길동
          </p>
          <p>
            <strong style={{ marginRight: "16px" }}>주문일</strong>{" "}
            {new Date().toISOString().split("T")[0]}
          </p>
        </div>
      </div>
    </>
  );
}
