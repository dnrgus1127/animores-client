import { DateData } from "react-native-calendars/src/types";
import { JSX } from "react";
import { DayProps } from "react-native-calendars/src/calendar/day";
import React from "react";

// CustomDayComponent props 타입 정의
export interface DayComponentProps extends CalenderProps.Day {
  onDayPress: (date: DateData) => void;
  content?: React.ReactNode;
}

export namespace CalenderProps {
  export interface Base {
    onSelectDay?: (date: DateData) => void;
    dayContent?: (date: DateData) => React.ReactNode;
    customDayComponent?: React.ComponentType<DayComponentProps>;
    /** 헤더 숨김 여부 */
    hideHeader?: boolean;
    /** 외부에서 현재 월을 제어하려면 제공 (권장: Date 또는 'YYYY-MM-01') */
    currentMonth?: string | Date;
    /** 월 변경 콜백 (내장 헤더/스와이프 등으로 월 변경 시 호출) */
    onMonthChange?: (date: Date) => void;
  }

  export interface Plain extends Base {}

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
