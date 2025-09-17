// src/components/ReviewForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import starIcon from "../assets/icons/star.png";
import redStarIcon from "../assets/icons/redstar.png";

export default function ReviewForm({ mode = "write", product, review, onSubmit }) {
  const navigate = useNavigate();

  // ⭐ 초기값: 리뷰가 있으면 불러오기
  const [rating, setRating] = useState(review?.score || 0);
  const [text, setText] = useState(review?.text || "");
  const [image, setImage] = useState(null); // 새로 업로드하는 이미지
  const [previewImage, setPreviewImage] = useState(""); // 화면에 띄울 이미지

  // ✅ 수정 모드일 때 기존 리뷰 이미지 세팅
  useEffect(() => {
    if (mode === "edit" && review?.reviewImage) {
      setPreviewImage(
        `http://localhost:8080/reviews/images/${review.reviewNum}/${review.reviewImage}`
      );
    }
  }, [mode, review]);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  // ⭐ 상위 onSubmit으로 데이터 전달
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        score: rating,
        text: text,
        reviewImage: image, // 새 파일 있으면 업로드, 없으면 기존 유지
      });
    }
  };

  // 이미지 선택 시 previewImage 업데이트
  const handleImageChange = (file) => {
    if (file) {
      setImage(file); // 새로 업로드한 파일 state에 저장
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result); // 화면에 새 이미지 미리보기
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      // 새 파일 없으면 기존 리뷰 이미지 유지
      if (mode === "edit" && review?.reviewImage) {
        setPreviewImage(`http://localhost:8080/reviews/images/${review.reviewNum}/${review.reviewImage}`);
      } else {
        setPreviewImage(""); // 없으면 placeholder
      }
    }
  };


  return (
    <div className="bg-[#E3E3E3] min-h-screen w-full">
      <div className="max-w-[800px] mx-auto py-10">
        <h2 className="text-2xl font-bold mb-8">
          리뷰{mode === "write" ? "작성하기" : "수정하기"} ✏️
        </h2>

        <div className="bg-white rounded-md shadow p-6">
          {/* 상품 정보 */}
          <div className="flex gap-6 mb-6">
            <img
              src={previewImage || "https://via.placeholder.com/120x150"}
              alt="리뷰 이미지"
              className="w-[120px] h-[150px] object-cover rounded"
            />
            <div>
              <p className="text-sm text-gray-500">{product?.id}</p>
              <p className="font-bold">
                {product?.name || "상품명"}{" "}
                <span className="text-gray-500 text-sm ml-2">
                  [{product?.color || "-"} / {product?.size || "-"}]
                </span>
              </p>
              <p className="text-gray-900 font-bold mt-1">
                {product?.price?.toLocaleString() || "0"}원
              </p>
            </div>
          </div>

          {/* 별점 */}
          <div className="flex gap-2 mb-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={i < rating ? redStarIcon : starIcon}
                alt="star"
                className="w-8 h-8 cursor-pointer"
                onClick={() => handleStarClick(i)}
              />
            ))}
          </div>

          {/* 리뷰 텍스트 */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="이 상품을 사용하면서 느낀 점을 작성해주세요."
            className="w-full border rounded-md px-3 py-2 h-24 mb-4"
          />

          {/* 사진 업로드 */}
          <div className="mb-6">
            <label className="inline-block border px-4 py-2 rounded-md cursor-pointer">
              사진 업로드
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
            </label>
            {image && (
              <p className="text-sm text-gray-600 mt-2">
                선택된 파일: {image.name}
              </p>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex justify-between">
            <button
              onClick={() => navigate("/mypage/reviews")}
              className="flex-1 border py-2 mr-2 rounded-md"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gray-600 text-white py-2 ml-2 rounded-md"
            >
              {mode === "write" ? "등록하기" : "수정하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
