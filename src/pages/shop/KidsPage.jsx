import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";

const KidsPage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
    { name: "상의", active: false },
    { name: "하의", active: false },
  ];

  return <CategoryPageTemplate categoryName="키즈" categoryTabs={categoryTabs} />;
};

export default KidsPage;