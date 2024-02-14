import React, { useState } from 'react';
import { TextInput } from "react-native";
import { commonStyles } from '../styles/commonStyles';

interface InputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
}

const BasicInput = (props:InputProps) => {
  const { placeholder, secureTextEntry } = props;
  const [value, setValue] = useState('');

  const onChangeText = (inputText:string) => {
    setValue(inputText)
  }

  return (
    <TextInput
      style={commonStyles.commonTextInput}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder ? placeholder : ''}
      secureTextEntry={secureTextEntry}
    />
  )
}

export default BasicInput