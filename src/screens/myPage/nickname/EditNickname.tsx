import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { Control, Controller, FieldError, FieldValues, RegisterOptions, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import SingleButton from "../../../components/button/SingleButton";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";
import { emailRegex, nicknameRegex, pwRegex } from "../../../js/util";
import { AuthModel } from "../../../model/AuthModel";
import axios from "axios";

const EditNickname = () => {

  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.ProfileManagement>
    >();

  const { control, handleSubmit, trigger, getValues, watch, formState:{errors} } = useForm({ mode: "onChange"})
  const [nickname, setNickname] = useState<string>('');

  // Nickname 중복 확인 상태
  const [nicknameState, setNicknameState] = useState<AuthModel.INicknameModel["state"]>("none")

  // Nickname - 입력 시
  const handleOnChangeNickname = (inputText:string) => {
    // 닉네임 재입력 시 인증 무효화
    setNicknameState("none")
    
    const matchNickname = inputText.match(nicknameRegex)

    // if (matchNickname === null) {
    //   setValidation({...validation, nickname: false})
    // } else {
    //   setValidation({...validation, nickname: true})
    // }
  }

  // Nickname - 중복확인 클릭 시
  const checkNickname = async (nickname: string) => {
    console.log("123");
    // 중복이면 
    await axios.get(`${baseUrl}/api/v1/account/check-nickname/${nickname}`)
    .then((response) => {
        onSuccessCheckNickname({data: response.data.data, status: response.data.status});
    })
    .catch(function (error) {
        console.log("err");
        return { data: null, status: error || 500 };
    })
    
    // 확인 완료
    //setValidation({...validation, nicknameCheck: true})
  }

  //const watchNickname = watch("nickname", false);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        middletitle={"닉네임 변경"}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.paddingContainer}>
        <Title 
          text={"변경할 닉네임을" + "\n" + "입력해주세요"} 
          fontSize={24}
          fontWeight="bold"
          style={{ marginTop: 30, marginBottom: 60 }}
        />
        <View style={[styles.inputWrap]}>
          <Controller
            name="nickname"              
            control={control}
            rules={{
              required: "닉네임을 입력해주세요.", 
              pattern: {
              value: nicknameRegex, // 닉네임 8자 이상이면 인증 안되는 오류
              message: "영문, 한글, 숫자만 가능하며 3~20자로 입력해주세요."
            }}}
            render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
              <>
                <Text style={[styles.label, error ? styles.errorText : null]}>변경할 닉네임</Text>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <TextInput 
                    style={[styles.inputBox, error ? styles.errorUnderline : null]}
                    placeholder="닉네임을 입력해주세요" 
                    onChangeText={(value) => onChange(value) && handleOnChangeNickname(value)} 
                    returnKeyType="done"
                  />
                  <Pressable
                    style={[styles.inputButton]} 
                    //disabled={error}
                    onPress={() => checkNickname(value)}
                  >
                    <Text style={error && styles.textDisabled}>중복확인</Text>
                  </Pressable>
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
                {value && nicknameState === 'fail' && <Text style={styles.errorText}>이미 사용중인 닉네임입니다.</Text>}
                {value && nicknameState === 'success' && <Text style={styles.successText}>사용하실 수 있는 닉네임입니다.</Text>}
              </>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
};

export default EditNickname;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  paddingContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputWrap: {
    width: "100%",
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputBox: {
    flex: 1,
    height: 42,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    borderBottomColor: "#C1C1C1",
    borderBottomWidth: 1,
    fontSize: 14
  },
  inputButton: {
    backgroundColor: "#F2F2F2", 
    padding: 12, 
    borderRadius: 5, 
    marginStart: 10, 
    width: 104, 
    alignItems: "center",
  },
  textDisabled: {
    color: "#AEAEAE",
  },
  secureEyeButton: {
    position: "absolute",
    right: 0,
    bottom: 15
  },
  errorText: {
    color: "#FF4040",
  },
  successText: {
    color: "#00B01C",
  },
})