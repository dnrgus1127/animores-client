import React from "react";
import { Pressable, StyleSheet, Text, View, TextStyle } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import { CalenderProps } from "./type";
import { getDayStyle } from "./utils";

interface DayComponentProps extends CalenderProps.Day {
    onDayPress: (date: DateData) => void;
    content?: React.ReactNode;
}

export function DayComponent(props: DayComponentProps) {
    const dayStyleList = getDayStyle(props);

    const onPress = () => {
        props.state !== 'disabled' && props.onDayPress(props.date);
    };

    // 텍스트/배경 스타일 분리 적용을 위한 병합
    const mergedStyle: TextStyle = Object.assign({}, ...dayStyleList);
    const circleBackgroundColor = (mergedStyle.backgroundColor as string) || 'transparent';
    const textColor = (mergedStyle.color as string) || '#000000';
    const fontWeight = (mergedStyle.fontWeight as TextStyle['fontWeight']) || undefined;

    return (
        <Pressable onPress={onPress} style={[{ flex: 1 }, styles.dayContainer]}>
            <View style={[styles.dayCircle, { backgroundColor: circleBackgroundColor }]}>
                <Text style={[styles.dayText, { color: textColor, fontWeight }]}>
                    {String(props.date?.day || '')}
                </Text>
            </View>
            {props.content && <View style={styles.contentContainer}>{props.content}</View>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    dayContainer: {
        paddingLeft: 5,
        paddingTop: 3,
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'Pretendard-SemiBold',
    },
    dayCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        textAlign: 'center',
        includeFontPadding: false,
    },
    contentContainer: {
        marginTop: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});