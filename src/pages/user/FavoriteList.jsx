import React, { useEffect, useState } from "react";
import { SubHeader } from "../../components/SubHeader";
import redHeartIcon from "../../assets/icons/redheart.png"; // 빨간 하트
import HeartIcon from "../../assets/icons/heart.png";       // 일반 하트
import { userApi } from "../../api/user/userApi";
import { favoriteApi } from "../../api/favorite/favoriteApi";
import { reviewApi } from "../../api/review_/reviewApi";

export default function FavoriteList() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = await userApi.getUserInfo();
        const userNum = user.userNum;

        const data = await favoriteApi.getUserFavorites(userNum);

        // 평점/리뷰 개수까지 포함
        const favoritesWithScore = await Promise.all(
          data.map(async (item) => {
            const averageScore = await reviewApi.getAverageScore(item.productNum);
            const reviewCount = await reviewApi.getProductReviewCount(item.productNum);

            return {
              id: item.productNum,
              name: item.productName,
              price: item.productPrice,
              image: item.productImage,
              category: item.category,
              averageScore,
              reviewCount,
            };
          })
        );

        setFavorites(favoritesWithScore);
      } catch (err) {
        console.error("찜한 상품 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // ✅ 찜 토글
  const handleToggleFavorite = async (productId) => {
    try {
      const user = await userApi.getUserInfo(); // 로그인한 유저 정보
      const userNum = user.userNum;

      // 서버에 찜 토글 요청 (userNum, productNum 전달)
      await favoriteApi.addFavorite({ userNum, productNum: productId });

      // UI에서 바로 반영 (찜 해제)
      setFavorites((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error("찜 토글 실패:", err);
    }
  };

  if (loading) return <div>로딩 중...</div>;

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
                    src={
                      item.image
                        ? `http://localhost:8080/products/images/${item.image}`
                        : "https://via.placeholder.com/232x348"
                    }
                    alt={item.name}
                    style={{ width: "100%", height: "250px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "10px", textAlign: "left" }}>
                    <p style={{ fontSize: "14px", marginBottom: "6px" }}>{item.name}</p>
                    <p style={{ fontWeight: "bold", marginBottom: "6px", fontSize: "15px" }}>
                      {item.price.toLocaleString()}원
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button
                        onClick={() => handleToggleFavorite(item.id)}
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        <img src={redHeartIcon} alt="찜 토글" style={{ width: "16px", height: "16px" }} />
                      </button>
                      <span style={{ fontSize: "14px", color: "#555" }}>
                        ★ {item.averageScore?.toFixed(1) || 0} ({item.reviewCount || 0})
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
