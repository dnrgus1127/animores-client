## 실행 가이드 (Expo / 로컬 개발 빌드)

이 문서는 프로젝트 실행에 필요한 민감정보 파일 위치와 실행 명령을 요약합니다. 프로젝트 소개 등 일반 설명은 이후 차수에 보강합니다.

### 필수 민감정보 파일과 위치

- **.env**: 루트 디렉터리 `./.env`

  - `env.example`를 복사해 생성 후 값을 채웁니다.
  - 예시: `cp env.example .env`

- **google-services.json**: 루트 디렉터리 `./google-services.json`

  - Android용 Firebase 설정 파일
  - Expo 동적 구성(app.config.js)에서 루트 경로를 참조합니다.

- **GoogleService-Info.plist**: 루트 디렉터리 `./GoogleService-Info.plist`
  - iOS용 Firebase 설정 파일
  - Expo 동적 구성(app.config.js)에서 루트 경로를 참조합니다.

위 파일들은 git에 포함되지 않습니다. 프로젝트 관리자에게 별도로 전달받아 위 위치에 배치하세요.

### 환경 변수(.env)

- 루트에 `.env` 생성 후 값 입력
- 키 목록은 `env.example` 참고
- 코드 사용 예시:

```ts
import { EXPO_PUBLIC_BASE_URL } from '@env';
```

또는 동적 구성에서 주입된 값은 다음처럼 접근할 수 있습니다:

```ts
import Constants from 'expo-constants';
const { IMAGE_BASE_URL } = Constants.expoConfig?.extra ?? {};
```

### 설치

```bash
npm install
```

### Expo Go로 실행 (제한 있음)

Firebase/네이티브 로그인 모듈은 Expo Go에서 동작 제한이 있을 수 있습니다. 간단 확인용으로만 사용하세요.

```bash
npx expo start -c
# 터미널에서: i (iOS Simulator) / a (Android Emulator) / QR 코드 스캔
```

### Development Build 실행 (권장)

네이티브 모듈(google-signin, kakao-login, firebase 등)을 사용하므로 개발 빌드로 실행하는 것을 권장합니다.

- **iOS**

```bash
npx expo run:ios
```

- **Android**

```bash
npx expo run:android
```

필요 시 네이티브 동기화/재생성:

```bash
npx expo prebuild
```

### 유용한 명령

- 캐시 초기화 후 실행: `npx expo start -c`
- 동적 구성 확인: `npx expo config --type public`
- Android 그레이들 정리: `(cd android && ./gradlew clean)`
- iOS Pods 설치: `(cd ios && pod install)` 또는 `npx pod-install`

### 주의사항

- `.env`, `google-services.json`, `GoogleService-Info.plist`는 형상관리되지 않습니다. 분실 방지를 위해 사내 보안 채널(예: 비밀관리 금고)을 통해 공유/보관하세요.
