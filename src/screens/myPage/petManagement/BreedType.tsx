import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InputSearch from '../../../components/Input/InputSearch';
import SingleButton from '../../../components/button/SingleButton';
import Title from '../../../components/text/Title';
import HeaderNavigation from '../../../navigation/HeaderNavigation';
import { RootStackParamList } from '../../../navigation/type';
import { ScreenName } from '../../../statics/constants/ScreenName';
import { Colors } from '../../../styles/Colors';

const BreedType = () => {
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList, ScreenName.BreedType>>();

    const [keyword, setKeyword] = useState<string>('');

    return (
        <View style={styles.Container}>
            <HeaderNavigation
                middletitle="펫 추가"
                hasBackButton={true}
                onPressBackButton={() => {
                    navigation.goBack();
                }}
            />
            <View style={styles.HorizontalContainer}>
                <View>
                    <Title
                        text={"품종이 무엇인가요?"}
                        fontSize={16}
                        fontWeight="bold"
                        style={{ marginTop: 52, marginBottom: 31 }}
                    />
                    <InputSearch
                        name={'_'}
                        placeholder={'직접 입력하세요'}
                        onChangeText={setKeyword} />
                </View>
                <View style={styles.ButtonContainer}>
                    <SingleButton
                        title="다음"
                        disabled={!keyword}
                        onPress={() => {
                            if (keyword) {
                                navigation.navigate(ScreenName.AddPet);
                            }
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default BreedType;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    HorizontalContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    ButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})