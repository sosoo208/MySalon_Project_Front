import React from "react";

export const CategoryPageTemplate = ({ categoryName, categoryTabs }) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto bg-white px-6 py-10 min-h-screen">
      {/* 카테고리 이름 */}
      <h1 className="text-2xl font-bold mb-6">{categoryName}</h1>

      {/* 탭 메뉴 */}
      <div className="flex gap-6 mb-6">
        {categoryTabs.map((tab, idx) => (
          <span
            key={idx}
            className={`cursor-pointer ${
              tab.active ? "text-[#A40303] font-bold" : "text-black"
            }`}
          >
            {tab.name}
          </span>
        ))}
      </div>

      {/* 성별 필터 (예시) */}
      <div className="flex gap-6 mb-6">
        <span className="text-[#A40303] font-bold cursor-pointer">전체</span>
        <span className="cursor-pointer">남자</span>
        <span className="cursor-pointer">여자</span>
        <span className="cursor-pointer">공용</span>
      </div>

      {/* 여기에 상품 리스트 같은 내용이 들어갈 자리 */}
      <div className="mt-10 text-gray-500">상품 리스트가 여기에 표시됩니다.</div>
    </div>
  );
};
