import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ColorValue, Pressable, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { ReviseIcon } from '../../assets/svg';
import { Colors } from '../../styles/Colors';
import Title from '../text/Title';

interface IProps {
    title: string;
    name: string;
    defaultValue?: string;
    placeholder?: string;
    editable?: boolean;
    children?: React.ReactNode;
    onPress?: () => void;
    isRevised?: boolean;
    style?: StyleProp<ViewStyle>;
}

const Input = (props: IProps) => {
    const { title, name, defaultValue, placeholder, editable = true, children, onPress, isRevised, style } = props;
    const { control, setValue } = useForm();

    return (
        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <View style={[{ marginTop: 40 }, style]}>
                    <Title text={title} fontWeight='bold' />
                    <View style={styles.InputContainer}>
                        <TextInput
                            placeholder={placeholder}
                            placeholderTextColor={Colors.DBDBDB}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            editable={editable}
                            style={{
                                flex: 1,
                                color: Colors.Black
                            }}
                        />
                        {/* 취소 버튼, 그 외 */}
                        <Pressable
                            onPress={
                                isRevised
                                    ? () => setValue(name, '')
                                    : onPress
                            }
                            style={styles.ChildrenContainer}>
                            {value && isRevised
                                ? <ReviseIcon />
                                : children
                            }
                        </Pressable>
                    </View>
                </View>
            )}
            name={name}
            defaultValue={defaultValue || ''}
        />
    );
};

export default Input;

const styles = StyleSheet.create({
    InputContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: Colors.C1C1C1,
        paddingVertical: 12,
    },
    ChildrenContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})