import {DateData} from "react-native-calendars/src/types";
import {LocaleConfig} from "react-native-calendars/src";

LocaleConfig.locales['ko'] = {
    monthNames: [
        '1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월', '12월',
    ],
    monthNamesShort: [
        '1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월', '12월',
    ],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘', // "오늘" 텍스트
};

// Locale 기본값 설정
LocaleConfig.defaultLocale = 'ko';

// 일(0) ~ 토(6)
type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

const convertCalendarDateToKorean = ({year, month, day}: DateData) => {
    return `${year}년 ${month}월 ${day}일`;
}

const getDayOfWeek = (dateString: string): DayOfWeek => {
    const date = new Date(dateString);
    return date.getDay() as DayOfWeek;
}

export {
    convertCalendarDateToKorean,
    getDayOfWeek
}