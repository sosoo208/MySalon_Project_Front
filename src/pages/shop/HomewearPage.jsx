import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";

const HomewearPage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
    { name: "잠옷", active: false },
    { name: "속옷", active: false },
  ];

  return <CategoryPageTemplate categoryName="홈웨어/속옷" categoryTabs={categoryTabs} />;
};

export default HomewearPage;
