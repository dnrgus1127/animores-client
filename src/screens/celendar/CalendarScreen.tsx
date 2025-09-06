import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultDayOfWeek } from '../../components/Calendar/base';
import { CalendarDropDownHeader } from '../../components/Calendar/CalendarHeaders';
import { CurrentContextProvider } from '../../components/Calendar/CurrentContextProvider';
import { convertCalendarDateToKorean } from '../../components/Calendar/utils';
import { SlideUpModal } from '../../components/modal/SlideUpModal';
import { Colors } from '../../styles/Colors';
import ToDoCardList from '../todo/ToDoCardList';
import { CalendarToggle } from './CalendarToggle';
import DiaryCalendar from './DiaryCalendar';
import TodoCalendar from './TodoCalendar';

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
                    {selectedTab === 'diary' ? (
                        <DiaryCalendar onSelectDay={date => setSelectedDay(date.dateString)} />
                    ) : (
                        <TodoCalendar onSelectDay={date => setSelectedDay(date.dateString)} />
                    )}
                </View>

                <SlideUpModal
                    isVisible={selectedDay !== null}
                    onClose={() => setSelectedDay(null)}
                    contentHeight={70}
                >
                    <View style={{ alignSelf: 'flex-start', paddingHorizontal: 20 }}>
                        <Text style={styles.dateText}>
                            {convertCalendarDateToKorean({
                                month: date ? date.getMonth() + 1 : undefined,
                                day: date?.getDate(),
                                weekDay: date?.getDay(),
                            })}
                        </Text>
                    </View>
                    {selectedTab === 'todo' ? (
                        <ToDoCardList pets={[]} setTodoIdToDelete={() => {}} />
                    ) : (
                        <View style={{ padding: 20 }}>
                            <Text>해당 날짜의 일지 목록을 노출할 영역</Text>
                        </View>
                    )}
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