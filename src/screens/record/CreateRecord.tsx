import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigation from "../../navigation/HeaderNavigation";

const CreatRecord = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.Container}>
      <HeaderNavigation
        middletitle="일지 작성하기"
        rightTitle={"완료"}
        hasBackButton={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default CreatRecord;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});
