import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import WhiteHeader from "../../components/WhiteHeader";
import heartIcon from "../../assets/icons/heart.png";
import redHeartIcon from "../../assets/icons/redheart.png";
import orderIcon from "../../assets/icons/order.png";
import "./AdminProductDetail.css";

export default function AdminProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // state로 넘어온 상품 데이터 우선
  const [product, setProduct] = useState(location.state || null);

  // state가 없으면 API 호출 or dummy에서 찾아오기
  useEffect(() => {
    if (!product) {
      const dummy = [
        {
          id: "123456",
          name: "여름 원피스",
          description: "시원한 원피스 설명",
          price: 50000,
          shippingFee: 3500,
          colors: ["Black", "White", "Red"],
          sizes: ["S", "M", "L"],
          image: "https://picsum.photos/400/500?random=1",
        },
        {
          id: "654321",
          name: "블라우스",
          description: "가벼운 블라우스 설명",
          price: 42000,
          shippingFee: 3000,
          colors: ["Blue", "White"],
          sizes: ["M", "L"],
          image: "https://picsum.photos/400/500?random=2",
        },
      ];
      const found = dummy.find((d) => d.id === id);
      setProduct(found || null);
    }
  }, [id, product]);

  // 상품 없으면 에러 표시
  if (!product) return <div>상품 정보를 불러올 수 없습니다.</div>;

  const productOptions = {
    Black: { sizes: ["S", "M"], qty: 5 },
    White: { sizes: ["M", "L"], qty: 3 },
    Red: { sizes: ["S", "M", "L"], qty: 10 },
  };

  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("");
  const [count, setCount] = useState(1);
  const [isWished, setIsWished] = useState(false);

  const currentOptions = productOptions[selectedColor] || { sizes: [], qty: 0 };

  // 총 가격 계산
  const totalPrice = useMemo(() => product.price * count, [product.price, count]);

  // 리뷰 mock 데이터
  const [reviews] = useState([
    { id: 1, user: "user1", rating: 5, text: "옷이 너무 예쁘고 편해요!", avatar: "https://picsum.photos/60/60?random=1" },
    { id: 2, user: "user2", rating: 4, text: "핏이 좋아요. 다만 배송이 조금 느렸습니다.", avatar: "https://picsum.photos/60/60?random=2" },
  ]);

  const [sortOption, setSortOption] = useState("latest");

  const sortedReviews = useMemo(() => {
    let list = [...reviews];
    if (sortOption === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => b.id - a.id);
    }
    return list;
  }, [reviews, sortOption]);

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleToggleWish = () => {
    setIsWished((prev) => !prev);
    alert(isWished ? "찜 목록에서 제거되었습니다!" : "찜 목록에 추가되었습니다!");
  };

  return (
    <>
      <WhiteHeader />

      <div className="detail-container">
        <button onClick={() => navigate(-1)} className="back-btn">← 뒤로가기</button>

        {/* 상품 상세 */}
        <div className="detail-main">
          <img src={product.image} alt={product.name} className="detail-image" />

          <div className="detail-info">
            <h2 className="detail-title">{product.name}</h2>

            <p className="detail-desc">{product.description}</p>

            <div className="detail-row">
              <span className="label">가격</span>
              <span className="price">{product.price.toLocaleString()}원</span>
            </div>

            <div className="detail-row">
              <span className="label">배송비</span>
              <span className="shipping">{product.shippingFee.toLocaleString()}원</span>
            </div>

            <div className="detail-row">
              <span className="label">색상</span>
              <div className="color-options">
                {Object.keys(productOptions).map((c) => (
                  <button
                    key={c}
                    onClick={() => { setSelectedColor(c); setSelectedSize(""); setCount(1); }}
                    className={`color-btn ${selectedColor === c ? "active" : ""}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="detail-row">
              <span className="label">사이즈</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="size-select"
              >
                <option value="">사이즈 선택</option>
                {currentOptions.sizes.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="detail-row">
              <span className="label">수량</span>
              <div className="qty-box">
                <button onClick={() => setCount((prev) => Math.max(1, prev - 1))}>-</button>
                <span>{count}</span>
                <button onClick={() => setCount((prev) => prev + 1)}>+</button>
              </div>
              <span className="stock">재고: {currentOptions.qty}개</span>
            </div>

            <div className="qty-divider"></div>

            <div className="total-row">
              <span className="label">TOTAL</span>
              <span className="total-price">{totalPrice.toLocaleString()}원</span>
            </div>

            <div className="action-buttons">
              <button className="icon-btn" onClick={handleToggleWish}>
                <img src={isWished ? redHeartIcon : heartIcon} alt="찜하기" className="icon" />
              </button>
              <button className="icon-btn">
                <img src={orderIcon} alt="장바구니" className="icon" />
              </button>
              <button className="buy-btn">구매하기</button>
            </div>
          </div>
        </div>

        {/* 리뷰 */}
        <div className="review-section">
          <div className="review-header">
            <h3 className="review-title">REVIEW</h3>
            <div className="review-filters">
              <button
                className={`filter-btn ${sortOption === "latest" ? "active" : ""}`}
                onClick={() => setSortOption("latest")}
              >
                최신순
              </button>
              <button
                className={`filter-btn ${sortOption === "rating" ? "active" : ""}`}
                onClick={() => setSortOption("rating")}
              >
                별점순
              </button>
              <select className="filter-select"><option>키</option><option>150cm</option><option>160cm</option><option>170cm</option></select>
              <select className="filter-select"><option>몸무게</option><option>50kg</option><option>60kg</option><option>70kg</option></select>
            </div>
          </div>

          <div className="review-body">
            <div className="review-summary">
              <div className="big-star">★</div>
              <div className="score">{avgRating}</div>
              <p className="summary-text">{reviews.length}개의 리뷰가 작성되었습니다.</p>
              <button className="write-btn" onClick={() => navigate(`/mypage/reviews/write/${product.id}`)}>리뷰 작성하기</button>
            </div>

            <div className="review-list">
              {sortedReviews.map((r) => (
                <div key={r.id} className="review-card">
                  <div className="review-profile"><img src={r.avatar} alt={`${r.user} 프로필`} /></div>
                  <div className="review-content">
                    <div className="review-top">
                      <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                      <span className="review-label">{r.user}</span>
                    </div>
                    <p className="review-text">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
