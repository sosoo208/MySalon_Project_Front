import React, { useState, useEffect } from "react";
import { SubHeader } from "../../components/SubHeader";
import profileIcon from "../../assets/icons/profile.png";
import { userApi } from "../../api/user/userApi";

export default function ProfileEdit() {
  const [role, setRole] = useState("buyer");
  const [profileImage, setProfileImage] = useState(null);
  const [form, setForm] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    name: "",
    height: "",
    weight: "",
    storeName: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);

  // 페이지 로드 시 로그인 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await userApi.getUserInfo();
        setForm({
          id: user.id || "",
          password: "",
          passwordCheck: "",
          name: user.userName || "",
          height: user.tall || "",
          weight: user.weight || "",
          storeName: user.storeName || "",
          gender: user.gender || "",
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

  // 이미지 업로드
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // 이미지 삭제
  const handleImageRemove = () => {
    setProfileImage(null);
    document.getElementById("profile-upload").value = "";
  };

  // 입력 값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id || !form.password || !form.passwordCheck || !form.name) {
      alert("필수 정보를 입력해 주세요.");
      return;
    }
    if (form.password !== form.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const payload = {
      id: form.id,
      password: form.password,
      userName: form.name,
      tall: form.height,
      weight: form.weight,
      storeName: form.storeName,
      gender: form.gender,
      type: role.toUpperCase(),
      profileImage,
    };

    try {
      await userApi.editUser(payload);
      alert("프로필이 수정되었습니다 ✅");
    } catch (err) {
      console.error(err);
      alert("프로필 수정 실패 ❌");
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <>
      <SubHeader bgColor="#fff" />
      <div style={{ background: "#fff", minHeight: "100vh", padding: "40px 0" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "12px",
            padding: "40px 60px",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px" }}>
            프로필 수정하기
          </h2>

          {/* 구매자 / 판매자 선택 */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ marginRight: "20px" }}>
              <input
                type="radio"
                name="role"
                value="buyer"
                checked={role === "buyer"}
                onChange={(e) => setRole(e.target.value)}
              />{" "}
              구매자
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="seller"
                checked={role === "seller"}
                onChange={(e) => setRole(e.target.value)}
              />{" "}
              판매자
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
              이름
              <input type="text" name="name" value={form.name} onChange={handleChange} style={inputStyle} />
            </label>

            {/* 프로필 사진 */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span>프로필 사진</span>
              <label htmlFor="profile-upload" style={uploadLabelStyle}>
                <img src={profileIcon} alt="프로필 업로드" style={{ width: "18px", height: "18px" }} />
                사진 업로드
              </label>
              <input id="profile-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
              {profileImage && (
                <>
                  <img src={profileImage} alt="미리보기" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                  <button type="button" onClick={handleImageRemove} style={removeBtnStyle}>
                    삭제
                  </button>
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
                <input type="number" name="height" value={form.height} onChange={handleChange} style={inputStyle} placeholder="cm" />
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
