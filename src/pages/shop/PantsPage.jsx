import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";
import NavHeader from "../../components/NavHeader"; // ✅ NavHeader import

const PantsPage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
    { name: "반바지", active: false },
    { name: "청바지", active: false },
    { name: "슬랙스", active: false },
  ];

  return (
    <div className="bg-[#e3e2e2] min-h-screen flex flex-col">
      {/* ✅ NavHeader */}
      <NavHeader />

      {/* ✅ CategoryPageTemplate 자체가 레이아웃 처리 */}
      <CategoryPageTemplate categoryName="바지" categoryTabs={categoryTabs} />
    </div>
  );
};

export default PantsPage;
