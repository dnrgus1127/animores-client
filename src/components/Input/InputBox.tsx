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
}

const InputBox = (props: IProps) => {
  const {
    name,
    defaultValue,
    placeholder,
    secureTextEntry = false,
    control,
    style,
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
        />
      )}
      name={name}
      defaultValue={defaultValue || ""}
    />
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputBox: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: Colors.F4F4F4,
    borderRadius: 20,
    width: "100%",
  },
});
