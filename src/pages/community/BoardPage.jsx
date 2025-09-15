// src/pages/community/BoardPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";

export default function BoardPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: 실제 API 연결
    setPosts([
      {
        id: 1,
        title: "이 옷에 어울리는 바지 추천해주세요!",
        author: "홍길동",
        time: "1시간 전",
        comments: 7,
        image: "https://via.placeholder.com/80x80?text=사진",
      },
      {
        id: 2,
        title: "여름에 입기 좋은 아우터 추천좀요",
        author: "유저A",
        time: "2시간 전",
        comments: 3,
        image: null,
      },
      {
        id: 3,
        title: "면접용 정장 코디 피드백 부탁드려요",
        author: "김철수",
        time: "3시간 전",
        comments: 12,
        image: "https://via.placeholder.com/80x80?text=사진",
      },
    ]);
  }, []);

  return (
    <div className="bg-white min-h-screen w-full"> {/* ✅ 배경을 흰색으로 변경 */}
      <SubHeader />

      <div className="max-w-[1000px] mx-auto py-10">
        {/* ===== 상단 탭 ===== */}
        <div className="flex justify-center gap-10 mb-10 border-b pb-3">
          <Link to="/community" className="text-2xl text-black">
            오늘의 코디
          </Link>
          <h2 className="text-2xl font-bold text-[#a40303]">게시판</h2>
        </div>

        {/* ===== 검색창 + 글쓰기 버튼 ===== */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="무엇을 찾고싶으신가요?"
            className="flex-1 border px-4 py-2 rounded-md mr-4"
          />
          <button
            onClick={() => navigate("/board/write")} // ✅ 글쓰기 페이지 이동
            className="px-4 py-2 bg-gray-600 text-white rounded-md"
          >
            글쓰기
          </button>
        </div>

        {/* ===== 게시글 리스트 ===== */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/board/${post.id}`)} // ✅ 상세 페이지 이동
              className="flex justify-between items-center border rounded-md p-4 hover:bg-gray-50 cursor-pointer"
            >
              {/* 왼쪽: 글 정보 */}
              <div className="flex-1">
                <h3 className="font-bold mb-1">{post.title}</h3>
                <div className="text-sm text-gray-600 flex gap-3">
                  <span>{post.author}</span>
                  <span>{post.time}</span>
                  <span>댓글 {post.comments}개</span>
                </div>
              </div>

              {/* 오른쪽: 썸네일 이미지 */}
              {post.image && (
                <img
                  src={post.image}
                  alt="thumbnail"
                  className="w-20 h-20 object-cover ml-4 border"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
