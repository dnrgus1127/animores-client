import React, {useEffect, useState} from 'react';
import {Calendar} from "react-native-calendars";
import type {LayoutChangeEvent} from 'react-native'
import {Pressable, StyleSheet, Text, View} from "react-native";
import {DateData} from "react-native-calendars/src/types";
import {useCalendar} from "./hooks/useCalendars";
import {CalenderProps} from "./type";
import {renderCustomArrow, renderCustomHeader} from "./default";
import {CALENDAR_THEME} from "./style";
import {getDayStyle} from "./utils";
import {useCurrent} from "./CurrentContextProvider";

function DayComponent(props: CalenderProps.Day & { height: number, onDayPress: (date: DateData) => void }) {
    const dayStyleList = getDayStyle(props);

    const onPress = () => {
        props.state !== "disabled" && props.onDayPress(props.date);
    }

    return <Pressable onPress={onPress}
                      style={[{height: props.height, ...styles.dayContainer}]}>
        <Text style={[...dayStyleList, {aspectRatio: 1, textAlign: "center"}]}>{props.date?.day}</Text>
    </Pressable>
}

// 현재 날짜, 선택한 날짜 등을 업데이트 할 수 있는 컴포넌트
export function CalenderBase(props: CalenderProps.Base) {
    const {renderHeader, renderArrow} = props;
    const {markedDates, selectDay} = useCalendar();
    const [height, setHeight] = useState(0);
    const [value] = useCurrent();

    const handleLayout = (event: LayoutChangeEvent) => {
        setHeight(event.nativeEvent.layout.height);
    }

    return (
        <View onLayout={handleLayout} style={{height: "100%"}}>
            <Calendar
                initialDate={value}
                style={{height}}
                markedDates={markedDates}
                dayComponent={(props: CalenderProps.Day) => <DayComponent {...props} height={(height / 8)}
                                                                          onDayPress={selectDay}/>}
                showSixWeeks={true}
                renderHeader={renderHeader ?? renderCustomHeader}
                renderArrow={renderArrow ?? renderCustomArrow}
                // renderWeek={}
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
        flexDirection: "column"
    },
})

