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


