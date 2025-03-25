import React from "react";
import Svg, {Path} from "react-native-svg";
import {Colors} from "../../../styles/Colors";


export const LeftArrow = ({color = Colors.Black}: { color?: string }) => {
    return <Svg width="24" height="24" viewBox="0 0 24 24" fill={"none"}>
        <Path d="M10 21L1 12L10 3" stroke={color} strokeWidth="3" strokeLinecap="round"
              strokeLinejoin="round"/>
    </Svg>

}