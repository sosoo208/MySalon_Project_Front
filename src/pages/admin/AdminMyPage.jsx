import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

/** ================================
 *  상품 등록 폼 (최대수량 '추가하기' 포함)
 *  ================================ */
const ProductRegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    shippingFee: "",
    color: "",
    size: "",
    maxQty: "",
    image: null,
  });
  const [maxQtyList, setMaxQtyList] = useState([]);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((s) => ({ ...s, image: files?.[0] ?? null }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const addMaxQty = () => {
    const num = Number(form.maxQty);
    if (!form.maxQty || Number.isNaN(num) || num < 0) {
      alert("최대수량은 0 이상의 숫자로 입력해주세요.");
      return;
    }
    setMaxQtyList((prev) => [...prev, num]);
    setForm((s) => ({ ...s, maxQty: "" }));
  };

  const removeQty = (i) =>
    setMaxQtyList((prev) => prev.filter((_, idx) => idx !== i));

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("상품등록 payload:", { ...form, maxQtyList });
    alert("등록 API 연동은 추후 진행하세요!");
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-12 gap-12">
      {/* 좌측: 사진첨부 */}
      <div className="col-span-4">
        <div className="w-full aspect-[3/4] border border-[#d9d9d9] flex items-center justify-center text-[#555]">
          {form.image ? (
            <img
              src={URL.createObjectURL(form.image)}
              alt="preview"
              className="h-full object-cover"
            />
          ) : (
            <label className="cursor-pointer">
              <span>사진첨부</span>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={onChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* 우측: 입력 필드 */}
      <div className="col-span-8 space-y-4">
        <div className="flex items-center gap-4">
          <span className="w-24 text-sm text-[#444]">상품이름</span>
          <Input name="name" value={form.name} onChange={onChange} />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-24 text-sm text-[#444]">상품설명</span>
          <Input
            name="description"
            value={form.description}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-24 text-sm text-[#444]">가격</span>
          <Input
            name="price"
            value={form.price}
            onChange={onChange}
            placeholder="예: 50000"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-24 text-sm text-[#444]">배송비</span>
          <Input
            name="shippingFee"
            value={form.shippingFee}
            onChange={onChange}
            placeholder="예: 3000"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-24 text-sm text-[#444]">색상</span>
          <Input
            name="color"
            value={form.color}
            onChange={onChange}
            placeholder="예: Black, White"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-24 text-sm text-[#444]">사이즈</span>
          <Input
            name="size"
            value={form.size}
            onChange={onChange}
            placeholder="예: S, M, L"
          />
        </div>

        {/* 최대수량 + 추가 */}
        <div className="flex items-center gap-4">
          <span className="w-24 text-sm text-[#444]">최대수량</span>
          <div className="flex items-center gap-2 w-full max-w-[360px]">
            <Input
              name="maxQty"
              value={form.maxQty}
              onChange={onChange}
              placeholder="예: 10"
              inputMode="numeric"
            />
            <Button
              type="button"
              onClick={addMaxQty}
              className="h-[32px] px-3 bg-[#8b8b8b] hover:bg-[#6f6f6f] text-white rounded-none text-[12px]"
            >
              추가하기
            </Button>
          </div>
        </div>

        {maxQtyList.length > 0 && (
          <div className="ml-[calc(6rem+1rem)] flex flex-wrap gap-2">
            {maxQtyList.map((q, i) => (
              <div
                key={`${q}-${i}`}
                className="flex items-center gap-2 px-2 py-1 border border-[#d1d1d1] text-[12px]"
              >
                {q}
                <button
                  type="button"
                  onClick={() => removeQty(i)}
                  className="text-[#888] hover:text-black"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="pt-6">
          <Button
            type="submit"
            className="w-48 h-12 bg-[#828282] hover:bg-[#6e6e6e] rounded-none"
          >
            등록하기
          </Button>
        </div>
      </div>
    </form>
  );
};

/** ================================
 *  판매자 마이페이지
 *  ================================ */
const AdminMyPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("product-list");

  const navigationItems = [
    { id: "product-list", label: "상품 목록" },
    { id: "product-register", label: "상품 등록" },
    { id: "sales-list", label: "판매 목록" },
    { id: "order-shipping", label: "주문/발송" },
    { id: "sales", label: "매출" },
  ];

  // 샘플 상품
  const products = [
    {
      id: "123456",
      name: "여름 원피스",
      description: "시원한 원피스 설명",
      price: "50,000 원",
      image: "https://via.placeholder.com/120x160",
      qty: 2,
    },
    {
      id: "654321",
      name: "블라우스",
      description: "가벼운 블라우스 설명",
      price: "42,000 원",
      image: "https://via.placeholder.com/120x160",
      qty: 5,
    },
  ];

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto bg-white">
        {/* 상단 헤더 */}
        <header className="bg-[#d9d9d9] h-[120px] flex items-center justify-center text-2xl font-bold">
          판매자 마이페이지
        </header>

        {/* 탭 메뉴 */}
        <nav className="mt-10 mb-16">
          <div className="flex justify-center gap-16">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setActiveTab(item.id)}
                className={`h-auto p-0 text-xl ${
                  activeTab === item.id
                    ? "font-bold text-[#a40303]"
                    : "text-black hover:text-[#a40303]"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </nav>

        {/* 탭 내용 */}
        <main className="px-20">
          {activeTab === "product-list" && (
            <>
              <h1 className="mb-8 font-bold text-2xl">상품 목록</h1>
              <div className="space-y-6">
                {products.map((p) => (
                  <Card key={p.id} className="border p-4">
                    <CardContent className="flex gap-6">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-[120px] h-[160px] object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm text-gray-500">{p.id}</div>
                        <h3 className="text-lg font-bold">{p.name}</h3>
                        <p className="text-gray-700">{p.description}</p>
                        <div className="mt-2 text-lg font-semibold">
                          {p.price}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline">상품페이지</Button>
                        <Button className="bg-[#828282] text-white">삭제</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === "product-register" && (
            <>
              <h1 className="mb-8 font-bold text-2xl">상품 등록</h1>
              <ProductRegisterForm />
            </>
          )}

          {activeTab === "sales-list" && <div>판매 목록 페이지 준비중…</div>}
          {activeTab === "order-shipping" && <div>주문/발송 페이지 준비중…</div>}
          {activeTab === "sales" && <div>매출 페이지 준비중…</div>}
        </main>
      </div>
    </div>
  );
};

export default AdminMyPage;
