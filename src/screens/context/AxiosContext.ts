import { EXPO_PUBLIC_BASE_URL } from "@env";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import { auth } from "../../service/firebase";

// Axios 인스턴스 생성
const instance = axios.create({
  timeout: 20000,
  withCredentials: false,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: EXPO_PUBLIC_BASE_URL,
} as AxiosRequestConfig);

//요청 인터셉터
instance.interceptors.request.use(
  async config => {
    // 로그인 되어 있는 경우 Firebase Token 추가
    try {
      const firebaseToken = await auth().currentUser?.getIdToken();
      if (firebaseToken) {
        config.headers.Authorization = `Bearer ${firebaseToken}`;
      }
    } catch (error) {
      // Firebase 토큰 획득 실패 (극히 드문 예외 상황)
      // - 사용자가 삭제됨 (백엔드에서 삭제)
      // - Refresh Token 만료 (매우 드뭄)
      // - 네트워크 오류로 토큰 갱신 실패
      console.error('[AxiosContext] Firebase 토큰 획득 실패:', error);
      // 토큰 없이 요청 계속 진행 (백엔드에서 401 처리)
    }

    return config;
  },
  error => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

//응답 인터셉터
instance.interceptors.response.use(
  response => {
    console.log("Response Success:", response.status, response.config.url);
    return response;
  },
  async error => {
    console.log("=== Response Error Details ===");

    if (isAxiosError(error)) {
      console.log("Error Code:", error.code);
      console.log("Error Message:", error.message);
      console.log("Error Status:", error.response?.status);
      console.log("Error Data:", error.response?.data);
      console.log("Request Config:", error.config);
    }

    // 네트워크 에러인지 HTTP 에러인지 구분
    if (error.code === "ERR_NETWORK") {
      console.log("🚨 NETWORK ERROR - 서버 연결 불가");
    } else if (error.response) {
      console.log("🚨 HTTP ERROR - 서버 응답 에러");
    } else {
      console.log("🚨 UNKNOWN ERROR - 알 수 없는 에러");
    }

    return Promise.reject(error);
  }
);

export default instance;
