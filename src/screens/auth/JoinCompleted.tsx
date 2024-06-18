import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
	EmptyCircleIcon,
	IconSnsApple,
	IconSnsFacebook,
	IconSnsKakao,
	IconSnsNaver,
} from "../../assets/svg";
import InputBox from "../../components/Input/InputBox";
import Title from "../../components/text/Title";
import { AuthModel } from "../../model/AuthModel";
import { AuthService } from "../../service/AuthService";
import { ScreenName } from "../../statics/constants/ScreenName";
import { Colors } from "../../styles/Colors";
import { commonStyles } from "../../styles/commonStyles";
import { setTokens } from "../../utils/storage/Storage";

const JoinCompleted = ({ navigation }: any) => {

  return (
    <SafeAreaView style={styles.container}>
      <Title
        text={"회원가입 완료"}
        fontSize={18}
        fontWeight="bold"
        style={{ textAlign: "center", paddingVertical: 26 }}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
          children={<Title text="확인" color={Colors.White} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default JoinCompleted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  loginButton: {
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: Colors.FB3F7E,
  },
  loginContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
});
