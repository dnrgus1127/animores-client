import React from "react";
import { StyleSheet } from "react-native";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const PatManagementScreen = ({navigation} : any) => {
  return (
    <SafeAreaView style={styles.Container}>
      <HeaderNavigation
        middletitle="펫 관리"
        hasBackButton={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default PatManagementScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});