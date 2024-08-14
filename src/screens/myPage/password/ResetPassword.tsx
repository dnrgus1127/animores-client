import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SingleButton from "../../../components/button/SingleButton";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { ProfileService } from "../../../service/ProfileService";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";
import { DeleteIcon } from "../../../assets/svg";
import Countdown from "../../../components/Countdown";
import { useRecoilValue } from "recoil";
import { UserEmailAtom } from "../../../recoil/AuthAtom";

interface IProps {
  email: string
}

const ResetPassword = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.ProfileManagement>
    >();
    
  // 이메일 인증 카운트
  const [resetCount, setResetCount] = useState(false)

  const userEmail = useRecoilValue(UserEmailAtom);

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
          text={"메일로 인증번호를 발송했습니다" + "\n" + "메일을 확인해주세요"} 
          fontSize={24}
          fontWeight="bold"
          style={{ marginTop: 30, marginBottom: 60 }}
        />
        <View style={[styles.inputWrap, { marginTop: 20 }]}>
          <Text style={[styles.label]}>이메일</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <TextInput 
              style={[styles.inputBox, styles.textDisabled]}
              placeholder="이메일을 입력해주세요"
              returnKeyType="done"
              value={userEmail}
              editable={false}
            />
            <Pressable
              style={[styles.inputButton]} 
              disabled={false}
              onPress={() => console.log("pressed!")}
            >
              <Text>재전송</Text>
            </Pressable>
          </View>
          <Text style={styles.successText}>인증이 완료된 이메일입니다.</Text>
        </View>

        <View style={[styles.inputWrap, { marginTop: 20 }]}>
          <Text style={[styles.label]}>인증번호</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <TextInput 
              style={[styles.inputBox]}
              placeholder="인증번호를 입력해주세요"
              returnKeyType="done"
            />
            <View
              style={{ position: "absolute", bottom: 0, right: 0, flexDirection: "row", height: 30 }}
            >
              <Countdown afterCountdown={afterCountdown} resetCount={resetCount} />
              <Pressable style={{ marginLeft: 8 }}>
                <DeleteIcon />
              </Pressable>
            </View>
          </View>
          <Text style={styles.errorText}>인증번호가 일치하지 않습니다.</Text>
        </View>

        <View style={{ marginTop: "auto" }}>
          <SingleButton
            title={"다음"}
            onPress={() => navigation.navigate(ScreenName.NewPassword)}
          />
        </View>
      </View>
    </SafeAreaView>
  )
};

export default ResetPassword;

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
  errorText: {
    color: "#FF4040",
  },
  successText: {
    color: "#00B01C",
  },
})