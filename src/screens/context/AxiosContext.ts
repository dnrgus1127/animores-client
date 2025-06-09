import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
import { AuthService } from '../../service/AuthService';
import { EXPO_PUBLIC_BASE_URL } from '@env';

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
	async (config) => {
		const userToken = await AsyncStorage.getItem('userToken');
		if (userToken) {
			config.headers.Authorization = `Bearer ${userToken}`;
			// TODO 완전한 소셜 로그인 교체 후 삭제
			config.headers.userId = "13";
		} else {
			config.headers.userId = "13";
		}
		console.log('AxiosContext.interceptors.request:', config);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

//응답 인터셉터
instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (isAxiosError(error)) {
			console.log(error.code);
		}
		const originRequest = error.config;
		console.log('AxiosContext.interceptors.response:', error);
		// if (error.response.status === 401 && !originRequest._retry) {
		// 	originRequest._retry = true;

		// 	originRequest.headers.userId = "13";
			
		// 	return instance(originRequest);
		// }
	}
)

export default instance;

