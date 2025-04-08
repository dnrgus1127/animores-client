import {DateData} from "react-native-calendars/src/types";
import {LocaleConfig} from "react-native-calendars/src";
import {CalenderProps} from "./type";
import {TextStyle} from "react-native";
import {dayStyle} from "./style";
import {Colors} from "../../styles/Colors";
import {getTextColor} from "../../js/styleUtils";

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

export enum DayOfWeek {
    Sun = 0,
    Mon,
    Tue,
    Wen,
    Thu,
    Fri,
    Sat
}

export enum DayState {}

const convertCalendarDateToKorean = ({year, month, day}: DateData) => {
    return `${year}년 ${month}월 ${day}일`;
}

const convertYYYYMMDDToKorean = (yyyymmdd : string) => {
    const [yyyy,mm,dd] = yyyymmdd.split("-").map(token => Number(token));
    return convertCalendarDateToKorean({ year : yyyy, month : mm, day: dd} as DateData);
}

/**
 * @desc YYYY-MM-DD 형태로 날짜를 변환해주는 유틸로, 필요에 따라 여러 day 형태를 처리하는 코드 추가하여 포맷에 맞게 반환하도록 구현 필요
 * @param day 다양한 날짜 형태
 */
const formatToYYYYMMDD = (day: string) => {
    const koreanDateFormatRegex = new RegExp("^(\\d{4})년 (0?[1-9]|1[0-2])월 (0?[1-9]|[12][0-9]|3[01])일$");
    let match;
    match = day.trim().match(koreanDateFormatRegex);
    if (match) {
        let [,yyyy,mm,dd] = match;
        mm = mm.length < 2 ? "0" + mm : mm;
        dd = dd.length < 2 ? "0" + dd : dd;
        return `${yyyy}-${mm}-${dd}`
    }
    return day
}

const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

const getDayOfWeek = (dateString: string): DayOfWeek => {
    const date = new Date(dateString);
    return date.getDay() as DayOfWeek;
}

const daySinceBirth = (dateString: string) => {
    const birth = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - birth.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// 날짜 정보를 바탕으로 해당 날짜에 맞는 스타일 반환
const getDayStyle = ({state, date, marking}: CalenderProps.Day) => {
    const styleList: Array<TextStyle> = [dayStyle.default];
    const colorInfo = {
        backgroundColor: "#FFFFFF",
        color: "#000000"
    }

    if (getDayOfWeek(date?.dateString || "1900-01-01") === DayOfWeek.Sun) {
        colorInfo.color = Colors.FF4040
    }

    if (state === "today") {
        // colorInfo.backgroundColor = Colors.Pink;
        colorInfo.color = Colors.Pink;
        styleList.push(dayStyle.today);
    }
    if (state === "disabled") {
        styleList.push(dayStyle.disabled);
    }

    if (marking?.selected) {
        styleList.push(dayStyle.select);
        colorInfo.backgroundColor = Colors.Black;
        colorInfo.color = getTextColor(colorInfo.backgroundColor);
    }

    // set text Color
    switch (state) {
        case "disabled" : {
            colorInfo.color = Colors.LightGery;
            break;
        }
    }

    styleList.push(colorInfo);
    return styleList;
}

export {
    convertCalendarDateToKorean,
    convertYYYYMMDDToKorean,
    getDayOfWeek,
    formatToYYYYMMDD,
    daySinceBirth,
    getDayStyle,
    formatDateToString
}