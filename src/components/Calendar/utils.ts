import {ICalendarDay} from "./type";

const convertCalendarDateToKorean = ({year,month,day} : ICalendarDay) => {
    return `${year}년 ${month}월 ${day}일`;
}

export {
    convertCalendarDateToKorean
}