import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  Cancle,
  ProfileImage as DefaultProfileImage,
} from "../../../assets/svg";
import SingleButton from "../../../components/button/SingleButton";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { ProfileService } from "../../../service/ProfileService";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";
import { SecureEyeIcon } from "../../../assets/svg";
import Countdown from "../../../components/Countdown";

const NewPassword = () => {

  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.ProfileManagement>
    >();

  // 패스워드 보이기/가리기 상태
  const [secureText, setScureText] = useState({
    pw: true,
    checkPw: true
  })
    
  // 이메일 인증 카운트
  const [resetCount, setResetCount] = useState(false)

  // 카운트다운
  const afterCountdown = () => {
    //setVerificationState("timeout")
    setResetCount(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        middletitle={"비밀번호 재설정"}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.paddingContainer}>
        <Title 
          text={"새로운 비밀번호를" + "\n" + "변경해주세요"} 
          fontSize={24}
          fontWeight="bold"
          style={{ marginTop: 30, marginBottom: 60 }}
        />
        <View style={[styles.inputWrap, { marginTop: 20 }]}>
          <Text style={[styles.label]}>신규 비밀번호</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <TextInput 
              style={[styles.inputBox, styles.textDisabled]}
              placeholder="8~30자리 영대・소문자, 숫자, 특수문자 조합"
              returnKeyType="done"
              value={"abc@gamil.com"}
              editable={false}
            />
            <Pressable 
                style={styles.secureEyeButton} 
                onPress={() => setScureText({...secureText, pw: !secureText.pw })}
            >
                <SecureEyeIcon color={secureText.pw ? "#1E1E1E" : "#AFAFAF"} />
            </Pressable>
          </View>
          <Text style={styles.errorText}>영문 대문자와 소문자, 숫자, 특수문자를 조합하여 8~30자로 입력해주세요.</Text>
        </View>

        <View style={[styles.inputWrap, { marginTop: 20 }]}>
          <Text style={[styles.label]}>신규 비밀번호 확인</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <TextInput 
              style={[styles.inputBox]}
              placeholder="신규 비밀번호를 한번 더 입력해주세요"
              returnKeyType="done"
            />
            <Pressable 
                style={styles.secureEyeButton} 
                onPress={() => setScureText({...secureText, pw: !secureText.pw })}
            >
                <SecureEyeIcon color={secureText.pw ? "#1E1E1E" : "#AFAFAF"} />
            </Pressable>
          </View>
          <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
        </View>

        <Pressable
          onPress={() => console.log("비밀번호가 변경되었습니다.")}
          style={[styles.primaryLargeButton]}
          children={<Text style={[styles.primaryButtonText]}>변경하기</Text>}
        >
        </Pressable>
      </View>
    </SafeAreaView>
  )
};

export default NewPassword;

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
  primaryLargeButton: {
    marginTop: "auto",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FB3F7E",
  },
  primaryButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  buttonDisabled: {
    backgroundColor: "#F2F2F2",
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