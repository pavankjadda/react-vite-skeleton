export interface FetchBaseQueryErrorType {
    status?: string,
    originalStatus?: number
    data?: string,
    error?: string,
}

export const isFetchBaseQueryErrorType = function (error: any): error is FetchBaseQueryErrorType {
    return error !== undefined && 'originalStatus' in error;
};
