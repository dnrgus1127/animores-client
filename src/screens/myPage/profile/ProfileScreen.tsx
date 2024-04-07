import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TestUser } from "../../../assets/svg";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { Colors } from "../../../styles/Colors";

const ProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.Container}>
      <HeaderNavigation
        middletitle="프로필 관리"
        rightTitle={"편집"}
        hasBackButton={true}
        isBlack={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.ProfileTitleContainer}>
        <View style={styles.ProfileTitle}>
          <Title text={"계정 기본 정보"} fontSize={16} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 34,
        }}
      >
        <Title
          text={"닉네임"}
          color={Colors.AEAEAE}
          style={{ flex: 1, textAlign: "right", marginRight: 40 }}
        />
        <Title text={"달밤의 산책"} fontSize={16} style={{ flex: 1.5 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 19,
        }}
      >
        <Title
          text={"이메일"}
          color={Colors.AEAEAE}
          style={{ flex: 1, textAlign: "right", marginRight: 40 }}
        />
        <Title text={"qwerty@naver.com"} fontSize={16} style={{ flex: 1.5 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 19,
        }}
      >
        <Title
          text={"비밀번호"}
          color={Colors.AEAEAE}
          style={{ flex: 1, textAlign: "right", marginRight: 40 }}
        />
        <Title text={"•••••••••••••••"} fontSize={16} style={{ flex: 1.5 }} />
      </View>
      <View style={[styles.ProfileTitleContainer, { marginTop: 80 }]}>
        <View style={styles.ProfileTitle}>
          <Title text={"프로필 정보"} fontSize={16} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 16,
        }}
      >
        <View style={{ marginRight: 17 }}>
          <TestUser />
          <Title text={"산책은 귀찮은 아빠"} fontWeight="bold" />
        </View>
        <View>
          <TestUser />
          <Title text={"금요일에 만나는 IU"} fontWeight="bold" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  ProfileTitleContainer: {
    alignItems: "center",
    marginTop: 14,
  },
  ProfileTitle: {
    width: 238,
    borderWidth: 1,
    borderColor: Colors.F9F9FB,
    borderRadius: 99,
    alignItems: "center",
    paddingVertical: 14,

    ...Platform.select({
      ios: {
        shadowColor: Colors.Black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        backgroundColor: Colors.F9F9FB,
        elevation: 4,
        shadowColor: "gray",
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
    }),
  },
});
