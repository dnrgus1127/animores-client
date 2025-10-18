import React, { useMemo } from 'react';
import { View } from 'react-native';
import { HeaderLessCalendar } from '../../components/Calendar/HeaderLessCalendar';
import type { DateData } from 'react-native-calendars/src/types';
import { useRecoilValue } from 'recoil';
import { CurrentProfileAtom } from '../../recoil/AuthAtom';
import { Colors } from '../../styles/Colors';
import { useMonthBoundaries } from '../../components/Calendar/hooks/useMonthBoundaries';
import { useDotDayContent } from '../../components/Calendar/hooks/useDotDayContent';
import { useMonthDiaryList, createDateSetFromDiaries } from '../../hooks/useDiaryList';

interface DiaryCalendarProps {
	onSelectDay?: (date: DateData) => void;
}

const DiaryCalendar: React.FC<DiaryCalendarProps> = ({ onSelectDay }) => {
    const currentProfile = useRecoilValue(CurrentProfileAtom);
	const { currentMonth } = useMonthBoundaries();

	const { data: diaries } = useMonthDiaryList({
		profileId: currentProfile?.id ?? null,
		monthInput: currentMonth,
		enabled: !!currentProfile?.id,
		staleTimeMs: 60 * 1000,
	});

	const dateSet = useMemo(() => createDateSetFromDiaries(diaries ?? []), [diaries]);

    const dayContent: (d: DateData) => React.ReactNode = useDotDayContent({
		dateSet,
		color: Colors.Pink,
		size: 6,
		marginTop: 2,
	});

    const handleSelectDay = (d: DateData) => {
		if (!dateSet?.has(d.dateString)) return;
		onSelectDay?.(d);
	};

    return (
		<View style={{ flex: 1 }}>
			<HeaderLessCalendar currentMonth={currentMonth} onSelectDay={handleSelectDay} dayContent={dayContent} />
		</View>
	);
};

export default DiaryCalendar;
