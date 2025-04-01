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
		commentCount: string
		content: string
		createdAt: string
		diaryId: number
		imageUrl?: string
		media: Array<string>
		name: string
		profileId: number
		likeYn: boolean
	}

	export interface IDiaryCommentModel {
		commentId: number
		content: string
		createdAt: string
		profileId: number
		name: string
		imageUrl: string
		replyCount: number
	}

	export interface IDiaryReplyModel {
		replyId: number
		content: string
		createdAt: string
		profileId: number
		name: string
		imageUrl: string
	}
}