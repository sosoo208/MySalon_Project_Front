import React, { useState, useMemo, useEffect } from "react";
import { SubHeader } from "../../components/SubHeader";
import { shoppingCartApi } from "../../api/shoppingCart/shoppingCartApi";
import { orderApi } from "../../api/order/orderApi"; // 주문 API

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [placing, setPlacing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const data = await shoppingCartApi.getUserCart();
        console.log("장바구니 데이터:", data);

        const normalized = (data || []).map((it) => ({
          productDetailNum: it.productDetailNum,
          productName: it.productName,
          productImage: it.productImage,
          productPrice: Number(it.productPrice || 0),
          color: it.color,
          size: it.size,
          count: typeof it.count === "number" ? it.count : Number(it.count || 1),

          isSelected: !!(it.isSelected ?? it.selected),
          userNum: it.userNum,
        }));

        setItems(normalized);
      } catch (err) {
        console.error("장바구니 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // 총합(선택된 항목 기준) — client에서 계산
  const total = useMemo(
    () =>
      items
        .filter((it) => !!it.isSelected)
        .reduce((sum, it) => sum + Number(it.productPrice || 0) * Number(it.count || 1), 0),
    [items]
  );

  // 배송비 규칙: 총합 > 0 이면 배송비 3000 (원하시면 변경 가능)
  const shippingFee = total > 0 ? 3000 : 0;
  const finalTotal = total + shippingFee;

  // -----------------------
  // 수량 변경 (낙관적 업데이트 -> 서버 동기화 -> 실패 시 롤백)
  // -----------------------
  const setQty = async (productDetailNum, qty) => {
    const newCount = Math.max(1, qty);
    // 이전 상태 보관 (롤백용)
    const prev = items;
    // 즉시 UI 반영
    setItems((prevItems) =>
      prevItems.map((p) =>
        p.productDetailNum === productDetailNum ? { ...p, count: newCount } : p
      )
    );

    try {
      await shoppingCartApi.updateItemCount({ productDetailNum, count: newCount });
      // 성공하면 추가 동작 없음 (UI 이미 업데이트됨)
    } catch (err) {
      console.error("수량 변경 실패:", err);
      alert("수량 변경에 실패했습니다. 다시 시도해주세요.");
      // 롤백
      setItems(prev);
    }
  };

  // -----------------------
  // 항목 삭제 (낙관적 업데이트)
  // -----------------------
  const remove = async (productDetailNum) => {
    if (!window.confirm("해당 상품을 삭제하시겠습니까?")) return;
    const prev = items;
    setItems((prevItems) => prevItems.filter((p) => p.productDetailNum !== productDetailNum));

    try {
      await shoppingCartApi.removeFromCart({ productDetailNum });
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제에 실패했습니다.");
      // 롤백
      setItems(prev);
    }
  };

  // -----------------------
  // 체크박스(선택) 토글 (낙관적 업데이트)
  // -----------------------
  const toggleSelect = async (productDetailNum, nextSelected) => {
    const prev = items;
    setItems((prevItems) =>
      prevItems.map((p) =>
        p.productDetailNum === productDetailNum ? { ...p, isSelected: !!nextSelected } : p
      )
    );

    try {
      await shoppingCartApi.updateCartSelection({ productDetailNum, isSelected: !!nextSelected });
    } catch (err) {
      console.error("선택 변경 실패:", err);
      alert("선택 변경에 실패했습니다.");
      setItems(prev); // 롤백
    }
  };

  // -----------------------
  // 결제 (선택된 항목 기준, 주문 생성 후 장바구니 삭제)
  // -----------------------
  const handleCheckout = async () => {
    const selectedItems = items.filter((it) => !!it.isSelected);
    if (selectedItems.length === 0) {
      setMessage("선택된 상품이 없습니다.");
      return;
    }

    setPlacing(true);
    setMessage("");

    try {
      // 1️⃣ 주문 DTO 생성
      const orderRequest = {
        orderItems: selectedItems.map((it) => ({
          productDetailNum: it.productDetailNum,
          count: it.count,
        })),
      };

      // 2️⃣ 주문 생성 (createOrder2 사용)
      const orderRes = await orderApi.createOrder2(orderRequest);
      console.log("주문 완료:", orderRes);

      // 3️⃣ 장바구니에서 선택된 상품 삭제
      for (const item of selectedItems) {
        await shoppingCartApi.removeFromCart({ productDetailNum: item.productDetailNum });
      }

      // 4️⃣ UI 업데이트: 주문된 상품 제거
      setItems((prev) => prev.filter((it) => !it.isSelected));

      setMessage("주문이 완료되었습니다 ✅");
    } catch (err) {
      console.error(err);
      setMessage("주문 처리 중 오류 ❌");
    } finally {
      setPlacing(false);
    }
  };


  if (loading) {
    return (
      <>
        <SubHeader />
        <div style={{ maxWidth: 1000, margin: "40px auto", padding: "40px 60px" }}>
          로딩 중...
        </div>
      </>
    );
  }

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

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #000" }}>
              <th style={{ padding: "12px 8px" }}>선택</th>
              <th style={{ padding: "12px 8px", textAlign: "left" }}>상품정보</th>
              <th style={{ padding: "12px 8px" }}>수량</th>
              <th style={{ padding: "12px 8px" }}>가격</th>
              <th style={{ padding: "12px 8px" }}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 40, color: "#777" }}>
                  장바구니에 담긴 상품이 없습니다.
                </td>
              </tr>
            )}

            {items.map((it) => (
              <tr key={it.productDetailNum} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={!!it.isSelected}
                    onChange={(e) => toggleSelect(it.productDetailNum, e.target.checked)}
                  />
                </td>

                <td style={{ padding: "12px 8px", display: "flex", gap: 16 }}>
                  <img
                    src={it.productImage ? `http://localhost:8080/products/images/${it.productImage}` : "https://via.placeholder.com/60"}
                    alt={it.productName}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 6,
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 500 }}>{it.productName}</div>
                    <div style={{ fontSize: 13, color: "#555" }}>
                      {it.color} / {it.size}
                    </div>
                  </div>
                </td>

                <td style={{ textAlign: "center" }}>
                  <button onClick={() => setQty(it.productDetailNum, (it.count || 1) - 1)} style={{ margin: "0 4px" }}>-</button>
                  <span>{it.count || 1}</span>
                  <button onClick={() => setQty(it.productDetailNum, (it.count || 1) + 1)} style={{ margin: "0 4px" }}>+</button>
                </td>

                <td style={{ textAlign: "center", fontWeight: 600 }}>
                  {(Number(it.productPrice || 0) * Number(it.count || 1)).toLocaleString()} 원
                </td>

                <td style={{ textAlign: "center" }}>
                  <button onClick={() => remove(it.productDetailNum)} style={{ background: "none", border: "none", cursor: "pointer", color: "#A40303" }}>
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 합계 영역 */}
        <div style={{ marginTop: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span>상품 금액</span>
            <span style={{ fontWeight: 600 }}>{total.toLocaleString()} 원</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span>배송비</span>
            <span style={{ fontWeight: 600 }}>{shippingFee.toLocaleString()} 원</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "#A40303", fontWeight: "bold" }}>
            <span>최종 결제 금액</span>
            <span>{finalTotal.toLocaleString()} 원</span>
          </div>
        </div>

        {/* 결제 버튼 */}
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button onClick={handleCheckout} disabled={placing} style={{ background: "#535050", color: "#fff", padding: "12px 40px", borderRadius: 8, border: "none", fontSize: 16, cursor: "pointer" }}>
            {placing ? "처리 중..." : "결제하기"}
          </button>
        </div>

        {message && (
          <div style={{ marginTop: 12, textAlign: "center", color: message.includes("오류") ? "#A40303" : "#111" }}>
            {message}
          </div>
        )}
      </div>
    </>
  );
}
