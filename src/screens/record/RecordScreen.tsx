import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommentIcon, DogImage, More, UserImage } from "../../assets/svg";
import Title from "../../components/text/Title";
import { RecordModel } from "../../model/RecordModel";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { Colors } from "../../statics/styles/Colors";

//TODO: backbutton???
const RecordScreen = () => {
  const moreLength = 17;
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const data = [
    {
      id: 1,
      nickName: "산책이 귀찮은 아빠",
      date: "2023.11.03 10:21 오전",
      contents: "두부랑 마트 다녀왔다 너무 귀찮지만 귀여워서 사진 한 장 찍었다",
      image: <DogImage />,
    },
    {
      id: 2,
      nickName: "사랑꾼 엄마",
      date: "2023.11.03 09:30 오전",
      contents:
        "내용내용내용내용내용내용내용내용내내용내용내용내용내용내용내용내용내용내용내용내용내용",
    },
    {
      id: 3,
      nickName: "두부조아",
      date: "2023.11.02 08:21 오후",
      contents: "이건 바로 내용내용내용내용내용내용내용내용내용내용내용내용",
    },
  ];

  const toggleExpand = (itemId: number) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: RecordModel.IRecordModel;
    index: number;
  }) => {
    const isExist = expandedItems.includes(item.id);

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
        <View style={styles.contentContainer}>
          {isExist ? (
            <Title text={item.contents} fontSize={14} />
          ) : (
            <>
              {item.contents.length < moreLength ? (
                <Title text={item.contents} fontSize={14} />
              ) : (
                <Title
                  text={item.contents.slice(0, moreLength) + "..."}
                  fontSize={14}
                />
              )}
            </>
          )}
          {!isExist && (
            <Pressable
              onPress={() => {
                toggleExpand(item.id);
              }}
            >
              <Title
                text={"더 보기"}
                fontSize={14}
                color={Colors.AEAEAE}
                style={{ marginLeft: 6 }}
              />
            </Pressable>
          )}
        </View>
        {item.image && <View style={{ marginTop: 22 }}>{item.image}</View>}
        <View style={styles.CommentIconContainer}>
          <Pressable>
            <CommentIcon />
          </Pressable>
          {/* TODO:댓글 수 수정 */}
          <Title
            text={"3"}
            fontSize={14}
            color={Colors.AEAEAE}
            style={{ marginLeft: 8 }}
          />
        </View>
        {data.length - 1 !== index && <View style={styles.BottomLine} />}
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
    backgroundColor: Colors.White,
  },
  RenderItemContainer: {
    marginTop: 20,
  },
  Top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  TitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  MoreIcon: {
    alignSelf: "flex-end",
  },
  contentContainer: {
    flexDirection: "row",
    marginTop: 22,
    marginHorizontal: 20,
  },
  CommentIconContainer: {
    flexDirection: "row",
    marginTop: 18,
    marginBottom: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  BottomLine: {
    borderBottomWidth: 8,
    borderBottomColor: Colors.F4F4F4,
  },
});
