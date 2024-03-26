import React from "react";
import { StyleSheet } from "react-native";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const InformationScreen = ({navigation} : any) => {
  return (
    <SafeAreaView style={styles.Container}>
      <HeaderNavigation
        middletitle="이용 안내"
        hasBackButton={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default InformationScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});