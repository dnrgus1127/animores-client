import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../../../styles/Colors";

export const RightArrow = ({ color = Colors.Black }: { color?: string }) => {

    return <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 18L15 12L9 6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>

}
