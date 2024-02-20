import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface IProps {
  text: string;
  fontSize?: number;
  fontWeight?: "normal" | "bold";
  color?: string;
  style?: StyleProp<TextStyle>;
}

const Title = (props: IProps) => {
  const { text, fontSize, fontWeight, color = "#1E1E1E", style } = props;

    return <Text style={[style, { fontSize, fontWeight, color }]}>{text}</Text>;
};

export default Title;
