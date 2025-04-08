import {Colors} from "../styles/Colors";

export const getTextColor = (backgroundColor: string) => {
    const isDark = isDarkColor(backgroundColor);
    return isDark ? Colors.White : Colors.Black;
}

// 색상 밝기 판단 함수
const isDarkColor = (color: string) => {
    if (!color) return false;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
};
