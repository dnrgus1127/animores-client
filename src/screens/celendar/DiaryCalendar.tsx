import React, { useMemo } from 'react';
import { View } from 'react-native';
import { HeaderLessCalendar } from '../../components/Calendar/HeaderLessCalendar';
import { useCalendarDate } from '../../components/Calendar/CurrentContextProvider';
import type { DateData } from 'react-native-calendars/src/types';
import { useQuery } from '@tanstack/react-query';
import { DiaryService } from '../../service/DiaryService';
import { QueryKey } from '../../statics/constants/Querykey';
import { useRecoilValue } from 'recoil';
import { CurrentProfileAtom } from '../../recoil/AuthAtom';
import { Colors } from '../../styles/Colors';

interface DiaryCalendarProps {
    onSelectDay?: (date: DateData) => void;
}

const DiaryCalendar: React.FC<DiaryCalendarProps> = ({ onSelectDay }) => {
    const [date] = useCalendarDate();
    const currentProfile = useRecoilValue(CurrentProfileAtom);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const currentMonth = `${year}-${month}-01`;

    const { data: diaryDateSet } = useQuery({
        queryKey: [QueryKey.DIARY_CALENDAR, currentProfile?.id, currentMonth],
        queryFn: async () => {
            if (!currentProfile?.id) return new Set<string>();
            const data = await DiaryService.diary.calendar(currentProfile.id, currentMonth);
			const items = data.diaries ?? [];
            const set = new Set<string>();
            for (const item of items) {
                const d = new Date(item.createdAt);
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth() + 1).padStart(2, '0');
                const dd = String(d.getDate()).padStart(2, '0');
                set.add(`${yyyy}-${mm}-${dd}`);
            }
            return set;
        },
        staleTime: 1000 * 60,
        enabled: !!currentProfile?.id,
    });

    const dayContent = useMemo(() => {
        return (d: DateData) => {
            if (!diaryDateSet) return undefined;
            if (!diaryDateSet.has(d.dateString)) return undefined;
            return (
                <View
                    style={{
                        width: 6,
                        height: 6,
                        backgroundColor: Colors.Pink,
                        borderRadius: 3,
                        marginTop: 2,
                    }}
                />
            );
        };
    }, [diaryDateSet]);

    const handleSelectDay = (d: DateData) => {
        if (!diaryDateSet?.has(d.dateString)) return;
        onSelectDay?.(d);
    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderLessCalendar
                currentMonth={currentMonth}
                onSelectDay={handleSelectDay}
                dayContent={dayContent}
            />
        </View>
    );
};

export default DiaryCalendar;


