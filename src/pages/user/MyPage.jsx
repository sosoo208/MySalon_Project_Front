import React, { useState } from "react";
import { SubHeader } from "../../components/SubHeader"; // 상단 헤더

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("posts"); // posts | comments

  return (
    <>
      <SubHeader />

      <div style={{ background: "#E3E3E3", minHeight: "100vh", padding: "40px 0" }}>
        <div
          style={{
            display: "flex",
            maxWidth: "1250px",
            margin: "0 auto",
            gap: "50px",
            alignItems: "flex-start",
          }}
        >
          {/* 왼쪽 프로필 */}
          <div style={{ width: "240px", textAlign: "left" }}>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "#ddd",
                  marginBottom: "10px",
                }}
              />
              <div style={{ fontWeight: "bold", marginBottom: "6px" }}>HONG1234</div>
              <div style={{ fontSize: "12px", color: "#555", marginBottom: "12px" }}>
                가입일 2025.09.07 <br /> 최근 접속일 2025.09.07 <br />
                180cm / 70kg
              </div>
              {/* ✅ 수정된 부분: 버튼 → 링크 */}
              <a
                href="/mypage/edit"
                style={{
                  display: "inline-block",
                  border: "1px solid #777",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "13px",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                프로필 수정
              </a>
            </div>

            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                fontWeight: "bold",
              }}
            >
              <a href="/mypage/orders">내 주문 내역</a>
              <a href="/mypage/wishlist">찜한 상품</a>
              <a href="/cart">장바구니</a>
              <a href="/mypage/reviews">나의 리뷰</a>
            </nav>
          </div>

          {/* 오른쪽 활동 내역 */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: "12px",
              padding: "50px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              marginBottom: "60px",
            }}
          >
            {/* 활동내역 제목 */}
            <h2 style={{ fontSize: "22px", marginBottom: "25px", textAlign: "left" }}>
              활동내역
            </h2>

            <div style={{ marginBottom: "25px", fontWeight: "500" }}>홍길동님의 활동</div>

            {/* 4칸 활동 박스 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "40px",
              }}
            >
              {[
                { count: 10, label: "주문내역" },
                { count: 5, label: "찜한 상품" },
                { count: 12, label: "내가 쓴 리뷰" },
                { count: 2, label: "내가 올린 게시글" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "28px",
                    textAlign: "center",
                    transition: "all 0.25s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = "1px solid #A40303";
                    e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.12)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = "1px solid #ccc";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>{item.count}</div>
                  <div style={{ fontSize: "15px", marginTop: "8px" }}>{item.label}</div>
                </div>
              ))}
            </div>

            {/* 탭 */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "40px",
                borderBottom: "1px solid #ccc",
                marginBottom: "20px",
              }}
            >
              <button
                onClick={() => setActiveTab("posts")}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "16px",
                  fontWeight: activeTab === "posts" ? "bold" : "normal",
                  color: activeTab === "posts" ? "#A40303" : "#000",
                  cursor: "pointer",
                  paddingBottom: "8px",
                }}
              >
                내가 올린 게시물
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "16px",
                  fontWeight: activeTab === "comments" ? "bold" : "normal",
                  color: activeTab === "comments" ? "#A40303" : "#000",
                  cursor: "pointer",
                  paddingBottom: "8px",
                }}
              >
                내가 쓴 댓글
              </button>
            </div>

            {/* 탭 내용 */}
            {activeTab === "posts" ? (
              <div style={{ textAlign: "left" }}>📌 내가 올린 게시물 리스트</div>
            ) : (
              <div style={{ textAlign: "left" }}>💬 내가 쓴 댓글 리스트</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
