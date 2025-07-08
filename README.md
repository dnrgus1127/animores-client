# PetMilly - 반려동물 관리 앱 화면 구조

## 📱 프로젝트 개요
PetMilly는 React Native + Expo로 개발된 반려동물 관리 모바일 애플리케이션입니다.

### 🛠 주요 기술 스택
- **Framework**: React Native 0.74.5 + Expo ~51.0.39
- **Navigation**: React Navigation v6 (Stack, Bottom Tab)
- **State Management**: Recoil, Redux Toolkit, Jotai
- **Data Fetching**: React Query (TanStack Query)
- **Authentication**: Firebase Auth, Google Sign-In, Kakao Login
- **UI/Styling**: Styled Components, React Native SVG
- **Form Management**: React Hook Form
- **Additional**: TypeScript, Lottie Animations

## 🏗 전체 앱 구조

### 네비게이션 계층
```
App.tsx
├── RecoilRoot
├── QueryClientProvider
└── NavigationContainer
    └── FullStackNavigation
        ├── AuthStackNavigation (인증된 사용자)
        └── 비인증 화면들
```

### 인증 플로우
```
비인증 상태 → 로그인 → 프로필 선택 → 메인 앱
```

## 📋 화면 구조 상세

### 🔐 인증 관련 화면 (`src/screens/auth/`)
- **LoginScreen**: 로그인 화면 (구글, 카카오 소셜 로그인 포함)
- **JoinScreen**: 회원가입 화면
- **AgreementOnTerms**: 약관 동의 화면
- **JoinCompleted**: 회원가입 완료 화면

### 🏠 메인 화면 (`src/screens/home/`)
- **HomeScreen**: 홈 대시보드
- **TodayTodoItem**: 오늘의 할일 아이템
- **TodoSwiper**: 할일 스와이퍼 컴포넌트
- **AvatarSwiper**: 아바타 스와이퍼 컴포넌트

### ✅ 할일 관리 (`src/screens/todo/`)
- **ToDoScreen**: 전체 할일 목록 화면
- **AddTodo**: 할일 추가 화면 (상세한 설정 포함)
- **ToDoCard**: 할일 카드 컴포넌트
- **modal/**: 할일 관련 모달들

### 📅 캘린더 (`src/screens/celendar/`)
- **CalendarScreen**: 캘린더 메인 화면

### 📖 다이어리 (`src/screens/diary/`)
- **DiaryScreen**: 다이어리 메인 화면
- **CreateDiary**: 다이어리 작성 화면
- **AddComment**: 댓글 추가
- **CommentList**: 댓글 목록

### 👤 마이페이지 (`src/screens/myPage/`)

#### 프로필 관리 (`profile/`)
- **ProfilesScreen**: 프로필 목록 화면
- **CreateProfile**: 프로필 생성
- **EditProfile**: 프로필 편집
- **ProfileManagementScreen**: 프로필 관리 메인

#### 반려동물 관리 (`petManagement/`)
- **PetManagementHome**: 펫 관리 홈
- **AddPet**: 반려동물 추가
- **PetType**: 동물 종류 선택
- **BreedType**: 품종 선택
- **PetInfoScreen**: 반려동물 정보 화면
- **Profile**: 펫 프로필
- **PetImagePicker**: 펫 이미지 선택
- **AutoComplete**: 자동완성 컴포넌트

#### 설정 및 기타
- **MypageScreen**: 마이페이지 메인
- **alert/AlertSettingScreen**: 알림 설정
- **customerService/CustomerServiceScreen**: 고객서비스
- **information/InformationScreen**: 정보
- **notice/NoticeScreen**: 공지사항
- **password/**: 비밀번호 관리
  - **UserVerification**: 사용자 인증
  - **ResetPassword**: 비밀번호 재설정
  - **NewPassword**: 새 비밀번호 설정

## 🗂 바텀 탭 네비게이션

메인 앱의 하단 탭 구조:
1. **Todo** (`AllTodo`) - 할일 관리
2. **Calendar** - 캘린더
3. **Home** - 홈 (중앙)
4. **Diary** - 다이어리
5. **Mypage** - 마이페이지

## 🧩 주요 컴포넌트 (`src/components/`)

### 공통 컴포넌트
- **Input/**: 다양한 입력 컴포넌트들
- **button/**: 버튼 컴포넌트들
- **form/**: 폼 관련 컴포넌트들
- **modal/**: 모달 컴포넌트들
- **text/**: 텍스트 컴포넌트들
- **Calendar/**: 캘린더 관련 컴포넌트들

### 기본 컴포넌트
- **BasicInput**: 기본 입력 필드
- **BasicCheckbox**: 체크박스
- **Dialog**: 다이얼로그
- **Countdown**: 카운트다운 타이머

## 🎨 UI/UX 특징

### 디자인 시스템
- **컬러 스킴**: 핑크 계열 (#E84178)을 메인으로 사용
- **네비게이션**: 헤더 숨김 처리로 풀스크린 경험
- **탭바**: 커스텀 TabBar 컴포넌트 사용
- **애니메이션**: Lottie 애니메이션 적용

### 접근성
- Safe Area Context 적용
- 모든 화면에서 일관된 스타일링
- 제스처 핸들러 지원

## 🔧 상태 관리 구조

### 전역 상태
- **Recoil**: 주요 앱 상태 관리
- **Redux Toolkit**: 복잡한 상태 로직
- **Jotai**: 원자적 상태 관리

### 로컬 상태
- **React Hook Form**: 폼 상태 관리
- **React Query**: 서버 상태 관리 및 캐싱

## 📁 폴더 구조 요약

```
src/
├── navigation/           # 네비게이션 설정
├── screens/             # 화면 컴포넌트들
│   ├── auth/           # 인증 관련
│   ├── home/           # 홈 화면
│   ├── todo/           # 할일 관리
│   ├── diary/          # 다이어리
│   ├── celendar/       # 캘린더
│   └── myPage/         # 마이페이지
├── components/          # 재사용 가능한 컴포넌트
├── hooks/              # 커스텀 훅
├── service/            # API 서비스
├── recoil/             # Recoil 상태 관리
├── utils/              # 유틸리티 함수
├── styles/             # 스타일 관련
├── statics/            # 상수 및 정적 데이터
├── assets/             # 이미지, 폰트 등 자산
└── types/              # TypeScript 타입 정의
```

## 🚀 주요 기능

1. **반려동물 프로필 관리**: 여러 반려동물 등록 및 관리
2. **일정 관리**: 할일과 캘린더를 통한 스케줄 관리
3. **다이어리**: 반려동물과의 추억 기록
4. **소셜 로그인**: 구글, 카카오 간편 로그인
5. **알림 시스템**: 할일 및 일정 알림
6. **사용자 설정**: 프로필, 비밀번호, 알림 등 개인화 설정

이 앱은 반려동물을 키우는 사용자들이 체계적으로 반려동물을 관리하고, 추억을 기록할 수 있도록 도와주는 종합적인 펫케어 솔루션입니다.