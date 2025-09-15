import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";

const OuterPage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
    { name: "가디건", active: false },
    { name: "자켓", active: false },
    { name: "코트", active: false },
  ];

  return <CategoryPageTemplate categoryName="아우터" categoryTabs={categoryTabs} />;
};

export default OuterPage;
