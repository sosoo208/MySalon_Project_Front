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
            maxWidth: "1200px", // ✅ 카드 박스 더 넓게
            margin: "0 auto",
            gap: "40px",
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
              <div style={{ fontSize: "12px", color: "#555", marginBottom: "10px" }}>
                가입일 2025.09.07 <br /> 최근 접속일 2025.09.07 <br />
                180cm / 70kg
              </div>
              <button
                style={{
                  border: "1px solid #777",
                  borderRadius: "8px", // ✅ 각진 버튼
                  padding: "8px 16px", // ✅ 조금 더 큼
                  fontSize: "13px",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                프로필 수정
              </button>
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
              padding: "40px", // ✅ 더 크게
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              marginBottom: "50px",
            }}
          >
            {/* 활동내역 제목 왼쪽 상단 */}
            <h2 style={{ fontSize: "22px", marginBottom: "25px", textAlign: "left" }}>
              활동내역
            </h2>

            <div style={{ marginBottom: "25px", fontWeight: "500" }}>
              홍길동님의 활동
            </div>

            {/* 4칸 활동 박스 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "35px",
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
                    padding: "24px",
                    textAlign: "center",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = "1px solid #A40303";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = "1px solid #ccc";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>
                    {item.count}
                  </div>
                  <div style={{ fontSize: "15px", marginTop: "6px" }}>{item.label}</div>
                </div>
              ))}
            </div>

            {/* 탭 */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start", // ✅ 왼쪽 정렬
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
