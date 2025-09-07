import React, { useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import type { DateData } from "react-native-calendars/src/types";
import { renderCustomHeader, renderCustomArrow } from "./base";
import { useCalendarDate } from "./CurrentContextProvider";
import { DayComponent } from "./DayComponent";
import { useCalendar } from "./hooks/useCalendars";
import { CALENDAR_THEME } from "./style";
import { CalenderProps } from "./type";
import { formatDateToString } from "./utils";

/**
 * @description
 * - react-native-calendars 라이브러리를 기반으로 커스텀 캘린더를 구현합니다.
 * - 프로젝트 스타일 가이드에 맞는 커스텀 스타일이 적용되어 있습니다.
 * - 날짜 선택, 커스텀 헤더, 커스텀 DayComponent, 마킹 등 캘린더의 주요 기능을 제공합니다.
 * - props를 통해 헤더, 화살표, 날짜 선택, DayContent 등 다양한 커스터마이징이 가능합니다.
 *
 * @see https://wix.github.io/react-native-calendars/docs/Intro
 * @see CalenderProps.Base
 *
 * @example
 * <CalenderBase
 *   onSelectDay={...}
 *   dayContent={...}
 * />
 *
 * @note
 * 본 캘린더 컴포넌트는 라이브러리의 기본 스타일이 아닌, 프로젝트의 스타일 가이드와 일관성을 유지하기 위해
 * style.ts 및 커스텀 컴포넌트(DayComponent 등)를 통해 커스텀 스타일이 구현되어 있습니다.
 */

export function CalenderBase(props: CalenderProps.Base) {
  const { onSelectDay, dayContent, customDayComponent, hideHeader, currentMonth, onMonthChange } =
    props;
  const { markedDates, selectDay } = useCalendar();
  const [height, setHeight] = useState(0);
  const [value] = useCalendarDate();

  const effectiveDate = (() => {
    if (currentMonth) {
      return currentMonth instanceof Date ? currentMonth : new Date(currentMonth);
    }
    return value;
  })();

  const handleLayout = (event: LayoutChangeEvent) => {
    setHeight(event.nativeEvent.layout.height);
  };

  // onSelectDay prop이 있으면 그것을 사용하고, 없으면 기존의 selectDay 사용
  const handleDayPress = onSelectDay || selectDay;

  const currentString = formatDateToString(effectiveDate);

  return (
      <View onLayout={handleLayout} style={{ flex: 1 }}>
          <Calendar
              key={currentString}
              current={currentString}
              markedDates={markedDates}
              style={{ height: '100%' }}
              dayComponent={(props: CalenderProps.Day) => {
                  const Comp = customDayComponent ?? DayComponent;
                  return (
                      <Comp
                          {...props}
                          onDayPress={handleDayPress}
                          content={dayContent ? dayContent(props.date) : undefined}
                      />
                  );
              }}
              showSixWeeks={true}
              customHeader={hideHeader ? () => null : renderCustomHeader}
              renderArrow={hideHeader ? undefined : renderCustomArrow}
              hideDayNames={true}
              theme={CALENDAR_THEME}
              onMonthChange={(month: DateData) => {
                  const next = new Date(month.year, month.month - 1, 1);
                  onMonthChange?.(next);
              }}
          ></Calendar>
      </View>
  );
}
