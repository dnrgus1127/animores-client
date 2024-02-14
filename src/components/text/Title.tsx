import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface IProps {
  text: string;
  fontSize?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const Title = (props: IProps) => {
  const { text, fontSize, color, style } = props;

  return <Text style={[style, { fontSize, color }]}>{text}</Text>;
};

export default Title;
