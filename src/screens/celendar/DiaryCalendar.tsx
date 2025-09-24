import React, { useEffect } from 'react';
import { View } from 'react-native';
import { HeaderLessCalendar } from '../../components/Calendar/HeaderLessCalendar';
import type { DateData } from 'react-native-calendars/src/types';
import { useRecoilValue } from 'recoil';
import { CurrentProfileAtom } from '../../recoil/AuthAtom';
import { Colors } from '../../styles/Colors';
import { useMonthBoundaries } from '../../components/Calendar/hooks/useMonthBoundaries';
import { useDotDayContent } from '../../components/Calendar/hooks/useDotDayContent';
import { useDiaryCalendarDateSet } from '../../hooks/useDiaryCalendar';

interface DiaryCalendarProps {
	onSelectDay?: (date: DateData) => void;
}

const DiaryCalendar: React.FC<DiaryCalendarProps> = ({ onSelectDay }) => {
    const currentProfile = useRecoilValue(CurrentProfileAtom);
	const { currentMonth } = useMonthBoundaries();
	const {
		dateSet: diaryDateSet,
		data,
		isLoading,
		isError,
		error,
	} = useDiaryCalendarDateSet({
		profileId: currentProfile?.id ?? null,
		monthDate: currentMonth,
		enabled: !!currentProfile?.id,
		staleTimeMs: 60 * 1000,
	});

    useEffect(() => {
		console.log('[DiaryCalendar] fetch diary calendar', {
			profileId: currentProfile?.id,
			month: currentMonth,
			isLoading,
			isError,
			error: isError ? String(error) : undefined,
			data,
		});
	}, [currentProfile?.id, currentMonth, isLoading, isError, error, data]);

    const dayContent: (d: DateData) => React.ReactNode = useDotDayContent({
		dateSet: diaryDateSet,
		color: Colors.Pink,
		size: 6,
		marginTop: 2,
	});

    const handleSelectDay = (d: DateData) => {
		if (!diaryDateSet?.has(d.dateString)) return;
		onSelectDay?.(d);
	};

    return (
		<View style={{ flex: 1 }}>
			<HeaderLessCalendar currentMonth={currentMonth} onSelectDay={handleSelectDay} dayContent={dayContent} />
		</View>
	);
};

export default DiaryCalendar;
