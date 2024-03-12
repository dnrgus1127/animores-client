import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AddIcon,
  CancleIcon,
  CommentIcon,
  CreateRocordButton,
  DogImage,
  More,
  UserImage,
  WriteIcon,
} from "../../assets/svg";
import BottomModal from "../../components/modal/BottomModal";
import Title from "../../components/text/Title";
import { RecordModel } from "../../model/RecordModel";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { ScreenName } from "../../statics/constants/ScreenName";
import { Colors } from "../../statics/styles/Colors";

const RecordScreen = ({ navigation }: any) => {
  const moreLength = 17;

  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);

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
            <Title text={item.date} color={Colors.AEAEAE} />
          </View>
          <Pressable
            onPress={() => {
              setIsVisible(true);
            }}
          >
            <More style={styles.MoreIcon} />
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          {isExist ? (
            <Title text={item.contents} />
          ) : (
            <>
              {item.contents.length < moreLength ? (
                <Title text={item.contents} />
              ) : (
                <Title text={item.contents.slice(0, moreLength) + "..."} />
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
          <Title text={"3"} color={Colors.AEAEAE} style={{ marginLeft: 8 }} />
        </View>
        {data.length - 1 !== index && <View style={styles.BottomLine} />}
      </View>
    );
  };

  //모달 footer
  const footer = (): React.ReactNode => {
    return (
      <View style={styles.FooterContainer}>
        <View style={styles.FooterTopLine} />
        <View style={styles.Footer}>
          <View style={[styles.ButtonContainer, { marginRight: 10 }]}>
            <Title
              text={"수정"}
              fontSize={16}
              color={Colors.White}
              style={{ textAlign: "center" }}
            />
          </View>
          <View style={styles.ButtonContainer}>
            <Title
              text={"삭제"}
              fontSize={16}
              color={Colors.White}
              style={{ textAlign: "center" }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView>
        <HeaderNavigation middletitle="일지" hasBackButton={false} />
        <FlatList
          keyExtractor={(item) => `record-${item.id}`}
          data={data}
          renderItem={renderItem}
        />
      </SafeAreaView>
      {/* 플로팅 버튼 */}
      <SafeAreaView
        style={[
          styles.Container,
          {
            backgroundColor: isVisibleMenu
              ? "rgba(0, 0, 0, 0.5)"
              : Colors.White,
            position: isVisibleMenu ? "absolute" : "relative",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: isVisibleMenu ? 10 : 0,
          },
        ]}
      >
        <Pressable
          style={styles.CreateRocordIcon}
          onPress={() => {
            setIsVisibleMenu(!isVisibleMenu);
            startButtonAnimation();
          }}
        >
          {isVisibleMenu ? (
            <View style={styles.PinkButtonContainer}>
              <Pressable
                onPress={() => {
                  navigation.navigate(ScreenName.AddTodo);
                }}
                style={styles.PinkButton}
              >
                <Title
                  text={"일정 추가"}
                  fontSize={16}
                  color={Colors.White}
                  style={{
                    textAlign: "center",
                    marginRight: 12,
                    paddingBottom: 3,
                  }}
                />
                <AddIcon />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate(ScreenName.CreateRecord);
                }}
                style={[styles.PinkButton, { marginTop: 16 }]}
              >
                <Title
                  text={"일지 쓰기"}
                  fontSize={16}
                  color={Colors.White}
                  style={{
                    textAlign: "center",
                    marginRight: 12,
                    paddingBottom: 3,
                  }}
                />
                <WriteIcon />
              </Pressable>
              <Pressable
                onPress={() => {
                  setIsVisibleMenu(false);
                }}
                style={styles.CancleIconContainer}
              >
                <CancleIcon />
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={styles.CreateRocordIcon}
              onPress={() => {
                setIsVisibleMenu(!isVisibleMenu);
              }}
            >
              <CreateRocordButton />
            </Pressable>
          )}
        </Pressable>
        <BottomModal
          isVisible={isVisible}
          onClose={() => {
            setIsVisible(false);
          }}
          footer={footer}
          style={{ justifyContent: "flex-end" }}
        />
      </SafeAreaView>
    </>
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
  FooterContainer: {
    position: "absolute",
    bottom: 34,
    width: "100%",
  },
  Footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  FooterTopLine: {
    backgroundColor: Colors.Gray838383,
    height: 1.5,
    width: 50,
    marginBottom: 33,
    alignSelf: "center",
  },
  ButtonContainer: {
    backgroundColor: Colors.FB3F7E,
    flex: 1,
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  },
  CreateRocordIcon: {
    position: "absolute",
    bottom: 68,
    right: 0,
    zIndex: 1,
  },
  CancleIconContainer: {
    marginTop: 27,
    alignItems: "flex-end",
    marginRight: 12,
  },
  PinkButtonContainer: {
    marginRight: 20,
  },
  PinkButton: {
    backgroundColor: Colors.FB3F7E,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
  },
});
