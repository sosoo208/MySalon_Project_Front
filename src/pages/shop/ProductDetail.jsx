import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WhiteHeader from "../../components/WhiteHeader";
import heartIcon from "../../assets/icons/heart.png";
import redHeartIcon from "../../assets/icons/redheart.png";
import orderIcon from "../../assets/icons/order.png";
import { productApi } from "../../api/product/productApi";
import { favoriteApi } from "../../api/favorite/favoriteApi";
import { userApi } from "../../api/user/userApi";
import { reviewApi } from "../../api/review_/reviewApi";
import { orderApi } from "../../api/order/orderApi"; // 주문 API
import { shoppingCartApi } from "../../api/shoppingCart/shoppingCartApi"; // 장바구니 API
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [userNum, setUserNum] = useState(null);
  const [isWished, setIsWished] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [count, setCount] = useState(1);

  const [productOptions, setProductOptions] = useState({});
  const [sortOption, setSortOption] = useState("latest");
  const [filterHeight, setFilterHeight] = useState("");
  const [filterWeight, setFilterWeight] = useState("");

  const totalPrice = useMemo(() => (product ? product.price * count : 0), [product, count]);

  // 유저 정보
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userApi.getUserInfo();
        setUserNum(user.userNum);
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };
    fetchUser();
  }, []);

  // 상품 정보
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const data = await productApi.getProductById(id);
        setProduct(data);

        const options = {};
        data.productDetails.forEach((d) => {
          if (!options[d.color]) options[d.color] = { sizes: [], stockMap: {} };
          options[d.color].sizes.push(d.size);
          options[d.color].stockMap[d.size] = d.count;
        });
        setProductOptions(options);
        if (Object.keys(options).length > 0) setSelectedColor(Object.keys(options)[0]);
      } catch (err) {
        console.error("상품 상세 불러오기 실패:", err);
      }
    };
    fetchProduct();
  }, [id]);

  // 찜/리뷰
  useEffect(() => {
    if (!userNum || !product) return;

    const fetchWishAndReview = async () => {
      try {
        const favorites = await favoriteApi.getUserFavorites(userNum);
        setIsWished(favorites.some((f) => f.productNum === product.productNum));

        const avg = await reviewApi.getAverageScore(product.productNum);
        setAvgRating(avg || 0);

        const reviewList = await reviewApi.getReviewsByProduct(product.productNum);

        const formattedReviews = reviewList.map(r => ({
          reviewNum: r.reviewNum,
          text: r.text,
          rating: r.score,
          color: r.color,
          size: r.size,
          reviewImage: r.reviewImage,
          tall: r.tall,
          weight: r.weight,
        }));

        setReviews(formattedReviews);
      } catch (err) {
        console.error("찜/리뷰 불러오기 실패:", err);
      }
    };
    fetchWishAndReview();
  }, [userNum, product]);

  const handleToggleWish = async () => {
    if (!userNum || !product) return;
    try {
      await favoriteApi.addFavorite({ userNum, productNum: product.productNum });
      setIsWished((prev) => !prev);
    } catch (err) {
      console.error("찜 토글 실패:", err);
    }
  };

  const currentOptions = productOptions[selectedColor] || { sizes: [], stockMap: {} };
  const currentStock = selectedSize ? currentOptions.stockMap[selectedSize] || 0 : 0;

  // 장바구니 추가
  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      alert("색상과 사이즈를 선택해주세요.");
      return;
    }
    const detail = product.productDetails.find(
      (d) => d.color === selectedColor && d.size === selectedSize
    );
    if (!detail) {
      alert("해당 옵션의 상품이 없습니다.");
      return;
    }
    try {
      await shoppingCartApi.addToCart({
        productDetailNum: detail.productDetailNum,
        count,
        isSelected: true,
      });
      navigate("/cart");
    } catch (err) {
      console.error("장바구니 추가 실패:", err);
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  // 구매하기
  const handleBuyNow = async () => {
    if (!selectedColor || !selectedSize) {
      alert("색상과 사이즈를 선택해주세요.");
      return;
    }
    const detail = product.productDetails.find(
      (d) => d.color === selectedColor && d.size === selectedSize
    );
    if (!detail) {
      alert("해당 옵션의 상품이 없습니다.");
      return;
    }
    try {
      const response = await orderApi.createOrder2({
        orderItems: [{ productDetailNum: detail.productDetailNum, count }],
      });
      alert(`주문이 완료되었습니다! 주문번호: ${response.orderNum}`);
      navigate("/mypage/orders");
    } catch (err) {
      console.error("주문 실패:", err);
      alert("주문 처리에 실패했습니다.");
    }
  };

  // 리뷰 정렬 + 필터 (±5 오차 적용)
  const sortedReviews = useMemo(() => {
    let list = [...reviews];
    if (filterHeight) {
      const h = parseInt(filterHeight);
      list = list.filter((r) => r.tall && r.tall >= h - 5 && r.tall <= h + 5);
    }
    if (filterWeight) {
      const w = parseInt(filterWeight);
      list = list.filter((r) => r.weight && r.weight >= w - 5 && r.weight <= w + 5);
    }

    if (sortOption === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.reviewNum - a.reviewNum);

    return list;
  }, [reviews, sortOption, filterHeight, filterWeight]);

  if (!product) return <div>로딩 중...</div>;

  return (
    <>
      <WhiteHeader />
      <div className="detail-container">
        <button onClick={() => navigate(-1)} className="back-btn">← 뒤로가기</button>

        {/* 상품 상세 */}
        <div className="detail-main">
          <img
            src={product.mainImage ? `http://localhost:8080/products/images/${product.mainImage}` : "https://via.placeholder.com/400x500"}
            alt={product.productName}
            className="detail-image"
          />
          <div className="detail-info">
            <h2 className="detail-title">{product.productName}</h2>
            <hr className="divider" />
            <p className="detail-desc">{product.description}</p>

            <div className="detail-row">
              <span className="label">가격</span>
              <span className="price">{product.price?.toLocaleString()}원</span>
              <span className="shipping">배송비 {product.deliveryFee?.toLocaleString()}원</span>
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
              <span className="stock">재고: {currentStock}개</span>
            </div>

            <hr className="divider" />
            <div className="total-row">
              <span className="label">TOTAL</span>
              <span className="total-price">{totalPrice.toLocaleString()}원</span>
            </div>

            <div className="action-buttons">
              <button className="icon-btn" onClick={handleToggleWish}>
                <img src={isWished ? redHeartIcon : heartIcon} alt="찜하기" className="icon" />
              </button>
              <button className="icon-btn" onClick={handleAddToCart}>
                <img src={orderIcon} alt="장바구니" className="icon" />
              </button>
              <button className="buy-btn" onClick={handleBuyNow}>구매하기</button>
            </div>
          </div>
        </div>

        {/* 리뷰 영역 */}
        <div className="review-section">
          <div className="review-write-card">
            <h3 className="review-title">REVIEW 작성하기</h3>
            <div className="review-summary">
              <div className="big-star">★</div>
              <div className="score">{avgRating.toFixed(1)}</div>
              <p className="summary-text">{reviews.length}개의 리뷰가 작성되었습니다.</p>
              <button className="write-btn" onClick={() => navigate(`/mypage/reviews/write/${product.productNum}`)}>
                리뷰 작성하기
              </button>
            </div>
          </div>

          {/* 리뷰 정렬 + 필터 */}
          <div className="review-header">
            <h3 className="review-title">REVIEW</h3>
            <div className="review-filters">
              {/* 탐색 범위 문구 추가 */}
              <span className="filter-range-text">탐색범위: 키(±5cm) / 몸무게(±5kg)</span>
              
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



              <select
                className="filter-select"
                value={filterHeight}
                onChange={(e) => setFilterHeight(e.target.value)}
              >
                <option value="">키</option>
                {Array.from({ length: 6 }, (_, i) => 150 + i * 10).map((h) => (
                  <option key={h} value={h}>{h}cm</option>
                ))}
              </select>

              <select
                className="filter-select"
                value={filterWeight}
                onChange={(e) => setFilterWeight(e.target.value)}
              >
                <option value="">몸무게</option>
                {Array.from({ length: 7 }, (_, i) => 40 + i * 10).map((w) => (
                  <option key={w} value={w}>{w}kg</option>
                ))}
              </select>
            </div>
          </div>


          {/* 리뷰 목록 */}
          <div className="review-list">
            {sortedReviews.map((r) => {
              const reviewImageUrl = r.reviewImage
                ? `http://localhost:8080/reviews/images/${r.reviewNum}/${r.reviewImage}`
                : product.mainImage
                  ? `http://localhost:8080/products/images/${product.mainImage}`
                  : "https://via.placeholder.com/120x160";

              return (
                <div key={r.reviewNum} className="review-card">
                  <div className="review-image">
                    <img src={reviewImageUrl} alt="리뷰 이미지" />
                  </div>
                  <div className="review-content">
                    <div className="review-top">
                      <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                    </div>
                    <p className="review-text">{r.text}</p>
                    <div className="review-meta">
                      색상: {r.color} / 사이즈: {r.size}
                    </div>
                    <div className="review-meta">
                      키: {r.tall ? r.tall + "cm" : "-"} / 몸무게: {r.weight ? r.weight + "kg" : "-"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
