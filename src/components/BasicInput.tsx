import React, { useState, useRef } from 'react';
import { Control, Controller, FieldError, FieldValues, RegisterOptions, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, View, Text, Pressable, KeyboardTypeOptions, ReturnKeyTypeOptions } from "react-native";
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

            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
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
              {name === 'email' && (
                <Pressable 
                  style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} 
                  disabled={error && true}
                >
                  <Text style={error && styles.textDisabled}>인증번호 전송</Text>
                </Pressable>
              )}
              {name === 'nickname' && (
                <Pressable 
                  style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} 
                  disabled={error && true}
                >
                  <Text style={error && styles.textDisabled}>중복확인</Text>
                </Pressable>
              )}
            </View>

            {error && <Text style={styles.errorText}>{error.message}</Text>}
            {name === 'email' && !error && <Text style={styles.successText}>인증이 완료되었습니다.</Text>}
            {name === 'nickname' && !error && <Text style={styles.successText}>사용하실 수 있는 닉네임입니다.</Text>}
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
  inputBox: {
    flex: 1,
    height: 42,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    borderBottomColor: '#C1C1C1',
    borderBottomWidth: 1,
    fontSize: 14
  },
  inputButton: {
    backgroundColor: '#F2F2F2', 
    padding: 12, 
    borderRadius: 5, 
    marginStart: 10, 
    width: 104, 
    alignItems: 'center',
  },
  textDisabled: {
    color: '#AEAEAE',
  },
  errorText: {
    color: '#FF4040'
  },
  successText: {
    color: '#00B01C',
  },
  errorUnderline: {
    borderBottomColor: '#FF4040',
  }
});