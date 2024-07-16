import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IProfile } from "../../../../types/Profile";
import { EditIconBlack } from "../../../assets/icons";
import asset from "../../../assets/png";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { ProfileService } from "../../../service/ProfileService";
import { QueryKey } from "../../../statics/constants/Querykey";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";

const ProfileManagementScreen = () => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.ProfileManagement>
    >();

  const [nickname, setNickname] = useState<string>('');

  const { data: myProfileInfo } = useQuery({
    queryKey: [QueryKey.MY_PROFILE],
    queryFn: () => ProfileService.profile.myProfile(),
  });

  const { data: profileList } = useQuery({
    queryKey: [QueryKey.PROFILE_LIST],
    queryFn: () => ProfileService.profile.list(),
  });

  const myProfile = myProfileInfo?.data.data;
  const profiles = [...(profileList?.data.data || [])];

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
    } else {
      navigation.navigate(ScreenName.EditProfile, { item });
    }
  };

  useEffect(() => {
    if (myProfile?.nickname) {
      setNickname(myProfile.nickname);
    }
  }, [myProfile]);
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderNavigation
          middletitle="프로필 관리"
          hasBackButton={true}
          onPressBackButton={() => navigation.goBack()}
        />
        <View style={styles.profileTitleContainer}>
          <View style={styles.profileTitle}>
            <Title
              text={"계정 기본 정보"}
              fontSize={16} />
          </View>
        </View>
        <View style={[styles.Row, { marginTop: 34 }]}>
          <Title
            text={"닉네임"}
            color={Colors.AEAEAE}
            style={styles.InfoTitle}
          />
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.input}
              value={nickname}
              onChangeText={setNickname}
            />
            <EditIconBlack style={{ alignSelf: "center" }} />
          </View>
        </View>
        <View style={[styles.Row, { marginTop: 20 }]}>
          <Title
            text={"이메일"}
            color={Colors.AEAEAE}
            style={styles.InfoTitle}
          />
          <View style={styles.TextInputContainer}>
            <Title
              text={myProfile?.email}
              fontSize={16} />
          </View>
        </View>
        <View style={[styles.Row, { marginTop: 20 }]}>
          <Title
            text={"비밀번호"}
            color={Colors.AEAEAE}
            style={{ flex: 1, textAlign: "right", marginRight: 40 }}
          />
          {/* TODO: 비밀번호 변경 페이지로 이동 */}
          <Pressable style={styles.TextInputContainer} onPress={() => navigation.navigate(ScreenName.UserVerification)}>
            <Title
              text={"•••••••••••••••"}
              fontSize={16}
              style={styles.input} />
            <EditIconBlack style={{ alignSelf: "center" }} />
          </Pressable>
        </View>
        <View style={[styles.profileTitleContainer, { marginTop: 80 }]}>
          <View style={styles.profileTitle}>
            <Title
              text={"프로필 정보"}
              fontSize={16} />
          </View>
        </View>
        {profiles && (
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
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
                          : { uri: `${baseUrl}/${item.imageUrl}` }
                      }
                      style={styles.profileImage}
                    />
                    <Title text={item.id === "add" ? "프로필 추가" : item.name} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileManagementScreen;

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
  editIcon: {
    position: "absolute",
    top: 39,
    width: 24,
    height: 24,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Black,
    fontSize: 16,
    marginRight: 7
  },
  InfoTitle: {
    flex: 1,
    textAlign: "right",
    marginRight: 40
  },
  TextInputContainer: {
    flexDirection: 'row',
    flex: 1.5
  },
  Row: {
    flexDirection: "row",
    alignItems: "center"
  }
});
