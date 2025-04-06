import React, {createContext, useContext, useState} from "react";

type ContextType = [Date, React.Dispatch<React.SetStateAction<Date>>];

// 현재 보여지는 달력의 날짜를 관리하는 context
const CalendarDateContext = createContext<ContextType | null>(null);

/**
 * @desc 캘린더 컴포넌트들에서 공유되는 현재 보여지는 날짜를 관리하는 Context Provider
 */
export const CurrentContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const currentDate = useState<Date>(new Date());

    return <CalendarDateContext.Provider value={currentDate}>
        {children}
    </CalendarDateContext.Provider>
}

/**
 * @desc 현재 보여지는 달력 날짜를 가져오고 설정하는 커스텀 훅
 * @returns [현재 날짜, 날짜 설정 함수]
 */
export const useCalendarDate = () => {
    const context = useContext(CalendarDateContext);
    
    if (!context) {
        throw new Error('useCalendarDate must be used within a CurrentContextProvider');
    }
    
    const [date, setDate] = context;

    const setCalendarDate = (dateString: string) => {
        setDate(new Date(dateString));
    }

    return [date, setCalendarDate] as const;
}