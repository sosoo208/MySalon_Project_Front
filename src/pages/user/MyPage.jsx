
import React, { useState, useEffect } from "react";
import { SubHeader } from "../../components/SubHeader";
import { userApi } from "../../api/user/userApi";
import { reviewApi } from '../../api/review_/reviewApi';
import { favoriteApi } from '../../api/favorite/favoriteApi';
import { postApi } from '../../api/post_/postApi';
import { Link } from "react-router-dom";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("posts"); // posts | comments
  const [userInfo, setUserInfo] = useState({
    userName: "",
    profileImage: null,
    tall: 0,
    weight: 0,
    createdAt: "",
  });
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userApi.getUserInfo();
        setUserInfo({
          userName: user.userName || "",
          profileImage: user.profileImage || null,
          tall: user.tall || 0,
          weight: user.weight || 0,
          createdAt: user.createdAt || "",
          userNum: user.userNum,
        });

        const [favCount, revCount, allPosts] = await Promise.all([
          favoriteApi.getUserFavoriteCount(user.userNum),
          console.log(user.userNum),
          reviewApi.getUserReviewCount(user.userNum),
          postApi.getAllPost(),
        ]);

        setFavoriteCount(favCount || 0);
        setReviewCount(revCount || 0);
        // 내가 올린 게시글만 필터링

      } catch (err) {
        console.error("유저 활동 내역 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;


  return (
    <>
      <SubHeader />
      <div style={{ background: "#E3E3E3", minHeight: "100vh", padding: "40px 0" }}>
        <div style={{ display: "flex", maxWidth: "1250px", margin: "0 auto", gap: "50px", alignItems: "flex-start" }}>

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
                  overflow: "hidden",
                }}
              >
                {userInfo.profileImage && <img src={userInfo.profileImage} alt="프로필" style={{ width: "100%", height: "100%" }} />}
              </div>
              <div style={{ fontWeight: "bold", marginBottom: "6px" }}>{userInfo.userName}</div>
              <div style={{ fontSize: "12px", color: "#555", marginBottom: "12px" }}>
                <div style={{ fontSize: "12px", color: "#555", marginBottom: "12px" }}>
                  가입일 {userInfo.createdAt.slice(0, 10)} <br />
                  {userInfo.tall}cm / {userInfo.weight}kg
                </div>
              </div>

              <Link
                to="/mypage/edit"
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
              </Link>
            </div>


            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                fontWeight: "bold",
              }}
            >
              <Link to="/mypage/orders">내 주문 내역</Link>
              <Link to="/mypage/favorites">찜한 상품</Link> {/* ✅ 경로 수정 */}
              <Link to="/cart">장바구니</Link>
              <Link to="/mypage/reviews">나의 리뷰</Link>

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
            <h2 style={{ fontSize: "22px", marginBottom: "25px", textAlign: "left" }}>
              활동내역
            </h2>

            <div style={{ marginBottom: "25px", fontWeight: "500" }}>홍길동님의 활동</div>

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

            {activeTab === "posts" ? (
              <div style={{ textAlign: "left" }}>
                {posts.length === 0 ? (
                  <div>📌 작성한 게시물이 없습니다.</div>
                ) : (
                  posts.map(post => (
                    <div key={post.postNum} style={{ marginBottom: "12px", padding: "8px", borderBottom: "1px solid #eee" }}>
                      📌 {post.title}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div style={{ textAlign: "left" }}>💬 내가 쓴 댓글 리스트</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
