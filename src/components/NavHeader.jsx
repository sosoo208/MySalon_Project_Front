import React, { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import shopLogo from "../assets/images/shop.png";

const categories = [
  { name: "상의", path: "/category/상의" },
  { name: "아우터", path: "/category/아우터" },
  { name: "바지", path: "/category/바지" },
  { name: "원피스/스커트", path: "/category/원피스/스커트" },
  { name: "ACC/BAG", path: "/category/ACC" },
  { name: "홈웨어/속옷", path: "/category/홈웨어" },
  { name: "키즈", path: "/category/키즈" },
  { name: "문의", path: "/contact" },
];

export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* 상단 바 */}
      <div className="relative flex justify-between items-start px-10 py-12">
        {/* 햄버거 버튼 */}
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-7 h-7 text-gray-700 mt-2" />
        </button>

        {/* ✅ 중앙 로고 (MY SALON 텍스트 삭제) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-sm text-gray-700 font-bold mb-2">
            당신만을 위한 옷장
          </span>
          <img src={shopLogo} alt="MY SALON" className="h-20 object-contain" />
        </div>

        {/* 오른쪽 메뉴 + 검색창 */}
        <div className="flex flex-col items-end gap-3 text-sm text-gray-700">
          <div className="flex gap-6">
            <Link to="/login" className="hover:text-[#A40303]">로그인</Link>
            <Link to="/signup" className="hover:text-[#A40303]">회원가입</Link>
            <Link to="/cart" className="hover:text-[#A40303]">장바구니</Link>
            <Link to="/mypage" className="hover:text-[#A40303]">마이페이지</Link>
            <Link to="/community" className="hover:text-[#A40303]">커뮤니티</Link>
          </div>

          {/* 검색창 */}
          <div className="flex items-center w-[220px] h-[36px] rounded-full border bg-gray-100 px-3">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ✅ 카테고리 네비게이션 (높이 키움) */}
      <nav
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out bg-white ${
          isOpen ? "max-h-48" : "max-h-0"
        }`}
      >
        <ul className="flex justify-center gap-14 py-8 text-lg font-semibold">
          {categories.map((item) => (
            <li
              key={item.name}
              className="cursor-pointer hover:text-[#A40303]"
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
