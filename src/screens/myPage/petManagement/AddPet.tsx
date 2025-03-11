import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useEffect} from "react";
import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import {RootStackParamList} from "../../../navigation/type";
import {StackName} from "../../../statics/constants/ScreenName";
import {Colors} from "../../../styles/Colors";
import PetImagePicker from "./PetImagePicker";
import {CustomForm} from "../../../components/form/Form";
import {ReviseIcon} from "../../../assets/svg";
import Title from "../../../components/text/Title";
import {useNavigationParams} from "../../../hooks/useNavigation";
import {usePet} from "./hooks/usePetQuery";
import {usePetForm} from "./hooks/usePetForm";

const GENDER_TYPE = ["남아", "여아"];

const Rules = {
    name: {
        required: "\"이름\"을 입력해 주세요",
        minLength: {value: 2, message: "너무 짧습니다. 최소 2글자 이상으로 입력해주세요"}
    },
    date: {
        required: "\"생년 월일\"을 입력해 주세요.",
        pattern: {value: /^(\d{4})년\s(\d{1,2})월\s(\d{1,2})일$/, message: "날짜 형식이 맞지 않습니다."},
    },
    weight: {
        required: "\"몸무게\"를 입력해주세요.",
        pattern: {
            value: /^[0-9]*(.[0-9]*)?$/,
            message: "숫자만 입력 가능합니다."
        }
    },
}

const AddPet = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList["PetManagement"], "PetType">>();
    // navigation param
    const {petId} = useNavigationParams<"PetManagement", "AddPet">();
    const {submit, initFormValues, clearValue} = usePetForm(() => navigation.navigate(StackName.PetManagement.Home), petId);

    // 펫 정보 수정이라면, petId로 펫 정보 불러와서 필드 값 업데이트
    const {data : petDetails} = petId ? usePet(petId) : {data : null};
    
    useEffect(() => {
        petDetails && initFormValues(petDetails);
    }, [petDetails]);

    return (
        <View style={styles.container}>
            <HeaderNavigation middletitle="펫 추가" hasBackButton={true} onPressBackButton={() => navigation.pop()}/>
            <ScrollView style={styles.horizontalContainer}>
                <PetImagePicker/>
                <View style={{gap: 20, paddingVertical : 20}}>
                    <CustomForm.Input name="name" label={"반려동물 이름"}
                                      placeholder={"반려동물의 이름을 입력해주세요"}
                                      trailingIcon={<ReviseIcon/>}
                                      onPressTrailingIcon={() => clearValue("name")}
                                      rules={Rules.name}/>
                    <CustomForm.Input name="breed" label={"품종"} editable={false}
                                      style={{color: Colors.Black} as StyleProp<ViewStyle>}
                                      trailingIcon={<Title text={"수정"}/>}
                                      onPressTrailingIcon={() => navigation.pop()}/>
                    <CustomForm.ToggleButtonGroup name={"gender"} label={"성별"} buttonNames={GENDER_TYPE}
                                                  defaultValue={0}/>
                    <CustomForm.DatePicker name="birthday" label={"생년월일"} rules={Rules.date}/>
                    <CustomForm.Input name="weight" label={"몸무게"} placeholder={"몸무게를 입력해주세요"}
                                      trailingIcon={<Text>Kg</Text>} rules={Rules.weight}/>
                    <CustomForm.SubmitButton text={"제출"} onPress={submit}/>
                </View>
            </ScrollView>
        </View>
    );
};


export default AddPet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    horizontalContainer: {
        paddingHorizontal: 20,
    },
});
