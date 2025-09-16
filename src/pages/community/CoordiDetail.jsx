import React from "react";
import { HeartIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";
import { useOutfits } from "../../context/OutfitContext";

/**
 * 카드 클릭 → /community/:id
 * 스샷처럼 중앙 카드 레이아웃:
 * - 좌측: 큰 이미지(정사각 비율)
 * - 우측: 코디 설명 + 좋아요
 * - 상단: "오늘의 코디" + 제목/작성자 정보줄
 * - 하단 우측: 목록으로 버튼
 */
const CoordiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { outfits, toggleLike } = useOutfits();

  const item = outfits.find((o) => String(o.id) === String(id));

  if (!item) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <SubHeader />
        <div className="max-w-[980px] mx-auto py-16">
          <div className="bg-white border rounded-lg shadow p-10 text-center">
            존재하지 않는 코디입니다.
            <div className="mt-6">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 border hover:bg-gray-50"
              >
                이전으로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const onLike = () => toggleLike(item.id);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <SubHeader />

      {/* 중앙 카드 컨테이너 */}
      <div className="max-w-[980px] mx-auto py-10">
        <div className="bg-white border rounded-lg shadow">
          {/* 제목 */}
          <div className="px-8 pt-8">
            <h1 className="text-2xl font-bold text-center mb-6">오늘의 코디</h1>

            {/* 제목/작성자 정보줄 */}
            <div className="flex justify-between text-sm text-gray-700">
              <div className="flex gap-2">
                <span className="text-gray-500">제목 :</span>
                <span className="font-medium">{item.title}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">작성자:</span>
                <span className="font-medium">{item.username}</span>
              </div>
            </div>

            <hr className="mt-4" />
          </div>

          {/* 본문: 좌 이미지 / 우 설명 */}
          <div className="px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* 좌측 이미지 */}
              <div className="w-full max-w-[520px] mx-auto md:mx-0">
                <div className="aspect-[1/1.25] md:aspect-square w-full overflow-hidden border rounded">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>

              {/* 우측 설명 + 하트 */}
              <div className="flex flex-col">
                <div className="border-b pb-6 mb-6">
                  <p className="leading-7 text-gray-700 whitespace-pre-line">
                    {item.desc ||
                      "코디 설명이 아직 없습니다. 멋진 설명을 작성해보세요!"}
                  </p>
                </div>

                {/* 좋아요 (스샷처럼 빈 하트 아이콘 + 숫자) */}
                <button
                  onClick={onLike}
                  className={`flex items-center gap-2 w-fit px-3 py-2 rounded border hover:bg-gray-50 ${
                    item.liked ? "bg-red-50" : "bg-white"
                  }`}
                >
                  <HeartIcon
                    className={`w-5 h-5 ${
                      item.liked ? "text-red-500 fill-red-500" : "text-gray-700"
                    }`}
                    // liked면 채우고, 아니면 테두리만 보이도록
                    fill={item.liked ? "currentColor" : "none"}
                  />
                  <span className="font-medium">{item.likes}</span>
                </button>
              </div>
            </div>

            {/* 하단 우측 버튼 */}
            <div className="flex justify-end mt-10">
              <Link
                to="/community"
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                목록으로
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordiDetail;
