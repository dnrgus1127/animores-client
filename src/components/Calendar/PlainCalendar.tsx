import {CalenderBase} from "./CalendarCore";
import {CalenderProps} from "./type";
import React from "react";
/**
 * @desc 가장 기본이 되는 캘린더
 */
export function PlainCalendar({...props}: CalenderProps.Plain) {
    return (
        <CalenderBase {...props}/>
    )
}
