import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";
import {
  AlertIcon,
  CustomerServiceIcon,
  InformationIcon,
  LogoutIcon,
  NoticeIcon,
  PetIcon,
  ProfileIcon,
  VersionIcon,
  WithdrawIcon,
} from "../../assets/svg";
import Title from "../../components/text/Title";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { ScreenName } from "../../statics/constants/ScreenName";
import { Colors } from "../../styles/Colors";

interface IMypageList {
  id: number;
  name: string;
  image: React.FC<SvgProps>;
  screen?: any;
}

const MypageScreen = ({ navigation }: any) => {
  const myPageTopList: IMypageList[] = [
    {
      id: 1,
      name: "프로필 및 계정 관리",
      image: ProfileIcon,
      screen: ScreenName.Profile,
    },
    {
      id: 2,
      name: "펫 관리",
      image: PetIcon,
      screen: ScreenName.PatManagement,
    },
    {
      id: 3,
      name: "알림 설정",
      image: AlertIcon,
      screen: ScreenName.AlertSetting,
    },
  ];

  const myPageBottomList: IMypageList[] = [
    { id: 4, name: "공지 사항", image: NoticeIcon, screen: ScreenName.Notice },
    {
      id: 5,
      name: "고객 센터",
      image: CustomerServiceIcon,
      screen: ScreenName.CustomerService,
    },
    {
      id: 6,
      name: "이용 안내",
      image: InformationIcon,
      screen: ScreenName.Information,
    },
  ];

  return (
    <SafeAreaView style={styles.Container}>
      <HeaderNavigation
        middletitle="마이페이지"
        hasBackButton={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.TopBackground}>
        <View style={styles.GrayBackground}>
          {myPageTopList.map((m: IMypageList, index: number) => {
            return (
              <Pressable
                key={m.id}
                onPress={() => navigation.navigate(m.screen)}
                style={[
                  styles.MyPageContainer,
                  { paddingTop: index === 0 ? 30 : 0 },
                ]}
              >
                <m.image />
                <Title text={m.name} style={{ marginLeft: 10 }} />
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={styles.BottomBackground}>
        <View style={styles.WhiteBackground}>
          {myPageBottomList.map((m: IMypageList, index: number) => {
            return (
              <Pressable
                key={m.id}
                onPress={() => navigation.navigate(m.screen)}
                style={[
                  styles.MyPageContainer,
                  { paddingTop: index === 0 ? 30 : 0 },
                ]}
              >
                <m.image />
                <Title text={m.name} style={{ marginLeft: 10 }} />
              </Pressable>
            );
          })}
          <View style={styles.VersionInformationContainer}>
            <View style={{ flexDirection: "row" }}>
              <VersionIcon />
              <Title text={"버전 정보"} style={{ marginLeft: 10 }} />
            </View>
            <Title text={"최신 버전 입니다"} color={Colors.AEAEAE} />
          </View>
        </View>
        <View style={styles.LogoutContainer}>
          <Pressable style={styles.RowView}>
            <LogoutIcon />
            <Title
              text={"로그아웃"}
              color={Colors.AEAEAE}
              style={{ marginLeft: 10 }}
            />
          </Pressable>
          <View
            style={{
              borderWidth: 1.5,
              borderColor: Colors.F4F4F4,
              marginHorizontal: 18,
            }}
          />
          <Pressable style={styles.RowView}>
            <WithdrawIcon />
            <Title
              text={"탈퇴하기"}
              color={Colors.AEAEAE}
              style={{ marginLeft: 10 }}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MypageScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  MyPageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 30,
    marginHorizontal: 20,
  },
  TopBackground: {
    backgroundColor: "white",
    paddingVertical: 22,
    paddingHorizontal: 20,
  },
  BottomBackground: {
    backgroundColor: Colors.F9F9FB,
    paddingVertical: 22,
    flex: 1,
    paddingHorizontal: 20,
  },
  WhiteBackground: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  GrayBackground: {
    backgroundColor: Colors.F9F9FB,
    borderRadius: 20,
  },
  RowView: {
    flexDirection: "row",
  },
  LogoutContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  VersionInformationContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: "space-between",
  },
});