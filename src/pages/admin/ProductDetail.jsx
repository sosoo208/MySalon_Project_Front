import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WhiteHeader from "../../components/WhiteHeader";
import "./ProductDetail.css";

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  // 수정 가능하도록 state로 관리
  const [productData, setProductData] = useState({
    ...product,
    price: product?.price || "",
    shippingFee: product?.shippingFee || "",
    description: product?.description || "",
  });

  const productOptions = {
    Black: { sizes: ["S", "M"], qty: 5 },
    White: { sizes: ["M", "L"], qty: 3 },
    Red: { sizes: ["S", "M", "L"], qty: 10 },
  };

  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("");
  const [count, setCount] = useState(1);

  const currentOptions = productOptions[selectedColor] || { sizes: [], qty: 0 };

  const [reviews, setReviews] = useState([
    { id: 1, user: "user1", rating: 5, text: "옷이 너무 예쁘고 편해요!", avatar: "https://picsum.photos/60/60?random=1" },
    { id: 2, user: "user2", rating: 4, text: "핏이 좋아요. 다만 배송이 조금 느렸습니다.", avatar: "https://picsum.photos/60/60?random=2" },
  ]);

  if (!productData) return <div>상품 정보를 불러올 수 없습니다.</div>;

  // 평균 별점 계산
  const avgRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleDeleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // 수정하기 버튼
  const handleEdit = () => {
    const updated = {
      ...productData,
      selectedColor,
      selectedSize,
      count,
    };
    console.log("수정된 상품 데이터:", updated);
    alert("상품이 수정되었습니다!");
    setProductData(updated);
  };

  return (
    <>
      <WhiteHeader />

      <div className="detail-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← 뒤로가기
        </button>

        {/* 상품 상세 */}
        <div className="detail-main">
          <img src={productData.image} alt={productData.name} className="detail-image" />

          <div className="detail-info">
            <h2 className="detail-title">{productData.name}</h2>

            {/* 상품 설명 (수정 가능 input) */}
            <textarea
              className="detail-desc"
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            />

            <div className="detail-row">
              <span className="label">가격</span>
              <input
                type="text"
                className="text-input"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              />
            </div>

            <div className="detail-row">
              <span className="label">배송비</span>
              <input
                type="text"
                className="text-input"
                value={productData.shippingFee}
                onChange={(e) => setProductData({ ...productData, shippingFee: e.target.value })}
              />
            </div>

            <div className="detail-row">
              <span className="label">색상</span>
              <div className="color-options">
                {Object.keys(productOptions).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedColor(c);
                      setSelectedSize("");
                      setCount(1);
                    }}
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
                {currentOptions.sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* 수량 밑에 구분선 */}
            <div className="detail-row">
              <span className="label">수량</span>
              <div className="qty-box">
                <button onClick={() => setCount((prev) => Math.max(1, prev - 1))}>-</button>
                <span>{count}</span>
                {/* ✅ 재고 무제한 증가 */}
                <button onClick={() => setCount((prev) => prev + 1)}>+</button>
              </div>
              <span className="stock">재고: {currentOptions.qty}개</span>
            </div>
            <div className="qty-divider"></div>

            <button className="edit-btn" onClick={handleEdit}>
              수정하기
            </button>
          </div>
        </div>

        {/* 리뷰 영역 */}
        <div className="review-section">
          <h3 className="review-title">REVIEW</h3>

          <div className="review-filter">
            <label><input type="radio" name="sort" defaultChecked /> 최신순</label>
            <label><input type="radio" name="sort" /> 별점순</label>
            <select>
              <option>키</option><option>150cm</option><option>160cm</option><option>170cm</option>
            </select>
            <select>
              <option>몸무게</option><option>50kg</option><option>60kg</option><option>70kg</option>
            </select>
          </div>

          <div className="review-body">
            <div className="review-summary">
              <div className="big-star">★</div>
              <div className="score">{avgRating}</div>
              <p className="summary-text">{reviews.length}개의 리뷰가 작성되었습니다.</p>
              <button className="write-btn">리뷰 작성하기</button>
            </div>

            <div className="review-list">
              {reviews.map((r) => (
                <div key={r.id} className="review-card">
                  <div className="review-profile">
                    <img src={r.avatar} alt={`${r.user} 프로필`} />
                  </div>
                  <div className="review-content">
                    <div className="review-top">
                      <div className="stars">
                        {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                      </div>
                      <span className="review-label">아주 좋아요</span>
                    </div>
                    <p className="review-text">{r.text}</p>
                  </div>
                  <button className="delete-btn" onClick={() => handleDeleteReview(r.id)}>
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
