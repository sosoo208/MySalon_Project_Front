import { MicIcon, SearchIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { SharedHeader } from "../../components/SharedHeader";

const ShopPage = () => {
  const navigate = useNavigate();

  const categoryItems = [
    { name: "상의", path: "/category/상의" },
    { name: "바지", path: "/category/바지" },
    { name: "남성", path: "/category/남성" },
    { name: "여성", path: "/category/여성" },
    { name: "키즈", path: "/category/키즈" },
  ];

  const productItems = [
    {
      id: 1,
      image: "https://c.animaapp.com/mfdr5z0vfXP3sX/img/maneking-gwa-osgage-5.png",
      name: "상품 이름 (판매자가 지정하는 이름)",
      price: "50,000원",
      category: "MALE",
    },
    {
      id: 2,
      image: "https://c.animaapp.com/mfdr5z0vfXP3sX/img/maneking-gwa-osgage-6.png",
      name: "상품 이름 (판매자가 지정하는 이름)",
      price: "50,000원",
      category: "MALE",
    },
    {
      id: 3,
      image: "https://c.animaapp.com/mfdr5z0vfXP3sX/img/maneking-gwa-osgage-7.png",
      name: "상품 이름 (판매자가 지정하는 이름)",
      price: "50,000원",
      category: "MALE",
    },
    {
      id: 4,
      image: "https://c.animaapp.com/mfdr5z0vfXP3sX/img/maneking-gwa-osgage-8.png",
      name: "상품 이름 (판매자가 지정하는 이름)",
      price: "50,000원",
      category: "MALE",
    },
  ];

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

          {/* z-index 올려서 헤더와의 충돌 방지 */}
          <div className="grid grid-cols-4 gap-[91px] max-w-[1201px] mx-auto px-[134px] relative z-20">
            {productItems.map((product) => (
              <Card
                key={product.id}
                className="bg-transparent border-none shadow-none cursor-pointer"
                onClick={() => navigate("/screen126", { state: { product } })}
              >
                <CardContent className="p-0">
                  <div className="relative mb-6">
                    <img
                      className="w-[232px] h-[348px] relative z-10"
                      alt={product.name}
                      src={product.image}
                    />
                  </div>

                  <div className="text-left">
                    <Badge
                      variant="secondary"
                      className="mb-2 text-[8px] [font-family:'Crimson_Text',Helvetica] text-[#828282] bg-transparent border-none p-0"
                    >
                      {product.category}
                    </Badge>
                    <h3 className="[font-family:'Galdeano',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[21px] mb-1">
                      {product.name}
                    </h3>
                    <p className="[font-family:'DM_Serif_Text',Helvetica] font-normal text-[15px] tracking-[0] leading-[21px] text-black">
                      {product.price}
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
