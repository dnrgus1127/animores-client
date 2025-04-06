// TODO 파일 이름 고민중
import React from "react";
import { Text, View } from "react-native";
import { LeftArrow } from "../../assets/svg/component/LeftArrow";
import { RightArrow } from "../../assets/svg/component/RightArrow";
import { CalenderDirection } from "./type";


const DefaultHeader: React.FC<{ date: Date }> = ({ date }) => {
    return <View>
        <Text>{date.getFullYear()}년 {date.getMonth() + 1}월</Text>
    </View>
}

const DefaultDirectionArrow: React.FC<{ direction: CalenderDirection }> = ({ direction }) => {``
    if (direction === "right") {
        return <View><RightArrow /></View>
    } else {
        return <View><LeftArrow /></View>
    }
}

export const renderCustomHeader = (date: Date) => <DefaultHeader date={date} />
export const renderCustomArrow = (direction: CalenderDirection) => <DefaultDirectionArrow direction={direction} />