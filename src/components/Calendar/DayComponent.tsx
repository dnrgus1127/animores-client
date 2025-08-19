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
        props.state !== "disabled" && props.onDayPress(props.date);
    }

    // 스타일을 안전하게 결합
    const textStyles: TextStyle[] = [
        ...dayStyleList,
        { aspectRatio: 1, textAlign: "center" }
    ];

    return (
        <Pressable onPress={onPress} style={[{ flex: 1 }, styles.dayContainer]}>
            <Text style={textStyles}>
                {String(props.date?.day || '')}
            </Text>
            {props.content && (
                <View style={styles.contentContainer}>
                    {props.content}
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    dayContainer: {
        paddingLeft: 5,
        paddingTop: 3,
        alignItems: "center",
        flexDirection: "column",
        fontFamily: 'Pretendard-SemiBold',
    },
    contentContainer: {
        marginTop: 2,
        alignItems: "center",
        justifyContent: "center",
    },
});