import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../components/text/Title";
import { AuthModel } from "../../model/AuthModel";
import { ScreenName } from "../../statics/constants/ScreenName";
import { Colors } from "../../styles/Colors";
import { commonStyles } from "../../styles/commonStyles";
import { IconComplete } from '../../assets/svg';
import { setTokens } from "../../utils/storage/Storage";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/type";

const JoinCompleted = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, ScreenName.JoinCompleted>>();

  const userNickname = "달밤의 산책"

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, flexDerection: "row", justifyContent: "center" }}>
        <View style={{ alignItems: "center", paddingBottom: 45 }}>
          <IconComplete />
          <Title
            text={"회원가입 완료"}
            fontSize={24}
            fontWeight="bold"
            style={{ alignItems: "center", paddingTop: 26 }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Title
            text={`환영합니다! ${userNickname} 님`}
            fontSize={16}
            color={Colors.Gray717171}
          />
          <Title 
            text={"가입이 완료 되었습니다."} 
            fontSize={16} 
            color={Colors.Gray717171} 
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, paddingBottom: 34 }}>
        <Pressable
          onPress={() => navigation.navigate("Login")}
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
    width: "100%",
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: Colors.FB3F7E,
  },
});
