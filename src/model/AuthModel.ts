export namespace AuthModel {
	export interface IVerificationModel {
	  	state: 'none' | 'dismatch' | 'fail' | 'success';
	}
}