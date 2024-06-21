import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import asset from "../../../assets/png";
import Title from "../../../components/text/Title";
import { RootStackParamList } from "../../../navigation/type";
import { ProfileService } from "../../../service/ProfileService";
import { QueryKey } from "../../../statics/constants/Querykey";
import { ScreenName } from "../../../statics/constants/ScreenName";

const ProfilesScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.Profiles>
    >();

  const baseURL = "https://animores-image.s3.ap-northeast-2.amazonaws.com";

  const { data: profile } = useQuery({
    queryKey: [QueryKey.PROFILE],
    queryFn: () => ProfileService.profile.list(),
  });

  const profiles = [...(profile?.data.data || [])];

  if (profiles.length < 6) {
    profiles.push({
      id: "add",
      imageUrl: "",
      name: "",
    });
  }

  const handlePress = async (item) => {
    if (item.id === "add") {
      await AsyncStorage.setItem("profiles", "true");
      navigation.navigate(ScreenName.CreateProfile);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileTitleContainer}>
        <View style={styles.profileGrid}>
          {profiles.map((item) => {
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
                <Title text={item.name} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  profileTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
