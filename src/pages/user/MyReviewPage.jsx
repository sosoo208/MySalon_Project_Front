// src/pages/user/MyReviewPage.jsx
import React, { useEffect, useState } from "react";
import { SubHeader } from "../../components/SubHeader";
import { useNavigate } from "react-router-dom";
import reviewIcon from "../../assets/icons/review.png";
import { orderApi } from "../../api/order/orderApi";
import { reviewApi } from "../../api/review_/reviewApi";
import { userApi } from "../../api/user/userApi";
import starIcon from "../../assets/icons/star.png";
import redStarIcon from "../../assets/icons/redstar.png";

export default function MyReviewPage() {
  const [writtenReviews, setWrittenReviews] = useState([]);
  const [toWriteReviews, setToWriteReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await userApi.getUserInfo();
        const userNum = userInfo.userNum;

        const reviews = await reviewApi.getUserReviews(userNum);
        console.log("내 리뷰 목록:", reviews);

        const orders = await orderApi.getAllOrdersByUser(userNum);

        const written = [];
        const toWrite = [];

        orders.forEach(order => {
          order.orderDetails.forEach(item => {
            const matchedReview = reviews.find(
              r => r.productDetailNum === item.productDetailNum
            );

            if (matchedReview) {
              // 리뷰 이미지 URL (reviewNum 폴더 기준)
              const reviewImageUrl = matchedReview.reviewImage
                ? `http://localhost:8080/reviews/images/${matchedReview.reviewNum}/${matchedReview.reviewImage}`
                : item.mainImage
                  ? `http://localhost:8080/products/images/${item.mainImage}`
                  : "https://via.placeholder.com/120x160";

              written.push({
                id: matchedReview.reviewNum,
                productDetailNum: item.productDetailNum,
                productName: item.productName ?? "상품명 없음",
                color: item.color ?? "",
                size: item.size ?? "",
                review: matchedReview.text ?? "",
                image: reviewImageUrl,
                price: item.price ?? 0, // ✅ 가격 추가
                score: matchedReview.score ?? 0, // ✅ 여기 추가
              });
            } else {
              toWrite.push({
                id: item.productDetailNum,
                productDetailNum: item.productDetailNum,
                productName: item.productName ?? "상품명 없음",
                color: item.color ?? "",
                size: item.size ?? "",
                desc: item.description ?? "",
                price: item.price ?? 0,
                image: item.mainImage
                  ? `http://localhost:8080/products/images/${item.mainImage}`
                  : "https://via.placeholder.com/120x160",
              });
            }
          });
        });

        setWrittenReviews(written);
        setToWriteReviews(toWrite);
      } catch (err) {
        console.error("리뷰/주문 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="bg-white min-h-screen w-full">
      <SubHeader />

      <div className="max-w-[1000px] mx-auto py-10">
        <div className="flex items-center gap-3 mb-8">
          <img src={reviewIcon} alt="리뷰 아이콘" className="w-8 h-8" />
          <h2 className="text-2xl font-bold">
            나의 리뷰 ({writtenReviews.length + toWriteReviews.length})
          </h2>
        </div>

        {/* 작성한 리뷰 */}
        <div className="mb-6">
          <div className="inline-block border rounded-lg px-6 py-2 font-bold text-lg">
            작성한 리뷰
          </div>
        </div>
        {writtenReviews.map(item => (
  <div
    key={item.id}
    className="flex items-center gap-4 border-b pb-4 mb-4"
  >
    <img
      src={item.image}
      alt="상품 이미지"
      className="w-[100px] h-[130px] object-cover rounded"
    />
    <div className="flex-1">
      <p className="text-sm text-gray-500">{item.productDetailNum}</p>
      <p className="font-bold">
        {item.productName}{" "}
        {item.color && item.size && (
          <span className="text-gray-500 text-sm ml-2">
            [{item.color} / {item.size}]
          </span>
        )}
      </p>
      {/* ✅ 가격 표시 */}
      <p className="text-gray-900 font-bold mt-1">
        {(item.price ?? 0).toLocaleString()}원
      </p>

      {/* ⭐ 리뷰 점수 */}
      <div className="flex gap-1 mt-2">
        {[0, 1, 2, 3, 4].map(i => (
          <img
            key={i}
            src={i < item.score ? redStarIcon : starIcon} // 점수보다 작은 인덱스면 빨간 별
            alt="star"
            className="w-5 h-5"
          />
        ))}
      </div>

      <p className="text-gray-700 mt-2">{item.review}</p>
    </div>
    <button
      onClick={() =>
        navigate(`/mypage/reviews/edit/${item.productDetailNum}`)
      }
      className="px-4 py-2 bg-gray-600 text-white rounded-md"
    >
      리뷰수정
    </button>
  </div>
))}


        {/* 리뷰 작성 가능 */}
        <div className="mt-10 mb-6">
          <div className="inline-block border rounded-lg px-6 py-2 font-bold text-lg">
            리뷰를 작성해보세요
          </div>
        </div>
        {toWriteReviews.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b pb-4 mb-4"
          >
            <img
              src={item.image}
              alt="상품 이미지"
              className="w-[100px] h-[130px] object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-500">{item.productDetailNum}</p>
              <p className="font-bold">
                {item.productName}{" "}
                {item.color && item.size && (
                  <span className="text-gray-500 text-sm ml-2">
                    [{item.color} / {item.size}]
                  </span>
                )}
              </p>
              <p className="text-gray-700 mt-2">{item.desc}</p>
              <p className="text-gray-900 font-bold mt-1">
                {(item.price ?? 0).toLocaleString()}원
              </p>
            </div>
            <button
              onClick={() =>
                navigate(`/mypage/reviews/write/${item.productDetailNum}`)
              }
              className="px-4 py-2 bg-gray-600 text-white rounded-md"
            >
              리뷰작성
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
