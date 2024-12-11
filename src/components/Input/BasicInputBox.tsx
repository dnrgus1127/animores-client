import React from "react";
import { Controller } from "react-hook-form";
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native";
import { Colors } from "../../styles/Colors";

interface IProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  control: any;
  style?: StyleProp<ViewStyle>;
  editable?: boolean;
}

const BasicInputBox = (props: IProps) => {
  const {
    name,
    defaultValue,
    placeholder,
    secureTextEntry = false,
    control,
    style,
    editable,
  } = props;

  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={[styles.inputBox, style]}
          value={value}
          placeholder={placeholder ? placeholder : ""}
          secureTextEntry={secureTextEntry}
          onChangeText={onChange}
          onBlur={onBlur}
          editable={editable}
        />
      )}
      name={name}
      defaultValue={defaultValue || ""}
    />
  );
};

export default BasicInputBox;

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