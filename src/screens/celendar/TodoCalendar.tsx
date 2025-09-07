import React, { useMemo } from 'react';
import { View } from 'react-native';
import { HeaderLessCalendar } from '../../components/Calendar/HeaderLessCalendar';
import { useCalendarDate } from '../../components/Calendar/CurrentContextProvider';
import type { DateData } from 'react-native-calendars/src/types';
import { usePeriodTodoList } from '../../hooks/useTodoList';
import { Colors } from '../../styles/Colors';
import { formatDateToString } from '../../components/Calendar/utils';

interface TodoCalendarProps {
    onSelectDay?: (date: DateData) => void;
}

const TodoCalendar: React.FC<TodoCalendarProps> = ({ onSelectDay }) => {
    const [date] = useCalendarDate();
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);
    const start = formatDateToString(startDate); // YYYY-MM-DD
    const end = formatDateToString(endDate); // YYYY-MM-DD

    const { data: periodTodos } = usePeriodTodoList(start, end, undefined, 1, 200);
    
    const daysWithTodos = useMemo(() => {
        const set = new Set<string>();
        if (!periodTodos) return set;
        for (const item of periodTodos) {
            set.add(item.date);
        }
        return set;
    }, [periodTodos]);

    const dayContent = useMemo(() => {
        return (d: DateData) => {
            if (!daysWithTodos.has(d.dateString)) return undefined;
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
    }, [daysWithTodos]);

    const handleSelectDay = (d: DateData) => {
        if (!daysWithTodos.has(d.dateString)) return;
        onSelectDay?.(d);
    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderLessCalendar
                currentMonth={start}
                onSelectDay={handleSelectDay}
                dayContent={dayContent}
            />
        </View>
    );
};

export default TodoCalendar;


