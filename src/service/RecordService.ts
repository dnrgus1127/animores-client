import AxiosContext from "../screens/context/AxiosContext";

export namespace RecordService {
	export const Record = {
		list: async ({ page = 1, size = 15 }: { page?: number; size?: number }) => {
			try {
				const response = await AxiosContext.get(`/api/v1/diaries?page=${page}&size=${size}`);
				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('RecordService.Record.list:', error);
				return { data: null, status: error || 500 };
			}
		},
	}
}