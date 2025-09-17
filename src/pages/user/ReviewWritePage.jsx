// src/pages/user/ReviewWritePage.jsx
import React, { useEffect, useState } from "react";
import { SubHeader } from "../../components/SubHeader";
import ReviewForm from "../../components/ReviewForm";
import { useParams, useNavigate } from "react-router-dom";
import { reviewApi } from "../../api/review_/reviewApi";
import { productDetailApi } from "../../api/productDetail/productDetailApi"; // ✅ 상품 상세 API 불러오기

export default function ReviewWritePage() {
  const { productId } = useParams();
  const productDetailNum = productId; // 통일
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // ✅ 상품 상세 정보 가져오기
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await productDetailApi.getByDetailNum(productDetailNum);
        setProduct({
          id: data.productDetailNum,
          name: data.productName,
          price: data.price,
          image: data.image,
          color: data.color,
          size: data.size,
        });
        console.log("상품 상세 정보:", data);
      } catch (err) {
        console.error("상품 상세 조회 실패:", err);
      }
    };

    fetchProductDetail();
  }, [productDetailNum]);

  // ✅ 리뷰 작성 핸들러
  const handleSubmit = async (reviewData) => {
    try {
      const formData = new FormData();
      formData.append("score", reviewData.score);
      formData.append("text", reviewData.text);
      if (reviewData.reviewImage) {
        formData.append("reviewImage", reviewData.reviewImage);
      }

      await reviewApi.createReview(productDetailNum, formData);

      alert("리뷰가 작성되었습니다.");
      navigate("/mypage/reviews");
    } catch (err) {
      console.error("리뷰 작성 실패:", err);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  if (!product) return <div>상품 정보를 불러오는 중...</div>;

  return (
    <div className="bg-white min-h-screen w-full">
      <SubHeader />
      {/* ✅ product 정보를 ReviewForm 에 전달 */}
      <ReviewForm mode="write" product={product} onSubmit={handleSubmit} />
    </div>
  );
}
