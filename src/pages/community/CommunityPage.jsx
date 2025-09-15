import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";

const Card = ({ children, className }) => (
  <div className={`rounded-lg border bg-white shadow ${className || ""}`}>
    {children}
  </div>
);

const CommunityPage = () => {
  const [outfits, setOutfits] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 더미 데이터 (API 연동 예정)
  useEffect(() => {
    setOutfits([
      {
        id: 1,
        title: "여름 원피스 코디",
        category: "휴양지룩",
        image: "https://via.placeholder.com/250x300",
        username: "홍길동",
        likes: 35,
      },
      {
        id: 2,
        title: "화이트 셔츠 코디",
        category: "데이트룩",
        image: "https://via.placeholder.com/250x300",
        username: "유저A",
        likes: 50,
      },
      {
        id: 3,
        title: "린넨 팬츠 코디",
        category: "출근룩",
        image: "https://via.placeholder.com/250x300",
        username: "김철수",
        likes: 40,
      },
    ]);
  }, []);

  // 좋아요 순으로 정렬
  const sorted = [...outfits].sort((a, b) => b.likes - a.likes);

  // 현재 보여줄 카드 3개 (캐러셀 구조)
  const getDisplayCards = () => {
    if (sorted.length < 3) return sorted;
    const prevIndex = (currentIndex - 1 + sorted.length) % sorted.length;
    const nextIndex = (currentIndex + 1) % sorted.length;
    return [sorted[prevIndex], sorted[currentIndex], sorted[nextIndex]];
  };

  const displayCards = getDisplayCards();

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sorted.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrentIndex((prev) =>
      prev === sorted.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-[#fff] min-h-screen w-full">
      <SubHeader />

      <div className="max-w-[1200px] mx-auto py-10">
        {/* ===== 탭 ===== */}
        <div className="flex justify-center gap-10 mb-10 border-b pb-3">
          <h2 className="text-2xl font-bold text-[#a40303]">오늘의 코디</h2>
          <Link to="/board" className="text-2xl text-black">
            게시판
          </Link>
        </div>

        {/* ===== Top 3 캐러셀 (중앙 강조 + 버튼) ===== */}
        <div className="relative flex justify-center items-end mb-16">
          {/* 왼쪽 버튼 */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full border bg-white shadow hover:bg-gray-50"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* 카드 3개 */}
          <div className="flex gap-6">
            {displayCards.map((outfit, index) => (
              <Card
                key={outfit.id}
                className={`transition-all duration-300 ${
                  index === 1
                    ? "w-[260px] h-[340px] border-2 border-black scale-105 z-20"
                    : "w-[220px] h-[300px] border -mx-8 opacity-90 z-10"
                }`}
              >
                <div className="p-4 text-left">
                  <img
                    src={outfit.image}
                    alt={outfit.title}
                    className={`object-cover mb-3 ${
                      index === 1
                        ? "w-full h-[200px]"
                        : "w-full h-[160px]"
                    }`}
                  />
                  <h3 className="font-bold text-lg">{outfit.title}</h3>
                  <p className="text-xs text-gray-600">{outfit.category}</p>
                  <p className="text-xs text-gray-700 mt-2">{outfit.username}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <HeartIcon className="w-4 h-4 fill-red-500 text-red-500" />
                    <span className="text-sm font-bold">{outfit.likes}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* 오른쪽 버튼 */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full border bg-white shadow hover:bg-gray-50"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* ===== 나의 코디 등록하기 버튼 ===== */}
        <div className="flex justify-center mb-10">
          <Link
            to="/coordi/write"
            className="px-6 py-2 border border-black bg-white hover:bg-gray-50"
          >
            나의 코디 등록하기
          </Link>
        </div>

        {/* ===== 전체 목록 ===== */}
        <section className="grid grid-cols-4 gap-6">
          {sorted.map((outfit) => (
            <Card key={outfit.id} className="p-4">
              <img
                src={outfit.image}
                alt={outfit.title}
                className="w-full h-[160px] object-cover mb-3"
              />
              <h3 className="font-bold text-lg">{outfit.title}</h3>
              <p className="text-xs text-gray-600">{outfit.category}</p>
              <p className="text-xs text-gray-700 mt-2">{outfit.username}</p>
              <div className="flex items-center gap-1 mt-2">
                <HeartIcon className="w-4 h-4 fill-red-500 text-red-500" />
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
