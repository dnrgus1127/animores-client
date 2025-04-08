import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {HeaderLessCalendar} from "../../components/Calendar/HeaderLessCalendar";
import {CurrentContextProvider} from "../../components/Calendar/CurrentContextProvider";
import {CalendarDropDownHeader} from "../../components/Calendar/CalendarHeaders";
import {CalendarToggle} from '../../components/Calendar/CalendarToggle';

const CalendarScreen = () => {
    const [selectedTab, setSelectedTab] = useState<'todo' | 'diary'>('todo');

    return (
        <View style={{flex: 1}}>
            <CurrentContextProvider>
                <CalendarDropDownHeader styles={{flex: 1}}/>
                <CalendarToggle
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                />
                <View style={{flex: 8}}>
                    <HeaderLessCalendar currentMonth={"2025-03"}/>
                </View>
            </CurrentContextProvider>
        </View>
    );
};

export default CalendarScreen;