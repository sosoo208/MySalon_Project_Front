import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import AdminNav from "./AdminNav";

/** ================================
 *  판매자 마이페이지
 *  ================================ */
const AdminMyPage = () => {
  const [activeTab, setActiveTab] = useState("product-list");

  // 샘플 상품
  const products = [
    {
      id: "123456",
      name: "여름 원피스",
      description: "시원한 원피스 설명",
      price: "50,000 원",
      image: "https://via.placeholder.com/120x160",
      qty: 2,
    },
    {
      id: "654321",
      name: "블라우스",
      description: "가벼운 블라우스 설명",
      price: "42,000 원",
      image: "https://via.placeholder.com/120x160",
      qty: 5,
    },
  ];

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto bg-white">
        {/* 상단 헤더 */}
        <header className="bg-[#d9d9d9] h-[120px] flex items-center justify-center text-2xl font-bold">
          판매자 마이페이지
        </header>

        {/* 공통 네비게이션 */}
        <AdminNav activeTab={activeTab} />

        {/* 탭 내용 */}
        <main className="px-20">
          {activeTab === "product-list" && (
            <>
              <h1 className="mb-8 font-bold text-2xl">상품 목록</h1>
              <div className="space-y-6">
                {products.map((p) => (
                  <Card key={p.id} className="border p-4">
                    <CardContent className="flex gap-6">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-[120px] h-[160px] object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm text-gray-500">{p.id}</div>
                        <h3 className="text-lg font-bold">{p.name}</h3>
                        <p className="text-gray-700">{p.description}</p>
                        <div className="mt-2 text-lg font-semibold">
                          {p.price}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline">상품페이지</Button>
                        <Button className="bg-[#828282] text-white">삭제</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === "sales-list" && <div>판매 목록 페이지 준비중…</div>}
          {activeTab === "order-shipping" && <div>주문/발송 페이지 준비중…</div>}
          {activeTab === "sales" && <div>매출 페이지 준비중…</div>}
        </main>
      </div>
    </div>
  );
};

export default AdminMyPage;
