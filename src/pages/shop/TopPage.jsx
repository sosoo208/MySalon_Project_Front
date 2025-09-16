import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";
import NavHeader from "../../components/NavHeader"; // ✅ NavHeader import

const TopPage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
    { name: "반소매", active: false },
    { name: "긴소매", active: false },
    { name: "셔츠/블라우스", active: false },
    { name: "니트/스웨터", active: false },
    { name: "맨투맨/후드", active: false },
    { name: "기타", active: false },
  ];

  return (
    <div className="bg-[#e3e2e2] min-h-screen flex flex-col">
      {/* ✅ NavHeader */}
      <NavHeader />

      {/* ✅ CategoryPageTemplate 자체가 레이아웃 처리 */}
      <CategoryPageTemplate categoryName="상의" categoryTabs={categoryTabs} />
    </div>
  );
};

export default TopPage;
