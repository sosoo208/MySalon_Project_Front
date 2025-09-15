import React, { useEffect, useState } from "react";
import { SubHeader } from "../../components/SubHeader";
import redHeartIcon from "../../assets/icons/redheart.png"; // 빨간 하트
import HeartIcon from "../../assets/icons/heart.png";       // 일반 하트

export default function FavoriteList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        // TODO: 실제 API 연결
        setFavorites([
          {
            id: 1,
            name: "여름 원피스",
            price: 50000,
            image: "https://via.placeholder.com/200x250",
            rating: 4.3,
          },
          {
            id: 2,
            name: "화이트 셔츠",
            price: 39000,
            image: "https://via.placeholder.com/200x250",
            rating: 4.6,
          },
        ]);
      } catch (err) {
        console.error("찜한 상품 불러오기 실패:", err);
      }
    }
    fetchFavorites();
  }, []);

  return (
    <>
      <SubHeader />

      <div style={{ background: "#fff", minHeight: "100vh", padding: "40px 0" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "12px",
            padding: "40px 50px",
          }}
        >
          {/* ===== 제목 영역 ===== */}
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img src={HeartIcon} alt="찜 목록 아이콘" style={{ width: "24px", height: "24px" }} />
            찜 목록 ({favorites.length})
          </h2>

          {/* ===== 본문 ===== */}
          {favorites.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>찜한 상품이 없습니다.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {favorites.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#fff",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "250px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "10px", textAlign: "left" }}>
                    <p style={{ fontSize: "14px", marginBottom: "6px" }}>{item.name}</p>
                    <p
                      style={{
                        fontWeight: "bold",
                        marginBottom: "6px",
                        fontSize: "15px",
                      }}
                    >
                      {item.price.toLocaleString()}원
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <img
                        src={redHeartIcon}
                        alt="찜"
                        style={{ width: "16px", height: "16px" }}
                      />
                      <span style={{ fontSize: "14px", color: "#555" }}>
                        ★ {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
