import React from 'react';
import { View } from 'react-native';
import { HeaderLessCalendar } from '../../components/Calendar/HeaderLessCalendar';
import type { DateData } from 'react-native-calendars/src/types';
import { Colors } from '../../styles/Colors';
import { useMonthBoundaries } from '../../components/Calendar/hooks/useMonthBoundaries';
import { useDotDayContent } from '../../components/Calendar/hooks/useDotDayContent';
import { useMonthDatesWithTodos } from '../../components/Calendar/hooks/useMonthDatesWithTodos';

interface TodoCalendarProps {
	onSelectDay?: (date: DateData) => void;
}

const TodoCalendar: React.FC<TodoCalendarProps> = ({ onSelectDay }) => {
	const { currentMonth, dateSet } = useMonthDatesWithTodos({ page: 1, size: 200 });
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

export default TodoCalendar;
