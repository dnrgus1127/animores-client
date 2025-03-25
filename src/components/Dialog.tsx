import React from "react";
import BaseDialog from 'react-native-dialog';
import {StyleSheet, Text} from "react-native";

interface DialogProps {
    visible: boolean,
    title: string,
    description: string,
    onCancel: () => void,
    onSubmit: () => void,
}

export function Dialog({visible, title, description, onCancel, onSubmit}: DialogProps) {
    return <BaseDialog.Container visible={visible} contentStyle={styles.container}>
        <BaseDialog.Title style={styles.title}>{title}</BaseDialog.Title>
        <BaseDialog.Description style={styles.description}>{description}</BaseDialog.Description>
        <BaseDialog.Button label="취소" onPress={onCancel}/>
        <BaseDialog.Button label="확인" onPress={onSubmit}/>
    </BaseDialog.Container>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
    },
    title: {
        fontSize: 16
    },
    description: {
        fontSize: 14,
    },
})