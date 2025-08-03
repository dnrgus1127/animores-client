import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultDayOfWeek } from '../../components/Calendar/base';
import { CalendarDropDownHeader } from "../../components/Calendar/CalendarHeaders";
import { CurrentContextProvider } from "../../components/Calendar/CurrentContextProvider";
import { HeaderLessCalendar } from "../../components/Calendar/HeaderLessCalendar";
import { CalendarToggle } from './CalendarToggle';
import { SlideUpModal } from '../../components/modal/SlideUpModal';
import { convertCalendarDateToKorean } from '../../components/Calendar/utils';
import { Colors } from '../../styles/Colors';
import { FlatList } from 'react-native-gesture-handler';
import { IToDo } from '../../../types/ToDo';
import ToDoCard from '../todo/ToDoCard';

const CalendarScreen = () => {
    const [selectedTab, setSelectedTab] = useState<'todo' | 'diary'>('todo');
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const date = selectedDay ? new Date(selectedDay) : null;

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
                    <Pressable onPress={() => setSelectedDay("2025-04-22")}><Text>123</Text></Pressable>
                    <HeaderLessCalendar currentMonth={"2025-03"} />
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
                    <FlatList<IToDo>
                        style={{ flex: 1, width: "100%" }}
                        // TODO MOCK DATA 제거
                        contentContainerStyle={{
                            alignContent: "center",
                            position: "relative",

                        }}
                        data={[{ id: 1, title: 'test', pets: [{ id: 1, name: 'test' }], isAllDay: false, date: '2025-04-22', time: '12:00', isUsingAlarm: false, color: '#000000', completeProfileImage: null, completeDateTime: null },
                        { id: 2, title: 'test2', pets: [{ id: 2, name: 'test2' }], isAllDay: false, date: '2025-04-22', time: '12:00', isUsingAlarm: false, color: '#000000', completeProfileImage: null, completeDateTime: null }] as IToDo[]}
                        renderItem={({ item }) => (
                            <ToDoCard
                                todo={item}
                                onDelete={() => { }}
                                // style={{ width: "50%" }}
                            />
                        )}
                        keyExtractor={(item) => `todo-${item.id}`}
                    />
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