export interface IToDo {
    id: number;
    title: string;
    pets: IPet[];
    isAllDay: boolean;
    date: string;
    time: string;
    isUsingAlarm: boolean;
    color: string;
    completeProfileImage: string|null;
    completeDateTime: string|null;
}

interface IPet {
    id: number;
    name: string;
}