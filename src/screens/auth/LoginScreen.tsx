import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Title from "../../components/text/Title";
import { AuthModel } from "../../model/AuthModel";
import { AuthService } from "../../service/AuthService";
import { ScreenName } from "../../statics/constants/ScreenName";
import { Colors } from "../../styles/Colors";
import { commonStyles } from "../../styles/commonStyles";
import { setTokens } from "../../utils/storage/Storage";
import SocialLogin from "./social/SocialLogin";


const LoginScreen = ({ navigation }: any) => {
  const { control, handleSubmit } = useForm<AuthModel.ILoginModel>();
  const loginFunction = async (input: AuthModel.ILoginModel): Promise<AuthModel.ILoginResponseModel> => {
    return await AuthService.Auth.login(input.email, input.password);
  };

  const { isLoading, mutate } = useMutation<AuthModel.ILoginResponseModel, Error, AuthModel.ILoginModel>(loginFunction, {
    onSuccess: (response) => {
      if (response.success) {
        const { accessToken, refreshToken } = response.data;
        if (accessToken && refreshToken) {
          setTokens(accessToken, refreshToken);
          AsyncStorage.setItem("userToken", accessToken);
        }
        Toast.show({
          type: "success",
          text1: "로그인 성공",
        });
        navigation.navigate(ScreenName.Profiles);
      } else {
        Toast.show({
          type: "error",
          text1: "아이디 또는 비밀번호를 다시 입력해주세요.",
        });
      }
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
      Toast.show({
        type: "error",
        text1: "로그인을 실패하셨습니다.",
      });
    },
  });

  const onsubmit = (data: AuthModel.ILoginModel) => {
    mutate(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title
        text={"PETMILY"}
        fontSize={24}
        fontWeight="bold"
        style={{ textAlign: "center", paddingVertical: 26 }}
      />
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
          <Title
            text={"반려동물의 일상과 추억을 한 곳에"}
            fontSize={20}
            fontWeight="bold"
            style={{ textAlign: 'center', lineHeight: 26 }}
          />
          <Text style={{ color: Colors.Gray717171, textAlign: 'center', fontSize: 16 }}>스케줄, 할일을 쉽고 편하게 관리하고</Text>
          <Text style={{ color: Colors.Gray717171, textAlign: 'center', fontSize: 16 }}>내 반려동물을 자랑해 보세요!</Text>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <SocialLogin />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={styles.textButtonRow}>
            <Pressable><Title text="문의하기" color={Colors.AEAEAE} fontSize={13} /></Pressable>
            <View style={commonStyles.verticalBar} />
            <Pressable><Title text="둘러보기" color={Colors.AEAEAE} fontSize={13} /></Pressable>
            <View style={commonStyles.verticalBar} />
            <Pressable><Title text="설정하기" color={Colors.AEAEAE} fontSize={13} /></Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'flex-start',
  },
  mainLoginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#fb3f7e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  textButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
