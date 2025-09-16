import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";
import NavHeader from "../../components/NavHeader";   // ✅ NavHeader import

const DressPage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
    { name: "미니", active: false },
    { name: "미디", active: false },
    { name: "롱", active: false },
  ];

  return (
    <div className="bg-[#e3e2e2] min-h-screen flex flex-col">
      {/* ✅ NavHeader */}
      <NavHeader />

      {/* ✅ 이제 CategoryPageTemplate 자체가 레이아웃을 처리 */}
      <CategoryPageTemplate
        categoryName="원피스/스커트"
        categoryTabs={categoryTabs}
      />
    </div>
  );
};

export default DressPage;
