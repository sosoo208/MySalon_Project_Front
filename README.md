# Fashion Commerce & Community Web App

쇼핑과 코디 커뮤니티를 하나의 흐름으로 연결한 패션 커머스 웹 서비스입니다.  
상품 탐색부터 구매, 리뷰, 코디 공유까지 사용자의 전반적인 패션 경험을 하나의 서비스 안에서 제공하는 것을 목표로 했습니다.

---

## 프로젝트 개요
- **프로젝트 형태**: 팀 프로젝트
- **기간**: (2025.09.05 - 2025.09.17)
- **역할**: Frontend (React)
- **목표**
  - 구매 중심의 커머스 기능과 커뮤니티 기능을 자연스럽게 결합
  - 사용자 활동(찜, 리뷰, 코디)이 이어지는 서비스 구조 설계

---

## 주요 사용자 흐름 (User Flow)
1. 회원가입 / 로그인
2. 상품 카테고리 탐색 → 상품 상세 → 장바구니 / 찜
3. 주문 완료 및 주문 내역 확인
4. 리뷰 작성 및 관리
5. 오늘의 코디 커뮤니티 참여 (게시글/댓글)
6. 마이페이지에서 활동 내역 관리

---

## 주요 기능

### 인증(Auth)
- 로그인 / 회원가입 / 회원가입 완료
- 인증 상태에 따른 페이지 접근 제어

### 커머스(Commerce)
- 상품 카테고리 및 상품 상세 조회
- 장바구니 및 찜 기능
- 주문 완료 및 주문 내역 확인

### 사용자 참여(Engagement)
- 리뷰 작성 / 수정 / 목록 조회
- 찜 목록 관리

### 커뮤니티(Community)
- 오늘의 코디 메인 피드 (캐러셀)
- 코디 게시글 등록
- 게시판 글 작성 / 상세 / 댓글

### 마이페이지(MyPage)
- 활동 내역 대시보드
- 프로필 정보 수정
- 주문/리뷰 관리

---

## 담당 역할
- React 기반 페이지 및 UI 컴포넌트 구현
- 라우팅 구조 설계 및 페이지 단위 분리
- 공통 컴포넌트 분리로 UI 재사용성 개선
- 사용자 흐름을 고려한 화면 전환 및 UX 구성
- 커뮤니티/커머스 페이지 구조 설계 및 구현

---

## 기술 스택
- **Frontend**: React, JavaScript
- **Routing**: React Router
- **Styling**: CSS / (사용 기술 작성)
- **Collaboration**: GitHub, Figma

---

## 프로젝트 구조 설명
- `src/routes/*`  
  페이지 단위 화면(Screen) 구성
- `src/components/*`  
  공통 UI 컴포넌트
- `src/api/*`  
  API 요청 모듈
- `src/hooks/*`  
  커스텀 훅
- `src/assets/*`  
  이미지 및 정적 리소스

## 페이지 라우팅 맵

### 메인 / 시작
- 메인 페이지: `src/components/ScrollContainer.jsx`
- 시작 페이지: `src/routes/Screen34/screens/Screen.jsx`
- 
---<img width="1687" height="1211" alt="스크린샷 2026-01-24 213900" src="https://github.com/user-attachments/assets/1dc174df-9437-458b-bd5a-5e1e19234a30" />

### 인증(Auth)
- 로그인 페이지: `src/routes/Screen113/screens/Screen.jsx`
- 회원가입 페이지: `src/routes/SignupPage/screens/Screen.jsx`
- 회원가입 완료 페이지: `src/routes/Screen120/screens/Screen.jsx`

### 커머스(Commerce)
- 상의 카테고리 페이지: `src/routes/Screen39/screens/Screen.jsx`
- 상품 상세(구매 버튼): `src/routes/Screen101/screens/Screen.jsx`
- 상품 상세(수정 버튼): `src/routes/Screen120/screens/Screen.jsx`
- 상품 상세(삭제 버튼): `src/routes/Screen126/screens/Screen.jsx`
- 장바구니 페이지: `src/routes/CartPage/screens/Screen.jsx`
- 주문 완료 페이지: `src/routes/Screen133/screens/Screen.jsx`
- 주문 내역 페이지: `src/routes/OrderHistory/screens/Screen.jsx`

<img width="2541" height="1381" alt="스크린샷 2026-01-24 214058" src="https://github.com/user-attachments/assets/3ee2f108-bf70-43ec-a0bb-8e5c4bb63547" />

### 마이페이지(MyPage)
- 마이페이지 대시보드: `src/routes/MyPage/screens/Screen.jsx`
- 찜 목록 페이지: `src/routes/WishlistPage/screens/Screen.jsx`
- 나의 리뷰 목록: `src/routes/Screen108/screens/Screen.jsx`
- 리뷰 작성 페이지: `src/routes/ReviewPage/screens/Screen.jsx`
- 리뷰 수정 페이지: `src/routes/Screen145/screens/Screen.jsx`
- 프로필 수정 페이지: `src/routes/Screen94/screens/Screen.jsx`

<img width="2513" height="1379" alt="스크린샷 2026-01-24 214110" src="https://github.com/user-attachments/assets/5e2b2fab-09b8-4bf6-ad98-c7957bc2a9ce" />

### 커뮤니티(Community)
- 오늘의 코디 메인: `src/routes/CommunityPage/screens/Screen.jsx`
- 코디 등록 페이지: `src/routes/Frame/screens/Frame.jsx`
- 게시판 목록: `src/routes/DivWrapper/screens/DivWrapper.jsx`
- 게시글 작성: `src/routes/Screen162/screens/Screen.jsx`
- 게시글 상세(댓글): `src/routes/Screen168/screens/Screen.jsx`

---

## 기술적 고민 & 해결

### 페이지 수 증가로 인한 구조 복잡도 문제
- **문제**: 화면 수가 많아지면서 파일 구조와 라우팅 관리가 어려워짐
- **해결**: 기능 도메인 기준으로 routes 구조를 분리하고 페이지 단위(Screen)로 정리
- **결과**: 신규 페이지 추가 및 수정 시 영향 범위를 최소화하고 유지보수성 향상

### UI 중복 코드 증가 문제
- **문제**: 버튼, 카드, 레이아웃 등 반복되는 UI 코드 증가
- **해결**: 공통 컴포넌트 분리 및 재사용 구조 설계
- **결과**: 코드 가독성 향상 및 UI 수정 시 작업 효율 개선

---

## 실행 방법
```bash
npm install
npm start

---

### 배운점
- 단순히 화면을 구현하는 것이 아니라 **사용자 흐름을 기준으로 기능을 설계하는 중요성**을 경험
- 커머스와 커뮤니티라는 서로 다른 도메인을 하나의 서비스로 연결하는 구조 설계 경험
- 규모가 있는 프론트엔드 프로젝트에서 **폴더 구조와 컴포넌트 설계가 유지보수에 미치는 영향**을 체감

