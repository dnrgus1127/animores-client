import {useQuery} from '@tanstack/react-query';
import {DiaryService} from '../service/DiaryService';
import {QueryKey} from '../statics/constants/Querykey';
import {DiaryModel} from '../model/DiaryModel';
import {useMemo} from 'react';
import {calculateMonthBoundaries} from '../js/util';

/**
 * 일지 목록 조회 훅 옵션
 */
export interface UseDiaryListOptions {
    profileId?: number | null;
    page?: number;
    size?: number;
    enabled?: boolean;
    staleTimeMs?: number;
}

/**
 * @desc 전체 일지 목록을 조회합니다.
 */
export function useDiaryList({
    profileId,
    page = 1,
    size = 100,
    enabled = true,
    staleTimeMs = 60 * 1000
}: UseDiaryListOptions) {
    return useQuery({
        queryKey: [QueryKey.DIARY_LIST, profileId, page, size],
        queryFn: async () => {
            if (!profileId) return { data: null, status: 400 };
            const response = await DiaryService.diary.list(profileId, page, size);
            return response;
        },
        enabled: enabled && Boolean(profileId),
        staleTime: staleTimeMs,
        select: (response) => {
            if (response?.data?.data?.diaries) {
                return response.data.data.diaries as DiaryModel.IDiaryModel[];
            }
            return [];
        }
    });
}

/**
 * 월별 일지 목록 조회 훅 옵션
 */
export interface UseMonthDiaryListOptions extends Omit<UseDiaryListOptions, 'page' | 'size'> {
    monthInput: number | string | Date;
}

/**
 * @desc 지정한 월에 대한 일지 목록을 조회합니다.
 */
export function useMonthDiaryList({
    monthInput,
    profileId,
    enabled = true,
    staleTimeMs = 60 * 1000
}: UseMonthDiaryListOptions) {
    return useQuery({
        queryKey: [QueryKey.DIARY_LIST, 'month', profileId, monthInput],
        queryFn: async () => {
            console.log(profileId);
            if (!profileId) return { data: null, status: 400 };
            return await DiaryService.diary.list(profileId, 1, 100);
        },
        enabled: enabled && Boolean(profileId),
        staleTime: staleTimeMs,
        select: (response) => {
            if (response?.data?.data?.diaries) {
                const diaries = response.data.data.diaries as DiaryModel.IDiaryModel[];
                // 월별 필터링
                try {
                    const { start, end } = calculateMonthBoundaries(monthInput);
                    const startDate = new Date(start);
                    const endDate = new Date(end);

                    return diaries.filter(diary => {
                        const diaryDate = new Date(diary.createdAt);
                        return diaryDate >= startDate && diaryDate <= endDate;
                    });
                } catch (error) {
                    console.error('useMonthDiaryList: Failed to calculate month boundaries', error);
                    return diaries;
                }
            }
            return [];
        }
    });
}

/**
 * @desc DiaryModel.IDiaryModel 배열로부터 날짜(YYYY-MM-DD) 집합을 생성합니다.
 */
export function createDateSetFromDiaries(diaries: DiaryModel.IDiaryModel[]): Set<string> {
    const set = new Set<string>();
    for (const diary of diaries ?? []) {
        if (diary?.createdAt) {
            const diaryDate = new Date(diary.createdAt);
            const yyyy = diaryDate.getFullYear();
            const mm = String(diaryDate.getMonth() + 1).padStart(2, '0');
            const dd = String(diaryDate.getDate()).padStart(2, '0');
            set.add(`${yyyy}-${mm}-${dd}`);
        }
    }
    return set;
}

/**
 * 날짜별 일지 목록 조회 훅 옵션
 */
export interface UseDiaryListByDateOptions {
    profileId?: number | null;
    date: string; // YYYY-MM-DD
    enabled?: boolean;
    staleTimeMs?: number;
}

/**
 * @desc 특정 날짜의 일지 목록을 필터링하여 반환합니다.
 *
 * @remarks
 * 현재는 기간별 일지 조회 API가 미구현 상태로, 월별 일지 목록을 조회한 후
 * 클라이언트에서 필터링하는 임시 구현입니다.
 * 향후 기간별 조회 API 구현 시 이 훅만 수정하면 됩니다.
 */
export function useDiaryListByDate({
    profileId,
    date,
    enabled = true,
    staleTimeMs = 60 * 1000
}: UseDiaryListByDateOptions) {
    // 날짜에서 월 정보 추출
    const monthInput = useMemo(() => {
        if (!date) return '';
        return date.substring(0, 7); // YYYY-MM
    }, [date]);

    const { data: monthDiaries, isLoading, isError, error } = useMonthDiaryList({
        profileId,
        monthInput,
        enabled,
        staleTimeMs
    });

    const filteredDiaries = useMemo(() => {
        if (!monthDiaries || !date) return [];

        return monthDiaries.filter(diary => {
            const diaryDate = new Date(diary.createdAt);
            const yyyy = diaryDate.getFullYear();
            const mm = String(diaryDate.getMonth() + 1).padStart(2, '0');
            const dd = String(diaryDate.getDate()).padStart(2, '0');
            const formattedDate = `${yyyy}-${mm}-${dd}`;

            return formattedDate === date;
        });
    }, [monthDiaries, date]);

    return {
        diaries: filteredDiaries,
        isLoading,
        isError,
        error
    };
}
