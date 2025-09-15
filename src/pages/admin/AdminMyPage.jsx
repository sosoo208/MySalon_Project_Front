// src/routes/AdminMyPage/screens/Screen.jsx
import { MenuIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

/** ================================
 *  상품 등록 폼 (최대수량 '추가하기' 포함, JS 버전)
 *  ================================= */
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

  // 최대수량을 여러 개로 관리(시연용)
  const [maxQtyList, setMaxQtyList] = useState([]);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((s) => ({ ...s, image: files?.[0] ?? null }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  // "추가하기" 버튼
  const addMaxQty = () => {
    const v = String(form.maxQty).trim();
    if (!v) return;
    const num = Number(v);
    if (Number.isNaN(num) || num < 0) {
      alert("최대수량은 0 이상의 숫자로 입력해주세요.");
      return;
    }
    setMaxQtyList((prev) => [...prev, num]);
    setForm((s) => ({ ...s, maxQty: "" }));
  };

  const removeQty = (index) => {
    setMaxQtyList((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: 실제 API 연동 시 FormData 사용 권장
    // const fd = new FormData();
    // Object.entries({ ...form, maxQtyList }).forEach(([k, v]) => {
    //   if (k === "image" && v) fd.append(k, v);
    //   else fd.append(k, Array.isArray(v) ? JSON.stringify(v) : String(v ?? ""));
    // });
    // await fetch("/api/products", { method: "POST", body: fd });

    console.log("상품등록 payload:", { ...form, maxQtyList });
    alert("등록 API 연동은 추후 진행하세요!");
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-12 gap-12">
      {/* 좌측: 사진첨부 영역 */}
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

      {/* 우측: 입력 필드들 */}
      <div className="col-span-8 space-y-4">
        <div className="flex items-center gap-4">
          <span className="w-24 text-sm text-[#444]">상품이름</span>
          <Input name="name" value={form.name} onChange={onChange} />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-24 text-sm text-[#444]">상품설명</span>
          <Input name="description" value={form.description} onChange={onChange} />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-24 text-sm text-[#444]">가격</span>
          <Input name="price" value={form.price} onChange={onChange} placeholder="예: 50000" />
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
          <Input name="color" value={form.color} onChange={onChange} placeholder="예: Black, White" />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-24 text-sm text-[#444]">사이즈</span>
          <Input name="size" value={form.size} onChange={onChange} placeholder="예: S, M, L" />
        </div>

        {/* 최대수량 + 추가하기 버튼 */}
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

        {/* 추가된 수량 태그 표시(옵션) */}
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
                  aria-label="remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="pt-6">
          <Button type="submit" className="w-48 h-12 bg-[#828282] hover:bg-[#6e6e6e] rounded-none">
            등록하기
          </Button>
        </div>
      </div>
    </form>
  );
};

const AdminMyPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("product-list");

  // 상세(판매자용) 페이지로 이동
  const goToDetail = (product) => {
    navigate("/screen120", { state: { product } });
  };

  const navigationItems = [
    { id: "product-list", label: "상품 목록", active: true },
    { id: "product-register", label: "상품 등록", active: false },
    { id: "sales-list", label: "판매 목록", active: false },
    { id: "order-shipping", label: "주문/발송", active: false },
    { id: "sales", label: "매출", active: false },
  ];

  const products = [
    {
      id: "123456789",
      name: "여름블루 롱 원피스",
      description:
        "여름에 입기 좋은 롱 원피스.. 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명",
      price: "50,000 원",
      image: "https://c.animaapp.com/mfey8x558kisvz/img/image-1-2.png",
      shipping: "3,000원",
      colors: ["Black", "White", "Red"],
      sizes: ["S", "M", "L"],
      qty: 2,
    },
    {
      id: "987654321",
      name: "썸머 스트라이프 드레스",
      description: "시원한 스트라이프 패턴의 여름 원피스. 상품 설명 상품 설명 상품 설명",
      price: "59,000 원",
      image: "https://c.animaapp.com/mfey8x558kisvz/img/image-1-2.png",
      shipping: "3,000원",
      colors: ["Black", "White"],
      sizes: ["S", "M"],
      qty: 1,
    },
    {
      id: "555222333",
      name: "플로럴 롱 원피스",
      description: "잔잔한 플로럴 패턴이 포인트. 상품 설명 상품 설명 상품 설명",
      price: "62,000 원",
      image: "https://c.animaapp.com/mfey8x558kisvz/img/image-1-2.png",
      shipping: "3,500원",
      colors: ["Blue", "White"],
      sizes: ["M", "L"],
      qty: 3,
    },
  ];

  const topNavItems = [
    { name: "로그인", onClick: () => navigate("/login") },
    { name: "회원가입", onClick: () => navigate("/signup") },
    { name: "장바구니", onClick: () => navigate("/cart") },
    { name: "마이페이지", onClick: () => navigate("/admin-mypage") },
    { name: "커뮤니티", onClick: () => navigate("/") },
  ];

  // 임시 액션
  const onColorInfo = (product) => alert(`[색상정보]\n${product.colors?.join(", ") || "-"}`);
  const onQtyInfo = (product) => alert(`[수량정보]\n등록 수량: ${product.qty ?? 0}`);
  const onOrderInfo = (product) =>
    alert(`[주문정보]\n주문번호 예시: ORD-${product.id}\n수량: ${product.qty ?? 1}`);
  const onShip = (product) => alert(`[배송하기]\n${product.name} 발송 처리 (샘플)`);

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto bg-white">
        <header className="bg-[#d9d9d9] h-[244px] relative">
          <div className="absolute top-[33px] right-[133px]">
            <div className="flex gap-4 text-black text-[15px] leading-[21px]">
              {topNavItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto p-0 text-[15px] font-normal"
                  onClick={item.onClick}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="absolute top-[75px] left-1/2 -translate-x-1/2 w-[148px] h-[117px]">
            <div className="relative w-36 h-[117px]">
              <div className="absolute top-3 left-0 text-black text-[29.9px] text-center leading-[41.8px]">
                MY SALON
              </div>
              <div className="absolute top-0 left-7 text-black text-[11.1px] text-center leading-[15.5px]">
                당신만을 위한 옷장
              </div>
              <img
                className="absolute w-[67px] h-[66px] top-[51px] left-[38px]"
                alt="Main icon"
                src="https://c.animaapp.com/mfey8x558kisvz/img/main-icon-1.png"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            className="absolute top-[15px] left-[25px] w-[58px] h-[58px] bg-neutral-100 rounded-[29px] p-0 hover:bg-neutral-200"
            onClick={() => navigate("/menu")}
          >
            <MenuIcon className="w-6 h-6" />
          </Button>

          <div className="absolute top-[61px] right-[37px] w-[296px] h-16">
            <div className="flex w-full h-16 items-center relative">
              <div className="flex items-center p-[11px] w-full bg-[#78788029] rounded-[100px]">
                <div className="flex items-center gap-2 flex-1">
                  <SearchIcon className="w-4 h-4 text-[#999999]" />
                  <Input
                    placeholder="Search"
                    className="border-0 bg-transparent text-[#999999] text-[17px] leading-[22px] placeholder:text-[#999999] focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="mt-[42px] mb-[118px]">
          <div className="flex justify-center gap-[190px]">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setActiveTab(item.id)}
                className={`h-auto p-0 text-2xl leading-[20.7px] transition-all ${
                  activeTab === item.id
                    ? "font-bold text-[#a40303]"
                    : "font-normal text-black hover:text-[#a40303]"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </nav>

        <main className="px-[226px]">
          {/* 상품 목록 */}
          {activeTab === "product-list" && (
            <>
              <h1 className="mb-[78px] font-bold text-black text-[27px] leading-[37.8px]">
                상품 목록
              </h1>

              <div className="space-y-[41px]">
                {products.map((product) => (
                  <Card key={product.id} className="border-0 shadow-none">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-[62px]">
                        {/* 이미지 클릭 시 상세로 */}
                        <img
                          className="w-[119px] h-[159px] object-cover flex-shrink-0 cursor-pointer"
                          alt="Product image"
                          src={product.image}
                          onClick={() => goToDetail(product)}
                        />

                        <div className="flex-1">
                          <div className="mb-[7px] text-[#828282] text-xs leading-[16.8px]">
                            {product.id}
                          </div>

                          {/* 이름 클릭 시 상세로 */}
                          <h3
                            className="mb-[10px] text-black text-xl text-center leading-7 cursor-pointer hover:underline"
                            onClick={() => goToDetail(product)}
                          >
                            {product.name}
                          </h3>

                          <p className="mb-[21px] text-black text-[17px] leading-[23.8px] whitespace-pre-line">
                            {product.description}
                          </p>

                          <div className="text-black text-[23px] text-center leading-[32.2px]">
                            {product.price}
                          </div>
                        </div>

                        <div className="flex flex-col gap-[16px] mt-[35px]">
                          <Button
                            variant="outline"
                            className="w-[105px] h-9 border-[0.91px] border-black bg-transparent hover:bg-gray-50 rounded-none"
                            onClick={() => goToDetail(product)}
                          >
                            <span className="text-black text-[15.4px] leading-[21.6px]">
                              상품페이지
                            </span>
                          </Button>

                          <Button className="w-[105px] h-9 bg-[#828282] hover:bg-[#707070] rounded-none">
                            <span className="text-white text-[15.4px] leading-[21.6px]">
                              삭제
                            </span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* 상품 등록 */}
          {activeTab === "product-register" && (
            <>
              <h1 className="mb-8 font-bold text-black text-[27px] leading-[37.8px]">
                상품 등록
              </h1>
              <ProductRegisterForm />
            </>
          )}

          {/* 판매 목록 */}
          {activeTab === "sales-list" && (
            <>
              <h1 className="mb-[32px] font-bold text-black text-[27px] leading-[37.8px]">
                판매목록
              </h1>

              <div className="space-y-[36px]">
                {products.map((product) => (
                  <Card key={`sales-${product.id}`} className="border-0 shadow-none">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-[40px]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-[119px] h-[159px] object-cover"
                        />

                        <div className="flex-1">
                          <div className="text-[#828282] text-[12px] leading-[16px] mb-[8px]">
                            {product.id}
                          </div>
                          <div className="text-[15px] leading-[21px] text-black mb-[6px]">
                            <span className="font-medium">{product.name}</span>
                          </div>
                          <p className="text-[14px] leading-[20px] text-[#333] max-w-[480px] line-clamp-2">
                            {product.description}
                          </p>
                          <div className="mt-[10px] text-[16px] font-semibold text-black">
                            {product.price}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-[8px]">
                          <Button
                            variant="outline"
                            className="w-[90px] h-[26px] border border-[#8b8b8b] rounded-none bg-white hover:bg-gray-50 text-[12px]"
                            onClick={() => onColorInfo(product)}
                          >
                            색상정보
                          </Button>
                          <Button
                            className="w-[90px] h-[26px] bg-[#8b8b8b] hover:bg-[#6f6f6f] rounded-none text-white text-[12px]"
                            onClick={() => onQtyInfo(product)}
                          >
                            수량정보
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* 주문/발송 */}
          {activeTab === "order-shipping" && (
            <>
              <h1 className="mb-[32px] font-bold text-black text-[27px] leading-[37.8px]">
                주문/발송
              </h1>

              <div className="space-y-[36px]">
                {products.map((product) => (
                  <Card key={`order-${product.id}`} className="border-0 shadow-none">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-[40px]">
                        {/* 썸네일 */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-[119px] h-[159px] object-cover"
                        />

                        {/* 중앙 텍스트 */}
                        <div className="flex-1">
                          <div className="text-[#828282] text-[12px] leading-[16px] mb-[8px]">
                            {product.id}
                          </div>
                          <div className="text-[15px] leading-[21px] text-black mb-[6px]">
                            <span className="font-medium">{product.name}</span>
                          </div>
                          <p className="text-[14px] leading-[20px] text-[#333] max-w-[480px] line-clamp-2">
                            {product.description}
                          </p>
                          <div className="mt-[10px] text-[16px] font-semibold text-black">
                            {product.price}
                          </div>
                        </div>

                        {/* 우측 버튼: 주문정보 / 배송하기 */}
                        <div className="flex flex-col gap-3 mt-[8px]">
                          <Button
                            variant="outline"
                            className="w-[90px] h-[26px] border border-[#8b8b8b] rounded-none bg-white hover:bg-gray-50 text-[12px]"
                            onClick={() => onOrderInfo(product)}
                          >
                            주문정보
                          </Button>
                          <Button
                            className="w-[90px] h-[26px] bg-[#8b8b8b] hover:bg-[#6f6f6f] rounded-none text-white text-[12px]"
                            onClick={() => onShip(product)}
                          >
                            배송하기
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* 매출 */}
          {activeTab === "sales" && (
            <div className="text-center py-16">
              <h1 className="mb-8 font-bold text-black text-[27px] leading-[37.8px]">
                매출
              </h1>
              <p className="text-[#828282] text-lg">매출 현황 페이지입니다.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminMyPage;
