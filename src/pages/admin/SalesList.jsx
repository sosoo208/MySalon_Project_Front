import React, { useState, useEffect } from "react";
import { SubHeader } from "../../components/SubHeader";
import AdminNav from "./AdminNav";
import { Button } from "../../components/ui/button";
import { productApi } from "../../api/product/productApi"; // productApi 임포트

export default function SalesList() {
 const [orders, setOrders] = useState([]);

 useEffect(() => {
  const fetchSales = async () => {
   try {
    const response = await productApi.getAllSold();
    const formattedOrders = response.map(item => ({
     id: item.orderNum,
     productId: item.productNum,
     name: item.productName,
     description: item.description,
     price: `${item.price.toLocaleString()} 원`,
     image: `http://localhost:8080/products/images/${item.image}`, // 서버 경로에 맞게 수정
     color: item.color,
     size: item.size,
     qty: item.count,
    }));
    setOrders(formattedOrders);
   } catch (error) {
    console.error("판매 데이터를 불러오는 데 실패했습니다:", error);
   }
  };

  fetchSales();
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
        <div className="text-sm text-gray-500">주문번호: {order.id}</div>
        <h3 className="text-lg font-bold mb-1">{order.name}</h3>
        <p className="text-gray-700 mb-2">
         색상: {order.color}, 사이즈: {order.size}, 수량: {order.qty}
        </p>
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
