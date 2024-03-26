export namespace AuthModel {
	export interface IVerificationModel {
	  	state: 'none' | 'dismatch' | 'fail' | 'success';
	}

	export interface IMobileCarrierModel {
		label: string;
		value: string;
	}
}