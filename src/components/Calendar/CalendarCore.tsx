import React, { useEffect, useState } from 'react';
import { Calendar } from "react-native-calendars";
import type { LayoutChangeEvent } from 'react-native'
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import { useCalendar } from "./hooks/useCalendars";
import { CalenderProps } from "./type";
import { renderCustomArrow, renderCustomHeader } from "./base";
import { CALENDAR_THEME } from "./style";
import { formatDateToString, getDayStyle } from "./utils";
import { useCalendarDate } from "./CurrentContextProvider";
import { Colors } from '../../styles/Colors';

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

    // 날짜 선택 시 selectDay와 onSelectDay를 모두 실행
    const handleDayPress = (date: DateData) => {
        selectDay(date);
        if (onSelectDay) onSelectDay(date);
    };

    return (
        <View onLayout={handleLayout} style={{ flex: 1 }}>
            <Calendar
                initialDate={formatDateToString(value)}
                markedDates={markedDates}
                style={{ height: "100%" }}
                dayComponent={(props: CalenderProps.Day) => <DayComponent {...props} onDayPress={handleDayPress} />}
                showSixWeeks={true}
                // renderHeader={renderHeader ?? renderCustomHeader}
                // renderArrow={renderArrow ?? renderCustomArrow}
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

