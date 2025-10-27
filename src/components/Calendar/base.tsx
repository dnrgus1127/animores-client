// TODO 파일 이름 고민중
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { LeftArrow } from "../../assets/svg/component/LeftArrow";
import { RightArrow } from "../../assets/svg/component/RightArrow";
import { CalenderDirection } from "./type";
import { Colors } from '../../styles/Colors';

const DefaultHeader: React.FC<{ date: Date }> = ({ date }) => {
    return <View>
        <Text>{date.getFullYear()}년 {date.getMonth() + 1}월</Text>
    </View>
}

const DefaultDirectionArrow: React.FC<{ direction: CalenderDirection }> = ({ direction }) => {
    if (direction === "right") {
        return <View><RightArrow /></View>
    } else {
        return <View><LeftArrow /></View>
    }
}

export const DefaultDayOfWeek = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <View style={styles.container}>
            {days.map((day, index) => (
                <View key={day} style={styles.dayContainer}>
                    <Text style={[
                        styles.text,
                        index === 0 && styles.sunday,
                    ]}>
                        {day}
                    </Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: Colors.White
    },
    dayContainer: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        color: Colors.TextColor,
        fontSize: 14,
        fontFamily: 'Pretendard-SemiBold',
    },
    sunday: {
        color: Colors.TextRed
    },
});

export const renderCustomHeader = (date: Date) => <DefaultHeader date={date} />
export const renderCustomArrow = (direction: CalenderDirection) => <DefaultDirectionArrow direction={direction} />