import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import AdminNav from "./AdminNav";
import { productApi } from "../../api/product/productApi";
import { useNavigate } from "react-router-dom";
import { SubHeader } from "../../components/SubHeader";// ✅ SubHeader 추가

/** ================================
 *  판매자 마이페이지
 *  ================================ */
const AdminMyPage = () => {
  const [activeTab, setActiveTab] = useState("product-list");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productApi.getAllProductsByUser();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("상품을 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    if (activeTab === "product-list") {
      fetchProducts();
    }
  }, [activeTab]);

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto bg-white">
        {/* ✅ SubHeader 적용 */}
        <SubHeader title="판매자 마이페이지" />

        {/* 공통 네비게이션 */}
        <AdminNav activeTab={activeTab} />

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
                        src={
                          p.mainImage
                            ? `http://localhost:8080/products/images/${p.mainImage}`
                            : "https://via.placeholder.com/120x160"
                        }
                        alt={p.productName}
                        className="w-[120px] h-[160px] object-cover"
                      />

                      <div className="flex-1">
                        <div className="text-sm text-gray-500">{p.id}</div>
                        <h3 className="text-lg font-bold">{p.name}</h3>
                        <p className="text-gray-700">{p.description}</p>
                        <div className="mt-2 text-lg font-semibold">
                          {p.price.toLocaleString()} 원
                        </div>
                      </div>

                      {/* ✅ 버튼 영역 중앙 정렬 + 상세페이지 연결 */}
                      <div className="flex flex-col gap-2 justify-center">
                        <Button
                          variant="outline"
                          onClick={() =>
                            navigate(`/admin/products/${p.id}`, { state: p }) // ✅ AdminProductDetail로 이동
                          }
                        >
                          상품페이지
                        </Button>
                        <Button className="bg-[#828282] text-white">삭제</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
