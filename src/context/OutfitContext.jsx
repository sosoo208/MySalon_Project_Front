import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// 로컬스토리지 키/버전
const STORAGE_KEY = "ootd_outfits";
const STORAGE_VER_KEY = "ootd_outfits_ver";
// mine 필드 도입 등 스키마 변경 시 올려주세요
const STORAGE_VERSION = 2;

// 초기 데이터 (seed)
const INITIAL_OUTFITS = [
  {
    id: 1,
    title: "후드+가디건 힙한 데님",
    category: "스트릿",
    image: "/ootd/female-street.jpg",
    username: "이가은",
    likes: 73,
    liked: true,
    mine: false,
    desc: "여름이라 이런이런 코디를 해봤어요. 가볍고 시원한 무드의 스트릿 코디!",
  },
  {
    id: 2,
    title: "베이지 가디건+플리츠 스커트",
    category: "데이트룩",
    image: "/ootd/female-date.jpg",
    username: "강소현",
    likes: 81,
    liked: true,
    mine: false,
    desc: "부드러운 베이지 톤으로 깔끔하게! 데이트에 잘 어울리는 감성.",
  },
  {
    id: 3,
    title: "카라니트+카고팬츠",
    category: "스트릿",
    image: "/ootd/male-hp.jpg",
    username: "임성현",
    likes: 65,
    liked: true,
    mine: false,
    desc: "카라 니트로 깔끔함, 카고 팬츠로 와이드 실루엣.",
  },
  {
    id: 4,
    title: "오버핏 반팔셔츠+와이드데님",
    category: "캠퍼스룩",
    image: "/ootd/male-casual.jpg",
    username: "최성윤",
    likes: 54,
    liked: true,
    mine: false,
    desc: "오버핏 셔츠로 편안한 캠퍼스 무드.",
  },
  {
    id: 5,
    title: "체크셔츠+데님",
    category: "캠퍼스룩",
    image: "/ootd/male-campus.jpg",
    username: "박시훈",
    likes: 48,
    liked: true,
    mine: false,
    desc: "체크 포인트로 캐주얼함 강조.",
  },
  {
    id: 6,
    title: "V넥 니트+블랙와이드",
    category: "미니멀",
    image: "/ootd/male-date.jpg",
    username: "김진열",
    likes: 59,
    liked: true,
    mine: false,
    desc: "톤다운 니트와 블랙 와이드로 미니멀.",
  },
  {
    id: 7,
    title: "브라운 톤온톤 셋업",
    category: "빈티지",
    image: "/ootd/female-basic.jpg",
    username: "국영규",
    likes: 44,
    liked: true,
    mine: false,
    desc: "브라운 톤온톤으로 빈티지 감성.",
  },
  {
    id: 8,
    title: "아이보리 자켓+라이트데님",
    category: "캐주얼",
    image: "/ootd/female-campus.jpg",
    username: "박은학",
    likes: 62,
    liked: true,
    mine: false,
    desc: "아이보리 톤으로 깨끗하고 산뜻하게!",
  },
];

const OutfitContext = createContext(null);

export function OutfitProvider({ children }) {
  const [outfits, setOutfits] = useState(() => {
    try {
      const ver = Number(localStorage.getItem(STORAGE_VER_KEY) || "0");
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved || ver !== STORAGE_VERSION) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_OUTFITS));
        localStorage.setItem(STORAGE_VER_KEY, String(STORAGE_VERSION));
        return INITIAL_OUTFITS;
      }
      const parsed = JSON.parse(saved);
      // 이전 버전 데이터 보강 (mine 없을 수 있음)
      const normalized = Array.isArray(parsed)
        ? parsed.map((o) => ({ mine: false, liked: !!o.liked, ...o }))
        : INITIAL_OUTFITS;
      return normalized;
    } catch {
      return INITIAL_OUTFITS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(outfits));
    localStorage.setItem(STORAGE_VER_KEY, String(STORAGE_VERSION));
  }, [outfits]);

  /** 좋아요 토글 */
  const toggleLike = (id) => {
    setOutfits((prev) =>
      prev.map((o) =>
        String(o.id) === String(id)
          ? { ...o, liked: !o.liked, likes: !o.liked ? o.likes + 1 : Math.max(0, o.likes - 1) }
          : o
      )
    );
  };

  /** 새 코디 추가 (하단에 노출되도록 likes 0) */
  const addOutfit = ({ title, category, username, image, desc }) => {
    const id = Date.now();
    const newItem = {
      id,
      title: title?.trim() || "제목 없음",
      category: category?.trim() || "기타",
      username: username?.trim() || "익명",
      image: image || "",
      desc: desc || "",
      likes: 0,
      liked: false,
      mine: true, // 내가 등록한 카드
    };
    // 정렬은 화면에서 likes 내림차순이므로 0 좋아요 → 하단에 위치
    setOutfits((prev) => [...prev, newItem]);
    return newItem;
  };

  /** 내가 등록한 코디 삭제 */
  const deleteOutfit = (id) => {
    setOutfits((prev) => prev.filter((o) => String(o.id) !== String(id)));
  };

  const value = useMemo(
    () => ({ outfits, setOutfits, toggleLike, addOutfit, deleteOutfit }),
    [outfits]
  );

  return <OutfitContext.Provider value={value}>{children}</OutfitContext.Provider>;
}

export function useOutfits() {
  const ctx = useContext(OutfitContext);
  if (!ctx) throw new Error("useOutfits must be used within OutfitProvider");
  return ctx;
}
