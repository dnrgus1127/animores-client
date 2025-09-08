import { useQuery } from '@tanstack/react-query';
import { DiaryService } from '../service/DiaryService';
import { QueryKey } from '../statics/constants/Querykey';
import { DiaryModel } from '../model/DiaryModel';
import { IApiResponse } from '../service/type';

/**
 * 다이어리 캘린더 조회 훅 옵션
 *
 * - profileId: 조회할 프로필 id (enable 조건으로도 사용)
 * - monthDate: 조회 대상 월의 시작일(YYYY-MM-01 형식 권장)
 * - enabled: 쿼리 동작 여부 토글
 * - staleTimeMs: 데이터 신선도 유지 시간(ms)
 */
export interface UseDiaryCalendarOptions {
    profileId?: number | null;
    monthDate: string; // YYYY-MM-01 형식 권장
    enabled?: boolean;
    staleTimeMs?: number;
}

/**
 * @desc 지정한 프로필과 월에 대한 다이어리 캘린더 데이터를 조회합니다.
 * @param {UseDiaryCalendarOptions} options 훅 동작 옵션
 * @returns {import('@tanstack/react-query').UseQueryResult<DiaryModel.IDiaryCalendarData, unknown>} React Query 결과 객체
 */
export function useDiaryCalendar({ profileId, monthDate, enabled = true, staleTimeMs = 60 * 1000 }: UseDiaryCalendarOptions) {
    const initial = { totalCount: 0, diaries: [] } as DiaryModel.IDiaryCalendarData;
    return useQuery<DiaryModel.IDiaryCalendarData, unknown, DiaryModel.IDiaryCalendarData>({
        queryKey: [QueryKey.DIARY_CALENDAR, profileId, monthDate],
        queryFn: async () => {
            const data = await DiaryService.diary.calendar(profileId as number, monthDate);
            return data;
        },
        select: (resp) => resp ?? initial,
        enabled: enabled && Boolean(profileId && monthDate),
        staleTime: staleTimeMs,
        initialData: initial,
    });
}

/**
 * @desc 다이어리 캘린더 데이터로부터 작성일(YYYY-MM-DD) 집합을 생성합니다.
 * @param {UseDiaryCalendarOptions} options 훅 동작 옵션
 * @returns {{ dateSet: Set<string> } & import('@tanstack/react-query').UseQueryResult<DiaryModel.IDiaryCalendarData, unknown>} 날짜 집합과 쿼리 결과
 */
export function useDiaryCalendarDateSet(options: UseDiaryCalendarOptions) {
    const query = useDiaryCalendar(options);
    const set = new Set<string>();
    const items = query.data?.diaries ?? [];
    for (const item of items) {
        const d = new Date(item.createdAt);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        set.add(`${yyyy}-${mm}-${dd}`);
    }
    return { ...query, dateSet: set } as const;
}
