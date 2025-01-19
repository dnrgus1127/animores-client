import {AxiosResponse} from "axios";

/**
 * PetProject 서버에서 데이터를 반환하는 형식
 */
interface CustomResponseType<T> {
    success: boolean,
    data: T,
    error: {
        code: string,
        message: string
    }
}

/**
 * @desc try catch 반복을 막기 위한 Higher Order Function
 * @template T 호출 성공 시 반환 될 데이터 타입 (서버 응답 기준 response.data.data 의 타입)
 * @param apiCall 호출할 api
 * @param errorValue 에러 발생 시 대신 전달할 데이터
 * @param errorMessage 에러 발생시 로그에 표시할 메시지
 */
export const apiHandler = async <T>(
    apiCall: () => Promise<AxiosResponse<CustomResponseType<T>>>,
    errorValue: T,
    errorMessage?: string
): Promise<T> => {
    try {
        const axiosResponse = await apiCall();

        // HTTP 상태 코드에 따른 응답 처리 (상태 코드 이상도 useQuery의 onSucees, onError로 잡을 수 있게 하기 위함.
        // 200: 성공, 201: 생성됨, 204: 내용 없음
        // 400: 잘못된 요청, 401: 인증 실패, 403: 권한 없음
        // 404: 찾을 수 없음, 500: 서버 에러
        switch (axiosResponse.status) {
            case 200:
            case 201:
                const response: CustomResponseType<T> = axiosResponse.data;
                return response.data;
            case 204:
                throw new Error('No Content');
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
        return errorValue;
    }
};