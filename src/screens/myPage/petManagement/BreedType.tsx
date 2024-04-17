import React from 'react';
import { StyleSheet, View } from 'react-native';
import InputSearch from '../../../components/Input/InputSearch';
import Title from '../../../components/text/Title';
import { Colors } from '../../../styles/Colors';

const BreedType = () => {
    return (
        <View style={styles.Container}>
            <Title
                text={"품종이 무엇인가요?"}
                fontSize={16}
                fontWeight="bold"
                style={{ marginTop: 52, marginBottom: 31 }}
            />
            <InputSearch />
        </View>
    );
};

export default BreedType;

const styles = StyleSheet.create({
    Container: {
        backgroundColor: Colors.White,
        flex: 1,
        paddingHorizontal: 20,
    },
})