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
          options[d.color].stockMap[d.size] = d.count; // ✅ 각 옵션별 재고
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
        setReviews(reviewList || []);
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
  const currentStock = selectedSize ? currentOptions.stockMap[selectedSize] || 0 : 0; // ✅ 재고

  // 장바구니 추가
  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      alert("색상과 사이즈를 선택해주세요.");
      return;
    }

    // 색상+사이즈로 productDetailNum 찾기
    const detail = product.productDetails.find(
      (d) => d.color === selectedColor && d.size === selectedSize
    );

    // ✅ detail 전체 콘솔로 확인
    console.log("선택된 옵션 detail 객체:", detail);

    if (!detail) {
      alert("해당 옵션의 상품이 없습니다.");
      return;
    }

    console.log("장바구니에 추가할 productDetailNum:", detail.productDetailNum);

    try {
      await shoppingCartApi.addToCart({
        productDetailNum: detail.productDetailNum,
        count,
        isSelected: true,
      });
      navigate("/cart"); // 장바구니 페이지 이동
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

    // productDetailNum 찾기
    const detail = product.productDetails.find(
      (d) => d.color === selectedColor && d.size === selectedSize
    );

    if (!detail) {
      alert("해당 옵션의 상품이 없습니다.");
      return;
    }

    try {
      // 백엔드 API 요청
      const response = await orderApi.createOrder2({
        orderItems: [
          {
            productDetailNum: detail.productDetailNum,
            count: count,
          },
        ],
      });

      console.log("주문 성공:", response);
      alert(`주문이 완료되었습니다! 주문번호: ${response.orderNum}`);

      // 주문 완료 후 이동 (예: 주문 내역 페이지)
      navigate("/mypage/orders");
    } catch (err) {
      console.error("주문 실패:", err);
      alert("주문 처리에 실패했습니다.");
    }
  };

  // 리뷰 정렬 + 필터
  const sortedReviews = useMemo(() => {
    let list = [...reviews];
    if (filterHeight) list = list.filter((r) => r.height === filterHeight);
    if (filterWeight) list = list.filter((r) => r.weight === filterWeight);

    if (sortOption === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.id - a.id);

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
              <span className="stock">재고: {currentStock}개</span> {/* ✅ 재고 수정 */}
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
          <div className="review-header">
            <h3 className="review-title">REVIEW</h3>
            <div className="review-filters">
              <button className={`filter-btn ${sortOption === "latest" ? "active" : ""}`} onClick={() => setSortOption("latest")}>최신순</button>
              <button className={`filter-btn ${sortOption === "rating" ? "active" : ""}`} onClick={() => setSortOption("rating")}>별점순</button>
              <select className="filter-select" value={filterHeight} onChange={(e) => setFilterHeight(e.target.value)}>
                <option value="">키</option>
                <option value="150cm">150cm</option>
                <option value="160cm">160cm</option>
                <option value="170cm">170cm</option>
              </select>
              <select className="filter-select" value={filterWeight} onChange={(e) => setFilterWeight(e.target.value)}>
                <option value="">몸무게</option>
                <option value="50kg">50kg</option>
                <option value="60kg">60kg</option>
                <option value="70kg">70kg</option>
              </select>
            </div>
          </div>

          <div className="review-summary">
            <div className="big-star">★</div>
            <div className="score">{avgRating.toFixed(1)}</div>
            <p className="summary-text">{reviews.length}개의 리뷰가 작성되었습니다.</p>
            <button className="write-btn" onClick={() => navigate(`/mypage/reviews/write/${product.productNum}`)}>리뷰 작성하기</button>
          </div>

          <div className="review-list">
            {sortedReviews.map((r) => (
              <div key={r.id} className="review-card">
                <div className="review-profile">
                  <img src={r.avatar} alt={`${r.user} 프로필`} />
                </div>
                <div className="review-content">
                  <div className="review-top">
                    <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                    <span className="review-label">{r.user}</span>
                  </div>
                  <p className="review-text">{r.text}</p>
                  <span className="review-meta">{r.height || "-"} / {r.weight || "-"} / {r.date || "-"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
