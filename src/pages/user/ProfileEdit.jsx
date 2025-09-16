import React, { useState, useEffect } from "react";
import { SubHeader } from "../../components/SubHeader";
import profileIcon from "../../assets/icons/profile.png";
import { userApi } from "../../api/user/userApi";

export default function ProfileEdit() {
  const [role, setRole] = useState("buyer");
  const [profileImage, setProfileImage] = useState(null); // 미리보기 URL
  const [form, setForm] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    secondPassword: "",
    userName: "",
    tall: "",
    weight: "",
    storeName: "",
    gender: "",
    profileImage: null, // Base64 문자열
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await userApi.getUserInfo();
        setForm({
          id: user.id || "",
          password: "",
          passwordCheck: "",
          secondPassword: "",
          userName: user.userName || "",
          tall: user.tall || "",
          weight: user.weight || "",
          storeName: user.storeName || "",
          gender: user.gender || "",
          profileImage: user.profileImage || null,
        });
        setRole(user.type?.toLowerCase() || "buyer");
        setProfileImage(user.profileImage || null);
      } catch (err) {
        console.error("유저 정보 조회 실패", err);
        alert("유저 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setForm((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setProfileImage(null);
    setForm((prev) => ({ ...prev, profileImage: null }));
    document.getElementById("profile-upload").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id || !form.password || !form.passwordCheck || !form.userName) {
      alert("필수 정보를 입력해 주세요.");
      return;
    }

    if (form.password !== form.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // DTO 필드명에 맞춘 명시적 payload
    const payload = {
      id: form.id,
      password: form.password,
      secondPassword: form.secondPassword,
      userName: form.userName,
      tall: form.tall ? Number(form.tall) : 0,
      weight: form.weight ? Number(form.weight) : 0,
      gender: form.gender || null,
      type: role.toUpperCase(),
      storeName: form.storeName || "",
      profileImage: form.profileImage || null,
    };

    try {
      await userApi.editUser(payload);
      alert("프로필이 수정되었습니다 ✅");
    } catch (err) {
      console.error("회원 수정 실패:", err);
      alert("프로필 수정 실패 ❌");
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <>
      <SubHeader bgColor="#fff" />
      <div style={{ background: "#fff", minHeight: "100vh", padding: "40px 0" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", background: "#fff", borderRadius: "12px", padding: "40px 60px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px" }}>프로필 수정하기</h2>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ marginRight: "20px" }}>
              <input type="radio" name="role" value="buyer" checked={role === "buyer"} onChange={(e) => setRole(e.target.value)} /> 구매자
            </label>
            <label>
              <input type="radio" name="role" value="seller" checked={role === "seller"} onChange={(e) => setRole(e.target.value)} /> 판매자
            </label>
          </div>

          <form style={{ display: "flex", flexDirection: "column", gap: "16px" }} onSubmit={handleSubmit}>
            <label>
              아이디
              <input type="text" name="id" value={form.id} onChange={handleChange} style={inputStyle} />
            </label>
            <label>
              비밀번호
              <input type="password" name="password" value={form.password} onChange={handleChange} style={inputStyle} />
            </label>
            <label>
              비밀번호 확인
              <input type="password" name="passwordCheck" value={form.passwordCheck} onChange={handleChange} style={inputStyle} />
            </label>
            <label>
              2차 비밀번호
              <input type="password" name="secondPassword" value={form.secondPassword} onChange={handleChange} style={inputStyle} placeholder="6자리 숫자" maxLength={6} />
            </label>
            <label>
              이름
              <input type="text" name="userName" value={form.userName} onChange={handleChange} style={inputStyle} />
            </label>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span>프로필 사진</span>
              <label htmlFor="profile-upload" style={uploadLabelStyle}>
                <img src={profileIcon} alt="프로필 업로드" style={{ width: "18px", height: "18px" }} /> 사진 업로드
              </label>
              <input id="profile-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
              {profileImage && (
                <>
                  <img src={profileImage} alt="미리보기" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                  <button type="button" onClick={handleImageRemove} style={removeBtnStyle}>삭제</button>
                </>
              )}
            </div>

            <label>
              성별
              <div>
                <label style={{ marginRight: "10px" }}>
                  <input type="radio" name="gender" value="MALE" checked={form.gender === "MALE"} onChange={handleChange} /> 남자
                </label>
                <label>
                  <input type="radio" name="gender" value="FEMALE" checked={form.gender === "FEMALE"} onChange={handleChange} /> 여자
                </label>
              </div>
            </label>

            <div style={{ display: "flex", gap: "10px" }}>
              <label style={{ flex: 1 }}>
                키
                <input type="number" name="tall" value={form.tall} onChange={handleChange} style={inputStyle} placeholder="cm" />
              </label>
              <label style={{ flex: 1 }}>
                몸무게
                <input type="number" name="weight" value={form.weight} onChange={handleChange} style={inputStyle} placeholder="kg" />
              </label>
            </div>

            <label>
              스토어 이름
              <input type="text" name="storeName" value={form.storeName} onChange={handleChange} style={inputStyle} disabled={role === "buyer"} />
            </label>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px" }}>
              <button type="submit" style={saveBtn}>수정하기</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const inputStyle = { display: "block", width: "100%", marginTop: "6px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" };
const uploadLabelStyle = { display: "flex", alignItems: "center", gap: "6px", border: "1px solid #aaa", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", fontSize: "14px", background: "#fff" };
const removeBtnStyle = { border: "1px solid #aaa", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", cursor: "pointer", background: "#fff" };
const saveBtn = { padding: "10px 20px", border: "none", borderRadius: "6px", background: "#535050", color: "#fff", cursor: "pointer" };
