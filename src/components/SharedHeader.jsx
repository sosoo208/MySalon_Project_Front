import { MenuIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

export const SharedHeader = ({ className }) => {
  const navigate = useNavigate();
  const [showNavigation, setShowNavigation] = useState(false);
  const [activeNav, setActiveNav] = useState("상의");

  const topNavItems = ["로그인", "회원가입", "장바구니", "마이페이지", "커뮤니티"];

  const mainNavItems = [
    { name: "상의", path: "/category/상의" },
    { name: "아우터", path: "/category/아우터" },
    { name: "바지", path: "/category/바지" },
    { name: "원피스/스커트", path: "/category/원피스" },
    { name: "ACC/BAG", path: "/category/악세사리" },
    { name: "홈웨어/속옷", path: "/category/홈웨어" },
    { name: "키즈", path: "/category/키즈" },
    { name: "문의", path: "/contact" },
  ];

  return (
    <>
      {/* 헤더 전체: 클릭 막기 + z-index 낮게 */}
      <header
        className={`pointer-events-none z-10 transition-all duration-300 ease-in-out relative overflow-hidden ${
          showNavigation ? "h-[370px] bg-[#e3e2e2]" : "h-0"
        } ${className}`}
      >
        <img
          className="w-full h-[271px] object-cover absolute top-0 left-0 pointer-events-none"
          alt="Rectangle"
          src="https://c.animaapp.com/mfdr5z0vfXP3sX/img/rectangle-33.svg"
        />

        {/* Top Navigation */}
        <nav className="absolute top-[33px] right-[80px] pointer-events-auto">
          <div className="flex items-center gap-4 [font-family:'Crimson_Text',Helvetica] font-normal text-black text-[15px]">
            {topNavItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-auto p-0 text-[15px] font-normal"
                onClick={() => {
                  if (item === "로그인") navigate("/login");
                  else if (item === "회원가입") navigate("/signup");
                  else if (item === "마이페이지") navigate("/mypage");
                  else if (item === "장바구니") navigate("/cart");
                  else if (item === "커뮤니티") navigate("/community");
                }}
              >
                {item}
              </Button>
            ))}
          </div>
        </nav>

        {/* Logo Section */}
        <div className="absolute top-[75px] left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-[11.1px] mb-3">
            당신만을 위한 옷장
          </div>
          <div className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-[29.9px] mb-3">
            MY SALON
          </div>
          <img
            className="w-[67px] h-[66px] mx-auto"
            alt="Main icon"
            src="https://c.animaapp.com/mfdr5z0vfXP3sX/img/main-icon-1.png"
          />
        </div>

        {/* Main Navigation */}
        <NavigationMenu className="absolute top-[215px] left-1/2 -translate-x-1/2 pointer-events-auto">
          <NavigationMenuList className="flex items-center gap-8">
            {mainNavItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  className={`[font-family:'SF_Pro-Bold',Helvetica] font-bold text-xs ${
                    activeNav === item.name ? "text-[#a40202]" : "text-black"
                  } hover:text-[#a40202] transition-colors cursor-pointer`}
                  onClick={() => {
                    setActiveNav(item.name);
                    navigate(item.path);
                  }}
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      {/* 햄버거 버튼만 최상단 + 클릭 가능 */}
      <Button
        variant="ghost"
        size="icon"
        className="pointer-events-auto absolute top-[15px] left-[25px] w-[58px] h-[58px] bg-neutral-100 rounded-full hover:bg-neutral-200 z-30"
        onMouseEnter={() => setShowNavigation(true)}
        onClick={() => setShowNavigation(!showNavigation)}
      >
        <MenuIcon className="w-6 h-6" />
      </Button>
    </>
  );
};
