import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from "react-native";
import { IconCheck } from '../assets/icons';
import { commonStyles } from '../styles/commonStyles';

export interface CheckboxProps {
  isChecked: boolean;
  disabled?: boolean;
  onValueChangeHandler?: (id: string, checked: boolean) => void;
  label?: React.ReactNode;
  style?: StyleSheet;
  id?: string;
}
  
const BasicCheckbox = (props: CheckboxProps) => {
  const { isChecked, disabled, onValueChangeHandler, label, id } = props;

  const onPressHandeler = () => {
    if (onValueChangeHandler) {
      onValueChangeHandler(id, !isChecked);
    }
  }
  
  return (
    <Pressable 
      style={styles.checkboxWrap}
      disabled={disabled}
      onPress={onPressHandeler}
    >
      <View
        style={[
          commonStyles.basicCheckbox,
          isChecked && commonStyles.checked,
          disabled && commonStyles.disabled,
        ]}
      >
        {isChecked && (
          <IconCheck style={commonStyles.checkboxIcon} />
        )}
      </View>
      
      {label && (
        <Text style={[
          styles.autoLoginLabel,
          isChecked && styles.checkedLabel,
        ]}>
          {label}
        </Text>
      )}
      {/* <Text>{id}</Text> */}
    </Pressable>
  )
}

export default BasicCheckbox


const styles = StyleSheet.create({
  checkboxWrap: {
    flexDirection: 'row',
    marginTop: 15,
  },
  autoLoginLabel: {
    color: '#AEAEAE',
  },
  checkedLabel: {
    color: '#000',
  }
});