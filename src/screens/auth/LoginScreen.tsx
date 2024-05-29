import React from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	EmptyCircleIcon,
	IconSnsApple,
	IconSnsFacebook,
	IconSnsKakao,
	IconSnsNaver,
} from "../../assets/svg";
import InputBox from "../../components/Input/InputBox";
import Title from "../../components/text/Title";
import { ScreenName } from "../../statics/constants/ScreenName";
import { Colors } from "../../styles/Colors";
import { commonStyles } from "../../styles/commonStyles";
import { AuthModel } from "../../model/AuthModel";

const LoginScreen = ({ navigation }: any) => {
  const { control, handleSubmit } = useForm();

  const onsubmit = (data: AuthModel.ILoginModel) => {
    console.log("data", data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title
        text={"로그인"}
        fontSize={18}
        fontWeight="bold"
        style={{ textAlign: "center", paddingVertical: 26 }}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <InputBox
          name={"email"}
          placeholder="이메일"
          control={control}
          style={{ marginTop: 40, marginBottom: 10 }}
        />
        <InputBox
          name={"password"}
          placeholder="비밀번호"
          control={control}
          secureTextEntry={true}
        />
        <View style={styles.autoLogin}>
          <EmptyCircleIcon />
          <Title
            text={"자동 로그인"}
            color={Colors.AEAEAE}
            style={{
              marginLeft: 12,
              paddingBottom: 4,
            }}
          />
        </View>
        <Pressable
          onPress={handleSubmit((data) => onsubmit(data))}
          style={styles.loginButton}
          children={<Title text="로그인" color={Colors.White} />}
        />
        <View style={[commonStyles.commonRowContainer, { marginTop: 68 }]}>
          <View style={commonStyles.separator} />
          <Title
            text={"SNS 간편 로그인"}
            color={Colors.AEAEAE}
            style={{ paddingHorizontal: 8 }}
          />
          <View style={commonStyles.separator} />
        </View>
      </View>
      <View style={commonStyles.commonRowContainer}>
        <View style={styles.loginContainer}>
          <Pressable>
            <IconSnsNaver />
          </Pressable>
          <Pressable>
            <IconSnsKakao />
          </Pressable>
          <Pressable>
            <IconSnsFacebook />
          </Pressable>
          <Pressable>
            <IconSnsApple />
          </Pressable>
        </View>
      </View>
      <View style={[commonStyles.commonRowContainer, { marginTop: 92 }]}>
        <Pressable>
          <Title text="아이디 찾기" color={Colors.AEAEAE} />
        </Pressable>
        <View style={commonStyles.verticalBar} />
        <Pressable>
          <Title text="비밀번호 찾기" color={Colors.AEAEAE} />
        </Pressable>
        <View style={commonStyles.verticalBar} />
        <Pressable onPress={() => navigation.navigate(ScreenName.Join)}>
          <Title text="회원가입" fontWeight="bold" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  loginInputWrap: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  checkboxWrap: {
    flexDirection: "row",
    marginTop: 15,
  },
  autoLoginLabel: {
    color: Colors.AEAEAE,
  },
  checkedLabel: {
    color: "#000",
  },
  loginButton: {
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: Colors.FB3F7E,
  },
  autoLogin: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  loginContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
});
