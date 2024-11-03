import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useState, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { CommentIcon, More, User, UserImage, ProfileImage as DefaultProfileImage } from "../../assets/svg";
import FloatingButton from "../../components/button/FloatingButton";
import BottomModal from "../../components/modal/BottomModal";
import Title from "../../components/text/Title";
import { DiaryModel } from "../../model/DiaryModel";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { DiaryService } from "../../service/DiaryService";
import { QueryKey } from "../../statics/constants/Querykey";
import { Colors } from "../../styles/Colors";
import CenterModal from "../../components/modal/CenterModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Control, useForm } from "react-hook-form";
import InputBox from "../../components/Input/InputBox";

dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);

const DairyScreen = () => {
  const moreLength = 17; //17자 이상이면 말줄임

  const queryClient = useQueryClient();
  
  const baseUrl = "https://animores-image.s3.ap-northeast-2.amazonaws.com";

  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isFirstVisibleMore, setIsFirstVisibleMore] = useState<boolean>(false); //더보기 모달
  const [isSecondVisibleMore, setIsSecondVisibleMore] = useState<boolean>(false);
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false); //플로팅버튼
  const [isVisibleComment, setIsVisibleComment] = useState<boolean>(false); //댓글 모달
  const [isComment, setIsComment] = useState<boolean>(false); //댓글수
  const [commentDiaryId, setCommentDiaryId] = useState<number | null>(null);  //댓글 diary Id
  const [commentProfileId, setCommentProfileId] = useState<number | null>(null);  //댓글 profile Id
  const [deletedDiaryId, setDeletedDiaryId] = useState<number | null>(null);  //삭제 diary Id
  const [deletedProfileId, setDeletedProfileId] = useState<number | null>(null);  //삭제 profile Id
  
  const [inputText, setInputText] = useState<boolean>(false);

  const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" });
 
  //일지 리스트
  //TODO: profile api 가져와서 profileId에 넣기
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      [QueryKey.DIARY_LIST],
      ({ pageParam = 1 }) => DiaryService.diary.list(1, pageParam, 5),
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
    ({ diaryId, profileId }: { diaryId: number, profileId: number }) =>
      DiaryService.diary.delete(diaryId, profileId),
    {
      onSuccess: async (data) => {
        if (data && data.status === 200) {
          Toast.show({
            type: "success",
            text1: "삭제되었습니다.",
          });

          setIsFirstVisibleMore(false);
          setIsSecondVisibleMore(false);
          await queryClient.invalidateQueries([QueryKey.DIARY_LIST]);
          //일지 목록 쿼리를 무효화함
        }
      },
      onError: (error) => {
        console.error("Delete error:", error);
      },
    }
  );

  const diaryData =
    data?.pages.flatMap((page) => page?.data?.data.diaries) ?? [];

  //더보기
  const toggleExpand = (itemId: number) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  //(댓글 클릭 시) 댓글 불러오기
  const { data: commentList } = useQuery({
    queryKey: [QueryKey.COMMENT_LIST, commentDiaryId],
    queryFn: () => DiaryService.diary.commentList(commentDiaryId, commentProfileId, 1, 15),
    option: {
      enabled: !!commentDiaryId,
    }
    
  });

  const comments = commentList?.data?.comments || [];

  const onsubmit = (data: AuthModel.ILoginModel) => {
    console.log('댓글 생성');
  };

  useEffect(() => {
    //console.log(comments);
  }, [commentDiaryId])

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
              text={dayjs
                .utc(item?.createdAt)
                .utcOffset(9)
                .format("YYYY.MM.DD HH:mm A")}
              color={Colors.AEAEAE}
            />
          </View>
          <Pressable
            onPress={() => {
              setIsFirstVisibleMore(true);
              setDeletedDiaryId(item.diaryId);
              setDeletedProfileId(item.profileId);
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
            getCommentList(item); // 댓글 리스트
            setIsVisibleComment(true); // 댓글 모달 보여짐
          }}
          style={styles.commentIconContainer}
        >
          <CommentIcon />
          {/* TODO:댓글 수 수정 */}
          <Title text={item?.commentCount} color={Colors.AEAEAE} style={{ marginLeft: 8 }} />
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
              console.log(deletedDiaryId, isSecondVisibleMore);
              setIsSecondVisibleMore(true);
            }}
            style={styles.buttonContainer}
          >
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


  const getCommentList = async (item: DiaryModel.IDiaryModel) => {
    if (item.commentCount !== 0) {
      setIsComment(true);
    } else {
      setIsComment(false);
    }
    if (item.diaryId !== null && item.profileId !== null) {
      setCommentDiaryId(item.diaryId);
      setCommentProfileId(item.profileId);
    }
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
        {isComment ? (
          comments.map((item) => {
            return (
              <View style={styles.commentContainer}>
                {item.imageUrl !== null ? (
                  <Image
                      source={{ uri: `${baseUrl}/${item.imageUrl}` }}
                      style={styles.profileImage}
                  />
                ) : (
                  <User />
                )}
                <View style={styles.comment}>
                  <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                    <Title
                      text={"3분 전"}
                      fontSize={12}
                      color={Colors.AEAEAE}
                      style={{ marginLeft: 12 }}
                    />
                  </View>
                  <Title
                    text={item.content}
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
            )
          })
        ) : (          
          <View style={styles.commentContainer}>
            <Title
              text={"댓글이 없습니다."}
              fontSize={14}
              style={{ paddingVertical: 10 }}
            />
          </View>
        )}

        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 10 }}>
          <InputBox
            name={"comment"}
            placeholder="댓글을 입력해주세요"
            control={control}
            onChange={isValid ? setInputText(true) : setInputText(false)}
            style={{ width: "77%", marginRight: "3%" }}
          />
          {isValid ? (
            <Pressable
              onPress={() => console.log('입력')}
              style={[styles.submitButton, { width: "20%" }]}
              disabled={false}
            >
              <Title 
                text="입력" 
                color={Colors.White} 
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => console.log('입력')}
              style={[styles.submitButtonDisabled, { width: "20%" }]}
              disabled={true}
            >
              <Title 
                text="입력" 
                color={Colors.White} 
              />
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  const loadMoreData = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const handleDelete = async () => {
    if (deletedDiaryId !== null && deletedProfileId !== null) {
      mutate({ diaryId: deletedDiaryId, profileId: deletedProfileId });
    } else {
      console.log('diary deleted error')
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
          <HeaderNavigation middletitle="일지" hasBackButton={false} />
          <FlatList
            keyExtractor={(item, index) => `diary-${item?.diaryId}-${index}`}
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
              isVisible={isFirstVisibleMore}
              onClose={() => {
                setIsFirstVisibleMore(false);
              }}
              footer={footerMore}

              // 중첩 모달
              _isVisible={isSecondVisibleMore}
              _onClose={() => setIsSecondVisibleMore(false)}
              _title="게시물을 삭제하시겠어요?"
              _subTitle="삭제 이후에는 게시물이 영구적으로 삭제되며, 복원하실 수 없습니다."
              _onDelete={handleDelete}
            />
            <BottomModal
              isVisible={isVisibleComment}
              onClose={() => {
                setIsVisibleComment(false);
              }}
              footer={footerComment}
            />
          </View>
      </SafeAreaView>
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
    bottom: 70,
    right: 0,
    left: 0,
  },
  submitButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: Colors.FB3F7E,
  },
  submitButtonDisabled: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: Colors.AEAEAE,
  },
  profileImage: {
      alignSelf: "center",
      width: 50,
      height: 50,
      borderRadius: 50
  },
});
