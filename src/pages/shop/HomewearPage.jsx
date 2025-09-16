import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";
import NavHeader from "../../components/NavHeader"; // ✅ NavHeader import

const HomewearPage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
    { name: "잠옷", active: false },
    { name: "속옷", active: false },
  ];

  return (
    <div className="bg-[#e3e2e2] min-h-screen flex flex-col">
      {/* ✅ NavHeader */}
      <NavHeader />

      {/* ✅ CategoryPageTemplate 자체에서 레이아웃 처리 */}
      <CategoryPageTemplate
        categoryName="홈웨어/속옷"
        categoryTabs={categoryTabs}
      />
    </div>
  );
};

export default HomewearPage;
