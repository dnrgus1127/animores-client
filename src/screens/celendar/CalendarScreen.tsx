import React from 'react';
import {Text, View} from 'react-native';
import {HeaderLessCalendar} from "../../components/Calendar/HeaderLessCalendar";
import {CurrentContextProvider} from "../../components/Calendar/CurrentContextProvider";
import {CalendarDropDownHeader} from "../../components/Calendar/CalendarHeaders";
import {Colors} from "../../styles/Colors";

const CalendarScreen = () => {
    return (
        <View style={{flex: 1}}>
            <CurrentContextProvider>
                <CalendarDropDownHeader styles={{flex: 1}}/>
                {/* TODO 할일 일지 */}
                <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10}}>
                    <Text style={{fontWeight: "bold"}}>To Do</Text>
                    <Text style={{fontWeight: "bold", color: Colors.LightGery}}>일지</Text>
                </View>
                <View style={{flex: 8}}>
                    <HeaderLessCalendar currentMonth={"2025-03"}/>
                </View>
            </CurrentContextProvider>
        </View>
    );
};

export default CalendarScreen;