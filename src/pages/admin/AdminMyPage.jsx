import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

/** ================================
 *  판매자 마이페이지
 *  ================================ */
const AdminMyPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("product-list");

  const navigationItems = [
    { id: "product-list", label: "상품 목록" },
    { id: "product-register", label: "상품 등록" }, // 👉 이건 navigate로 처리
    { id: "sales-list", label: "판매 목록" },
    { id: "order-shipping", label: "주문/발송" },
    { id: "sales", label: "매출" },
  ];

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

        {/* 탭 메뉴 */}
        <nav className="mt-10 mb-16">
          <div className="flex justify-center gap-16">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => {
                  if (item.id === "product-register") {
                    navigate("/admin/products/register"); // 👉 상품 등록 페이지로 이동
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`h-auto p-0 text-xl ${
                  activeTab === item.id
                    ? "font-bold text-[#a40303]"
                    : "text-black hover:text-[#a40303]"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </nav>

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
