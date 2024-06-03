export namespace AuthModel {
	export interface IVerificationModel {
		state: 'none' | 'dismatch' | 'timeout' | 'fail' | 'success';
	}
	export interface ILoginModel {
		email: string
		password: string
	}

	export interface ILoginResponseModel {
		data: {
			accessToken: string;
			refreshToken: string;
			userId: number;
			expirationHours: string;
			success: boolean;
		};
		status: number;
	}
}