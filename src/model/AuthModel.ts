export namespace AuthModel {
	export interface IEmailModel {
		state: 'none' | 'fail' | 'success';
	}
	export interface IVerificationModel {
		state: 'none' | 'dismatch' | 'timeout' | 'fail' | 'success';
	}
	export interface INicknameModel {
		state: 'none' | 'fail' | 'success';
	}
	export interface ILoginModel {
		email: string
		password: string
	}
	export interface IResetPwModel {
		code: string
		email: string
	}
	export interface ILoginResponseModel {
		data : {
			data: {
				accessToken: string;
				refreshToken: string;
				userId: number;
				expirationHours: string;
			};
			success : boolean;
		}
	}

	export interface IEmailVerificationCodeModel {
		email: string
	}

	export interface IJoinModel {
		email: string;
		password: string;
		nickname: string;
		isAdPermission: boolean;
	}
}