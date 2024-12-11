// src/service/AuthService.ts
import { AuthModel } from '../model/AuthModel';
import AxiosContext from '../screens/context/AxiosContext';
import { AxiosResponse } from 'axios';

export const AuthService = {
	Auth: {
		login: async (email: string, password: string): Promise<AuthModel.ILoginResponseModel> => {
			const response: AuthModel.ILoginResponseModel = await AxiosContext.post<AuthModel.ILoginModel, AuthModel.ILoginResponseModel>(
				`/api/v1/account/sign-in`, { email, password });
			return response;
		},	
		refreshToken: async (refreshToken: string) => {
			const response = await AxiosContext.post<AuthModel.ILoginResponseModel>(
				`/api/v1/account/refresh`, { refreshToken });
			return response.data;
		},
		emailVerificationCode: async (email: string) => {
			const response = await AxiosContext.post<AuthModel.IEmailVerificationCodeModel>(
				`/api/v1/account/email-auth-create?email=${email}`, { email });
			return response.data;
		},
		verificationCodeCheck: async (code: string, email: string) => {
			const response = await AxiosContext.post<AuthModel.IResetPwModel>(
				`/api/v1/account/email-auth-verify?email=${email}&code=${code}`, { code, email });
			return response.data;
		},
		join: async (email: string, password: string, nickname: string, isAdPermission: boolean) => {
			const response = await AxiosContext.post<AuthModel.IJoinModel>(
				`/api/v1/account/sign-up`, { email, password, nickname, isAdPermission });
			return response.data;
		},
		setNewPassword: async () => {
			
		}
	},
};