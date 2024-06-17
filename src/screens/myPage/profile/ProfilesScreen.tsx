import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { RootStackParamList } from "../../../navigation/type";
import { ScreenName } from "../../../statics/constants/ScreenName";
import Title from "../../../components/text/Title";
import asset from "../../../assets/png";

const Tab = createBottomTabNavigator();

const ProfilesScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.HomeScreen>
    >();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileTitleContainer}>
        <View style={styles.profileTitle}>
          <Title text={"펫 정보"} fontSize={16} />
          <Title
            text={"0"}
            fontSize={16}
            color={Colors.FB3F7E}
            style={{ marginLeft: 12 }}
          />
        </View>
        <Pressable onPress={() => navigation.navigate(ScreenName.PetType)}>
          <Image source={asset.petAdd} />
          <Title
            text={"펫 추가하기"}
            fontWeight="bold"
            style={{ textAlign: "center" }}
          />
        </Pressable>
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
  profileTitle: {
    width: 238,
    borderWidth: 1,
    borderColor: Colors.F9F9FB,
    borderRadius: 99,
    paddingVertical: 14,
    marginBottom: 43,
    flexDirection: "row",
    justifyContent: "center",

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
