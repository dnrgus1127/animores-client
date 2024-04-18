import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IGenderType } from '../../../../types/GenderType';
import asset from "../../../assets/png";
import { CalanderIcon } from '../../../assets/svg';
import Input from '../../../components/Input/Input';
import SingleButton from '../../../components/button/SingleButton';
import Title from '../../../components/text/Title';
import { genderType } from '../../../data/GenderTypes';
import HeaderNavigation from '../../../navigation/HeaderNavigation';
import { RootStackParamList } from '../../../navigation/type';
import { ScreenName } from '../../../statics/constants/ScreenName';
import { Colors } from '../../../styles/Colors';

const AddPet = () => {
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList, ScreenName.AddPet>>();

    const form = useForm({ mode: 'onChange' });

    const [gender, setGender] = useState<string>('');

    return (
        <View style={styles.Container}>
            <HeaderNavigation
                middletitle="펫 추가"
                hasBackButton={true}
                onPressBackButton={() => {
                    navigation.goBack();
                }}
            />
            <ScrollView style={styles.HorizontalContainer}>
                <FormProvider {...form}>
                    {/* TODO: 이미지 변경 */}
                    <Image
                        source={asset.profile}
                        style={{
                            marginTop: 50,
                            marginBottom: 10,
                            alignSelf: "center"
                        }} />
                    <Input
                        title='반려동물 이름'
                        name={'name'}
                        placeholder={'반려동물의 이름을 입력해주세요'}
                        placeholderTextColor={Colors.DBDBDB}
                        isRevised={true} />
                    <Input
                        title='품종'
                        name={'name'}
                        defaultValue='말티즈'  //TODO: 앞에서 선택한 품종
                        placeholderTextColor={Colors.Black}
                        editable={false}
                        children={<Title text={'수정'} color={Colors.AEAEAE} />}
                        onPress={() => {
                            navigation.navigate(ScreenName.BreedType)
                        }} />
                    <Title
                        text={"성별"}
                        fontWeight='bold'
                        style={{ marginTop: 40 }} />
                    <View style={styles.RowView}>
                        {genderType.map((g: IGenderType, index: number) => {
                            return (
                                <Pressable
                                    onPress={() => { setGender(g.type) }}
                                    style={[{
                                        backgroundColor: g.type === gender
                                            ? Colors.FB3F7E
                                            : Colors.F9F9FB,
                                        marginRight: index === 0 ? 9: 0,
                                    },
                                    styles.GenderContainer]}>
                                    <Title
                                        text={g.type}
                                        color={g.type === gender ? Colors.White : Colors.DBDBDB}
                                        style={{ textAlign: "center" }}
                                    />
                                </Pressable>
                            )
                        })}
                    </View>
                    {/* TODO: 달력 */}
                    <Input
                        title='생년월일'
                        name={'birthday'}
                        editable={false}
                        children={<CalanderIcon />} />
                    <Input
                        title='몸무게'
                        name={'weight'}
                        children={<Title text={'kg'} />} />
                </FormProvider>
                <SingleButton
                    title={'완료'}
                    disabled={false}
                    onPress={() => { console.log('완료') }} />
            </ScrollView>
        </View>
    );
};

export default AddPet;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    HorizontalContainer: {
        paddingHorizontal: 20,
    },
    GenderContainer: {
        flex: 1,
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 8,
    },
    RowView: {
        flexDirection: "row"
    }
})