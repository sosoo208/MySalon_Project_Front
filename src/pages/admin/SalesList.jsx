import React, { useState, useEffect } from "react";
import { SubHeader } from "../../components/SubHeader";
import AdminNav from "./AdminNav";
import { Button } from "../../components/ui/button";

export default function SalesList() {
  const [orders, setOrders] = useState([]);

  // 📌 더미 데이터 (실제 API 연동 시 교체)
  useEffect(() => {
    const dummyOrders = [
      {
        id: "ORD-001",
        productId: "123456",
        name: "여름 원피스",
        description: "시원한 원피스 설명",
        price: "50,000 원",
        image: "https://picsum.photos/120/160?random=1",
        color: "Blue",
        size: "M",
        qty: 2,
      },
      {
        id: "ORD-002",
        productId: "654321",
        name: "화이트 블라우스",
        description: "깔끔한 스타일의 블라우스",
        price: "42,000 원",
        image: "https://picsum.photos/120/160?random=2",
        color: "White",
        size: "S",
        qty: 1,
      },
    ];
    setOrders(dummyOrders);
  }, []);

  const showColorInfo = (order) => {
    alert(`색상: ${order.color}, 사이즈: ${order.size}`);
  };

  const showQtyInfo = (order) => {
    alert(`주문 수량: ${order.qty}개`);
  };

  return (
    <>
      <SubHeader />
      <AdminNav activeTab="sales-list" />

      <div className="max-w-[1100px] mx-auto bg-white p-10">
        <h2 className="text-xl font-bold mb-6 border-b pb-2">판매목록</h2>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-start gap-6 border-b pb-6 last:border-0"
            >
              <img
                src={order.image}
                alt={order.name}
                className="w-[120px] h-[160px] object-cover"
              />
              <div className="flex-1">
                <div className="text-sm text-gray-500">{order.id}</div>
                <h3 className="text-lg font-bold mb-1">{order.name}</h3>
                <p className="text-gray-700 mb-2">{order.description}</p>
                <div className="text-lg font-semibold">{order.price}</div>
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <Button
                  variant="outline"
                  className="w-[100px] h-[36px]"
                  onClick={() => showColorInfo(order)}
                >
                  색상정보
                </Button>
                <Button
                  className="w-[100px] h-[36px] bg-gray-700 text-white"
                  onClick={() => showQtyInfo(order)}
                >
                  수량정보
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
