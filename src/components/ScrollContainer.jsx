import React, { useEffect, useState } from "react";
import { Screen as MainScreen } from "../screens/Screen/Screen";
import ShopScreen from "../pages/shop/ShopPage";

const Footer = () => (
  <footer className="text-center py-8 bg-[#e3e2e2]">
    <div className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-[#828282] text-[15px] text-center tracking-[0] leading-[21px]">
      My Salon
      <br />
      상호명: SK쉴더스 주식회사 | 대표이사: 5조 <br />
      사업자등록번호: 132-54-42425 [사업자정보확인] <br />
      통신판매업신고번호: 제2025-서울중구-1019호 <br />
      주소: 서울특별시 중구 세종대로0길 00, 00층 (가나다동, 가나다타워)
      <br />
      &nbsp;&nbsp;
      <br />
      고객센터: 1588-1234 <br />
      운영시간: 평일 09:00 - 18:00 (주말 및 공휴일 휴무) <br />
      이메일: mysalon@skshieldus.com&nbsp;&nbsp;
      <br />
      <br />
      [이용약관] [개인정보처리방침]&nbsp;&nbsp;
      <br />
      <br />
      Hosting by SK shieldus Inc. Copyright © SK shieldus Co., Ltd. All
      Rights Reserved.
    </div>
  </footer>
);

export const ScrollContainer = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* First Screen */}
      <div 
        className="relative z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(-${Math.min(scrollY * 0.5, window.innerHeight)}px)`
        }}
      >
        <MainScreen />
      </div>
      
      {/* Second Screen */}
      <div 
        className="relative z-20"
        style={{
          marginTop: scrollY > 100 ? `-${Math.min(scrollY * 0.3, 400)}px` : '0px'
        }}
      >
        <ShopScreen />
      </div>
      <Footer />
    </div>
  );
};