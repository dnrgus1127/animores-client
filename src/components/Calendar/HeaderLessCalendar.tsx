import React from "react";
import { CalenderBase } from "./CalendarCore";
import { CalenderDirection, CalenderProps } from "./type";
import { Text, View } from "react-native";
import { Colors } from "../../styles/Colors";

/**
 * @desc 헤더 커스텀을 위해 헤더가 제거되어 있는 캘린더, 일반 캘린더와 달리 현재 보여지는 월 정보를 상위 컴포넌트에서 관리해야 한다.
 */
export function HeaderLessCalendar({ currentMonth, ...props }: CalenderProps.HeaderLess) {
    return (
        <CalenderBase {...props} renderArrow={(direction: CalenderDirection) => null}
            renderHeader={(date: Date) => null} />
    )
}