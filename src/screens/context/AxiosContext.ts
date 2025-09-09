import { EXPO_PUBLIC_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
	timeout: 20000,
	withCredentials: false,
	responseType: 'json',
	headers: {
		'Content-Type': 'application/json',
	},
	baseURL: EXPO_PUBLIC_BASE_URL,
} as AxiosRequestConfig);

//요청 인터셉터
instance.interceptors.request.use(
	async config => {
		const userToken = await AsyncStorage.getItem('userToken');

		// userId 헤더 설정 (동적으로)
		config.headers.userId = '13';

		if (userToken) {
			config.headers.Authorization = `Bearer ${userToken}`;
		}

		// 디버깅: 실제 전송되는 헤더 확인
		console.log('Request Headers:', config.headers);
		console.log('Request URL:', (config.baseURL || '') + (config.url || ''));

		return config;
	},
	error => {
		console.error('Request Interceptor Error:', error);
		return Promise.reject(error);
	}
);

//응답 인터셉터
instance.interceptors.response.use(
	response => {
		console.log('Response Success:', response.status, response.config.url);
		return response;
	},
	async error => {
		console.log('=== Response Error Details ===');

		if (isAxiosError(error)) {
			console.log('Error Code:', error.code);
			console.log('Error Message:', error.message);
			console.log('Error Status:', error.response?.status);
			console.log('Error Data:', error.response?.data);
			console.log('Request Config:', error.config);
		}

		// 네트워크 에러인지 HTTP 에러인지 구분
		if (error.code === 'ERR_NETWORK') {
			console.log('🚨 NETWORK ERROR - 서버 연결 불가');
		} else if (error.response) {
			console.log('🚨 HTTP ERROR - 서버 응답 에러');
		} else {
			console.log('🚨 UNKNOWN ERROR - 알 수 없는 에러');
		}

		return Promise.reject(error);
	}
);

export default instance;
