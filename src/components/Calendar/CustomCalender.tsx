import React from 'react';
import {Calendar} from "react-native-calendars";
import {ICalendarDay} from "./type";

interface IProps {
    onDayPress? : (day : ICalendarDay) => void;
}


function CustomCalender({onDayPress}: IProps) {
    return (
        <Calendar current={"2022-03-01"} onDayPress={onDayPress}/>
    );
}

export default CustomCalender;