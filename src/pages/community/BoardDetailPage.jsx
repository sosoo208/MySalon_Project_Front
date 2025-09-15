// src/pages/community/BoardDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";
import profileIcon from "../../assets/icons/profile.png"; // 유저 아이콘

export default function BoardDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // TODO: 실제 API 호출
    setPost({
      id,
      title: "이 옷에 어울리는 티 추천해주세요!",
      author: "홍길동",
      time: "1시간 전",
      content:
        "사진같은 바지를 구매했는데 어떤 옷이랑 코디하면 좋을지 모르겠어요. 코디 추천 부탁드립니다.",
      image: "https://via.placeholder.com/200x250?text=사진",
    });

    setComments([
      { id: 1, author: "홍길동", text: "첫 코멘트입니다!" },
      { id: 2, author: "유저A", text: "저는 흰 티셔츠 추천해요!" },
      { id: 3, author: "김철수", text: "린넨 셔츠도 괜찮을 듯 합니다." },
    ]);
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newItem = {
      id: comments.length + 1,
      author: "현재 사용자", // TODO: 로그인 사용자 이름
      text: newComment,
    };
    setComments([...comments, newItem]);
    setNewComment("");
  };

  if (!post) return <p>로딩중...</p>;

  return (
    <div className="bg-[#E3E3E3] min-h-screen w-full">
      <SubHeader />

      <div className="max-w-[900px] mx-auto py-10">
        {/* ===== 게시글 박스 ===== */}
        <div className="bg-white border rounded-md p-6 mb-8">
          <h1 className="text-xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-600 mb-4">
            {post.author} · {post.time}
          </p>
          <div className="flex gap-6">
            <p className="flex-1 text-gray-800 leading-relaxed">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="게시글 이미지"
                className="w-[200px] h-[200px] object-cover border"
              />
            )}
          </div>
        </div>

        {/* ===== 댓글 박스 (입력 + 리스트 통합) ===== */}
        <div className="bg-white border rounded-md p-4 space-y-4">
          {/* 댓글 입력 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요."
              className="flex-1 border px-3 py-2 rounded-md text-sm"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-gray-600 text-white rounded-md"
            >
              완료
            </button>
          </div>

          {/* 댓글 리스트 */}
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2 border-b pb-2">
                <img
                  src={profileIcon}
                  alt="프로필"
                  className="w-6 h-6 object-cover"
                />
                <div>
                  <p className="text-sm font-bold">{c.author}</p>
                  <p className="text-sm text-gray-700">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
