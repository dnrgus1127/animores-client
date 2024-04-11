import React from 'react';
import { View, StyleSheet } from 'react-native';
import Title from '../text/Title';
import { Colors } from '../../styles/Colors';

interface IProps {
    title: string;
    disabled: boolean;
}

const SingleButton = (props: IProps) => {
    const { title, disabled } = props;

    return (
        <View style={[
            styles.nextButtonContainer,
            { backgroundColor: disabled ? Colors.DBDBDB : Colors.FB3F7E }
        ]}>
            <Title
                text={title}
                fontSize={16}
                color={Colors.White}
                style={{ paddingVertical: 24, textAlign: "center" }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    nextButtonContainer: {
        borderRadius: 20,
        marginTop: 70,
        marginBottom: 30,
    },
})

export default SingleButton;