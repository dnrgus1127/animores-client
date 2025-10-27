/**
 * @desc 투두 API 관련 타입 정의
 * 
 * 규칙: API 메서드 파라미터가 3개 이상인 경우에만 인터페이스로 정의
 * - 1-2개 파라미터: 인라인 타입 사용 (예: id: number, page: number, size: number)
 * - 3개 이상 파라미터: 인터페이스 정의하여 타입 안정성 및 가독성 향상
 */

import type { IApiResponse } from '../../type';
import type { TodoOverview } from '../../../../types/ToDo';

// API 응답 타입들
export type TodoOverviewResponse = IApiResponse<TodoOverview[]>;

/**
 * @desc 투두 목록 조회 파라미터 (4개 파라미터)
 */
export interface TodoListParams {
    /** 완료 여부 필터 */
    done?: boolean | null;
    /** 펫 ID 배열 */
    pets?: number[];
    /** 페이지 번호 */
    page: number;
    /** 페이지 크기 */
    size: number;
}

/**
 * @desc 기간별 투두 목록 조회 파라미터 (5개 파라미터)
 */
export interface PeriodTodoListParams {
	/** 시작 날짜 (YYYY-MM-DD) */
	start?: string;
	/** 종료 날짜 (YYYY-MM-DD) */
	end?: string;
	/** 완료 여부 필터 */
	completed?: boolean;
	/** 페이지 번호 (기본값: 0) */
	page?: number;
	/** 페이지 크기 (기본값: 20) */
	size?: number;
}
