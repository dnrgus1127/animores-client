import {useState} from "react";
import {DateData, MarkedDates} from "react-native-calendars/src/types";

export function useCalendar() {
    const [selectedDates, setSelectedDates] = useState<MarkedDates>({
        '2025-03-19': {selected: true}
    });

    const selectDay = (date: DateData) => {
        setSelectedDates({[date.dateString]: {selected: true}});
    }

    return {
        markedDates: selectedDates,
        selectDay
    }
}