import { MenuIcon, SearchIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productApi } from "../api";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// 한글 → Enum 매핑
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

const genderMap = {
  남자: "MALE",
  여자: "FEMALE",
  공용: "UNISEX",
  전체: null,
};

export const CategoryPageTemplate = ({ categoryName, categoryTabs }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productRatings, setProductRatings] = useState({});
  const [activeTab, setActiveTab] = useState("전체");
  const [selectedGender, setSelectedGender] = useState("공용");

  const fetchProducts = async () => {
    try {
      const response = await productApi.getProducts({
        category: categoryMap[categoryName] || null,
        categoryLow: categoryLowMap[activeTab] || null,
        gender: genderMap[selectedGender] || null,
      });
      const productsWithLiked = response.map(p => ({ ...p, liked: false }));
      setProducts(productsWithLiked);
    } catch (error) {
      console.error("제품 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeTab, selectedGender]);

  // 제품별 평점/리뷰 조회
  useEffect(() => {
    const fetchProductRatings = async () => {
      try {
        const token = localStorage.getItem("token");
        const ratingsData = {};
        for (const product of products) {
          const [scoreRes, countRes] = await Promise.all([
            axios.get(`http://localhost:8080/api/reviews/product/${product.productNum}/average-score`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`http://localhost:8080/api/reviews/product/${product.productNum}/count`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);
          ratingsData[product.productNum] = {
            averageScore: scoreRes.data,
            reviewCount: countRes.data,
          };
        }
        setProductRatings(ratingsData);
      } catch (error) {
        console.log("별점/리뷰 조회 실패:", error);
      }
    };
    if (products.length > 0) fetchProductRatings();
  }, [products]);

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto bg-white">
        <main className="px-[81px] py-[55px]">
          {/* 카테고리 제목 */}
          <div className="flex items-center gap-2 mb-[57px]">
            <h1 className="[font-family:'SF_Pro-Bold',Helvetica] font-bold text-black text-[35px] tracking-[-0.08px] leading-[20.7px]">
              {categoryName}
            </h1>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex gap-[50px] mb-[40px]">
            {categoryTabs.map((tab) => (
              <Button
                key={tab.name}
                variant="ghost"
                className={`h-auto p-0 [font-family:'SF_Pro-Bold',Helvetica] font-bold text-2xl tracking-[-0.08px] leading-[20.7px] ${
                  activeTab === tab.name ? "text-[#a40303]" : "text-black hover:text-[#a40303]"
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </Button>
            ))}
          </div>

          {/* 성별 필터 */}
          <div className="flex gap-4 mb-[40px]">
            {["전체", "남자", "여자", "공용", ].map((gender) => (
              <Button
                key={gender}
                variant="ghost"
                className={`h-auto p-0 [font-family:'SF_Pro-Bold',Helvetica] font-bold text-lg ${
                  selectedGender === gender ? "text-[#a40303]" : "text-black hover:text-[#a40303]"
                }`}
                onClick={() => setSelectedGender(gender)}
              >
                {gender}
              </Button>
            ))}
          </div>

          {/* 제품 그리드 */}
          <div className="grid grid-cols-4 gap-x-[91px] gap-y-[125px]">
            {products.map((product) => (
              <Card key={product.productNum} className="w-[232px] border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                  <div className="relative mb-6">
                    <div className="w-[231px] h-[273px] bg-white absolute top-[38px] left-0" />
                    <img
                      className="w-[232px] h-[348px] relative z-10"
                      alt={product.productName}
                      src={product.mainImage}
                    />

                    {/* 하트 */}
                    <div
                      className="absolute top-2 right-2 z-20 cursor-pointer"
                      onClick={() => {
                        setProducts((prev) =>
                          prev.map((p) =>
                            p.productNum === product.productNum ? { ...p, liked: !p.liked } : p
                          )
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill={product.liked ? "red" : "currentColor"}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                            4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 
                            16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                            11.54L12 21.35z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* 제품 정보 */}
                  <div className="w-[220px] h-[50px]">
                    <div className="w-[214px] h-[29px] mb-0">
                      <Badge
                        variant="secondary"
                        className="absolute top-0 left-[3px] [font-family:'Crimson_Text',Helvetica] font-normal text-[#828282] text-[8px] tracking-[0] leading-[11.2px] bg-transparent border-0 p-0 h-auto"
                      >
                        {product.gender}
                      </Badge>
                      <div className="mt-2 [font-family:'Galdeano',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[21px]">
                        {product.productName}
                      </div>
                    </div>
                    <div className="mt-0 [font-family:'DM_Serif_Text',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[21px]">
                      {product.price.toLocaleString()}원
                    </div>

                    {/* 평점 표시 */}
                    <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
                      <span>{productRatings[product.productNum]?.averageScore?.toFixed(1) || 0}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.947c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.975 9.374c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.947z" />
                      </svg>
                      <span>({productRatings[product.productNum]?.reviewCount || 0})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
