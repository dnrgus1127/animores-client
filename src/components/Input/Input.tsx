import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form'
import { Colors } from '../../styles/Colors';

interface IProps {
    name: string;
    defaultValue?: string;
    onPress?: () => void,
    placeholder: string;
}

const Input = (props: IProps) => {
    const { name, defaultValue, onPress, placeholder } = props;

    const { control, handleSubmit, formState: { errors } } = useForm();

    return (
        <View>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Pressable onPress={onPress}>
                        <TextInput
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={{
                            borderWidth: 1,
                        }}
                    />
                    </Pressable>
                )}
                name={name}
                defaultValue={defaultValue || ''}
            />
        </View>
    );
};

export default Input;