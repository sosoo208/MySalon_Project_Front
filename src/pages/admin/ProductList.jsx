import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) return <div>상품 정보를 불러올 수 없습니다.</div>;

  return (
    <>
      <SubHeader className="bg-white" />

      <div className="max-w-[1100px] mx-auto bg-white p-10">
        <button onClick={() => navigate(-1)} className="mb-4 text-gray-600">
          ← 뒤로가기
        </button>

        <div className="flex gap-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-[400px] h-[500px] object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-4">
              <span className="font-bold">가격</span> {product.price}
            </div>
            <div className="mb-4">
              <span className="font-bold">배송비</span> {product.shippingFee}
            </div>

            <div className="mb-4">
              <span className="font-bold">색상</span>
              <div className="flex gap-2 mt-2">
                {product.colors.map((c) => (
                  <span key={c} className="border px-3 py-1 rounded cursor-pointer">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <span className="font-bold">사이즈</span>
              <select className="ml-2 border px-2 py-1">
                {product.sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <span className="font-bold">수량</span>
              <div className="inline-flex items-center ml-2 border px-2">
                <button>-</button>
                <span className="px-4">2</span>
                <button>+</button>
              </div>
            </div>

            <button className="px-6 py-2 bg-gray-700 text-white rounded">
              수정하기
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-bold mb-4">REVIEW</h3>
          <p className="text-gray-500">⭐ 5.0 (100% 구매자가 이 상품을 좋아합니다.)</p>
        </div>
      </div>
    </>
  );
}
