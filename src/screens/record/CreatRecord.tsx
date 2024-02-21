import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import Title from "../../components/text/Title";
import { Colors } from "../../statics/styles/Colors";

const CreatRecord = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <Title
        text={"일지작성"}
        fontSize={16}
        style={{ textAlign: "center" }}
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
