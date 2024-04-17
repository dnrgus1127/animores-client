import React from "react";
import { Image, Platform, Pressable, StyleSheet, View } from "react-native";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import asset from "../../../assets/png";
import Title from "../../../components/text/Title";
import { Colors } from "../../../styles/Colors";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/type";

const PatManagementScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, ScreenName.PatManagement>>();

  return (
    <SafeAreaView style={styles.Container}>
      <HeaderNavigation
        middletitle="펫 관리"
        hasBackButton={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
        rightTitle="편집"
        isBlack={true}
      />
      <View style={styles.ProfileTitleContainer}>
        <View style={styles.ProfileTitle}>
          <Title text={"펫 정보"} fontSize={16} />
          <Title
            text={"0"}
            fontSize={16}
            color={Colors.FB3F7E}
            style={{ marginLeft: 12 }}
          />
        </View>
        <Pressable onPress={() => navigation.navigate(ScreenName.AddPetScreen)}>
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

export default PatManagementScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  ProfileTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ProfileTitle: {
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
