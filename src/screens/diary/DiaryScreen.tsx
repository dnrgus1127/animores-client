import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View
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
import CenterModal from "../../components/modal/CenterModal";

dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);

const DairyScreen = () => {
  const moreLength = 17; //17자 이상이면 말줄임

  const queryClient = useQueryClient();

  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isVisibleMore, setIsVisibleMore] = useState<boolean>(false); //더보기 모달
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false); //플로팅버튼
  const [isVisibleComment, setIsVisibleComment] = useState<boolean>(false); //댓글
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  //일지 리스트
  //TODO: profile api 가져와서 profileId에 넣기
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      [QueryKey.DIARY_LIST],
      ({ pageParam = 1 }) =>
        DiaryService.diary.list(1, pageParam, 5),
      {
        getNextPageParam: (lastPage, allPages) => {
          const totalCount = lastPage?.data?.data.totalCount;
          const currentPageDataCount = lastPage?.data?.data.diaries.length;

          if (currentPageDataCount < totalCount) {
            return allPages.length + 1;
          } else {
            return undefined;
          }
        },
      }
    );

  //일지 삭제
  const { mutate } = useMutation(
    (diaryId: number) => DiaryService.diary.delete(diaryId),
    {
      onSuccess: async data => {
        if (data && data.status === 200) {
          Toast.show({
            type: 'success',
            text1: '삭제되었습니다.',
          });

          setIsVisibleMore(false);
          await queryClient.invalidateQueries([QueryKey.DIARY_LIST]);
          //일지 목록 쿼리를 무효화함
        }
      },
      onError: (error) => {
        console.error('Delete error:', error);
      }
    }
  )

  const diaryData = data?.pages.flatMap((page) => page?.data?.data.diaries) ?? [];

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
    const isExist = expandedItems.includes(item?.diaryId);

    const contentToShow =
      item?.content.length > moreLength
        ? item?.content.slice(0, moreLength) + "..."
        : item?.content;

    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.top}>
          <UserImage />
          <View style={styles.titleContainer}>
            <Title
              text={item?.name}
              fontSize={16}
              fontWeight={"bold"}
              style={{ marginBottom: 2 }}
            />
            <Title
              text={dayjs.utc(item?.createdAt).utcOffset(9).format("YYYY.MM.DD HH:mm A")}
              color={Colors.AEAEAE}
            />
          </View>
          <Pressable
            onPress={() => {
              setIsVisibleMore(true);
              setDeleteItemId(item.diaryId)
            }}
          >
            <More style={styles.moreIcon} />
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <Title text={contentToShow} />
          {!isExist && item?.content.length > moreLength && (
            <Pressable
              onPress={() => {
                toggleExpand(item?.diaryId);
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
        {item?.imageUrl && (
          <View style={{ marginTop: 22 }}>{/* TODO: 이미지 */}</View>
        )}
        <Pressable
          onPress={() => {
            setIsVisibleComment(true);
          }}
          style={styles.commentIconContainer}
        >
          <CommentIcon />
          {/* TODO:댓글 수 수정 */}
          <Title text={"3"} color={Colors.AEAEAE} style={{ marginLeft: 8 }} />
        </Pressable>
        {index !== diaryData?.length - 1 && <View style={styles.bottomLine} />}
      </View>
    );
  };

  //더보기 모달 footer
  const footerMore = (): React.ReactNode => {
    return (
      <View style={styles.bottomModalContainer}>
        <View style={styles.footerTopLine} />
        <View style={[styles.footer, { marginTop: 33 }]}>
          <View style={[styles.buttonContainer, { marginRight: 10 }]}>
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
                // mutate(deleteItemId);
                setIsModalVisible(true);
              }
            }}
            style={styles.buttonContainer}>
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
      <View style={styles.bottomModalContainer}>
        <View style={styles.footerTopLine} />
        <Title
          text={"댓글"}
          fontSize={16}
          style={{ textAlign: "center", marginTop: 10 }}
        />
        <View style={styles.commentContainer}>
          <User />
          <View style={styles.comment}>
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
        keyExtractor={(item) => `diary-${item?.diaryId}`}
        data={diaryData}
        renderItem={renderItem}
        onEndReachedThreshold={0.6}
        onEndReached={loadMoreData}
      />
      {/* 플로팅 버튼 */}
      <View
        style={[
          styles.floatingButtonContainer,
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
        <CenterModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      </View>
    </>
  );
};

export default DairyScreen;

const styles = StyleSheet.create({
  renderItemContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.White,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  moreIcon: {
    alignSelf: "flex-end",
  },
  contentContainer: {
    flexDirection: "row",
    marginTop: 22,
    marginHorizontal: 20,
  },
  commentIconContainer: {
    flexDirection: "row",
    marginTop: 18,
    marginBottom: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  bottomLine: {
    borderBottomWidth: 6,
    borderBottomColor: Colors.F4F4F4,
  },
  bottomModalContainer: {
    marginTop: 15,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  loadingFooter: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
  footerTopLine: {
    backgroundColor: Colors.Gray838383,
    height: 1.5,
    width: 50,
    alignSelf: "center",
  },
  commentContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    marginTop: 20,
  },
  comment: {
    backgroundColor: Colors.F4F4F4,
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonContainer: {
    backgroundColor: Colors.FB3F7E,
    flex: 1,
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  },
  createRocordIcon: {
    position: "absolute",
    bottom: 68,
    right: 0,
    zIndex: 1,
  },
  cancleIconContainer: {
    marginTop: 27,
    alignItems: "flex-end",
    marginRight: 12,
  },
  pinkButtonContainer: {
    marginRight: 20,
  },
  pinkButton: {
    backgroundColor: Colors.FB3F7E,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
});
