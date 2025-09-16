// src/pages/user/MyReviewPage.jsx
import React, { useEffect, useState } from "react";
import { SubHeader } from "../../components/SubHeader";
import { useNavigate } from "react-router-dom";
import reviewIcon from "../../assets/icons/review.png";

export default function MyReviewPage() {
  const [writtenReviews, setWrittenReviews] = useState([]);
  const [toWriteReviews, setToWriteReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setWrittenReviews([
      {
        id: 1,
        productId: "123456789",
        productName: "여름블루 롱 원피스",
        review:
          "하늘하늘해서 지금 시기에 입기 딱 좋네요. 근데 약간 오버핏이어서 참고하면 좋을 것 같네요.",
        image: "https://via.placeholder.com/120x150",
      },
    ]);

    setToWriteReviews([
      {
        id: 2,
        productId: "987654321",
        productName: "여름블루 롱 원피스",
        desc: "여름에 입기 좋은 롱 원피스.. 상품 설명 상품 설명 상품 설명",
        price: 50000,
        image: "https://via.placeholder.com/120x150",
      },
    ]);
  }, []);

  return (
    <div className="bg-white min-h-screen w-full">
      <SubHeader />

      <div className="max-w-[1000px] mx-auto py-10">
        {/* ===== 제목 ===== */}
        <div className="flex items-center gap-3 mb-8">
          <img src={reviewIcon} alt="리뷰 아이콘" className="w-8 h-8" />
          <h2 className="text-2xl font-bold">
            나의 리뷰 ({writtenReviews.length + toWriteReviews.length})
          </h2>
        </div>

        {/* ===== 작성한 리뷰 ===== */}
        <div className="mb-6">
          <div className="inline-block border rounded-lg px-6 py-2 font-bold text-lg">
            작성한 리뷰
          </div>
        </div>
        {writtenReviews.map((item) => (
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
              <p className="text-sm text-gray-500">{item.productId}</p>
              <p className="font-bold">{item.productName}</p>
              <p className="text-gray-700 mt-2">{item.review}</p>
            </div>
            <button
              onClick={() => navigate(`/mypage/reviews/edit/${item.id}`)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md"
            >
              리뷰수정
            </button>
          </div>
        ))}

        {/* ===== 리뷰를 작성해보세요 ===== */}
        <div className="mt-10 mb-6">
          <div className="inline-block border rounded-lg px-6 py-2 font-bold text-lg">
            리뷰를 작성해보세요
          </div>
        </div>
        {toWriteReviews.map((item) => (
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
              <p className="text-sm text-gray-500">{item.productId}</p>
              <p className="font-bold">{item.productName}</p>
              <p className="text-gray-700 mt-2">{item.desc}</p>
              <p className="text-gray-900 font-bold mt-1">
                {item.price.toLocaleString()}원
              </p>
            </div>
            <button
              onClick={() => navigate(`/mypage/reviews/write/${item.id}`)}
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
