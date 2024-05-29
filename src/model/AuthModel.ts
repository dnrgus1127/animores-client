export namespace AuthModel {
	export interface IVerificationModel {
	  	state: 'none' | 'dismatch' | 'timeout' | 'fail' | 'success';
	}
	export interface ILoginModel {
		email: string
		password: string
	}
}