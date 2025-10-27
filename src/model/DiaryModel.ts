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

	// 캘린더 API 관련 타입들
	export interface IDiaryCalendarItem {
		diaryId: number
		content: string
		createdAt: string
		profileId: number
		name: string
		imageUrl: string
	}

	export interface IDiaryCalendarData {
		totalCount: number
		diaries: IDiaryCalendarItem[]
	}

	export interface IDiaryCalendarResponse {
		success: boolean
		data: IDiaryCalendarData
		error: {
			code: string
			message: string
		}
	}
}