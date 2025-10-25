import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { DateData } from 'react-native-calendars/src/types';

interface DotDayContentOptions {
    dateSet: Set<string>;
    color?: string;
    size?: number;
    marginTop?: number;
}

/**
 * @desc 날짜 집합에 포함된 날에만 점(dot)을 렌더링하는 dayContent 함수를 제공합니다.
 * @param {DotDayContentOptions} options 점 렌더링 옵션
 * @returns {(d: DateData) => React.ReactNode | undefined} dayContent 렌더 함수
 */
export function useDotDayContent({ dateSet, color = '#FF4375', size = 6, marginTop = 2 }: DotDayContentOptions): (d: DateData) => React.ReactNode {
    return useMemo(() => {
        const renderDay: (d: DateData) => React.ReactNode = (d: DateData) => {
            if (!dateSet || !dateSet.has(d.dateString)) return null;
            return React.createElement(View as any, {
                style: {
                    width: size,
                    height: size,
                    backgroundColor: color,
                    borderRadius: size / 2,
                    marginTop,
                },
            });
        };
        return renderDay;
    }, [dateSet, color, size, marginTop]);
}


