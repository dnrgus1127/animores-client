import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form'

interface IProps {
    onPress?: () => void,
    placeholder: string;
}

const Input = (props: IProps) => {
    const { onPress, placeholder } = props;

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
                    />
                    </Pressable>
                )}
                name="lastName"
            />
        </View>
    );
};

export default Input;