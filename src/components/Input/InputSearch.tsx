import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';
import { InputIcon } from '../../assets/svg';
import { Colors } from '../../styles/Colors';

interface ISearchProps {
    name: string;
    defaultValue?: string;
    placeholder: string;
    onChangeText?: (text: string) => void;
}

const InputSearch = (props: ISearchProps) => {
    const { name, defaultValue, placeholder, onChangeText } = props;
    const { control } = useForm();

    //TODO: 검색기능 추가
    return (
      <View style={styles.container}>
        <Controller
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <InputIcon style={{ marginHorizontal: 16 }} />
              <TextInput
                placeholder={placeholder}
                onBlur={onBlur}
                value={value}
                onChangeText={(value) => {
                  onChange(value);
                  onChangeText && onChangeText(value);
                }}
                style={{ flex: 1, flexGrow: 1, paddingRight: 16 }}
              />
            </>
          )}
          name={name}
          control={control}
          defaultValue={defaultValue}
        />
      </View>
    );
};

export default InputSearch;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.F1F1F1,
        borderRadius: 10,
        flexDirection: "row",
        paddingVertical: 16,
    }
})