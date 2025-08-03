import React, { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import { renderCustomHeader } from "./base";
import { useCalendarDate } from "./CurrentContextProvider";
import { useCalendar } from "./hooks/useCalendars";
import { CALENDAR_THEME } from "./style";
import { CalenderProps } from "./type";
import { formatDateToString, getDayStyle } from "./utils";

function DayComponent(props: CalenderProps.Day & { onDayPress: (date: DateData) => void }) {
    const dayStyleList = getDayStyle(props);

    const onPress = () => {
        props.state !== "disabled" && props.onDayPress(props.date);
    }

    return <Pressable onPress={onPress}
        style={[{ flex: 1, ...styles.dayContainer }]}>
        <Text style={[...dayStyleList, { aspectRatio: 1, textAlign: "center" }]}>{props.date?.day}</Text>
    </Pressable>
}

// 현재 날짜, 선택한 날짜 등을 업데이트 할 수 있는 컴포넌트
export function CalenderBase(props: CalenderProps.Base) {
    const { renderHeader, renderArrow, onSelectDay } = props;
    const { markedDates, selectDay } = useCalendar();
    const [height, setHeight] = useState(0);
    const [value] = useCalendarDate();

    const handleLayout = (event: LayoutChangeEvent) => {
        setHeight(event.nativeEvent.layout.height);
    }

    // onSelectDay prop이 있으면 그것을 사용하고, 없으면 기존의 selectDay 사용
    const handleDayPress = onSelectDay || selectDay;

    return (
        <View onLayout={handleLayout} style={{ flex: 1 }}>
            <Calendar
                initialDate={formatDateToString(value)}
                markedDates={markedDates}
                style={{ height: "100%" }}
                dayComponent={(props: CalenderProps.Day) => <DayComponent {...props} onDayPress={handleDayPress} />}
                showSixWeeks={true}
                customHeader={renderHeader ?? renderCustomHeader}
                hideDayNames={true}
                theme={CALENDAR_THEME}
            ></Calendar>
        </View>
    )
}

const styles = StyleSheet.create({
    dayContainer: {
        paddingLeft: 5,
        paddingTop: 3,
        alignItems: "center",
        flexDirection: "column",
        fontFamily: 'Pretendard-SemiBold',
    },
})

