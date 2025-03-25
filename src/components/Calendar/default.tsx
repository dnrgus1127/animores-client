// TODO 파일 이름 고민중
import React from "react";
import {Pressable, StyleProp, StyleSheet, Text, View} from "react-native";
import {LeftArrow, RightArrow} from "../../assets/svg";
import {CalenderDirection} from "./type";
import {useCurrent} from "./CurrentContextProvider";
import {Colors} from "../../styles/Colors";

interface DropDownHeaderProps {
    styles?: StyleProp<any>;
}

export const DropDownHeader: React.FC<DropDownHeaderProps> = ({styles}) => {
    const [shownMonth, setShownMonth] = useCurrent();
    const year = shownMonth.getFullYear();
    const month = shownMonth.getMonth() + 1;
    return <View style={[dropDownHeaderStyles.container, styles]}>
        <Text style={dropDownHeaderStyles.text}>{year}년 {month}월</Text>
        {/*<Pressable onPress={()=>setShownMonth("2025-04")}><Text>1</Text></Pressable>*/}
    </View>
}
const dropDownHeaderStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: Colors.LightGery
    },
    text: {
        fontSize: 16,
        fontWeight: "500"
    }
})

const CustomHeader: React.FC<{ date: Date }> = ({date}) => {
    return <View>
        <Text>{date.getFullYear()}년 {date.getMonth() + 1}월</Text>
    </View>
}

const CustomArrow: React.FC<{ direction: CalenderDirection }> = ({direction}) => {
    if (direction === "right") {
        return <View><RightArrow/></View>
    } else {
        return <View><LeftArrow/></View>
    }
}

export const renderCustomHeader = (date: Date) => <CustomHeader date={date}/>
export const renderCustomArrow = (direction: CalenderDirection) => <CustomArrow direction={direction}/>