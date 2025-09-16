import React, { useState } from "react";
import { SubHeader } from "../../components/SubHeader";
import AdminNav from "./AdminNav";
import { productApi } from "../../api/product/productApi";

// 카테고리 맵 (상위/하위 연결)
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

const categoryMap2 = {
  전체: "ALL",
  상의: "TOP",
  바지: "BOTTOM",
  아우터: "OUTERWEAR",
  "원피스/스커트": "DRESS_SKIRT",
  "ACC/BAG": "ACC_BAG",
  "홈웨어/속옷": "LOUNGEWEAR_UNDERWEAR",
  키즈: "KIDS",
};

const categoryLowMap = {
  전체: "ALL",
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
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("전체");
  const [subCategory, setSubCategory] = useState("전체");
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    deliveryFee: "",
    gender: "MALE",
  });

  const [options, setOptions] = useState([]);
  const [tempColor, setTempColor] = useState("");
  const [tempSize, setTempSize] = useState("");
  const [tempCount, setTempCount] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addOption = () => {
    if (!tempColor || !tempSize || !tempCount) {
      alert("색상, 사이즈, 수량을 모두 입력해주세요.");
      return;
    }
    setOptions((prev) => [...prev, { color: tempColor, size: tempSize, count: tempCount }]);
    setTempColor("");
    setTempSize("");
    setTempCount("");
  };

  const removeOption = (index) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { productName, description, price, deliveryFee, gender } = form;

    const formData = new FormData();
    formData.append('mainImageFile', imageFile);
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price ? parseInt(price, 10) : 0);
    formData.append('deliveryFee', parseInt(deliveryFee, 10) || 0);
    formData.append('gender', gender);
    formData.append('category', categoryMap2[category]);
    formData.append('categoryLow', categoryLowMap[subCategory]);
    
    options.forEach((opt, index) => {
        formData.append(`productDetails[${index}].size`, opt.size);
        formData.append(`productDetails[${index}].color`, opt.color);
        formData.append(`productDetails[${index}].quantity`, parseInt(opt.count, 10));
      });

    try {
      await productApi.createProduct2(formData);
      alert('상품이 성공적으로 등록되었습니다.');
      // You might want to reset the form or navigate away
    } catch (error) {
      console.error('상품 등록 실패:', error);
      alert('상품 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <SubHeader />
      <AdminNav activeTab="product-register" />

      <div className="max-w-[1100px] mx-auto bg-white p-10">
        <h2 className="text-lg font-bold mb-6 border-b pb-2">상품 등록</h2>

        <form onSubmit={handleSubmit} className="flex gap-10 items-center">
          {/* 사진 업로드 */}
          <div className="flex-shrink-0 w-[300px] h-[500px] flex items-center justify-center border bg-gray-100 cursor-pointer">
            <label htmlFor="imageUpload" className="w-full h-full flex items-center justify-center">
              {image ? (
                <img src={image} alt="미리보기" className="w-full h-full object-cover" />
              ) : (
                "사진첨부"
              )}
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* 입력폼 */}
          <div className="flex-1">
            <label className="block font-medium text-sm mb-1">카테고리</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory("");
              }}
              className="w-full border px-2 py-2 mb-3 text-sm"
            >
              {Object.keys(categoryMap).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>

            <label className="block font-medium text-sm mb-1">세부 카테고리</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full border px-2 py-2 mb-3 text-sm"
            >
              <option value="">선택 없음</option>
              {categoryMap[category]?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            
            <label className="block font-medium text-sm mb-1">성별</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border px-2 py-2 mb-3 text-sm"
            >
              <option value="MALE">남성</option>
              <option value="FEMALE">여성</option>
            </select>

            <label className="block font-medium text-sm mb-1">상품이름</label>
            <input
              name="productName"
              value={form.productName}
              onChange={handleChange}
              className="w-full border px-2 py-2 mb-3 text-sm"
            />

            <label className="block font-medium text-sm mb-1">상품설명</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-2 py-2 mb-3 text-sm"
            />

            <label className="block font-medium text-sm mb-1">가격</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border px-2 py-2 mb-3 text-sm"
            />

            <label className="block font-medium text-sm mb-1">배송비</label>
            <input
              type="number"
              name="deliveryFee"
              value={form.deliveryFee}
              onChange={handleChange}
              className="w-full border px-2 py-2 mb-3 text-sm"
            />

            <label className="block font-medium text-sm mb-1">색상 / 사이즈 / 최대수량</label>
            <div className="flex gap-2 mb-3">
              <input
                value={tempColor}
                onChange={(e) => setTempColor(e.target.value)}
                className="flex-1 border px-2 py-2 text-sm"
                placeholder="색상 예: Black"
              />
              <input
                value={tempSize}
                onChange={(e) => setTempSize(e.target.value)}
                className="flex-1 border px-2 py-2 text-sm"
                placeholder="사이즈 예: M"
              />
              <input
                type="number"
                value={tempCount}
                onChange={(e) => setTempCount(e.target.value)}
                className="flex-1 border px-2 py-2 text-sm"
                placeholder="수량 예: 10"
              />
              <button
                type="button"
                onClick={addOption}
                className="w-[36px] h-[36px] bg-gray-700 text-white rounded-full flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>

            {options.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {options.map((opt, idx) => (
                  <div
                    key={idx}
                    className="border rounded px-2 py-1 text-xs flex items-center gap-1"
                  >
                    <span>
                      {opt.color} / {opt.size} / {opt.count}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeOption(idx)}
                      className="text-red-600 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="text-right mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-700 text-white rounded text-sm"
              >
                등록하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}