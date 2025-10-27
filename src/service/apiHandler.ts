import {AxiosResponse} from "axios";
import { IApiResponse } from './type';

// 공용 응답 타입은 `IApiResponse<T>`를 사용합니다.

/**
 * @desc try catch 반복을 막기 위한 Higher Order Function
 * @template T 호출 성공 시 반환 될 데이터 타입 (서버 응답 기준 response.data.data 의 타입)
 * @param apiCall 호출할 api
 * @param errorMessage 에러 발생시 로그에 표시할 메시지
 */
export const apiHandler = async <T>(
	apiCall: () => Promise<AxiosResponse<IApiResponse<T>>>,
	errorMessage?: string
): Promise<T> => {
	try {
		const axiosResponse = await apiCall();

		// HTTP 상태 코드에 따른 응답 처리
		// 에러 발생 시 throw하여 React Query의 onError에서 처리 가능하도록 함
		switch (axiosResponse.status) {
			case 200:
			case 201:
				const response: IApiResponse<T> = axiosResponse.data;
				return response.data;
			case 204:
				// No Content는 정상 응답 (DELETE, PUT 등에서 사용)
				return null as T;
			case 400:
				throw new Error('Bad Request');
			case 401:
				throw new Error('Unauthorized');
			case 403:
				throw new Error('Forbidden');
			case 404:
				throw new Error('Not Found');
			case 500:
				throw new Error('Internal Server Error');
			default:
				throw new Error(`Unknown Error: ${axiosResponse.status}`);
		}
	} catch (error) {
		if (errorMessage) {
			console.error(errorMessage, error);
		}
		// 에러를 다시 throw하여 호출부(React Query)에서 처리
		throw error;
	}
};