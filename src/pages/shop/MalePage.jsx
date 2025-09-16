import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";

const MalePage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
  ];

  return <CategoryPageTemplate categoryName="남성" categoryTabs={categoryTabs} />;
};

export default MalePage;

