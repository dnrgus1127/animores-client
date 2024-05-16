import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions
} from "react-native";
import Toast from 'react-native-toast-message';
import { CommentIcon, More, User, UserImage } from "../../assets/svg";
import FloatingButton from "../../components/button/FloatingButton";
import BottomModal from "../../components/modal/BottomModal";
import Title from "../../components/text/Title";
import { DiaryModel } from "../../model/DiaryModel";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { DiaryService } from "../../service/DiaryService";
import { QueryKey } from "../../statics/constants/Querykey";
import { Colors } from "../../styles/Colors";

dayjs.locale("ko");

const DairyScreen = () => {
  const moreLength = 17; //17자 이상이면 말줄임

  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isVisibleMore, setIsVisibleMore] = useState<boolean>(false); //더보기
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false); //플로팅버튼
  const [isVisibleComment, setIsVisibleComment] = useState<boolean>(false); //댓글
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  //일지 리스트
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      [QueryKey.DIARY_LIST],
      ({ pageParam = 1 }) =>
        DiaryService.diary.list({ page: pageParam, size: 5 }),
      {
        getNextPageParam: (lastPage, allPages) => {
          const totalCount = lastPage?.data.data.totalCount;
          const currentPageDataCount = lastPage.data.data.diaries.length;

          if (currentPageDataCount < totalCount) {
            return allPages.length + 1;
          } else {
            return undefined;
          }
        },
      }
    );

  //일지 삭제
  const mutation = useMutation(
    (diaryId: number) => DiaryService.diary.delete(diaryId),
    {
      onSuccess: data => {
        if (data && data.status === 200) {
          console.log('Delete successful:', data);
          Toast.show({
            type: 'message',
            props: {
              message: '삭제되었습니다.',
            },
            visibilityTime: 2500,
          });
        }
      },
      onError: (error) => {
        console.error('Delete error:', error);
      }
    }
  )

  const diaryData = data?.pages.flatMap((page) => page.data.data.diaries) ?? [];

  //더보기
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
    item: DiaryModel.IDiaryModel;
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
            <Title
              text={item.name}
              fontSize={16}
              fontWeight={"bold"}
              style={{ marginBottom: 2 }}
            />
            <Title
              text={dayjs(item.createdAt).format("YYYY.MM.DD HH:mm a")}
              color={Colors.AEAEAE}
            />
          </View>
          <Pressable
            onPress={() => {
              setIsVisibleMore(true);
              setDeleteItemId(item.diaryId)
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
          <Pressable
            onPress={() => {
              if (deleteItemId !== null) {
                mutation.mutate(deleteItemId);
              }
            }}
            style={styles.ButtonContainer}>
            <Title
              text={"삭제"}
              fontSize={16}
              color={Colors.White}
              style={{ textAlign: "center" }}
            />
          </Pressable>
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

  const loadMoreData = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  return (
    <>
      <HeaderNavigation middletitle="일지" hasBackButton={false} />
      <FlatList
        keyExtractor={(item) => `diary-${item.diaryId}`}
        data={diaryData}
        renderItem={renderItem}
        onEndReachedThreshold={0.6}
        onEndReached={loadMoreData}
      />
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

export default DairyScreen;

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
  LoadingFooter: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
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
