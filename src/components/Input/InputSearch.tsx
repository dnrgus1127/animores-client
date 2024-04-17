import React from 'react';
import { View } from 'react-native';
import Title from '../text/Title';
import { Colors } from '../../styles/Colors';

const InputSearch = () => {
    return (
        <View style={{ borderWidth: 1, borderColor: Colors.F1F1F1 }}>
            <Title
                text={'직접 입력하세요'}
                style={{ paddingVertical: 22, paddingLeft: 16 }} />
        </View>
    );
};

export default InputSearch;