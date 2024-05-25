import React, { useState } from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from "react-native";
import { Colors } from '../styles/Colors';
import Title from './text/Title';

interface InputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
}

const FilledInput = (props:InputProps) => {
  const { placeholder, secureTextEntry, style } = props;

  const [value, setValue] = useState<string>('');

  const onChangeText = (inputText:string) => {
    setValue(inputText)
  }

  return (
    <>
      <TextInput
        style={[styles.inputBox, style]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
}

export default FilledInput

const styles = StyleSheet.create({
  inputBox: {
    paddingVertical: 14,
	paddingHorizontal: 20,
    backgroundColor: Colors.F4F4F4,
    borderRadius: 20,
	width:"100%"
  },
});