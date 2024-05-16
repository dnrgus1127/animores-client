import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzpVU0VSIiwiaXNzIjoia2FuZ21vIiwiaWF0IjoxNzE1ODQ4MDk0LCJleHAiOjE3MTU5MzQ0OTR9.QKWQb0wfrEYQNaP3Wc9rXCa8oLTjrOUbsLJFg0grEKOheGlJw4VeZNTUv-WSC5jtP5BenaZUVq_HsKljNaiO-w'

// Axios 인스턴스 생성
const instance = axios.create({
	timeout: 20000,
	withCredentials: false,
	responseType: 'json',
	headers: {
		Authorization: `Bearer ${token}`, 
		Accept: 'application/json',
	},
	baseURL: 'http://loadbalancer-e8b18c32a70f207a.elb.ap-northeast-2.amazonaws.com:8080',
} as AxiosRequestConfig);

instance.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default instance;