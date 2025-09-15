import React from "react";
import { CategoryPageTemplate } from "../../components/CategoryPageTemplate";

const DressPage = () => {
  const categoryTabs = [
    { name: "전체", active: true },
    { name: "미니", active: false },
    { name: "미디", active: false },
    { name: "롱", active: false },
  ];

  return <CategoryPageTemplate categoryName="원피스/스커트" categoryTabs={categoryTabs} />;
};

export default DressPage;
