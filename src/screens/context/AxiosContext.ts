import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { AuthService } from '../../service/AuthService';

// Axios 인스턴스 생성
const instance = axios.create({
	timeout: 20000,
	withCredentials: false,
	responseType: 'json',
	headers: {
		Accept: 'application/json',
	},
	baseURL: 'http://loadbalancer-e8b18c32a70f207a.elb.ap-northeast-2.amazonaws.com:8080',
} as AxiosRequestConfig);

//요청 인터셉터
instance.interceptors.request.use(
	async (config) => {
		const accessToken = await AsyncStorage.getItem('accessToken');
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
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
		const originRequest = error.config;

		if (error.response.status === 401 && !originRequest._retry) {
			originRequest._retry = true;

			const refreshToken = await AsyncStorage.getItem('refreshToken');

			if (refreshToken) {
				const response = AuthService.Auth.refreshToken(refreshToken);

				if (response) {
					const { accessToken } = response.data;

					await AsyncStorage.setItem('accessToken', accessToken);
					originRequest.headers.Authorization = `Bearer ${accessToken}`;

					return instance(originRequest);
				}
			}
		}

		return Promise.reject(error);
	}
)

export default instance;