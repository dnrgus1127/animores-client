import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import asset from "../../../assets/png";

const AddAnotherAnimal = () => {
    return (
        <View style={styles.Container}>
            <Image source={asset.profile} />
        </View>
    );
};

export default AddAnotherAnimal;

const styles = StyleSheet.create({
    Container: {
        alignItems: "center",
        marginTop: 60,
    },
});