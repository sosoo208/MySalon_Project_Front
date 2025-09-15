import React, { useState } from "react";
import { SubHeader } from "../../components/SubHeader";

// 카테고리 맵
const categoryMap = {
  전체: null,
  상의: "TOP",
  바지: "BOTTOM",
  아우터: "OUTERWEAR",
  "원피스/스커트": "DRESS_SKIRT",
  "ACC/BAG": "ACC_BAG",
  "홈웨어/속옷": "LOUNGEWEAR_UNDERWEAR",
  키즈: "KIDS",
};

const categoryLowMap = {
  전체: null,
  반소매: "SHORT_SLEEVE",
  긴소매: "LONG_SLEEVE",
  "셔츠/블라우스": "SHIRT_BLOUSE",
  "니트/스웨터": "KNIT_SWEATER",
  "맨투맨/후드": "SWEATSHIRT_HOODIE",
  기타: "OTHER",
  자켓: "JACKET",
  코트: "COAT",
  가디건: "CARDIGAN",
  반바지: "SHORTS",
  청바지: "JEANS",
  슬랙스: "SLACKS",
  미니: "MINI",
  미디: "MIDI",
  롱: "LONG",
  가방: "BAG",
  악세사리: "ACCESSORY",
  모자: "HAT",
  잠옷: "PAJAMAS",
  속옷: "UNDERWEAR",
  상의: "TOPS",
  하의: "BOTTOMS",
};

export default function ProductRegister() {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("상의");
  const [subCategory, setSubCategory] = useState("");
  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    shippingFee: "",
  });

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState([]);

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

  // 추가 기능
  const addColor = () => {
    if (tempColor) {
      setColors([...colors, tempColor]);
      setTempColor("");
    }
  };
  const addSize = () => {
    if (tempSize) {
      setSizes([...sizes, tempSize]);
      setTempSize("");
    }
  };
  const addQty = () => {
    if (tempQty) {
      setQuantities([...quantities, tempQty]);
      setTempQty("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      image,
      category,
      subCategory,
      ...form,
      colors,
      sizes,
      quantities,
    });
    alert("상품이 등록되었습니다. (추후 API 연동)");
  };

  return (
    <>
      <SubHeader />

      <div style={{ background: "#E3E3E3", minHeight: "100vh", padding: "40px 0" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "12px",
            padding: "40px 50px",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "30px" }}>
            상품 등록
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}
          >
            {/* 사진 첨부 */}
            <div style={{ flex: "0 0 250px", textAlign: "center" }}>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
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
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "block", margin: "0 auto" }}
              />
            </div>

            {/* 상품 입력 폼 */}
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: "12px" }}>
                카테고리
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={inputStyle}
                >
                  {Object.keys(categoryMap).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "12px" }}>
                세부 카테고리
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">선택 없음</option>
                  {Object.keys(categoryLowMap).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>

              <label>
                상품이름
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>
              <label>
                상품설명
                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  style={{ ...inputStyle, height: "80px" }}
                />
              </label>
              <label>
                가격
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>
              <label>
                배송비
                <input
                  type="number"
                  name="shippingFee"
                  value={form.shippingFee}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>

              {/* 색상 추가 */}
              <div style={{ marginTop: "10px" }}>
                색상
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <input
                    value={tempColor}
                    onChange={(e) => setTempColor(e.target.value)}
                    style={inputStyle}
                  />
                  <button type="button" onClick={addColor} style={smallBtn}>
                    추가
                  </button>
                </div>
                {colors.length > 0 && (
                  <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>
                    추가된 색상: {colors.join(", ")}
                  </div>
                )}
              </div>

              {/* 사이즈 추가 */}
              <div style={{ marginTop: "10px" }}>
                사이즈
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <input
                    value={tempSize}
                    onChange={(e) => setTempSize(e.target.value)}
                    style={inputStyle}
                  />
                  <button type="button" onClick={addSize} style={smallBtn}>
                    추가
                  </button>
                </div>
                {sizes.length > 0 && (
                  <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>
                    추가된 사이즈: {sizes.join(", ")}
                  </div>
                )}
              </div>

              {/* 최대수량 추가 */}
              <div style={{ marginTop: "10px" }}>
                최대수량
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <input
                    type="number"
                    value={tempQty}
                    onChange={(e) => setTempQty(e.target.value)}
                    style={inputStyle}
                  />
                  <button type="button" onClick={addQty} style={smallBtn}>
                    추가
                  </button>
                </div>
                {quantities.length > 0 && (
                  <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>
                    추가된 수량: {quantities.join(", ")}
                  </div>
                )}
              </div>

              {/* 등록 버튼 */}
              <div style={{ textAlign: "center", marginTop: "20px" }}>
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

const inputStyle = {
  display: "block",
  width: "100%",
  marginTop: "4px",
  padding: "6px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
};

const smallBtn = {
  padding: "6px 12px",
  background: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
};

const submitBtn = {
  padding: "12px 30px",
  background: "#535050",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "15px",
  cursor: "pointer",
};
