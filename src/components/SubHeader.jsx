import React from "react";
import { useNavigate, Link } from "react-router-dom";
import shopLogo from "../assets/images/shop.png"; // 로고 이미지
import backIcon from "../assets/icons/back.png";  // 뒤로가기 아이콘

export function SubHeader() {
  const navigate = useNavigate();

  return (
    <header style={{ background: "#E3E3E3" }}>
      {/* 상단 메뉴바 + 뒤로가기 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: " 10px 10px 40px",
          fontSize: "14px",
        }}
      >
        {/* 뒤로가기 버튼 (왼쪽 위) */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <img src={backIcon} alt="뒤로가기" style={{ width: "14px", height: "14px" }} />
        </button>

        {/* 로그인/회원가입/장바구니/마이페이지/커뮤니티 */}
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
          <Link to="/cart">장바구니</Link>
          <Link to="/mypage">마이페이지</Link>
          <Link to="/community">커뮤니티</Link>
        </div>
      </div>

      {/* 검색창 (상단바 바로 밑, 오른쪽 정렬) */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "5px 40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #aaa",
            borderRadius: "20px",
            padding: "5px 12px",
            marginTop: "-15px",
            width: "240px",
            background: "#fff",
          }}
        >
          {/* 돋보기 아이콘 (CSS) */}
          <div
            style={{
              width: "14px",
              height: "14px",
              border: "2px solid #555",
              borderRadius: "50%",
              position: "relative",
              marginRight: "8px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "2px",
                background: "#555",
                position: "absolute",
                bottom: "-4px",
                right: "-6px",
                transform: "rotate(45deg)",
              }}
            ></div>
          </div>

          <input
            type="text"
            placeholder="Search"
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: "13px",
              background: "transparent",
            }}
          />
        </div>
      </div>

      {/* 로고 */}
      <div style={{ textAlign: "center", padding: "0px 0 10px" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={shopLogo}
            alt="MY SALON 로고"
            style={{ height: "100px", objectFit: "contain" }}
          />
          {/* 로고 위 중앙 텍스트 */}
          <div
            style={{
              position: "absolute",
              top: "-10%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "12px",
              color: "#111",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            당신만을 위한 옷장
          </div>
        </div>
      </div>
    </header>
  );
}
