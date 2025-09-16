import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";
import NavHeader from "../../components/NavHeader"; // ✅ NavHeader import

const OuterPage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
    { name: "가디건", active: false },
    { name: "자켓", active: false },
    { name: "코트", active: false },
  ];

  return (
    <div className="bg-[#e3e2e2] min-h-screen flex flex-col">
      {/* ✅ NavHeader */}
      <NavHeader />

      {/* ✅ CategoryPageTemplate 자체가 레이아웃 처리 */}
      <CategoryPageTemplate categoryName="아우터" categoryTabs={categoryTabs} />
    </div>
  );
};

export default OuterPage;
