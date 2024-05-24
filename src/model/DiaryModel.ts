export namespace DiaryModel {
	export interface IDiaryTotalModel {
		data: {
			data: {
			  diaries: IDiaryModel
			  totalCount: number
			},
		  },
	}

	export interface IDiaryModel {
		commentCount: number
		content: string
		createdAt: string
		diaryId: number
		imageUrl?: string
		media: Array<string>
		name: string
		profileId: number
		likeYn: boolean
	}
}