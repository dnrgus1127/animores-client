import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, KeyboardTypeOptions, ReturnKeyTypeOptions } from "react-native";
import { commonStyles } from '../styles/commonStyles';

interface InputProps {
  title?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  marginTop?: number;
  onChangeText?: (inputText:string) => void;
  value?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
  disabled?: boolean;
  error?: boolean;
}

const BasicInput = (props:InputProps) => {
  const { title, placeholder, secureTextEntry, marginTop, onChangeText, value, keyboardType, returnKeyType, disabled, error } = props;
  const [initialValue, setinitialValue] = useState('');

  const initialOnChangeText = (inputText:string) => {
    setinitialValue(inputText)
  }

  return (
    <View style={[styles.inputWrap, marginTop ? { marginTop: marginTop} : null ]}>
      {title ? (
        <Text style={[styles.label, error ? styles.errorText : null]}>{title}</Text>
      ) : null}
      <TextInput
        style={[styles.inputBox, error ? styles.errorUnderline : null]}
        onChangeText={onChangeText ? onChangeText : initialOnChangeText}
        value={value ? value : initialValue}
        placeholder={placeholder ? placeholder : ''}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ? keyboardType : 'default'}
        returnKeyType={returnKeyType ? returnKeyType : 'done'}
        editable={disabled ? false : true}
        selectTextOnFocus={disabled ? false : true}
      />
    </View>
  )
}

export default BasicInput


const styles = StyleSheet.create({
  inputWrap: {
    flex: 1,
    width: '100%',
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF4040'
  },
  inputBox: {
    height: 42,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    borderBottomColor: '#C1C1C1',
    borderBottomWidth: 1,
    fontSize: 14
  },
  errorUnderline: {
    borderBottomColor: '#FF4040',
  }
});