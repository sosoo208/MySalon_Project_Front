import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";
import { useOutfits } from "../../context/OutfitContext";

const Card = ({ children, className, ...props }) => (
  <div className={`rounded-lg border bg-white shadow overflow-hidden ${className || ""}`} {...props}>
    {children}
  </div>
);

const CommunityPage = () => {
  const { outfits, deleteOutfit } = useOutfits();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // 좋아요 내림차순 정렬 → 새로 등록한(좋아요 0) 카드는 하단에 위치
  const sorted = useMemo(() => [...outfits].sort((a, b) => b.likes - a.likes), [outfits]);

  const top3 = sorted.slice(0, 3);
  const getDisplayCards = () => {
    if (top3.length < 3) return top3;
    const prevIndex = (currentIndex - 1 + top3.length) % top3.length;
    const nextIndex = (currentIndex + 1) % top3.length;
    return [top3[prevIndex], top3[currentIndex], top3[nextIndex]];
  };
  const displayCards = getDisplayCards();

  const prev = () => setCurrentIndex((p) => (p === 0 ? top3.length - 1 : p - 1));
  const next = () => setCurrentIndex((p) => (p === top3.length - 1 ? 0 : p + 1));

  const goDetail = (item) => navigate(`/community/${item.id}`);

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (confirm("이 코디를 삭제할까요?")) deleteOutfit(id);
  };

  return (
    <div className="bg-[#fff] min-h-screen w-full">
      <SubHeader />

      <div className="max-w-[1200px] mx-auto py-10">
        {/* 탭 */}
        <div className="flex justify-center gap-10 mb-10 border-b pb-3">
          <h2 className="text-2xl font-bold text-[#a40303]">오늘의 코디</h2>
          <Link to="/board" className="text-2xl text-black">
            게시판
          </Link>
        </div>

        {/* Top 3 캐러셀 */}
        <div className="relative flex justify-center items-end mb-16">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full border bg-white shadow hover:bg-gray-50"
            aria-label="이전"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex gap-6">
            {displayCards.map((outfit, index) => (
              <Card
                key={outfit.id}
                className={`transition-all duration-300 cursor-pointer relative ${
                  index === 1 ? "w-[260px] h-[340px] border-2 border-black z-20" : "w-[220px] h-[300px] opacity-90 z-10"
                }`}
                onClick={() => goDetail(outfit)}
              >
                {outfit.mine && (
                  <button
                    onClick={(e) => onDelete(e, outfit.id)}
                    className="absolute top-2 right-2 text-[11px] px-2 py-1 bg-red-600 text-white rounded"
                  >
                    삭제
                  </button>
                )}
                <div className="p-4 text-left">
                  <div
                    className={`${index === 1 ? "h-[200px]" : "h-[160px]"} w-full overflow-hidden rounded-md mb-3`}
                  >
                    <img src={outfit.image} alt={outfit.title} className="w-full h-full object-cover block" loading="lazy" />
                  </div>
                  <h3 className="font-bold text-lg line-clamp-1">{outfit.title}</h3>
                  <p className="text-xs text-gray-600">{outfit.category}</p>
                  <p className="text-xs text-gray-700 mt-2">{outfit.username}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <HeartIcon className="w-4 h-4 text-red-500" fill="currentColor" />
                    <span className="text-sm font-bold">{outfit.likes}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full border bg-white shadow hover:bg-gray-50"
            aria-label="다음"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* 나의 코디 등록하기 */}
        <div className="flex justify-center mb-10">
          <Link to="/coordi/write" className="px-6 py-2 border border-black bg-white hover:bg-gray-50">
            나의 코디 등록하기
          </Link>
        </div>

        {/* 전체 목록 */}
        <section className="grid grid-cols-4 gap-6">
          {sorted.map((outfit) => (
            <Card key={outfit.id} className="p-4 cursor-pointer relative" onClick={() => goDetail(outfit)}>
              {outfit.mine && (
                <button
                  onClick={(e) => onDelete(e, outfit.id)}
                  className="absolute top-2 right-2 text-[11px] px-2 py-1 bg-red-600 text-white rounded"
                >
                  삭제
                </button>
              )}

              <div className="w-full h-[160px] overflow-hidden rounded-md mb-3">
                <img src={outfit.image} alt={outfit.title} className="w-full h-full object-cover block" loading="lazy" />
              </div>
              <h3 className="font-bold text-lg line-clamp-1">{outfit.title}</h3>
              <p className="text-xs text-gray-600">{outfit.category}</p>
              <p className="text-xs text-gray-700 mt-2">{outfit.username}</p>
              <div className="flex items-center gap-1 mt-2">
                <HeartIcon className="w-4 h-4 text-red-500" fill="currentColor" />
                <span className="text-sm font-bold">{outfit.likes}</span>
              </div>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CommunityPage;