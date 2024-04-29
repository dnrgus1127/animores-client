import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useInfiniteQuery } from "react-query";
import { CommentIcon, More, User, UserImage } from "../../assets/svg";
import FloatingButton from "../../components/button/FloatingButton";
import BottomModal from "../../components/modal/BottomModal";
import Title from "../../components/text/Title";
import { RecordModel } from "../../model/RecordModel";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { RecordService } from "../../service/RecordService";
import { Colors } from "../../styles/Colors";

const RecordScreen = () => {
  const moreLength = 17;

  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isVisibleMore, setIsVisibleMore] = useState<boolean>(false); //더보기
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false); //플로팅버튼
  const [isVisibleComment, setIsVisibleComment] = useState<boolean>(false); //댓글

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["recordList"],
    queryFn: ({ pageParam = 1 }) =>
      RecordService.Record.list({ page: pageParam, size: 15 }),
  });

  const diaryData = data?.pages[0].data.data;

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
    const isExist = expandedItems.includes(item.diaryId);

    const contentToShow =
      item.content.length > moreLength
        ? item.content.slice(0, moreLength) + "..."
        : item.content;

    return (
      <View style={styles.RenderItemContainer}>
        <View style={styles.Top}>
          <UserImage />
          <View style={styles.TitleContainer}>
            <Title text={item.name} fontSize={16} fontWeight={"bold"} />
            <Title text={item.createdAt} color={Colors.AEAEAE} />
          </View>
          <Pressable
            onPress={() => {
              setIsVisibleMore(true);
            }}
          >
            <More style={styles.MoreIcon} />
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <Title text={contentToShow} />
          {!isExist && item.content.length > moreLength && (
            <Pressable
              onPress={() => {
                toggleExpand(item.diaryId);
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
        {item.imageUrl && (
          <View style={{ marginTop: 22 }}>{/* TODO: 이미지 */}</View>
        )}
        <Pressable
          onPress={() => {
            setIsVisibleComment(true);
          }}
          style={styles.CommentIconContainer}
        >
          <CommentIcon />
          {/* TODO:댓글 수 수정 */}
          <Title text={"3"} color={Colors.AEAEAE} style={{ marginLeft: 8 }} />
        </Pressable>
        {index !== diaryData.length - 1 && <View style={styles.BottomLine} />}
      </View>
    );
  };

  //더보기 모달 footer
  const footerMore = (): React.ReactNode => {
    return (
      <View style={styles.BottomModalContainer}>
        <View style={styles.FooterTopLine} />
        <View style={[styles.Footer, { marginTop: 33 }]}>
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

  //댓글 모달 footer
  const footerComment = (): React.ReactNode => {
    return (
      <View style={styles.BottomModalContainer}>
        <View style={styles.FooterTopLine} />
        <Title
          text={"댓글"}
          fontSize={16}
          style={{ textAlign: "center", marginTop: 10 }}
        />
        <View style={styles.CommentContainer}>
          <User />
          <View style={styles.Comment}>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Title text={"사랑꾼 엄마"} fontWeight="bold" fontSize={16} />
              <Title
                text={"3분 전"}
                fontSize={12}
                color={Colors.AEAEAE}
                style={{ marginLeft: 12 }}
              />
            </View>
            <Title
              text={"아이고 이뻐라~ ❤️"}
              fontSize={14}
              style={{ marginTop: 8 }}
            />
          </View>
          <Title
            text={"답글 달기"}
            fontSize={14}
            color={Colors.AEAEAE}
            style={{ marginLeft: 12, alignSelf: "flex-end" }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <HeaderNavigation middletitle="일지" hasBackButton={false} />
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => `record-${item.diaryId}`}
          data={diaryData?.diaries}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
      {/* 플로팅 버튼 */}
      <View
        style={[
          styles.FloatingButtonContainer,
          {
            backgroundColor: isVisibleMenu
              ? "rgba(0, 0, 0, 0.5)"
              : "transparent",
            zIndex: isVisibleMenu ? 1 : 0,
            top: isVisibleMenu ? 0 : null,
          },
        ]}
      >
        <FloatingButton
          isVisibleMenu={isVisibleMenu}
          onPressCancel={() => setIsVisibleMenu(false)}
          onPressFloating={() => setIsVisibleMenu(!isVisibleMenu)}
        />
        {/* 모달 */}
        <BottomModal
          isVisible={isVisibleMore}
          onClose={() => {
            setIsVisibleMore(false);
          }}
          footer={footerMore}
        />
        <BottomModal
          isVisible={isVisibleComment}
          onClose={() => {
            setIsVisibleComment(false);
          }}
          footer={footerComment}
        />
      </View>
    </>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  RenderItemContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.White,
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
    borderBottomWidth: 6,
    borderBottomColor: Colors.F4F4F4,
  },
  BottomModalContainer: {
    marginTop: 15,
  },
  Footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  FooterTopLine: {
    backgroundColor: Colors.Gray838383,
    height: 1.5,
    width: 50,
    alignSelf: "center",
  },
  CommentContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    marginTop: 20,
  },
  Comment: {
    backgroundColor: Colors.F4F4F4,
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
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
  FloatingButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
});
