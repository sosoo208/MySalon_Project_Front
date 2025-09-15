import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";

const PantsPage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
    { name: "반바지", active: false },
    { name: "청바지", active: false },
    { name: "슬랙스", active: false },
  ];

  return <CategoryPageTemplate categoryName="바지" categoryTabs={categoryTabs} />;
};

export default PantsPage;
