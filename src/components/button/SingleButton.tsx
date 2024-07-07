import React from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import Title from '../text/Title';
import { Colors } from '../../styles/Colors';

interface IProps {
    title: string;
    disabled: boolean;
    onPress: () => void;
    style?: ViewStyle;
}

const SingleButton = (props: IProps) => {
    const { title, disabled, onPress, style } = props;

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.nextButtonContainer,
                style,
                { backgroundColor: disabled ? Colors.DBDBDB : Colors.FB3F7E }
            ]}>
            <Title
                text={title}
                fontSize={16}
                color={Colors.White}
                style={{ paddingVertical: 24, textAlign: "center" }}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    nextButtonContainer: {
        borderRadius: 20,
        marginBottom: 30,
    },
})

export default SingleButton;