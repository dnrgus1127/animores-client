import React from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { Colors } from "../../statics/styles/Colors";
import Title from "../../components/text/Title";
import { AddImage } from "../../assets/svg";

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
      <ScrollView>
        <TextInput
          multiline
          numberOfLines={20}
          placeholder="내용을 작성해주세요"
          style={{
            padding: 16,
            textAlignVertical: "top",
          }}
        />
        <View style={styles.BottomLine} />
        <View style={styles.ImageContainer}>
          <Title text={"사진 등록"} />
          <AddImage style={{ marginTop: 11 }} />
        </View>
        <View style={styles.VideoContainer}>
          <Title text={"동영상 등록 (최대 60초)"} />
          <AddImage style={{ marginTop: 11 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatRecord;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  BottomLine: {
    borderBottomWidth: 6,
    borderBottomColor: Colors.F4F4F4,
  },
  ImageContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 34,
  },
  VideoContainer: {
    marginLeft: 20,
    marginBottom: 34,
  },
});
