import ToDoType from "../src/statics/constants/ToDoType";

export const RepeatUnit = {
    HOURS: {name: 'HOURS', display: "매시간"},
    DAY: {name: 'DAY', display: "매일"},
    WEEK: {name:'WEEK', display: "매주"},
}

enum WeekDay {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY',
}

interface IRepeat {
    unit: typeof RepeatUnit;
    interval: number;
    weekDays: WeekDay[];
}

interface IAddTodo {
    clickedPetsId: number[];
    content: string | null;
    tag: ToDoType | null;
    date: string;
    time: string;
    isAllDay: boolean;
    color: string;
    isUsingAlarm: boolean;
    repeat: IRepeat | null;
}

export default IAddTodo;