import { MicIcon, SearchIcon, Heart, Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productApi } from '../api/product/productApi';
import { favoriteApi } from "../api/favorite/favoriteApi";
import { reviewApi } from "../api/review_/reviewApi";
import { userApi } from "../api/user/userApi";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

// 한글 → Enum 매핑
const categoryMap =
{
  전체: null,
  상의: "TOP",
  바지: "BOTTOM",
  아우터: "OUTERWEAR",
  "원피스/스커트": "DRESS_SKIRT",
  "ACC/BAG": "ACC_BAG",
  "홈웨어/속옷": "LOUNGEWEAR_UNDERWEAR",
  키즈: "KIDS"
};
const categoryLowMap =
{
  전체: null,
  반소매: "SHORT_SLEEVE",
  긴소매: "LONG_SLEEVE", 
  "셔츠/블라우스":
    "SHIRT_BLOUSE", 
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
  하의: "BOTTOMS"
};
const genderMap = 
{ 남자: "MALE", 
  여자: "FEMALE", 
  공용: "UNISEX", 
  전체: null };

export const CategoryPageTemplate = ({ categoryName, categoryTabs }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("전체");
  const [selectedGender, setSelectedGender] = useState("전체");

  const [userNum, setUserNum] = useState(null);
  const [likedProducts, setLikedProducts] = useState({});
  const [productScores, setProductScores] = useState({});
  const [reviewCounts, setReviewCounts] = useState({});

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userApi.getUserInfo();
        setUserNum(user.userNum);
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };
    fetchUser();
  }, []);

  // 카테고리 + 하위카테고리 + 성별로 상품 불러오기
  const fetchProducts = async () => {
    try {
      const response = await productApi.searchProducts({
        category: categoryMap[categoryName] || null,
        categoryLow: categoryLowMap[activeTab] || null,
        gender: genderMap[selectedGender] || null,
      });
      setProducts(response);

      if (userNum) {
        const favorites = await favoriteApi.getUserFavorites(userNum);
        const likedMap = {};
        favorites.forEach(f => { likedMap[f.productNum] = true });
        setLikedProducts(likedMap);
      }

      // 평점과 리뷰 개수 가져오기
      const scores = {};
      const counts = {};
      for (const product of response) {
        try {
          const avg = await reviewApi.getAverageScore(product.productNum);
          const cnt = await reviewApi.getProductReviewCount(product.productNum);
          scores[product.productNum] = avg || 0;
          counts[product.productNum] = cnt || 0;
        } catch (err) {
          console.error("리뷰 데이터 불러오기 실패:", err);
        }
      }
      setProductScores(scores);
      setReviewCounts(counts);
    } catch (error) {
      console.error("제품 불러오기 실패:", error);
    }
  };

  // 탭/성별 변경시 fetch
  useEffect(() => {
    fetchProducts();
  }, [activeTab, selectedGender, userNum]);

  // 찜 토글
  const toggleLike = async (productNum) => {
    try {
      await favoriteApi.addFavorite({ userNum, productNum });
      setLikedProducts(prev => ({ ...prev, [productNum]: !prev[productNum] }));
    } catch (err) {
      console.error("찜 토글 실패:", err);
    }
  };

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

          {/* 카테고리 하위 탭 */}
          <div className="flex gap-[50px] mb-[40px]">
            {categoryTabs.map(tab => (
              <Button
                key={tab.name}
                variant="ghost"
                className={`h-auto p-0 [font-family:'SF_Pro-Bold',Helvetica] font-bold text-2xl tracking-[-0.08px] leading-[20.7px] ${activeTab === tab.name ? "text-[#a40303]" : "text-black hover:text-[#a40303]"}`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </Button>
            ))}
          </div>

          {/* 성별 필터 */}
          <div className="flex gap-4 mb-[40px]">
            {["전체", "남자", "여자", "공용"].map(gender => (
              <Button
                key={gender}
                variant="ghost"
                className={`h-auto p-0 [font-family:'SF_Pro-Bold',Helvetica] font-bold text-lg ${selectedGender === gender ? "text-[#a40303]" : "text-black hover:text-[#a40303]"}`}
                onClick={() => setSelectedGender(gender)}
              >
                {gender}
              </Button>
            ))}
          </div>

          {/* 제품 그리드 */}
          <div className="grid grid-cols-4 gap-x-[91px] gap-y-[125px]">
            {products.map(product => (
              <Card key={product.productNum} className="w-[232px] border-0 shadow-none bg-transparent cursor-pointer" onClick={() => navigate("/screen126", { state: { product } })}>
                <CardContent className="p-0 relative">
                  {/* 이미지 */}
                  <img
                    src={product.mainImage ? `http://localhost:8080/products/images/${product.mainImage}` : "https://via.placeholder.com/232x348"}
                    alt={product.productName}
                    className="w-[232px] h-[348px] object-cover relative z-10"
                  />

                  {/* 찜 버튼 */}
                  <div
                    className="absolute top-2 right-2 z-30 cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); toggleLike(product.productNum); }}
                  >
                    <Heart
                      className={`w-6 h-6 transition-colors ${likedProducts[product.productNum] ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                    />
                  </div>

                  {/* 상품 정보 */}
                  <div className="text-left mt-2">
                    {/* Gender + 평점/리뷰 */}
                    <div className="flex items-center gap-4 mb-1">
                      <Badge variant="secondary" className="text-[10px] [font-family:'Crimson_Text',Helvetica] text-[#828282] bg-transparent border-none p-0">
                        {product.gender}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-700">{productScores[product.productNum]?.toFixed(1) || "0.0"}</span>
                        <span className="text-sm text-gray-500">({reviewCounts[product.productNum] || 0})</span>
                      </div>
                    </div>

                    {/* 이름 */}
                    <h3 className="[font-family:'Galdeano',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[21px] mb-1">
                      {product.productName}
                    </h3>

                    {/* 가격 */}
                    <p className="[font-family:'DM_Serif_Text',Helvetica] font-normal text-[15px] tracking-[0] leading-[21px] text-black">
                      {product.price?.toLocaleString()}원
                    </p>
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
