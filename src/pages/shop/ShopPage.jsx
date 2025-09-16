import { MicIcon, SearchIcon, Heart, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer"; // ✅ Footer
import { productApi } from "../../api/product/productApi";
import { favoriteApi } from "../../api/favorite/favoriteApi";
import { userApi } from "../../api/user/userApi";
import { reviewApi } from "../../api/review_/reviewApi";

// ✅ 아이콘 이미지 불러오기
import upIcon from "../../assets/images/up.png";
import downIcon from "../../assets/images/down.png";
import manIcon from "../../assets/images/man.png";
import womanIcon from "../../assets/images/woman.png";
import kidsIcon from "../../assets/images/kids.png";

const ShopPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const [userNum, setUserNum] = useState(null);
  const [productScores, setProductScores] = useState({});
  const [reviewCounts, setReviewCounts] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");

  // ✅ 카테고리 아이콘 적용
  const categoryItems = [
    { name: "상의", path: "/category/상의", icon: upIcon },
    { name: "바지", path: "/category/바지", icon: downIcon },
    { name: "남성", path: "/category/남성", icon: manIcon },
    { name: "여성", path: "/category/여성", icon: womanIcon },
    { name: "키즈", path: "/category/키즈", icon: kidsIcon },
  ];

  const handleSearch = async () => {
    try {
      const data = await productApi.searchProducts({
        name: searchKeyword,
        category: null,
        categoryLow: null,
        gender: null,
        userNum: null,
      });
      setProducts(data);

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
    <div className="bg-[#e3e2e2] min-h-screen w-full flex flex-col">
      {/* ✅ NavHeader */}
      <NavHeader />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 max-w-[1440px] mx-auto px-6">
        {/* Search Bar */}
        <div className="flex justify-center mt-10 mb-14">
          <div className="relative w-[400px]">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
            <Input
              placeholder="Search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full h-[50px] pl-12 pr-12 bg-[#f5f5f5] border rounded-full text-[17px] placeholder:text-[#999999]"
            />
            <MicIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
          </div>
        </div>

        {/* Shop By My Salon */}
        <section className="text-center">
          <h2 className="text-black text-xl mb-[77px]">SHOP BY MY SALON</h2>
          <div className="flex justify-center items-center gap-[73px] mb-[91px]">
            {categoryItems.map((category, index) => (
              <div
                key={index}
                className="text-center cursor-pointer"
                onClick={() => navigate(category.path)}
              >
                {/* ✅ 카테고리 아이콘 */}
                <div className="w-[78px] h-[78px] rounded-full mb-4 mx-auto flex items-center justify-center bg-white shadow">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-[50px] h-[50px] object-contain"
                  />
                </div>
                <div className="text-xl text-black">{category.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Products */}
        <section className="text-center mb-[103px]">
          <h2 className="text-black text-xl mb-[67px]">당신을 위한 추천상품</h2>

          <div className="grid grid-cols-4 gap-[60px] max-w-[1200px] mx-auto relative z-20">
            {products.map((product) => (
              <Card
                key={product.id}
                className="bg-white border shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(`/shop/${product.id}`)}
              >
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={
                        product.mainImage
                          ? `http://localhost:8080/products/images/${product.mainImage}`
                          : "https://via.placeholder.com/232x348"
                      }
                      alt={product.productName}
                      className="w-full h-[280px] object-cover rounded-md"
                    />

                    <div
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(product.productNum);
                      }}
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          likedProducts[product.productNum]
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-4 mb-2">
                      <Badge variant="secondary" className="text-xs text-gray-500 bg-transparent border-none p-0">
                        {product.gender}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {productScores[product.productNum]?.toFixed(1) || "0.0"}
                        <span className="text-gray-400">
                          ({reviewCounts[product.productNum] || 0})
                        </span>
                      </div>
                    </div>
                    <h3 className="text-black text-base mb-1">
                      {product.productName}
                    </h3>
                    <p className="text-black font-medium">
                      {product.price?.toLocaleString()}원
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="mt-[53px] w-[100px] h-9 bg-[#333] rounded-full hover:opacity-80 text-white">
            더보기
          </Button>
        </section>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default ShopPage;
