import { Dimensions } from "react-native";

// Screen dimensions
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }: { width: number; height: number } =
  Dimensions.get("window");

// Common regex
export const emailRegex: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const nicknameRegex: RegExp = /^(?=.*[\w가-힣])[\w가-힣]{3,20}$/;
export const pwRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
export const phoneNumberRegex: RegExp = /^01([0|1|6|7|8|9]{1})+(\d{7,8})$/;

// Date utils (YYYY-MM-DD normalization)
export const isValidYmd = (value: string): boolean => /^(\d{4})-(\d{2})-(\d{2})$/.test(value);

export const formatDateToYmd = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const normalizeToYmd = (value?: string): string | undefined => {
  if (!value) return undefined;
  if (isValidYmd(value)) return value;
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return formatDateToYmd(parsed);
  }
  throw new Error(`Invalid date format '${value}'. Expected YYYY-MM-DD.`);
};

// Generic date formatting helpers
export const formatDateToString = (date: Date): string => formatDateToYmd(date);

export const formatToYYYYMMDD = (day: string): string => {
  const koreanDateFormatRegex = new RegExp(
    "^(\\d{4})년 (0?[1-9]|1[0-2])월 (0?[1-9]|[12][0-9]|3[01])일$"
  );
  const match = day.trim().match(koreanDateFormatRegex);
  if (match) {
    let [, yyyy, mm, dd] = match;
    mm = mm.length < 2 ? "0" + mm : mm;
    dd = dd.length < 2 ? "0" + dd : dd;
    return `${yyyy}-${mm}-${dd}`;
  }
  return day;
};

// Korean date string builders
const DayOfWeekNumberToKorean = {
  0: "일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
} as const;

export interface DateParts {
  year?: number;
  month?: number;
  day?: number;
  weekDay?: number; // 0~6 (Sun~Sat)
}

export const convertCalendarDateToKorean = ({ year, month, day, weekDay }: DateParts): string => {
  const result: string[] = [];
  if (typeof year === "number") result.push(`${year}년`);
  if (typeof month === "number") result.push(`${month}월`);
  if (typeof day === "number") result.push(`${day}일`);
  if (typeof weekDay === "number") {
    result.push(`(${DayOfWeekNumberToKorean[weekDay as keyof typeof DayOfWeekNumberToKorean]})`);
  }
  return result.join(" ");
};

export const convertYYYYMMDDToKorean = (yyyymmdd: string): string => {
  const [yyyy, mm, dd] = yyyymmdd.split("-").map((token) => Number(token));
  return convertCalendarDateToKorean({ year: yyyy, month: mm, day: dd });
};

export const daySinceBirth = (dateString: string): number => {
  const birth = new Date(dateString);
  const today = new Date();
  const diffTime = today.getTime() - birth.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * @desc 다양한 형태의 월 입력을 받아 해당 월의 시작일과 마지막일을 YYYY-MM-DD 형식으로 반환합니다.
 */
export function calculateMonthBoundaries(monthInput: number | string | Date): { start: string; end: string } {
  let targetDate: Date;

  try {
    if (typeof monthInput === 'number') {
      // 월 숫자 (1-12)
      if (monthInput < 1 || monthInput > 12) {
        throw new Error(`Invalid month: ${monthInput}. Month must be between 1 and 12.`);
      }
      const now = new Date();
      targetDate = new Date(now.getFullYear(), monthInput - 1, 1);
    } else if (typeof monthInput === 'string') {
      if (/^\d{4}-\d{2}$/.test(monthInput)) {
        // YYYY-MM 형식
        const [year, month] = monthInput.split('-').map(Number);
        if (month < 1 || month > 12) {
          throw new Error(`Invalid month in date: ${monthInput}`);
        }
        targetDate = new Date(year, month - 1, 1);
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(monthInput)) {
        // YYYY-MM-DD 형식
        targetDate = new Date(monthInput);
        if (isNaN(targetDate.getTime())) {
          throw new Error(`Invalid date: ${monthInput}`);
        }
      } else {
        // 기타 문자열 형식
        targetDate = new Date(monthInput);
        if (isNaN(targetDate.getTime())) {
          throw new Error(`Invalid date format: ${monthInput}`);
        }
      }
    } else if (monthInput instanceof Date) {
      if (isNaN(monthInput.getTime())) {
        throw new Error('Invalid Date object');
      }
      targetDate = new Date(monthInput);
    } else {
      throw new Error(`Unsupported input type: ${typeof monthInput}`);
    }

    // 월의 첫 날과 마지막 날 계산
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0); // 다음 달의 0일 = 현재 달의 마지막 날

    return {
      start: formatDateToYmd(startDate),
      end: formatDateToYmd(endDate),
    };
  } catch (error) {
    throw new Error(`Failed to calculate month boundaries: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * @desc TodoOverview 배열로부터 날짜(YYYY-MM-DD) 집합을 생성합니다.
 */
export function createDateSetFromTodos(todos: Array<{ date?: string }>): Set<string> {
  const set = new Set<string>();
  for (const item of todos ?? []) {
    if (item?.date) set.add(item.date);
  }
  return set;
}


