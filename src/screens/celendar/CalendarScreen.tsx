import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultDayOfWeek } from '../../components/Calendar/base';
import { CalendarDropDownHeader } from "../../components/Calendar/CalendarHeaders";
import { CurrentContextProvider } from "../../components/Calendar/CurrentContextProvider";
import { HeaderLessCalendar } from "../../components/Calendar/HeaderLessCalendar";
import { convertCalendarDateToKorean } from '../../components/Calendar/utils';
import { SlideUpModal } from '../../components/modal/SlideUpModal';
import { Colors } from '../../styles/Colors';
import ToDoCardList from '../todo/ToDoCardList';
import { CalendarToggle } from './CalendarToggle';

const CalendarScreen = () => {
    const [selectedTab, setSelectedTab] = useState<'todo' | 'diary'>('todo');
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const date = selectedDay ? new Date(selectedDay) : null;

    // 예시 dayContent 함수 - red view로 부모 크기 채우기
    const renderDayContent = (date: any) => {
        return (
            <View style={{
                width: 10,
                height: 4,
                backgroundColor: 'red',
                borderRadius: 2,
                marginTop: 2
            }} />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CurrentContextProvider>
                <CalendarDropDownHeader styles={{ paddingVertical: 20 }} />
                <CalendarToggle
                    style={{ padding: 15 }}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                />
                <View style={{ flex: 1 }}>
                    <DefaultDayOfWeek />
                    <HeaderLessCalendar 
                        currentMonth={"2025-03"} 
                        onSelectDay={(date) => setSelectedDay(date.dateString)}
                        dayContent={selectedTab === 'diary' ? renderDayContent : undefined}
                    />
                </View>

                <SlideUpModal
                    isVisible={selectedDay !== null}
                    onClose={() => setSelectedDay(null)}
                    contentHeight={70}
                >
                    <View style={{ alignSelf: "flex-start", paddingHorizontal: 20 }}>
                        <Text style={styles.dateText}>{convertCalendarDateToKorean({
                            month: date ? date.getMonth() + 1 : undefined,
                            day: date?.getDate(),
                            weekDay: date?.getDay()
                        })}</Text>
                    </View>
                    <ToDoCardList pets={[]} setTodoIdToDelete={() => { }} />
                </SlideUpModal>
            </CurrentContextProvider>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    dateText: {
        fontSize: 34,
        fontWeight: '600',
        fontFamily: 'Pretendard-SemiBold',
        color: Colors.Gray717171,
    },
});

export default CalendarScreen;