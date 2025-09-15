import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";
import AdminNav from "./AdminNav";
import { Button } from "../../components/ui/button";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 📌 더미 데이터 (화면 확인용)
  useEffect(() => {
    const dummy = [
      {
        id: "123456",
        name: "여름 원피스",
        description: "시원한 원피스 설명",
        price: "50,000 원",
        shippingFee: "3,500원",
        colors: ["Black", "White", "Red"],
        sizes: ["S", "M", "L"],
        image: "https://picsum.photos/120/160?random=1",
      },
      {
        id: "654321",
        name: "블라우스",
        description: "가벼운 블라우스 설명",
        price: "42,000 원",
        shippingFee: "3,000원",
        colors: ["Blue", "White"],
        sizes: ["M", "L"],
        image: "https://picsum.photos/120/160?random=2",
      },
    ];
    setProducts(dummy);
  }, []);

  // 삭제 (state만 수정)
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <SubHeader />
      <AdminNav activeTab="product-list" />

      <div className="max-w-[1100px] mx-auto bg-white p-10">
        <h2 className="text-xl font-bold mb-6 border-b pb-2">상품 목록</h2>

        <div className="space-y-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-start gap-6 border-b pb-6 last:border-0"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-[120px] h-[160px] object-cover"
              />
              <div className="flex-1">
                <div className="text-sm text-gray-500">{p.id}</div>
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <p className="text-gray-700 mb-2">{p.description}</p>
                <div className="text-lg font-semibold">{p.price}</div>
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <Button
                  variant="outline"
                  className="w-[100px] h-[36px]"
                  onClick={() => navigate(`/admin/products/${p.id}`, { state: p })}
                >
                  상품페이지
                </Button>
                <Button
                  className="w-[100px] h-[36px] bg-gray-700 text-white"
                  onClick={() => handleDelete(p.id)}
                >
                  삭제
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
