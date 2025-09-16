import { MicIcon, SearchIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const navigationItems = [
  "로그인",
  "회원가입",
  "장바구니",
  "마이페이지",
  "커뮤니티",
];

export default function Screen() {   // ✅ default export로 수정
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#e3e2e2] min-h-screen w-full flex flex-col items-center"
      data-model-id="3:1348"
    >
      <div className="bg-[#e3e2e2] w-full max-w-[1440px] min-h-[1080px] relative">
        {/* Navigation */}
        <nav className="absolute top-[33px] right-[80px] translate-y-[-1rem] animate-fade-in opacity-0">
          <div className="flex gap-4 [font-family:'Crimson_Text',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[21px]">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-auto p-0 text-[15px] font-normal"
                onClick={() => {
                  if (item === "로그인") navigate("/login");
                  else if (item === "회원가입") navigate("/signup");
                  else if (item === "마이페이지") navigate("/mypage");
                  else if (item === "장바구니") navigate("/cart");
                  else if (item === "커뮤니티") navigate("/community");
                }}
              >
                {item}
              </Button>
            ))}
          </div>
        </nav>

        {/* Hero Section */}
        <main className="absolute w-[1066px] h-[548px] top-[174px] left-[232px] bg-[url(https://c.animaapp.com/mfdmox6lmGwOkM/img/--.png)] bg-[100%_100%] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <section className="relative w-[267px] h-[151px] left-[740px]">
            <p className="absolute top-[115px] left-[3px] [font-family:'Crimson_Text',Helvetica] font-normal text-black text-[13px] tracking-[0] leading-[18.2px]">
              하나의 옷을 여러 가지로 입는 나만의 스타일링 팁
              <br />
              사람들과 공유해보세요.
            </p>

            <h1 className="absolute top-0 left-0 [font-family:'Dhyana-Bold',Helvetica] font-normal text-black text-[25px] tracking-[0] leading-[35px]">
              <span className="font-bold">
                요즘 당신에게 <br />
                영감을 <br />
              </span>
              <span className="[font-family:'Dhyana-Regular',Helvetica]">
                주는 것은 무엇인가요?
              </span>
            </h1>
          </section>
        </main>

        {/* SearchIcon Section */}
        <section className="absolute w-[616px] h-[110px] top-[741px] left-[413px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <div className="relative w-[614px] h-[110px] rounded-[100px]">
            <div className="flex w-[614px] h-[110px] items-center rounded-[100px]">
              <div className="flex items-center p-[11px] relative flex-1 bg-[#78788029] rounded-[100px]">
                <div className="flex items-center gap-2 relative flex-1">
                  <SearchIcon className="w-4 h-4 text-[#999999]" />
                  <Input
                    className="border-0 bg-transparent text-[#999999] text-[17px] tracking-[-0.08px] leading-[22px] placeholder:text-[#999999] focus-visible:ring-0 h-auto p-0"
                  />
                </div>
                <MicIcon className="w-4 h-4 text-[#999999]" />
              </div>
            </div>

            <div className="absolute top-11 left-[49px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-[#828282] text-[17px] tracking-[-0.08px] leading-[22px] whitespace-nowrap">
              당신의 스타일을 이야기해보세요
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="absolute w-[242px] h-[72px] top-[870px] left-[590px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <Button
            className="w-[242px] h-[51px] bg-[#524f4f] rounded-[30px] hover:bg-[#524f4f]/90 transition-colors h-auto"
            onClick={() => navigate("/community")}
          >
            <span className="[font-family:'Crimson_Text',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[21px]">
              스타일 실험실로 입장하기
            </span>
          </Button>

          <p className="absolute top-[50px] left-14 [font-family:'SF_Pro-Regular',Helvetica] font-normal text-[#828282] text-[10px] tracking-[-0.08px] leading-[22px] whitespace-nowrap">
            오늘 나의 모습을 자랑해보세요
          </p>
        </section>
      </div>
    </div>
  );
}
