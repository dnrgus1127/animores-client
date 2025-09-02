import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../components/text/Title";
import { Colors } from "../../styles/Colors";
import { commonStyles } from "../../styles/commonStyles";
import SocialLogin from "./social/SocialLogin";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title
        text={"PETMILY"}
        fontSize={24}
        fontWeight="bold"
        style={{ textAlign: "center", paddingVertical: 26 }}
      />
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}>
          <Title
            text={"반려동물의 일상과 추억을 한 곳에"}
            fontSize={20}
            fontWeight="bold"
            style={{ textAlign: "center", lineHeight: 26 }}
          />
          <Text
            style={{
              color: Colors.Gray717171,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            스케줄, 할일을 쉽고 편하게 관리하고
          </Text>
          <Text
            style={{
              color: Colors.Gray717171,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            내 반려동물을 자랑해 보세요!
          </Text>
        </View>
        <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
          <SocialLogin />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={styles.textButtonRow}>
            <Pressable>
              <Title text="문의하기" color={Colors.AEAEAE} fontSize={13} />
            </Pressable>
            <View style={commonStyles.verticalBar} />
            <Pressable>
              <Title text="둘러보기" color={Colors.AEAEAE} fontSize={13} />
            </Pressable>
            <View style={commonStyles.verticalBar} />
            <Pressable>
              <Title text="설정하기" color={Colors.AEAEAE} fontSize={13} />
            </Pressable>
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
    justifyContent: "flex-start",
  },
  textButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
