// src/pages/user/ReviewEditPage.jsx
import React, { useEffect, useState } from "react";
import { SubHeader } from "../../components/SubHeader";
import ReviewForm from "../../components/ReviewForm";
import { useParams, useNavigate } from "react-router-dom";
import { reviewApi } from "../../api/review_/reviewApi";
import { productDetailApi } from "../../api/productDetail/productDetailApi";
import { userApi } from "../../api/user/userApi";

export default function ReviewEditPage() {
  const { reviewId } = useParams(); // 라우트에서 받은 값 (실제로는 productDetailNum)
  const productDetailNum = reviewId;
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [myReview, setMyReview] = useState(null);

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
      } catch (err) {
        console.error("상품 상세 조회 실패:", err);
      }
    };

    fetchProductDetail();
  }, [productDetailNum]);

  useEffect(() => {
    if (myReview) {
      console.log("내 리뷰가 업데이트됨:", myReview);
    }
  }, [myReview]);

  // ✅ 내가 쓴 리뷰 가져오기
  useEffect(() => {
    const fetchMyReview = async () => {
      try {
        const userInfo = await userApi.getUserInfo();
        const userNum = userInfo.userNum;

        const myReviews = await reviewApi.getUserReviews(userNum);
        const matched = myReviews.find(
          (r) => r.productDetailNum === parseInt(productDetailNum)
        );

        if (matched) setMyReview(matched);
      } catch (err) {
        console.error("내 리뷰 조회 실패:", err);
      }
    };

    fetchMyReview();
  }, [productDetailNum]);

  // ✅ 리뷰 수정 → 기존 삭제 후 새로 생성
  const handleSubmit = async (reviewData) => {
    try {
      const formData = new FormData();
      formData.append("score", reviewData.score);
      formData.append("text", reviewData.text);
      if (reviewData.reviewImage) {
        formData.append("reviewImage", reviewData.reviewImage);
      }

      // 1️⃣ 기존 리뷰 삭제
      if (myReview?.reviewNum) {
        await reviewApi.deleteReview(myReview.reviewNum);
      }

      // 2️⃣ 새 리뷰 생성
      await reviewApi.createReview(productDetailNum, formData);

      alert("리뷰가 수정(재작성)되었습니다.");
      navigate("/mypage/reviews");
    } catch (err) {
      console.error("리뷰 수정(재작성) 실패:", err);
      alert("리뷰 수정에 실패했습니다.");
    }
  };

  if (!product) return <div>상품 정보를 불러오는 중...</div>;
  if (!myReview) return <div>작성한 리뷰를 불러오는 중...</div>;

  return (
    <div className="bg-white min-h-screen w-full">
      <SubHeader />
      {/* ✅ ReviewForm에 기존 리뷰 내용 전달 */}
      <ReviewForm
        mode="edit"
        product={product}
        review={{
          score: myReview.score,
          text: myReview.text,
          reviewImage: myReview.reviewImage,
          reviewNum: myReview.reviewNum,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
