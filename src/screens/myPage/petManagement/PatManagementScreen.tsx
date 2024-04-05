import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import asset from "../../../assets/png";
import Title from "../../../components/text/Title";
import { Colors } from "../../../styles/Colors";
import { ScreenName } from "../../../statics/constants/ScreenName";

const PatManagementScreen = ({ navigation }: any) => {

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
      <Pressable onPress={() => navigation.navigate(ScreenName.AddPet)} style={styles.PetAdd}>
        <Image source={asset.petAdd} />
        <Title
          text={"펫 추가하기"}
          fontWeight="bold"
          style={{ marginTop: 4 }} />
      </Pressable>
    </SafeAreaView>
  );
};

export default PatManagementScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  PetAdd: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});