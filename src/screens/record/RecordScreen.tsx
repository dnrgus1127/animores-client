import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecordModel } from "../../model/RecordModel";
import { More, UserImage } from "../../assets/svg";
import Title from "../../components/text/Title";
import { Colors } from "../../statics/styles/Colors";

//TODO: backbutton
const RecordScreen = () => {
  const data = [
    {
      id: 1,
      nickName: "산책이 귀찮은 아빠",
      date: "2023.11.03 10:21 오전",
      contents: "두부랑 마트 다녀왔다 너무 귀찮지만 귀여워서 사진 한 장 찍었다",
    },
    // {
    //   id: 2,
    //   nickName: "사랑꾼 엄마",
    //   date: "2023.11.03 09:30 오전",
    //   contents: "내용내용내용내용내용내용내용내용내용내용내용내용",
    // },
    // {
    //   id: 3,
    //   nickName: "두부조아",
    //   date: "2023.11.02 08:21 오후",
    //   contents: "이건 바로 내용내용내용내용내용내용내용내용내용내용내용내용",
    // },
  ];

  const renderItem = ({ item }: { item: RecordModel.IRecordModel }) => {
    return (
      <View style={styles.RenderItemContainer}>
        <View style={styles.Top}>
          <UserImage />
          <View style={styles.TitleContainer}>
            <Title text={item.nickName} fontSize={16} fontWeight={"bold"} />
            <Title text={item.date} fontSize={14} color={Colors.AEAEAE} />
          </View>
          <More style={styles.MoreIcon} />
        </View>
        <Title text={item.contents} fontSize={14} style={{marginTop: 22}}/>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <HeaderNavigation title="일지" hasBackButton={true} />
      <FlatList
        keyExtractor={(item) => `record-${item.id}`}
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  RenderItemContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  Top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  MoreIcon: {
    alignSelf: "flex-end",
  },
});
