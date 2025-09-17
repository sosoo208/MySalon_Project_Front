import React, { useEffect, useState } from "react";
import { SubHeader } from "../../components/SubHeader";
import orderIcon from "../../assets/icons/order.png";
import { orderApi } from "../../api/order/orderApi"; // ✅ 주문 API import

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  // ✅ 유저 주문 내역 불러오기
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await orderApi.getAllOrdersByUser();
        setOrders(res); // ✅ OrderResponse2 배열 세팅
      } catch (err) {
        console.error("주문 내역 불러오기 실패:", err);
      }
    }
    fetchOrders();
  }, []);

  return (
    <>
      <SubHeader />

      <div style={{ background: "#E3E3E3", minHeight: "100vh", padding: "40px 0" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "12px",
            padding: "40px 50px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          {/* 제목 */}
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src={orderIcon}
              alt="주문내역 아이콘"
              style={{ width: "40px", height: "45px" }}
            />
            주문내역 ({orders.length})
          </h2>

          {/* 주문 리스트 */}
          {orders.length === 0 ? (
            <div style={{ textAlign: "center", color: "#777", padding: "40px 0" }}>
              주문 내역이 없습니다.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {orders.map((order, idx) => (
                <div key={idx}>
                  {order.orderDetails.map((item) => (
                    <div
                      key={item.orderDetailNum}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #eee",
                        paddingBottom: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      {/* 상품 이미지 + 정보 */}
                      <div style={{ display: "flex", gap: "16px", flex: 1 }}>
                        <img
                          src={
                            item.mainImage
                              ? `http://localhost:8080/products/images/${item.mainImage}`
                              : "https://via.placeholder.com/120x160"
                          }
                          alt={item.productName}
                          style={{
                            width: "120px",
                            height: "160px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                          }}
                        />

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#555",
                              marginBottom: "4px",
                            }}
                          >
                            주문번호: {item.orderNum}
                          </div>

                          {/* 상품명 + 사이즈/컬러 */}
                          <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                            {item.productName}
                            <span style={{ fontSize: "13px", color: "#777", marginLeft: "8px" }}>
                              [{item.color} / {item.size}]
                            </span>
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              color: "#666",
                              marginBottom: "8px",
                            }}
                          >
                            {item.description}
                          </div>
                          <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                            {item.price?.toLocaleString()} 원
                          </div>
                        </div>

                      </div>

                      {/* 버튼 영역 */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          minWidth: "100px",
                          alignItems: "flex-end",
                        }}
                      >
                        <button
                          style={{
                            border: "1px solid #aaa",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            background: "#fff",
                            cursor: "pointer",
                            fontSize: "13px",
                          }}
                        >
                          리뷰작성
                        </button>
                        <button
                          style={{
                            border: "none",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            background: "#535050",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "13px",
                          }}
                        >
                          배송확인
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
