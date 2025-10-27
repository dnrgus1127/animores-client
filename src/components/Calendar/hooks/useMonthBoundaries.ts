import { useMemo } from 'react';
import { useCalendarDate } from '../CurrentContextProvider';
import { formatDateToString } from '../utils';

interface MonthBoundsOptions {
    baseDate?: Date;
}

interface MonthBounds {
    baseDate: Date;
    year: number;
    monthIndex: number; // 0-11
    startDate: Date;
    endDate: Date;
    start: string; // YYYY-MM-DD (month start)
    end: string; // YYYY-MM-DD (month end)
    currentMonth: string; // YYYY-MM-01
}

/**
 * @desc react-native-calendars 기반 캘린더에서 "현재 화면에 표시 중인 달"의 경계 정보를 제공합니다.
 * 내부적으로 캘린더 컨텍스트(`useCalendarDate`)를 사용해 현재 표시 달을 식별하며,
 * 해당 달의 시작/끝 Date와 YYYY-MM-DD 문자열(`start`, `end`, `currentMonth`)을 반환합니다.
 * @param {MonthBoundsOptions} options 기준 날짜 옵션(미지정 시 캘린더 컨텍스트 날짜 사용)
 * @returns {MonthBounds} 현재 표시 달의 연/월, 시작/끝 Date, YYYY-MM-DD 문자열 및 `currentMonth(YYYY-MM-01)`
 */
export function useMonthBoundaries(options?: MonthBoundsOptions): MonthBounds {
    const [contextDate] = useCalendarDate();
    const baseDate = options?.baseDate ?? contextDate;

    return useMemo(() => {
        const year = baseDate.getFullYear();
        const monthIndex = baseDate.getMonth();
        const startDate = new Date(year, monthIndex, 1);
        const endDate = new Date(year, monthIndex + 1, 0);
        const start = formatDateToString(startDate);
        const end = formatDateToString(endDate);
        const currentMonth = `${year}-${String(monthIndex + 1).padStart(2, '0')}-01`;
        return { baseDate, year, monthIndex, startDate, endDate, start, end, currentMonth };
    }, [baseDate.getFullYear(), baseDate.getMonth()]);
}


