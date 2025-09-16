// src/context/BoardContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

/** 로컬스토리지 키 & 버전 */
const STORAGE_KEY = "board_posts";
const STORAGE_VER_KEY = "board_posts_version";
/** ⬇️ 시드/스키마 변경 시 버전 올리기 */
const STORAGE_VERSION = 6;

/** base 경로(배포대응) */
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

/** 상대 시각 포맷 */
const rel = (ts) => {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
};

/** 초기 데이터(시드) — createdAt 포함 */
const now = Date.now();
const INITIAL_POSTS = [
  {
    id: "1",
    title: "이 옷에 어울리는 바지 추천해주세요!",
    author: "홍길동",
    createdAt: now - 1 * 60 * 60 * 1000, // 1시간 전
    time: "1시간 전",
    image: `${BASE}board/toptop.jpg`, // 흰 셔츠
    comments: [
      { id: 1, author: "홍길동", text: "검정 슬랙스 좋아보여요!" },
      { id: 2, author: "유저A", text: "저는 청 바지 추천해요!" },
      { id: 3, author: "김철수", text: "버뮤다 바지도 괜찮을 듯 합니다." },
    ],
    content:
      "사진같은 상의를 구매했는데 어떤 옷이랑 코디하면 좋을지 모르겠어요. 코디 추천 부탁드립니다.",
  },
  {
    id: "2",
    title: "여름에 입기 좋은 아우터 추천좀요",
    author: "유저A",
    createdAt: now - 2 * 60 * 60 * 1000, // 2시간 전
    time: "2시간 전",
    image: "",
    comments: [{ id: 1, author: "홍길동", text: "베이지 추천!" }],
    content: "라이트 자켓 고민 중인데 추천 부탁드려요!",
  },
  {
    id: "3",
    title: "면접용 정장 코디 피드백 부탁드려요",
    author: "김철수",
    createdAt: now - 3 * 60 * 60 * 1000, // 3시간 전
    time: "3시간 전",
    image: `${BASE}board/suit.jpg`, // 정장
    comments: [
      { id: 1, author: "유저A", text: "타이 컬러 포인트 굿" },
      { id: 2, author: "홍길동", text: "구두는 브라운 톤도 좋아요" },
    ],
    content: "정장 코디가 너무 무난한지 피드백 부탁드립니다.",
  },
];

const BoardContext = createContext(null);

export function BoardProvider({ children }) {
  // 초기 로드: 저장된 버전 확인 → 다르면 시드로 리셋
  const [posts, setPosts] = useState(() => {
    try {
      const savedVer = Number(localStorage.getItem(STORAGE_VER_KEY) || "0");
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved || savedVer !== STORAGE_VERSION) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
        localStorage.setItem(STORAGE_VER_KEY, String(STORAGE_VERSION));
        return INITIAL_POSTS;
      }
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) throw new Error("invalid data");

      // createdAt 누락된 예전 데이터 대비
      return parsed.map((p) =>
        typeof p.createdAt === "number" ? p : { ...p, createdAt: Date.now() }
      );
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
      localStorage.setItem(STORAGE_VER_KEY, String(STORAGE_VERSION));
      return INITIAL_POSTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    localStorage.setItem(STORAGE_VER_KEY, String(STORAGE_VERSION));
  }, [posts]);

  /** 게시글 단건 조회 */
  const getPostById = (id) => posts.find((p) => String(p.id) === String(id));

  /** 새 글 추가 → 항상 상단(최신) */
  const addPost = ({ title, author, content, image }) => {
    const createdAt = Date.now();
    const newPost = {
      id: String(createdAt), // 유니크
      title: title?.trim() || "제목 없음",
      author: author?.trim() || "익명",
      createdAt,
      time: "방금 전",
      image: image || "",
      comments: [],
      content: content || "",
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost; // 필요 시 newPost.id 사용
  };

  /** 게시글 수정 */
  const updatePost = (postId, patch) => {
    setPosts((prev) =>
      prev.map((p) => (String(p.id) === String(postId) ? { ...p, ...patch } : p))
    );
  };

  /** 게시글 삭제 */
  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => String(p.id) !== String(postId)));
  };

  /** 댓글 추가/수정/삭제 */
  const addComment = (postId, author, text) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (String(p.id) !== String(postId)) return p;
        const nextId = p.comments.length
          ? Math.max(...p.comments.map((c) => c.id)) + 1
          : 1;
        return { ...p, comments: [...p.comments, { id: nextId, author, text }] };
      })
    );
  };

  const editComment = (postId, commentId, nextText) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (String(p.id) !== String(postId)) return p;
        return {
          ...p,
          comments: p.comments.map((c) =>
            c.id === commentId ? { ...c, text: nextText } : c
          ),
        };
      })
    );
  };

  const deleteComment = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (String(p.id) !== String(postId)) return p;
        return { ...p, comments: p.comments.filter((c) => c.id !== commentId) };
      })
    );
  };

  /** 초기 데이터로 리셋 */
  const resetBoardData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
    localStorage.setItem(STORAGE_VER_KEY, String(STORAGE_VERSION));
    setPosts(INITIAL_POSTS);
  };

  /** 목록은 항상 최신순으로 제공 */
  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
    [posts]
  );

  const value = useMemo(
    () => ({
      posts: sortedPosts,   // 정렬된 뷰
      rawPosts: posts,      // 원본 배열이 필요하면 사용
      setPosts,

      // post
      getPostById,
      addPost,
      updatePost,
      deletePost,

      // comment
      addComment,
      editComment,
      deleteComment,

      // utils
      resetBoardData,
      rel,
      BASE,
    }),
    [sortedPosts, posts]
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be used within a BoardProvider");
  return ctx;
}
