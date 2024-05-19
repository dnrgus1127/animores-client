import React, { useState, useRef } from 'react';
import { Control, Controller, FieldError, FieldValues, RegisterOptions, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, View, Text, KeyboardTypeOptions, ReturnKeyTypeOptions } from "react-native";
import { commonStyles } from '../styles/commonStyles';

interface InputProps {
  name: string;
  value?: string;
  title?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  marginTop?: number;
  onChangeText?: (inputText:string) => void;
  keyboardType?: KeyboardTypeOptions | undefined;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
  disabled?: boolean;
  handleError?: () => void | undefined
  control?: Control<FieldValues> | undefined
  rules?:Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined
}

const BasicInput = (props:InputProps) => {
  const { name, control, rules, handleError, title, placeholder, secureTextEntry, marginTop, onChangeText, keyboardType, returnKeyType, disabled } = props;

  return (
    <View style={[styles.inputWrap, marginTop ? { marginTop: marginTop} : null ]}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
          <>
            {title ? (
              <Text style={[styles.label, error ? styles.errorText : null]}>{title}</Text>
            ) : null}
            <TextInput
              style={[styles.inputBox, error ? styles.errorUnderline : null]}
              value={value}
              onChangeText={(value) => {
                  onChange(value);
                  onChangeText && onChangeText(value);
              }}
              placeholder={placeholder ? placeholder : ''}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType ? keyboardType : 'default'}
              returnKeyType={returnKeyType ? returnKeyType : 'done'}
              editable={disabled ? false : true}
              selectTextOnFocus={disabled ? false : true}
            />
            {error && <Text style={[styles.errorText]}>{error.message}</Text>}
          </>
        )}
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