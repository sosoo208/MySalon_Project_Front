import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";
import profileIcon from "../../assets/icons/profile.png";
import { useBoard } from "../../context/BoardContext";

export default function BoardDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, addComment, editComment, deleteComment, deletePost } =
    useBoard();

  const CURRENT_USER =
    localStorage.getItem("nickname") ||
    localStorage.getItem("username") ||
    "현재 사용자";

  const post = getPostById(id);

  // 댓글 편집 상태
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [newComment, setNewComment] = useState("");

  if (!post) {
    return (
      <div className="min-h-screen">
        <SubHeader />
        <div className="max-w-[1000px] mx-auto py-10">
          <p className="text-center">해당 게시글을 찾을 수 없습니다.</p>
          <div className="text-center mt-6">
            <button onClick={() => navigate("/board")} className="px-4 py-2 border">
              목록으로
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 댓글 추가
  const handleAddComment = () => {
    const value = newComment.trim();
    if (!value) return;
    addComment(post.id, CURRENT_USER, value);
    setNewComment("");
  };

  // 게시글 삭제
  const handleDeletePost = () => {
    if (post.author !== CURRENT_USER) {
      alert("본인 글만 삭제할 수 있습니다.");
      return;
    }
    if (!window.confirm("이 게시글을 삭제하시겠습니까?")) return;
    deletePost(post.id);
    alert("삭제되었습니다.");
    navigate("/board");
  };

  return (
    <div className="bg-[#E3E3E3] min-h-screen w-full">
      <SubHeader />

      <div className="max-w-[900px] mx-auto py-10">
        {/* ===== 게시글 박스 ===== */}
        <div className="bg-white border rounded-md p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold mb-2">{post.title}</h1>
              <p className="text-sm text-gray-600 mb-4">
                {post.author} · {post.time}
              </p>
            </div>

            {/* 작성자에게만 수정/삭제 노출 */}
            {post.author === CURRENT_USER && (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/board/edit/${post.id}`)}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                >
                  수정
                </button>
                <button
                  onClick={handleDeletePost}
                  className="px-3 py-1 text-sm border rounded text-red-600 hover:bg-red-50"
                >
                  삭제
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-6">
            <p className="flex-1 text-gray-800 leading-relaxed">{post.content}</p>
            {post.image ? (
              <img
                src={post.image}
                alt="게시글 이미지"
                className="w-[200px] h-[200px] object-cover border"
              />
            ) : (
              <div className="w-[200px] h-[200px] grid place-items-center border text-xs text-gray-400 bg-gray-50">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* ===== 댓글 박스 ===== */}
        <div className="bg-white border rounded-md p-4 space-y-4">
          {/* 입력 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요."
              className="flex-1 border px-3 py-2 rounded-md text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
            >
              완료
            </button>
          </div>

          {/* 리스트 */}
          <div className="space-y-3">
            {post.comments.map((c) => {
              const isMine = c.author === CURRENT_USER;
              const isEditing = editingId === c.id;

              return (
                <div key={c.id} className="flex items-start gap-3 border-b pb-3">
                  <img src={profileIcon} alt="프로필" className="w-7 h-7 object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{c.author}</p>

                    {!isEditing ? (
                      <p className="text-sm text-gray-800 mt-1">{c.text}</p>
                    ) : (
                      <div className="flex gap-2 mt-1">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="flex-1 border px-2 py-1 rounded text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              if (editingText.trim()) {
                                editComment(post.id, c.id, editingText);
                                setEditingId(null);
                                setEditingText("");
                              }
                            }
                            if (e.key === "Escape") {
                              setEditingId(null);
                              setEditingText("");
                            }
                          }}
                          autoFocus
                        />
                        <button
                          onClick={() => {
                            if (!editingText.trim()) return;
                            editComment(post.id, c.id, editingText);
                            setEditingId(null);
                            setEditingText("");
                          }}
                          className="px-3 py-1 text-sm bg-black text-white rounded"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditingText("");
                          }}
                          className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                        >
                          취소
                        </button>
                      </div>
                    )}
                  </div>

                  {isMine && !isEditing && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(c.id);
                          setEditingText(c.text);
                        }}
                        className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => deleteComment(post.id, c.id)}
                        className="px-2 py-1 text-xs border rounded text-red-600 hover:bg-red-50"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end mt-10">
          <button
            onClick={() => navigate("/board")}
            className="px-4 py-2 border hover:bg-gray-50"
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}
