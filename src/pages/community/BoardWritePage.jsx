// src/pages/community/BoardWritePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";
import profileIcon from "../../assets/icons/profile.png";
import { useBoard } from "../../context/BoardContext";

export default function BoardWritePage() {
  const navigate = useNavigate();
  const { addPost } = useBoard();

  // 임시로 작성자 고정(로그인 연동 시 교체)
  const CURRENT_USER = "현재 사용자";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    if (!file) {
      setImageDataUrl("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result?.toString() || "");
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }
    // 컨텍스트에 새 글 추가 (이미지는 DataURL 저장)
    addPost({
      title,
      author: CURRENT_USER,
      content,
      image: imageDataUrl, // 썸네일로 바로 보이게 DataURL 저장
    });

    alert("게시글이 등록되었습니다!");
    // ✅ 상세로 가지 않고 리스트로 이동
    navigate("/board", { replace: true });
  };

  return (
    <>
      <SubHeader />
      <div className="bg-[#E3E3E3] min-h-screen py-10">
        <div className="max-w-[700px] mx-auto bg-white p-10 rounded-md shadow">
          <h1 className="text-2xl font-bold mb-6">글작성하기 ✏️</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 제목 */}
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded-md text-sm"
            />

            {/* 내용 */}
            <textarea
              placeholder="공유하고 싶거나 궁금한 이야기를 작성해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border px-3 py-2 rounded-md text-sm h-40"
            />

            {/* 사진 업로드 */}
            <div>
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 border border-black px-4 py-2 rounded-md cursor-pointer text-sm"
              >
                <img src={profileIcon} alt="upload" className="w-5 h-5" />
                사진 업로드
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {imageFile && (
                <p className="text-xs text-gray-600 mt-2">
                  선택된 파일: {imageFile.name}
                </p>
              )}
            </div>

            {/* 버튼 */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate("/board")}
                className="w-1/2 mr-2 border border-black py-2 rounded-md"
              >
                취소
              </button>
              <button
                type="submit"
                className="w-1/2 ml-2 bg-gray-600 text-white py-2 rounded-md"
              >
                등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
