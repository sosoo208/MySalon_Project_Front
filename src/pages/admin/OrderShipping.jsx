import React, { useState, useEffect } from "react";
import { SubHeader } from "../../components/SubHeader";
import AdminNav from "./AdminNav";
import { Button } from "../../components/ui/button";
import { productApi } from "../../api/product/productApi";

export default function OrderShipping() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await productApi.getAllOrdered();
        const formattedOrders = response.map(item => ({
          id: item.orderNum,
          productId: item.productNum,
          name: item.productName,
          description: item.description,
          price: `${item.price.toLocaleString()} 원`, // 가격을 한국 원화 형식으로 포맷
          image: `http://localhost:8080/products/images/${item.image}`, // 이미지 URL 생성 (서버 URL과 파일명 조합)
          color: item.color,
          size: item.size,
          qty: item.count,
        }));
        setOrders(formattedOrders);
      } catch (error) {
        console.error("주문 데이터를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchOrders();
  }, []);

  // 주문 정보 버튼
  const showOrderInfo = (order) => {
    alert(
      `주문번호: ${order.id}\n상품명: ${order.name}\n색상: ${order.color}\n사이즈: ${order.size}\n수량: ${order.qty}`
    );
  };

  // 배송하기 버튼
  const handleShip = (order) => {
    alert(`'${order.name}' 상품의 배송을 시작하겠습니까?`);
  };

  return (
    <>
      <SubHeader />
      <AdminNav activeTab="order-shipping" />

      <div className="max-w-[1100px] mx-auto bg-white p-10">
        <h2 className="text-xl font-bold mb-6 border-b pb-2">주문/발송</h2>

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
                <div className="text-sm text-gray-500">주문번호: {order.id}</div>
                <h3 className="text-lg font-bold mb-1">{order.name}</h3>
                <div className="text-lg font-semibold">{order.price}</div>
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <Button
                  variant="outline"
                  className="w-[100px] h-[36px]"
                  onClick={() => showOrderInfo(order)}
                >
                  주문정보
                </Button>
                <Button
                  className="w-[100px] h-[36px] bg-gray-700 text-white"
                  onClick={() => handleShip(order)}
                >
                  배송하기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}