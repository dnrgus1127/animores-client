// src/service/AuthService.ts
import AxiosContext from '../screens/context/AxiosContext';

export interface LoginResponse {
	data: {
		accessToken: string;
		refreshToken: string;
	}
	status: number;
}

export const AuthService = {
	Auth: {
		login: async (email: string, password: string) => {
			try {
				const response = await AxiosContext.post(`/api/v1/account/sign-in`, { email, password });
				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('AuthService.Auth.refreshToken:', error);
				return null;
			}
		},
		refreshToken: async (refreshToken: string): Promise<LoginResponse | null> => {
			try {
				const response = await AxiosContext.post(`/api/v1/account/refresh`, { refreshToken });
				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('AuthService.Auth.refreshToken:', error);
				return null;
			}
		},
	},
};