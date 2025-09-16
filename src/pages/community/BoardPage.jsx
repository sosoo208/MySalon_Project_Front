import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";
import { useBoard } from "../../context/BoardContext";

export default function BoardPage() {
  const navigate = useNavigate();
  const { posts, rel } = useBoard();

  // createdAt 기준 최신순
  const sorted = useMemo(
    () => [...posts].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
    [posts]
  );

  return (
    <div className="bg-white min-h-screen w-full">
      <SubHeader />

      <div className="max-w-[1000px] mx-auto py-10">
        {/* 상단 탭 */}
        <div className="flex justify-center gap-10 mb-10 border-b pb-3">
          <Link to="/community" className="text-2xl text-black">
            오늘의 코디
          </Link>
          <h2 className="text-2xl font-bold text-[#a40303]">게시판</h2>
        </div>

        {/* 검색 + 글쓰기 */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="무엇을 찾고싶으신가요?"
            className="flex-1 border px-4 py-2 rounded-md mr-4"
          />
          <button
            onClick={() => navigate("/board/write")}
            className="px-4 py-2 bg-gray-600 text-white rounded-md"
          >
            글쓰기
          </button>
        </div>

        {/* 게시글 리스트 */}
        <div className="space-y-4">
          {sorted.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/board/${post.id}`)}
              className="flex justify-between items-center border rounded-md p-4 hover:bg-gray-50 cursor-pointer"
            >
              {/* 왼쪽: 글 정보 */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold mb-1 truncate">{post.title}</h3>
                <div className="text-sm text-gray-600 flex gap-3">
                  <span>{post.author}</span>
                  <span>{post.createdAt ? rel(post.createdAt) : post.time}</span>
                  <span>댓글 {post.comments.length}개</span>
                </div>
              </div>

              {/* 오른쪽: 썸네일 이미지 */}
              {post.image ? (
                <img
                  src={post.image}
                  alt="thumbnail"
                  className="w-20 h-20 object-cover ml-4 border"
                />
              ) : (
                <div className="w-20 h-20 ml-4 border bg-gray-100 grid place-items-center text-xs text-gray-400">
                  No Image
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
