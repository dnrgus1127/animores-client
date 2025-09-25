import React, { useMemo } from 'react';
import { View } from 'react-native';
import { HeaderLessCalendar } from '../../components/Calendar/HeaderLessCalendar';
import type { DateData } from 'react-native-calendars/src/types';
import { Colors } from '../../styles/Colors';
import { useDotDayContent } from '../../components/Calendar/hooks/useDotDayContent';
import { useMonthPeriodTodoList } from '../../hooks/useTodoList';
import { useMonthBoundaries } from '../../components/Calendar/hooks/useMonthBoundaries';
import { createDateSetFromTodos } from '../../js/util';

interface TodoCalendarProps {
	onSelectDay?: (date: DateData) => void;
}

const TodoCalendar: React.FC<TodoCalendarProps> = ({ onSelectDay }) => {
	const { currentMonth } = useMonthBoundaries();
	const query = useMonthPeriodTodoList({
		monthInput: currentMonth,
		page: 0,
		size: 5,
	});

	const dateSet = useMemo(() => createDateSetFromTodos(query.data ?? []), [query.data]);

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
