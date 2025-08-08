import {DateData} from "react-native-calendars/src/types";
import {JSX} from "react";
import {DayProps} from "react-native-calendars/src/calendar/day";
import React from "react";

// CustomDayComponent props 타입 정의
export interface DayComponentProps extends CalenderProps.Day {
    onDayPress: (date: DateData) => void;
    content?: React.ReactNode;
}

export namespace CalenderProps {
    export interface Base {
        onSelectDay?: (date: DateData) => void;
        renderHeader?: (date: Date) => JSX.Element | null;
        renderArrow?: (direction: CalenderDirection) => JSX.Element | null;
        dayContent?: (date: DateData) => React.ReactNode;
        customDayComponent?: React.ComponentType<DayComponentProps>;
    }

    export interface Plain extends Base {

    }

    export interface HeaderLess extends Base {
        currentMonth: string;
        dayContent?: (date: DateData) => React.ReactNode;
        customDayComponent?: React.ComponentType<DayComponentProps>;
    }

    /**
     * @desc 라이브러리를 분석해 보니 dayComponent 사용 시에는 date 속성 타입이 DateData로 고정,
     * 타입 충돌 방지를 위해 재정의하여 사용
     * @see  @See https://github.com/wix/react-native-calendars/blob/master/src/calendar/day/index.tsx
     */
    export type Day = Omit<DayProps, "date"> & { date: DateData };
}

export type CalenderDirection = "right" | "left";

