import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  SearchIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { communityApi } from "../../api/post_/postApi.js";

// 외부 컴포넌트들을 이 파일 내부에 직접 정의합니다.
// 이렇게 하면 import 오류를 해결할 수 있습니다.
const Button = ({ asChild, variant, size, className, children, onClick }) => {
  const Comp = asChild ? Link : 'button';
  return (
    <Comp
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
        transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
        ${variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' : ''}
        ${variant === 'outline' ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : ''}
        ${className || ''}
      `}
      onClick={onClick}
      to={asChild ? children.props.to : null}
    >
      {asChild ? children.props.children : children}
    </Comp>
  );
};

const Card = ({ className, children }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow ${className || ''}`}>
    {children}
  </div>
);

const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className || ''}`}>
    {children}
  </div>
);

const Input = ({ className, ...props }) => (
  <input
    className={`
      flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background
      file:border-0 file:bg-transparent file:text-sm file:font-medium
      placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
      ${className || ''}
    `}
    {...props}
  />
);

const Avatar = ({ className, children }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className || ''}`}>
    {children}
  </div>
);

const AvatarImage = ({ className, src, ...props }) => (
  <img className={`aspect-square h-full w-full ${className || ''}`} src={src} {...props} />
);

const AvatarFallback = ({ className, children }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className || ''}`}>
    {children}
  </div>
);

const CommunityPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("today");
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveTab(location.pathname.startsWith("/board") ? "board" : "today");
  }, [location.pathname]);

  // API에서 데이터를 불러오는 useEffect 훅
  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const data = await communityApi.getPosts();
        setOutfits(data);
      } catch (error) {
        console.error("Failed to fetch outfits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOutfits();
  }, []);

  const topNavItems = [
    { name: "로그인", onClick: () => navigate("/login") },
    { name: "회원가입", onClick: () => navigate("/signup") },
    { name: "장바구니", onClick: () => navigate("/cart") },
    { name: "마이페이지", onClick: () => navigate("/mypage") },
    { name: "커뮤니티", onClick: () => navigate("/community") },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        로딩 중...
      </div>
    );
  }

  // API에서 받아온 데이터로 캐러셀과 그리드용 배열 생성
  const featuredOutfits = outfits.map((item, index) => ({
    id: item.postNum,
    title: item.title,
    category: "휴양지룩", // API에 없는 데이터이므로 임의 지정
    image: item.coordiImage,
    avatar: item.userImage,
    username: item.writer,
    likes: item.likeCount,
    
  }));

  const gridOutfits = outfits.slice(3, 7).map((item) => ({
    id: item.postNum,
    title: item.title,
    category: "휴양지룩", // API에 없는 데이터이므로 임의 지정
    image: item.coordiImage,
    avatar: item.userImage,
    username: item.writer,
    likes: item.likeCount,
  }));

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto bg-white overflow-hidden min-h-[1080px] relative">
        {/* 상단 네비 */}
        <nav className="absolute top-[33px] right-[37px]">
          <div className="flex gap-4 text-[15px]">
            {topNavItems.map((item, idx) => (
              <Button key={idx} variant="ghost" className="h-auto p-0" onClick={item.onClick}>
                {item.name}
              </Button>
            ))}
          </div>
        </nav>

        {/* 로고 */}
        <header className="absolute w-[146px] h-[118px] top-[55px] left-1/2 -translate-x-1/2">
          <div className="relative w-[142px] h-[118px]">
            <h1 className="absolute w-[142px] top-3 left-0 text-[25.5px] text-center">MY SALON</h1>
            <p className="absolute w-[87px] top-0 left-7 text-[9.5px] text-center">당신만을 위한 옷장</p>
            <img className="absolute w-[66px] h-[66px] top-[52px] left-[37px]" alt="Main icon"
                 src="https://c.animaapp.com/mfezbbicpZVDGC/img/main-icon-1.png" />
          </div>
        </header>

        {/* 검색 */}
        <div className="absolute w-[296px] h-16 top-[67px] right-[37px]">
          <div className="flex w-[296px] h-16 items-center rounded-[100px]">
            <div className="flex items-center p-[11px] flex-1 bg-[#78788029] rounded-[100px]">
              <div className="flex items-center gap-2 flex-1">
                <SearchIcon className="w-4 h-4 text-[#999]" />
                <Input
                  placeholder="Search"
                  className="border-none bg-transparent text-[#999] text-[17px] placeholder:text-[#999] focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 탭 */}
        <div className="absolute w-[388px] h-[21px] top-[239px] left-1/2 -translate-x-1/2">
          <Button asChild variant="ghost" className="absolute w-[123px] top-0 left-0 h-auto p-0">
            <Link to="/community">
              <h2 className={`text-2xl ${activeTab === "today" ? "font-bold text-[#a40303]" : "text-black"}`}>
                오늘의 코디
              </h2>
            </Link>
          </Button>

          <Button asChild variant="ghost" className="absolute w-[67px] top-0 right-0 h-auto p-0">
            <Link to="/board">
              <h2 className={`text-2xl ${activeTab === "board" ? "font-bold text-[#a40303]" : "text-black"}`}>
                게시판
              </h2>
            </Link>
          </Button>
        </div>

        {/* 추천 카드 캐러셀 */}
        <section className="absolute w-[577px] h-[347px] top-96 left-1/2 -translate-x-1/2">
          <Button variant="outline" size="icon"
                  className="absolute w-10 h-10 top-[172px] -left-[129px] rounded-[20px] border border-black bg-white hover:bg-gray-50">
            <ChevronLeftIcon className="w-3.5 h-[15px]" />
          </Button>
          <Button variant="outline" size="icon"
                  className="absolute w-10 h-10 top-[172px] -right-[129px] rounded-[20px] border border-black bg-white hover:bg-gray-50">
            <ChevronRightIcon className="w-3.5 h-[15px]" />
          </Button>

          <div className="flex gap-[1px] relative">
            {featuredOutfits.map((outfit, index) => (
              <Card
                key={outfit.id}
                className={`${outfit.isCenter ? "w-[217px] h-[311px] rounded-[10px] border border-black" : "w-[218px] h-[312px] bg-gray-100 border-none"} ${index === 0 || index === 2 ? "mt-9" : ""}`}
              >
                <CardContent className="p-0 relative h-full">
                  <img
                    className={`${outfit.isCenter ? "w-[169px] h-[150px] top-4 left-[22px]" : "w-[169px] h-[150px] top-[57px] left-[22px]"} absolute object-cover`}
                    alt="Outfit"
                    src={outfit.image}
                  />

                  <div className={`absolute ${outfit.isCenter ? "w-[126px] h-[35px] top-[179px] left-6" : "top-[217px] left-[22px]"}`}>
                    <h3 className={`${outfit.isCenter ? "absolute top-0 left-0" : ""} font-bold text-lg leading-[25.2px] whitespace-nowrap`}>
                      {outfit.title}
                    </h3>
                    <p className={`${outfit.isCenter ? "absolute top-[21px] left-0.5" : "mt-1"} text-[10px] leading-[14px] whitespace-nowrap`}>
                      {outfit.category}
                    </p>
                  </div>

                  <div className={`absolute ${outfit.isCenter ? "top-[220px] left-[22px]" : "top-[261px] left-[22px]"} w-16 h-[31px] flex items-center gap-2`}>
                    <Avatar className="w-[26px] h-[31px]">
                      <AvatarImage src={outfit.avatar} alt="User" />
                      <AvatarFallback>홍</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] leading-[14px] whitespace-nowrap">{outfit.username}</span>
                  </div>

                  <div className={`absolute ${outfit.isCenter ? "top-[264px] left-[139px]" : "top-[305px] right-[27px]"} w-[51px] h-[21px] flex items-center gap-1`}>
                    <HeartIcon className="w-5 h-5 fill-red-500 text-red-500" />
                    <span className="font-bold text-[15px] leading-[21px]">{outfit.likes}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 나의 코디 등록하기 → /write-post */}
        <Button asChild variant="outline"
                className="absolute w-[111px] h-[34px] top-[766px] left-1/2 -translate-x-1/2 bg-white rounded-[3.12px] border border-black hover:bg-gray-50 h-auto">
          <Link to="/write-post">
            <span className="text-[9.3px] leading-[13.1px] whitespace-nowrap">나의 코디 등록하기</span>
          </Link>
        </Button>

        {/* 하단 그리드 */}
        <section className="absolute top-[834px] left-1/2 -translate-x-1/2 w-[1154px]">
          <div className="grid grid-cols-4 gap-[67px]">
            {gridOutfits.map((outfit) => (
              <Card key={outfit.id} className="w-[233px] h-[311px] rounded-[10px] border border-black">
                <CardContent className="p-0 relative h-full">
                  <img className="w-[178px] h-[150px] absolute top-4 left-6 object-cover" alt="Outfit" src={outfit.image} />
                  <div className="absolute w-[133px] h-[35px] top-[179px] left-[25px]">
                    <h3 className="absolute top-0 left-0 font-bold text-lg leading-[25.2px]">{outfit.title}</h3>
                    <p className="absolute top-[21px] left-0.5 text-[10px] leading-[14px]">{outfit.category}</p>
                  </div>
                  <div className="absolute w-[66px] h-8 top-[220px] left-[25px] flex items-center gap-2">
                    <Avatar className="w-[27px] h-6">
                      <AvatarImage src={outfit.avatar} alt="User" />
                      <AvatarFallback>홍</AvatarFallback>
                    </Avatar>
                    <span className="w-[29px] text-[10px] leading-[14px] whitespace-nowrap">{outfit.username}</span>
                  </div>
                  <div className="absolute w-[54px] h-[21px] top-[264px] left-[147px] flex items-center gap-2">
                    <HeartIcon className="w-[21px] h-[21px] fill-red-500 text-red-500" />
                    <span className="w-[22px] font-bold text-[15px] leading-[21px]">{outfit.likes}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommunityPage;
