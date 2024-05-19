import AxiosContext from "../screens/context/AxiosContext";

// 일지
export namespace DiaryService {
	export const diary = {
		list: async ({ profileId = 1, page = 1, size = 5 }: { profileId?: number; page?: number; size?: number }) => {
			try {
				const response = await AxiosContext.get(`/api/v1/diaries?profileId=${profileId}&page=${page}&size=${size}`);
				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('DiaryService.diary.list:', error);
				return { data: null, status: error || 500 };
			}
		},
		create: async (profileId: number, content: string) => {
			try {
				const response = await AxiosContext.post(`/api/v1/diaries`, {
					request: {
						profileId,
						content,
					}
				});
				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('DiaryService.diary.create:', error);
				return { data: null, status: error || 500 };
			}
		},
		delete: async (diaryId: number) => {
			try {
				const response = await AxiosContext.delete(`/api/v1/diaries/${diaryId}`);

				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('DiaryService.diary.delete:', error);
				return { data: null, status: error || 500 };
			}
		}
	}
}