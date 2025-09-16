// src/pages/community/CoordiWritePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";
import profileIcon from "../../assets/icons/profile.png";

export default function CoordiWritePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, desc, image });
    alert("코디가 등록되었습니다!");
    navigate("/community");
  };

  return (
    <>
      <SubHeader />

      <div style={{ background: "#E3E3E3", minHeight: "100vh", padding: "40px 0" }}>
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "12px",
            padding: "40px 60px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "25px" }}>
            코디 등록하기 ✏️
          </h1>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontWeight: "bold", marginBottom: "6px", display: "block" }}>
                나의 코디 자랑하기
              </label>
              <input
                type="text"
                placeholder="코디의 제목을 지어주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "10px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div>
              <textarea
                placeholder="코디에 대해 설명해주세요."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "10px",
                  fontSize: "14px",
                  height: "100px",
                }}
              />
            </div>

            {/* ✅ 사진 업로드 버튼 */}
            <div>
              <label
                htmlFor="file-upload"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid #000",
                  borderRadius: "6px",
                  padding: "10px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                <img src={profileIcon} alt="upload" style={{ width: "18px", height: "18px" }} />
                사진 업로드
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }} // 기본 파일선택 버튼 숨김
              />
              {image && (
                <p style={{ marginTop: "8px", fontSize: "12px", color: "#555" }}>
                  선택된 파일: {image.name}
                </p>
              )}
            </div>

            {/* ✅ 버튼 영역 */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
              <button
                type="button"
                onClick={() => navigate("/community")}
                style={{
                  flex: 1,
                  marginRight: "20px",
                  padding: "14px",
                  border: "1px solid #000",
                  borderRadius: "4px",
                  background: "#fff",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "14px",
                  border: "none",
                  borderRadius: "4px",
                  background: "#535050",
                  color: "#fff",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
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
