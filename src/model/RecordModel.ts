export namespace RecordModel {
	export interface IRecordTotalModel {
		data: {
			data: {
			  diaries: IRecordModel
			  totalCount: number
			},
		  },
	}

	export interface IRecordModel {
		commentCount: number
		content: string
		createdAt: string
		diaryId: number
		imageUrl?: string
		media: Array<string>
		name: string
		profileId: number
		wishYn: boolean
	}
}