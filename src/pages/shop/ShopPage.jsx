import { MicIcon, SearchIcon, Heart, Star } from "lucide-react"; // ⭐ 별 아이콘 추가
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { SharedHeader } from "../../components/SharedHeader";
import { productApi } from '../../api/product/productApi';
import { favoriteApi } from "../../api/favorite/favoriteApi";
import { userApi } from "../../api/user/userApi";
import { reviewApi } from "../../api/review_/reviewApi"; // ⭐ 리뷰 API 추가

const ShopPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const [userNum, setUserNum] = useState(null);
  const [productScores, setProductScores] = useState({}); // ⭐ 평균 별점 저장
  const [reviewCounts, setReviewCounts] = useState({});   // ⭐ 리뷰 개수 저장
  const [searchKeyword, setSearchKeyword] = useState("");

  const categoryItems = [
    { name: "상의", path: "/category/상의" },
    { name: "바지", path: "/category/바지" },
    { name: "남성", path: "/category/남성" },
    { name: "여성", path: "/category/여성" },
    { name: "키즈", path: "/category/키즈" },
  ];

  const handleSearch = async () => {
    try {
      // name만 넣고 나머지는 null
      const data = await productApi.searchProducts({
        name: searchKeyword,
        category: null,
        categoryLow: null,
        gender: null,
        userNum: null,
      });
      setProducts(data);

      // ⭐ 검색 후 찜 상태 갱신
      if (userNum) {
        const favorites = await favoriteApi.getUserFavorites(userNum);
        const likedMap = {};
        favorites.forEach((f) => {
          likedMap[f.productNum] = true;
        });
        setLikedProducts(likedMap);
      }
    } catch (error) {
      console.error("상품 검색 실패:", error);
    }
  };
  // ✅ 유저 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userApi.getUserInfo();
        setUserNum(user.userNum);
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };
    fetchUser();
  }, []);

  // ✅ 상품 + 찜 + 리뷰/별점 불러오기
  useEffect(() => {
    if (!userNum) return;

    const fetchData = async () => {
      try {
        const data = await productApi.getAllProducts();
        setProducts(data);

        const favorites = await favoriteApi.getUserFavorites(userNum);
        const likedMap = {};
        favorites.forEach((f) => {
          likedMap[f.productNum] = true;
        });
        setLikedProducts(likedMap);

        // ⭐ 각 상품별 리뷰 개수 & 평균 점수 불러오기
        const scores = {};
        const counts = {};
        for (const product of data) {
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
        console.error("상품/찜 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [userNum]);

  // ✅ 찜 토글 함수
  const toggleLike = async (productNum) => {
    try {
      await favoriteApi.addFavorite({ userNum, productNum });
      setLikedProducts((prev) => ({
        ...prev,
        [productNum]: !prev[productNum],
      }));
    } catch (error) {
      console.error("찜 토글 실패:", error);
    }
  };

  return (
    <div className="bg-[#e3e2e2] min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto bg-[#e3e2e2] relative">
        <SharedHeader />

        {/* Search Bar */}
        <div className="flex justify-center my-8">
          <div className="relative w-[400px]">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
            <Input
              placeholder="Search"
              value={searchKeyword}               // 검색어 바인딩
              onChange={(e) => setSearchKeyword(e.target.value)}  // 입력 시 state 갱신
              onKeyDown={(e) => {                // 엔터 키로 검색
                if (e.key === "Enter") handleSearch();
              }}
              className="w-full h-[50px] pl-12 pr-12 bg-[#78788029] border-none rounded-full text-[17px] [font-family:'SF_Pro-Regular',Helvetica] placeholder:text-[#999999]"
            />
            <MicIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
          </div>
        </div>

        {/* Shop By My Salon */}
        <section className="text-center">
          <h2 className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl tracking-[-0.08px] leading-[22px] mb-[77px]">
            SHOP BY MY SALON
          </h2>

          <div className="flex justify-center items-center gap-[73px] mb-[91px]">
            {categoryItems.map((category, index) => (
              <div
                key={index}
                className="text-center cursor-pointer"
                onClick={() => navigate(category.path)}
              >
                <div className="w-[78px] h-[71px] bg-[#bdbdbd] rounded-full mb-4 mx-auto" />
                <div className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl tracking-[-0.08px] leading-[22px]">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Products */}
        <section className="text-center mb-[103px]">
          <h2 className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl tracking-[-0.08px] leading-[22px] mb-[67px]">
            당신을 위한 추천상품
          </h2>

          <div className="grid grid-cols-4 gap-[91px] max-w-[1201px] mx-auto px-[134px] relative z-20">
            {products.map((product) => (
              <Card

                key={product.id}
                className="bg-transparent border-none shadow-none cursor-pointer"
                onClick={() => navigate(`/shop/${product.id}`)} // ✅ 상세 페이지로 이동
                
              >
                <CardContent className="p-0">
                  <div className="relative mb-6">
                    <img
                      src={
                        product.mainImage
                          ? `http://localhost:8080/products/images/${product.mainImage}`
                          : "https://via.placeholder.com/232x348"
                      }
                      alt={product.productName}
                      className="w-[232px] h-[348px] relative z-10 object-cover"
                    />

                    {/* ✅ 하트 버튼 */}
                    <div
                      className="absolute top-2 right-2 z-30 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(product.productNum);
                      }}
                    >
                      <Heart
                        className={`w-6 h-6 transition-colors ${likedProducts[product.productNum]
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                          }`}
                      />
                    </div>
                  </div>

                  <div className="text-left">
                    {/* Gender + ⭐ 별점 + 리뷰 개수 */}
                    <div className="flex items-center gap-4 mb-1">
                      <Badge
                        variant="secondary"
                        className="text-[10px] [font-family:'Crimson_Text',Helvetica] text-[#828282] bg-transparent border-none p-0"
                      >
                        {product.gender}
                      </Badge>

                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-700">
                          {productScores[product.productNum]?.toFixed(1) || "0.0"}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({reviewCounts[product.productNum] || 0})
                        </span>
                      </div>
                    </div>

                    {/* 상품 이름 */}
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

          <Button className="mt-[53px] w-[88px] h-7 bg-[url(https://c.animaapp.com/mfdr5z0vfXP3sX/img/rectangle-28.svg)] bg-[100%_100%] border-none hover:opacity-80">
            <span className="[font-family:'DM_Serif_Text',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[21px]">
              더보기
            </span>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default ShopPage;
