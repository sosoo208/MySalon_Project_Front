import React from "react";
import { Link } from "react-router-dom";
import cartIcon from "../assets/icons/cart.png";
import userIcon from "../assets/icons/user.png";
import searchIcon from "../assets/icons/search.png";

export function MainHeader() {
  return (
    <header style={{ background: "#E3E3E3", borderBottom: "1px solid #ccc" }}>
      {/* 상단 메뉴바 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "20px",
          padding: "10px 40px",
          fontSize: "14px",
        }}
      >
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
        <Link to="/cart">장바구니</Link>
        <Link to="/mypage">마이페이지</Link>
        <Link to="/community">커뮤니티</Link>
      </div>

      {/* 로고 + 검색바 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "20px 0",
        }}
      >
        <div style={{ fontSize: "26px", fontWeight: "bold" }}>MY SALON</div>
        <div style={{ fontSize: "12px", color: "#555" }}>당신만을 위한 옷장</div>

        {/* 검색바 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "15px",
            border: "1px solid #aaa",
            borderRadius: "20px",
            padding: "5px 15px",
            width: "300px",
            background: "#fff",
          }}
        >
          <img src={searchIcon} alt="검색" style={{ width: "18px", marginRight: "8px" }} />
          <input
            type="text"
            placeholder="Search"
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: "14px",
              background: "transparent",
            }}
          />
        </div>
      </div>

      {/* 카테고리 바 */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          padding: "10px 0",
          fontSize: "15px",
          fontWeight: "500",
        }}
      >
        <Link to="/category/상의">상의</Link>
        <Link to="/category/아우터">아우터</Link>
        <Link to="/category/바지">바지</Link>
        <Link to="/category/원피스">원피스/스커트</Link>
        <Link to="/category/ACC/BAG">ACC/BAG</Link>
        <Link to="/category/홈웨어">홈웨어/속옷</Link>
        <Link to="/category/키즈">키즈</Link>
        <Link to="/category/문의">문의</Link>
      </nav>
    </header>
  );
}
