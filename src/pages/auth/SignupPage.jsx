import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api";

// 공통 UI 컴포넌트 import
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Separator } from "../../components/ui/separator";


const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("buyer");
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    secondPassword: "",
    userName: "",
    gender: "MALE",
    tall: "",
    weight: "",
    storeName: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setMessage("");

    // 비밀번호 확인
    if (formData.password !== formData.passwordConfirm) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 필수 정보 누락 확인
    if (
      !formData.id ||
      !formData.password ||
      !formData.userName ||
      !formData.secondPassword
    ) {
      setMessage("필수 정보를 모두 입력해주세요.");
      return;
    }

    // 결제 비밀번호 6자리 숫자 확인
    if (!/^\d{6}$/.test(formData.secondPassword)) {
      setMessage("결제 비밀번호는 6자리 숫자로 입력해주세요.");
      return;
    }

    // 전화번호 - 없이 입력 확인
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      setMessage("전화번호는 숫자만 입력해주세요.");
      return;
    }

    const requestBody = {
      id: formData.id,
      password: formData.password,
      userName: formData.userName,
      secondPassword: formData.secondPassword,
      profileImage: null, // 프로필 이미지 입력 필드가 없어 null로 설정
      gender: formData.gender,
      tall: formData.tall ? Number(formData.tall) : 0,
      weight: formData.weight ? Number(formData.weight) : 0,
      type: userType.toUpperCase(),
      storeName: userType === "seller" ? formData.storeName : null,
    };

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }

      const result = await response.json();
      console.log("회원가입 성공:", result);
      alert("회원가입에 성공했습니다.");
      navigate("/login");
    } catch (error) {
      setMessage("회원가입 중 오류가 발생했습니다: " + error.message);
      console.error("회원가입 오류:", error);
    }
  };

  const navigationItems = [
    { name: "로그인", onClick: () => navigate("/login") },
    { name: "회원가입", onClick: () => navigate("/signup") },
    { name: "장바구니", onClick: () => navigate("/") },
    { name: "마이페이지", onClick: () => navigate("/") },
    { name: "커뮤니티", onClick: () => navigate("/") },
  ];

  return (
    <div className="bg-white grid justify-items-center [align-items:start] w-screen">
      <div className="bg-white w-[1440px] h-[1216px] relative">
        <nav className="absolute top-[33px] left-[1080px] [font-family:'Crimson_Text',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[21px] whitespace-nowrap">
          <div className="flex gap-4">
            {navigationItems.map((item, index) => (
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
        </nav>

        <header className="absolute w-[146px] h-[118px] top-[135px] left-[649px]">
          <div className="relative w-[142px] h-[118px]">
            <h1 className="absolute w-[142px] top-3 left-0 [font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-[25.5px] text-center tracking-[0] leading-[35.8px] whitespace-nowrap">
              MY SALON
            </h1>

            <p className="w-[87px] top-0 left-7 [font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-[9.5px] leading-[13.3px] absolute text-center tracking-[0] whitespace-nowrap">
              당신만을 위한 옷장
            </p>

            <img
              className="absolute w-[66px] h-[66px] top-[52px] left-[37px]"
              alt="Main icon"
              src="https://c.animaapp.com/mfeqluynHQoI9d/img/main-icon-1.png"
            />
          </div>
        </header>

        <main>
          <h2 className="top-[282px] left-[195px] [font-family:'SF_Pro-Bold',Helvetica] font-bold text-[#222222] text-[40px] leading-[56px] absolute text-center tracking-[0] whitespace-nowrap">
            회원가입
          </h2>

          <Separator className="absolute w-[1115px] h-px top-[352px] left-[195px] bg-gray-300" />

          {/* 역할 선택 */}
          <RadioGroup
            className="absolute top-[311px] left-[372px]"
            value={userType}
            onValueChange={setUserType}
          >
            <div className="flex items-center space-x-[81px]">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="buyer"
                  id="buyer"
                  isChecked={userType === "buyer"}
                  className="w-[22px] h-[22px] rounded-[11px] border-[0.7px] border-solid border-[#828282]"
                  onClick={() => setUserType("buyer")}
                />
                <Label
                  htmlFor="buyer"
                  className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-[15px] leading-[21px] text-center tracking-[0] whitespace-nowrap"
                >
                  구매자
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="seller"
                  id="seller"
                  isChecked={userType === "seller"}
                  className="w-[22px] h-[22px] rounded-[11px] border-[0.7px] border-solid border-[#828282]"
                  onClick={() => setUserType("seller")}
                />
                <Label
                  htmlFor="seller"
                  className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-[15px] leading-[21px] text-center tracking-[0] whitespace-nowrap"
                >
                  판매자
                </Label>
              </div>
            </div>
          </RadioGroup>

          <section>
            <h3 className="top-[410px] left-[372px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-[35px] leading-[49px] absolute text-center tracking-[0] whitespace-nowrap">
              기본정보
            </h3>

            <div className="absolute top-[493px] left-[471px]">
              <Label
                htmlFor="id"
                className="w-14 [font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl leading-7 text-center tracking-[0] whitespace-nowrap"
              >
                아이디
              </Label>
            </div>
            <Input
              id="id"
              className="top-[492px] absolute w-[398px] h-8 left-[606px] border-[0.6px] border-solid border-[#828282] rounded-none"
              value={formData.id}
              onChange={handleChange}
            />

            <div className="absolute top-[553px] left-[462px]">
              <Label
                htmlFor="password"
                className="w-[74px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl leading-7 text-center tracking-[0] whitespace-nowrap"
              >
                비밀번호
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              className="top-[554px] absolute w-[398px] h-8 left-[606px] border-[0.6px] border-solid border-[#828282] rounded-none"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="absolute top-[613px] left-[441px]">
              <Label
                htmlFor="passwordConfirm"
                className="w-[116px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl leading-7 text-center tracking-[0] whitespace-nowrap"
              >
                비밀번호 확인
              </Label>
            </div>
            <Input
              id="passwordConfirm"
              type="password"
              className="top-[612px] absolute w-[398px] h-8 left-[606px] border-[0.6px] border-solid border-[#828282] rounded-none"
              value={formData.passwordConfirm}
              onChange={handleChange}
            />

            <div className="absolute top-[673px] left-[441px]">
              <Label
                htmlFor="secondPassword"
                className="w-[116px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl leading-7 text-center tracking-[0] whitespace-nowrap"
              >
                결제 비밀번호
              </Label>
            </div>
            <div className="absolute w-[398px] h-8 top-[672px] left-[606px] border-[0.6px] border-solid border-[#828282]">
              <Input
                id="secondPassword"
                type="password"
                placeholder="6자리 숫자로 입력해주세요"
                className="w-full h-full border-none rounded-none [font-family:'SF_Pro-Regular',Helvetica] font-normal text-[#828282] text-xs leading-[16.8px] text-center tracking-[0]"
                value={formData.secondPassword}
                onChange={handleChange}
              />
            </div>

            <div className="absolute top-[733px] left-[437px]">
              <Label
                htmlFor="userName"
                className="w-[125px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl leading-7 text-center tracking-[0] whitespace-nowrap"
              >
                이름(닉네임)
              </Label>
            </div>
            <Input
              id="userName"
              className="top-[734px] absolute w-[398px] h-8 left-[606px] border-[0.6px] border-solid border-[#828282] rounded-none"
              value={formData.userName}
              onChange={handleChange}
            />
            <div className="absolute top-[854px] left-[481px]">
              <Label className="w-[37px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl leading-7 text-center tracking-[0] whitespace-nowrap">
                성별
              </Label>
            </div>
            <RadioGroup
              className="absolute w-[184px] h-[22px] top-[859px] left-[606px]"
              value={formData.gender}
              onValueChange={(value) => handleRadioChange("gender", value)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="MALE"
                    id="male"
                    isChecked={formData.gender === "MALE"}
                    className="w-[22px] h-[22px] rounded-[11px] border-[0.7px] border-solid border-[#828282]"
                    onClick={() => handleRadioChange("gender", "MALE")}
                  />
                  <Label
                    htmlFor="male"
                    className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-[15px] leading-[21px] text-center tracking-[0] whitespace-nowrap"
                  >
                    남자
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="FEMALE"
                    id="female"
                    isChecked={formData.gender === "FEMALE"}
                    className="w-[22px] h-[22px] rounded-[11px] border-[0.7px] border-solid border-[#828282]"
                    onClick={() => handleRadioChange("gender", "FEMALE")}
                  />
                  <Label
                    htmlFor="female"
                    className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-[15px] leading-[21px] text-center tracking-[0] whitespace-nowrap"
                  >
                    여자
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <div className="absolute top-[917px] left-[481px]">
              <Label
                htmlFor="tall"
                className="w-[37px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl leading-7 text-center tracking-[0] whitespace-nowrap"
              >
                키
              </Label>
            </div>
            <div className="absolute w-32 h-8 top-[914px] left-[606px] border-[0.6px] border-solid border-[#828282]">
              <Input
                id="tall"
                type="number"
                className="w-full h-full border-none rounded-none pr-8"
                value={formData.tall}
                onChange={handleChange}
              />
              <div className="absolute top-1 right-2 [font-family:'SF_Pro-Regular',Helvetica] font-normal text-[#828282] text-[15px] text-center tracking-[0] leading-[21px] whitespace-nowrap">
                cm
              </div>
            </div>

            <div className="absolute top-[914px] left-[773px]">
              <Label
                htmlFor="weight"
                className="w-16 [font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl leading-7 text-center tracking-[0] whitespace-nowrap"
              >
                몸무게
              </Label>
            </div>
            <div className="absolute w-32 h-8 top-[914px] left-[876px] border-[0.6px] border-solid border-[#828282]">
              <Input
                id="weight"
                type="number"
                className="w-full h-full border-none rounded-none pr-8"
                value={formData.weight}
                onChange={handleChange}
              />
              <div className="absolute top-1 right-2 [font-family:'SF_Pro-Regular',Helvetica] font-normal text-[#828282] text-[15px] text-center tracking-[0] leading-[21px] whitespace-nowrap">
                kg
              </div>
            </div>

            {/* ▶ 스토어 이름: 라벨 옆에 네모 입력박스(한 줄) */}
            <div className="absolute top-[980px] left-[441px] flex items-center gap-4">
              <Label
                htmlFor="storeName"
                className={`w-[116px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-xl leading-7 text-right tracking-[0] whitespace-nowrap ${
                  userType === "seller" ? "text-black" : "text-[#999999]"
                }`}
              >
                스토어 이름
              </Label>

              <Input
                id="storeName"
                disabled={userType !== "seller"}
                className={`w-[398px] h-8 border-[0.6px] rounded-none ${
                  userType === "seller"
                    ? "border-[#828282] bg-white"
                    : "border-[#d0d0d0] bg-[#f5f5f5] text-[#999999] cursor-not-allowed"
                }`}
                value={userType === "seller" ? formData.storeName : ""}
                onChange={handleChange}
              />
            </div>
          </section>
          
          <div className="text-center text-red-500 mt-4 absolute w-full top-[1020px] left-0">
            {message && <span>{message}</span>}
          </div>

          <div className="absolute w-[539px] h-[60px] top-[1049px] left-[466px]">
            <Button
              variant="outline"
              className="absolute w-[242px] h-[60px] top-0 left-0 border border-solid border-[#828282] rounded-none bg-white hover:bg-gray-50 h-auto"
              onClick={() => navigate("/mypage")}
            >
              <span className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-black text-xl leading-7 text-center tracking-[0] whitespace-nowrap">
                취소
              </span>
            </Button>

            <Button
              className="absolute w-[242px] h-[60px] top-0 left-[293px] bg-[#828282] hover:bg-[#707070] rounded-none h-auto"
              onClick={handleSubmit}
            >
              <span className="[font-family:'SF_Pro-Regular',Helvetica] font-normal text-white text-xl leading-7 text-center tracking-[0] whitespace-nowrap">
                가입하기
              </span>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignupPage;
