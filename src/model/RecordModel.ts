export namespace RecordModel {
	export interface IRecordModel {
		commentCount: number;
		content: string;
		createdAt: string;
		diaryId: number;
		imageUrl?: string;
		media: Array<string>;
		name: string;
		profileId: number;
		wishYn: boolean;
	}
}