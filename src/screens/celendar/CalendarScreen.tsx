import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { DefaultDayOfWeek } from '../../components/Calendar/base';
import { CalendarDropDownHeader } from '../../components/Calendar/CalendarHeaders';
import { CurrentContextProvider } from '../../components/Calendar/CurrentContextProvider';
import { convertCalendarDateToKorean } from '../../components/Calendar/utils';
import { SlideUpModal } from '../../components/modal/SlideUpModal';
import { Colors } from '../../styles/Colors';
import { CurrentProfileAtom } from '../../recoil/AuthAtom';
import TodoListByDate from '../todo/TodoListByDate';
import { CalendarToggle } from './CalendarToggle';
import DiaryCalendar from './DiaryCalendar';
import DiaryListByDate from './DiaryListByDate';
import TodoCalendar from './TodoCalendar';

const CalendarScreen = () => {
    const [selectedTab, setSelectedTab] = useState<'todo' | 'diary'>('todo');
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const currentProfile = useRecoilValue(CurrentProfileAtom);

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

                {/* Todo 모달 */}
                <SlideUpModal
                    isVisible={selectedTab === 'todo' && selectedDay !== null}
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
                    {selectedDay && <TodoListByDate date={selectedDay} />}
                </SlideUpModal>

                {/* Diary 모달 */}
                <SlideUpModal
                    isVisible={selectedTab === 'diary' && selectedDay !== null}
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
                    {selectedDay && currentProfile?.id && (
                        <DiaryListByDate profileId={currentProfile.id} date={selectedDay} />
                    )}
                </SlideUpModal>
            </CurrentContextProvider>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Pretendard-SemiBold',
        color: Colors.Gray717171,
    },
});

export default CalendarScreen;