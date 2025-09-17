import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";
import "./AdminProductDetail.css";
import { productApi } from "../../api/product/productApi";

export default function AdminProductDetail() {
  // ✅ id → num 으로 변경
  const { num } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(location.state || null);

  useEffect(() => {
    if (!product && num) {
      const fetchProduct = async () => {
        try {
          const data = await productApi.getProductById(num); // ✅ num 사용
          setProduct(data);
          setFormData({
            name: data.productName || "",
            description: data.description || "",
            price: data.price ?? 0,
            shippingFee: data.deliveryFee ?? 0,
          });
        } catch (err) {
          console.error("상품 불러오기 실패:", err);
        }
      };
      fetchProduct();
    }
  }, [num, product]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    shippingFee: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "shippingFee" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      const updated = {
        ...product,
        productName: formData.name,
        description: formData.description,
        price: formData.price,
        deliveryFee: formData.shippingFee,
      };
      await productApi.updateProduct(num, updated); // ✅ num 사용
      alert("상품이 수정되었습니다.");
      setProduct(updated);
      navigate(-1);
    } catch (err) {
      console.error("상품 수정 실패:", err);
      alert("상품 수정에 실패했습니다.");
    }
  };

  if (!product) return <div>상품 정보를 불러올 수 없습니다.</div>;

  // 더미 옵션 (실제에선 product.productDetails 활용 가능)
  const productOptions = {
    Black: { sizes: ["S", "M"], qty: 5 },
    White: { sizes: ["M", "L"], qty: 3 },
    Red: { sizes: ["S", "M", "L"], qty: 10 },
  };

  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("");
  const [count, setCount] = useState(1);

  const currentOptions = productOptions[selectedColor] || { sizes: [], qty: 0 };

  const totalPrice = useMemo(
    () => formData.price * count,
    [formData.price, count]
  );

  // ✅ 리뷰 mock 데이터
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "user1",
      rating: 5,
      text: "옷이 너무 예쁘고 편해요!",
      avatar: "https://picsum.photos/60/60?random=1",
    },
    {
      id: 2,
      user: "user2",
      rating: 4,
      text: "핏이 좋아요. 다만 배송이 조금 느렸습니다.",
      avatar: "https://picsum.photos/60/60?random=2",
    },
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

  // ✅ 리뷰 삭제
  const handleDeleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <>
      <SubHeader title="상품 상세 (관리자)" />

      <div className="detail-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← 뒤로가기
        </button>

        {/* 상품 상세 */}
        <div className="detail-main">
          <img
            src={
              product?.mainImage
                ? `http://localhost:8080/products/images/${product.mainImage}`
                : "https://via.placeholder.com/400x500"
            }
            alt={formData.name}
            className="detail-image"
          />

          <div className="detail-info">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field text-xl font-bold"
              placeholder="상품명"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field h-24 mt-2"
              placeholder="상품 설명"
            />

            <div className="detail-row">
              <span className="label">가격</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input-field w-40"
              />
            </div>

            <div className="detail-row">
              <span className="label">배송비</span>
              <input
                type="number"
                name="shippingFee"
                value={formData.shippingFee}
                onChange={handleChange}
                className="input-field w-40"
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
                    className={`color-btn ${
                      selectedColor === c ? "active" : ""
                    }`}
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

            <div className="detail-row">
              <span className="label">수량</span>
              <div className="qty-box">
                <button
                  onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span>{count}</span>
                <button onClick={() => setCount((prev) => prev + 1)}>+</button>
              </div>
              <span className="stock">재고: {currentOptions.qty}개</span>
            </div>

            <div className="qty-divider"></div>

            <div className="total-row">
              <span className="label">TOTAL</span>
              <span className="total-price">
                {totalPrice.toLocaleString()}원
              </span>
            </div>

            <div className="action-buttons">
              <button className="buy-btn" onClick={handleSave}>
                수정하기
              </button>
            </div>
          </div>
        </div>

        {/* 리뷰 영역 */}
        <div className="review-section">
          <div className="review-header">
            <h3 className="review-title">REVIEW</h3>
            <div className="review-filters">
              <button
                className={`filter-btn ${
                  sortOption === "latest" ? "active" : ""
                }`}
                onClick={() => setSortOption("latest")}
              >
                최신순
              </button>
              <button
                className={`filter-btn ${
                  sortOption === "rating" ? "active" : ""
                }`}
                onClick={() => setSortOption("rating")}
              >
                별점순
              </button>
            </div>
          </div>

          <div className="review-body">
            <div className="review-summary">
              <div className="big-star">★</div>
              <div className="score">{avgRating}</div>
              <p className="summary-text">
                {reviews.length}개의 리뷰가 작성되었습니다.
              </p>
            </div>

            <div className="review-list">
              {sortedReviews.map((r) => (
                <div key={r.id} className="review-card">
                  <div className="review-profile">
                    <img src={r.avatar} alt={`${r.user} 프로필`} />
                  </div>
                  <div className="review-content">
                    <div className="review-top">
                      <div className="stars">
                        {"★".repeat(r.rating)}
                        {"☆".repeat(5 - r.rating)}
                      </div>
                      <span className="review-label">{r.user}</span>
                    </div>
                    <p className="review-text">{r.text}</p>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteReview(r.id)}
                    >
                      삭제
                    </button>
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
