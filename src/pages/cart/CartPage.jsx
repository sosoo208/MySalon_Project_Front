import React, { useState, useMemo, useEffect } from "react";
import { orderApi } from "../../api/order/orderApi.js";
import { SubHeader } from "../../components/SubHeader"; // 상단 헤더(뒤로가기+로고)

export default function CartPage() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  const total = useMemo(
    () => items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0),
    [items]
  );
  const shippingFee = items.length > 0 ? 3000 : 0;

  const finalTotal = total + shippingFee;

  const setQty = (productId, qty) =>
    setItems((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, qty: Math.max(1, qty) } : p
      )
    );
  const remove = (productId) =>
    setItems((prev) => prev.filter((p) => p.id !== productId));

  const [placing, setPlacing] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    if (!items.length) {
      setMessage("장바구니가 비어 있습니다.");
      return;
    }
    setPlacing(true);
    setMessage("");
    try {
      const orderData = {
        items: items.map((i) => ({ productId: i.id, quantity: i.qty })),
      };
      await orderApi.createOrder(orderData);
      setMessage("주문이 완료되었습니다 ✅");
      setItems([]);
    } catch (err) {
      console.error(err);
      setMessage("주문 처리 중 오류 ❌");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      <SubHeader />

      <div
        style={{
          background: "#fff",
          maxWidth: 1000,
          margin: "40px auto",
          padding: "40px 60px",
          borderRadius: 12,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        {/* 제목 */}
        <h2
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 30,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span role="img" aria-label="cart">
            🛒
          </span>
          장바구니 ({items.length})
        </h2>

        {/* 상품 테이블 */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #000" }}>
              <th style={{ padding: "12px 8px", textAlign: "left" }}>상품정보</th>
              <th style={{ padding: "12px 8px" }}>수량</th>
              <th style={{ padding: "12px 8px" }}>가격</th>
              <th style={{ padding: "12px 8px" }}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px 8px", display: "flex", gap: 16 }}>
                  <img
                    src={it.imageUrl}
                    alt={it.name}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 6,
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 500 }}>{it.name}</div>
                    <div style={{ fontSize: 13, color: "#555" }}>
                      옵션 정보 / 사이즈
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => setQty(it.id, (it.qty || 1) - 1)}
                    style={{ margin: "0 4px" }}
                  >
                    -
                  </button>
                  <span>{it.qty || 1}</span>
                  <button
                    onClick={() => setQty(it.id, (it.qty || 1) + 1)}
                    style={{ margin: "0 4px" }}
                  >
                    +
                  </button>
                </td>
                <td style={{ textAlign: "center", fontWeight: 600 }}>
                  {(it.price * it.qty).toLocaleString()} 원
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => remove(it.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#A40303",
                    }}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 합계 영역 */}
        <div style={{ marginTop: 30 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span>상품 금액</span>
            <span style={{ fontWeight: 600 }}>
              {total.toLocaleString()} 원
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span>배송비</span>
            <span style={{ fontWeight: 600 }}>
              {shippingFee.toLocaleString()} 원
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              color: "#A40303",
              fontWeight: "bold",
            }}
          >
            <span>최종 결제 금액</span>
            <span>{finalTotal.toLocaleString()} 원</span>
          </div>
        </div>

        {/* 결제 버튼 */}
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button
            onClick={handleCheckout}
            disabled={placing}
            style={{
              background: "#535050",
              color: "#fff",
              padding: "12px 40px",
              borderRadius: 8,
              border: "none",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {placing ? "처리 중..." : "결제하기"}
          </button>
        </div>

        {message && (
          <div
            style={{
              marginTop: 12,
              textAlign: "center",
              color: message.includes("오류") ? "#A40303" : "#111",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </>
  );
}
