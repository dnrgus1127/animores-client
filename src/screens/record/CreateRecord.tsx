import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigation from "../../navigation/HeaderNavigation";

const CreatRecord = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <HeaderNavigation title="일지 작성하기" hasBackButton={true} />
    </SafeAreaView>
  );
};

export default CreatRecord;

const styles = StyleSheet.create({
  Container: {
    flex: 1, 
  },
});
