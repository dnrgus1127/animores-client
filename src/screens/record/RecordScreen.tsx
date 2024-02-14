import React from "react";
import { StyleSheet, View, Text } from "react-native";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { SafeAreaView } from "react-native-safe-area-context";

const RecordScreen = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <HeaderNavigation title="일지" hasBackButton={false} />
      <Text>일지</Text>
    </SafeAreaView>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});
