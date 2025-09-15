import React, { useState } from "react";
import { SubHeader } from "../../components/SubHeader";

// 상위/하위 카테고리 맵
const categoryMap = {
  전체: ["전체"],
  상의: ["반소매", "긴소매", "셔츠/블라우스", "니트/스웨터", "맨투맨/후드"],
  바지: ["반바지", "청바지", "슬랙스"],
  아우터: ["자켓", "코트", "가디건"],
  "원피스/스커트": ["미니", "미디", "롱"],
  "ACC/BAG": ["가방", "악세사리", "모자"],
  "홈웨어/속옷": ["잠옷", "속옷"],
  키즈: ["상의", "하의"],
};

export default function ProductRegister() {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("전체");
  const [subCategory, setSubCategory] = useState("");
  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    shippingFee: "",
  });

  // 옵션 세트 (색상+사이즈+수량)
  const [options, setOptions] = useState([]);
  const [tempColor, setTempColor] = useState("");
  const [tempSize, setTempSize] = useState("");
  const [tempQty, setTempQty] = useState("");

  // 이미지 업로드
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  // 입력 값 핸들링
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 옵션 추가
  const addOption = () => {
    if (!tempColor || !tempSize || !tempQty) {
      alert("색상, 사이즈, 수량을 모두 입력해주세요.");
      return;
    }
    setOptions((prev) => [...prev, { color: tempColor, size: tempSize, qty: tempQty }]);
    setTempColor("");
    setTempSize("");
    setTempQty("");
  };

  // 옵션 삭제
  const removeOption = (index) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      image,
      category,
      subCategory,
      ...form,
      options,
    });
    alert("상품이 등록되었습니다. (추후 API 연동)");
  };

  return (
    <>
      <SubHeader />

      <div style={{ background: "#fff", minHeight: "100vh", padding: "40px 0" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            background: "#fff",
            padding: "20px 40px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "30px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            상품 등록
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "40px", alignItems: "center" }}
          >
            {/* 사진 첨부 */}
            <div style={{ flex: "0 0 300px", textAlign: "center" }}>
              <label
                htmlFor="imageUpload"
                style={{
                  display: "block",
                  width: "100%",
                  height: "500px",
                  background: "#eee",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt="미리보기"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  "사진첨부"
                )}
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>

            {/* 상품 입력 폼 */}
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>카테고리</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory("");
                }}
                style={inputStyle}
              >
                {Object.keys(categoryMap).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>

              <label style={labelStyle}>세부 카테고리</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                style={inputStyle}
              >
                <option value="">선택 없음</option>
                {categoryMap[category]?.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>

              <label style={labelStyle}>상품이름</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
              />

              <label style={labelStyle}>상품설명</label>
              <input
                name="desc"
                value={form.desc}
                onChange={handleChange}
                style={inputStyle}
              />

              <label style={labelStyle}>가격</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                style={inputStyle}
              />

              <label style={labelStyle}>배송비</label>
              <input
                type="number"
                name="shippingFee"
                value={form.shippingFee}
                onChange={handleChange}
                style={inputStyle}
              />

              {/* 옵션 입력 */}
              <label style={labelStyle}>색상 / 사이즈 / 최대수량</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  value={tempColor}
                  onChange={(e) => setTempColor(e.target.value)}
                  style={inputStyle}
                  placeholder="색상 예: Black"
                />
                <input
                  value={tempSize}
                  onChange={(e) => setTempSize(e.target.value)}
                  style={inputStyle}
                  placeholder="사이즈 예: M"
                />
                <input
                  type="number"
                  value={tempQty}
                  onChange={(e) => setTempQty(e.target.value)}
                  style={inputStyle}
                  placeholder="수량 예: 10"
                />
                <button type="button" onClick={addOption} style={smallBtn}>
                  +
                </button>
              </div>

              {/* 추가된 옵션 리스트 */}
              {options.length > 0 && (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {options.map((opt, idx) => (
                    <div
                      key={idx}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>
                        {opt.color} / {opt.size} / {opt.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeOption(idx)}
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          color: "#A40303",
                          fontWeight: "bold",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 등록 버튼 */}
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <button type="submit" style={submitBtn}>
                  등록하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const labelStyle = {
  display: "block",
  marginTop: "12px",
  marginBottom: "4px",
  fontSize: "14px",
  fontWeight: "bold",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
  marginBottom: "12px",
  height: "36px",
};

const smallBtn = {
  padding: "6px 12px",
  background: "#535050",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  height: "36px",
};

const submitBtn = {
  padding: "10px 30px",
  background: "#535050",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "15px",
  cursor: "pointer",
};
