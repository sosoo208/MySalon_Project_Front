import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";

const FemalePage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
  ];

  return <CategoryPageTemplate categoryName="여성" categoryTabs={categoryTabs} />;
};
export default FemalePage