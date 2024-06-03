// src/service/AuthService.ts
import { AuthModel } from '../model/AuthModel';
import AxiosContext from '../screens/context/AxiosContext';

export const AuthService = {
	Auth: {
		login: async (email: string, password: string) => {
			const response = await AxiosContext.post<AuthModel.ILoginModel>(
				`/api/v1/account/sign-in`, { email, password });
			return response.data;
		},
		refreshToken: async (refreshToken: string) => {
			const response = await AxiosContext.post<AuthModel.ILoginResponseModel>(
				`/api/v1/account/refresh`, { refreshToken });
			return response.data;
		},
	},
};