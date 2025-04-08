import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarDropDownHeader } from "../../components/Calendar/CalendarHeaders";
import { CurrentContextProvider } from "../../components/Calendar/CurrentContextProvider";
import { HeaderLessCalendar } from "../../components/Calendar/HeaderLessCalendar";
import { CalendarToggle } from './CalendarToggle';
import { Colors } from '../../styles/Colors';
import { DefaultDayOfWeek } from '../../components/Calendar/base';

const CalendarScreen = () => {
    const [selectedTab, setSelectedTab] = useState<'todo' | 'diary'>('todo');

    return (
        <SafeAreaView style={{ flex: 1}}>
            <CurrentContextProvider>
                <CalendarDropDownHeader styles={{ padding: 20 }} />
                <CalendarToggle
                    style={{ padding: 15 }}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                />
                <View style={{ flex: 1 }}>
                    <DefaultDayOfWeek/>
                    <HeaderLessCalendar currentMonth={"2025-03"} />
                </View>
            </CurrentContextProvider>
        </SafeAreaView>
    );
};

export default CalendarScreen;