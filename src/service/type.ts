export interface IApiError {
    code: string;
    message: string;
}

export interface IApiResponse<T> {
    success: boolean;
    data: T;
    error?: IApiError;
}


