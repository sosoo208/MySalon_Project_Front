import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function AdminNav({ activeTab }) {
  const navigate = useNavigate();

  const navigationItems = [
    { id: "product-list", label: "상품 목록", path: "/admin/products/list" },
    { id: "product-register", label: "상품 등록", path: "/admin/products/register" },
    { id: "sales-list", label: "판매 목록", path: "/admin-mypage?sales" },
    { id: "order-shipping", label: "주문/발송", path: "/admin-mypage?shipping" },
    { id: "sales", label: "매출", path: "/admin-mypage?sales-total" },
  ];

  return (
    <nav className="mt-6 mb-10">
      <div className="flex justify-center gap-14">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => navigate(item.path)}
            className={`h-auto p-0 text-lg ${
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
  );
}
