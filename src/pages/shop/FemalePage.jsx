import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";
import NavHeader from "../../components/NavHeader"; // ✅ NavHeader import

const FemalePage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
  ];

  return (
    <div className="bg-[#e3e2e2] min-h-screen flex flex-col">
      {/* ✅ NavHeader */}
      <NavHeader />

      {/* ✅ CategoryPageTemplate 자체가 레이아웃을 처리 */}
      <CategoryPageTemplate
        categoryName="여성"
        categoryTabs={categoryTabs}
      />
    </div>
  );
};

export default FemalePage;
