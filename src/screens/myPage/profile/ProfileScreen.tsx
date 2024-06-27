import React from "react";
import { Platform, StyleSheet, View, Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { Colors } from "../../../styles/Colors";
import { useQuery } from "@tanstack/react-query";
import { ProfileService } from "../../../service/ProfileService";
import { QueryKey } from "../../../statics/constants/Querykey";
import asset from "../../../assets/png";
import { IProfile } from "../../../../types/Profile";
import { ScreenName } from "../../../statics/constants/ScreenName";
const ProfileScreen = ({ navigation }: any) => {
  const baseURL = "https://animores-image.s3.ap-northeast-2.amazonaws.com";

  const { data: profile } = useQuery({
    queryKey: [QueryKey.PROFILE],
    queryFn: () => ProfileService.profile.list(),
  });

  const profiles = [...(profile?.data?.data || [])];

  if (profiles.length < 6) {
    profiles.push({
      id: "add",
      imageUrl: "",
      name: "",
    });
  }

  const handlePress = async (item: IProfile) => {
    if (item.id === "add") {
      navigation.navigate(ScreenName.CreateProfile);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderNavigation
          middletitle="프로필 관리"
          rightTitle={"편집"}
          hasBackButton={true}
          isBlack={true}
          onPressBackButton={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.profileTitleContainer}>
          <View style={styles.profileTitle}>
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
        <View style={[styles.profileTitleContainer, { marginTop: 80 }]}>
          <View style={styles.profileTitle}>
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
          <View style={styles.profileGrid}>
            {profiles.map((item: IProfile) => {
              return (
                <Pressable
                  key={item.id}
                  onPress={() => handlePress(item)}
                  style={styles.profileItem}
                >
                  <Image
                    source={
                      item.id === "add"
                        ? asset.petAdd
                        : { uri: `${baseURL}/${item.imageUrl}` }
                    }
                    style={styles.profileImage}
                  />
                  {item.id === "add"
                    ? <Title text={"프로필 추가"} />
                    : <Title text={item.name} />}
                </Pressable>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  profileTitleContainer: {
    alignItems: "center",
    marginTop: 14,
  },
  profileTitle: {
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
  profileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 40,
  },
  profileItem: {
    alignItems: "center",
    marginBottom: 30,
    width: "50%",
  },
  profileImage: {
    width: 98,
    height: 98,
    borderRadius: 22,
    marginBottom: 10,
  },
});
