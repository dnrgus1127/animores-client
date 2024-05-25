import React from "react";
import { StyleSheet } from "react-native";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const AlertSettingScreen = ({navigation} : any) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        middletitle="알림 설정"
        hasBackButton={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default AlertSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});