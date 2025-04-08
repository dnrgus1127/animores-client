import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, Pressable, StyleProp, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../styles/Colors";
import { ArrowButton } from "../button/Button";
import { useCalendarDate } from "./CurrentContextProvider";
const { height } = Dimensions.get('window');  // 화면의 높이

enum PickerType {
    Day = 1,
    Month,
    Year
}

interface DropDownHeaderProps {
    styles?: StyleProp<any>;
}

interface MonthPicker {
    year: number;
    month: number;
    type: PickerType;
    onPress: (data: number) => void;
}

const getDateString = (pickerType: PickerType, year: number, month: number) => {
    switch (pickerType) {
        case PickerType.Day:
            return `${year}년 ${month}월`;
        case PickerType.Month:
            return `${year}년`;
        case PickerType.Year:
            return `${year - 7}년 ~ ${year + 4}년`;
    }
};

export const CalendarDropDownHeader: React.FC<DropDownHeaderProps> = ({ styles }) => {
    const [selectedDate, setSelectedDate] = useCalendarDate();
    const [year, setYear] = useState<number>(selectedDate.getFullYear());
    const [month, setMonth] = useState<number>(selectedDate.getMonth() + 1);
    const [pickerType, setPickerType] = useState<PickerType>(PickerType.Day);

    const dateString = useMemo(() => getDateString(pickerType, year, month), [pickerType, month, year]);

    useEffect(() => {
        setSelectedDate(`${year}-${month}`);
    }, [month]);

    const onPressItem = (data: number) => {
        if (pickerType === PickerType.Year) {
            setYear(data);
        } else if (pickerType === PickerType.Month) {
            setMonth(data);
            setSelectedDate(`${year}-${data}`);
        }
        setPickerType((state: PickerType) => state - 1);
    };

    const onPressArrow = (type: "left" | "right") => {
        setMonth((prevMonth: number) => {
            const newMonth = type === "left" ? (prevMonth === 1 ? 12 : prevMonth - 1) : (prevMonth === 12 ? 1 : prevMonth + 1);
            if (newMonth === 12 && type === "left") setYear((prevYear: number) => prevYear - 1);
            if (newMonth === 1 && type === "right") setYear((prevYear: number) => prevYear + 1);
            return newMonth;
        });
    };

    return <View style={[dropDownHeaderStyles.container, styles]}>
        <ArrowButton direction="left" onPress={() => onPressArrow("left")} />
        <Pressable onPress={() => setPickerType(state => state < PickerType.Year ? state + 1 : state)}>
            <Text style={dropDownHeaderStyles.text}>{dateString}</Text>
        </Pressable>
        <ArrowButton direction="right" onPress={() => onPressArrow("right")} />
        <DatePickerBody year={year} month={month} type={pickerType} onPress={onPressItem} />
        {pickerType !== PickerType.Day && <Pressable onPress={() => setPickerType(PickerType.Day)} style={overlayStyles.overlay}></Pressable>}
    </View>;
};

const DatePickerBody: React.FC<MonthPicker> = ({ year, month, type, onPress }) => {
    const itemList = useMemo(() => {
        switch (type) {
            case PickerType.Day:
                return [];
            case PickerType.Month:
                return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            case PickerType.Year:
                return Array.from({ length: 12 }, (_, idx) => year - 7 + idx);
        }
    }, [type, year]);

    if (type === PickerType.Day) return null;
    return <View style={dropDownHeaderStyles.monthPicker}>
        {itemList.map((item) => {
            const isCurrent = type === PickerType.Month ? (month === item) : (year === item);

            return <TouchableOpacity key={item} style={dropDownHeaderStyles.box} onPress={() => {
                onPress(item);
            }}>
                <Text style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "400",
                    ...(isCurrent && { color: Colors.Pink, fontWeight: 600 })
                }}>{item}{type === PickerType.Year ? "년" : "월"}</Text>

            </TouchableOpacity>;
        })}
    </View>;
};

const dropDownHeaderStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        alignItems: "center",
        borderColor: Colors.LightGery,
        borderBottomWidth: 1,
        zIndex: 1,
        position: "relative",
        top: 0,
        left: 0,
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20
    },
    monthPicker: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "space-between",
        flexWrap: 'wrap',
        alignItems: "center",
        top: "100%",
        left: 0,
        width: "100%",
        aspectRatio: 1.18,
        minHeight: "100%",
        borderColor: Colors.LightGery,
        backgroundColor: Colors.White,
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
        padding: 10,
        zIndex: 3
    },
    box: {
        width: "32%",
        alignItems: "center",
        justifyContent: "center",
        aspectRatio: 1.618,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.Gray838383 + "aa",
    }
});

const overlayStyles = StyleSheet.create({
    overlay: {
        position: "absolute",
        backgroundColor: Colors.DarkGrey,
        opacity: 0.3,
        height: height,
        width: "100%",
        top: "100%",
        left: 0,
        zIndex: 2
    }
}); 
