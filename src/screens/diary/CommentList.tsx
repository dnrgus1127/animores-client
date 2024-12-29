import React, { useState } from 'react';
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Image, 
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Toast from "react-native-toast-message";
import { User } from "../../assets/svg";
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { DiaryService } from "../../service/DiaryService";
import { QueryKey } from "../../statics/constants/Querykey";
import { Colors } from "../../styles/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useController, Controller, Control, useForm } from "react-hook-form";
import InputBox from "../../components/Input/InputBox";
import Title from "../../components/text/Title";
import BottomModal from "../../components/modal/BottomModal";

export interface CommentProps {
  visible: boolean;
  onClose: () => void;
  commentDiaryId: string;
  isComment: boolean;
  commentProfileId: number;
}

const items = [
  { id: 1, title: "Content 1" },
  { id: 2, title: "Content 2" },
  { id: 3, title: "Content 3" },
];

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Test = (props: CommentProps) => {
  const { visible, onClose, commentDiaryId, isComment, commentProfileId } = props;

  const baseUrl = "https://animores-image.s3.ap-northeast-2.amazonaws.com";

  const [modalVisible, setModalVisible] = useState(false);
  const [isVisibleComment, setIsVisibleComment] = useState<boolean>(false); //댓글 모달
  const [isInputText, setIsInputText] = useState<boolean>(false);
  const translateY = new Animated.Value(SCREEN_HEIGHT);

  const methods = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const { control, addComment: formSubmit } = methods;
  const { field } = useController({
    control,
    name: 'comment',
    rules: { required: true },
  });

  //(댓글 클릭 시) 댓글 불러오기
  const { data: commentList } = useQuery({
    queryKey: [QueryKey.COMMENT_LIST, commentDiaryId],
    queryFn: () => DiaryService.diary.commentList(commentDiaryId, commentProfileId, 1, 15),
    option: {
      enabled: !!commentDiaryId,
    }
  });

  const comments = commentList?.data?.comments || [];
  
  const gestures = comments.reduce((acc, item) => {
    acc[item.commentId] = new Animated.Value(0);
    return acc;
  }, {});

  // 댓글 등록
  const { mutate } = useMutation(
    ({profileId, diaryId, content}: {profileId: number, diaryId: number, content: string}) =>
      DiaryService.diary.addComment(1, diaryId, content),
    {
      onSuccess: async (data) => {
        if (data && data.status === 200) {
          Toast.show({
            type: 'success',
            text1: '댓글이 등록되었습니다.',
          });
        }
      },
      onError: (error) => {
        console.error('Comment error:', error);
      },
      //onSettled: () => { console.log('결과에 관계 없이 무언가 실행됨') }
    }
  )

  // 댓글 입력버튼 클릭 시
  const addComment = async(data) => {
    const profile = await AsyncStorage.getItem("userInfo");

    if (profile) {
      const parsedProfile = JSON.parse(profile);
      const profileId = parsedProfile.id
      const content = methods.getValues('comment');

      mutate({profileId: profileId, diaryId: commentDiaryId, content: content});
      //console.log('data:', profileId, commentDiaryId, content);
    } else {
      console.error("comment error!");
    }
  }

  // 댓글 입력 시
  const handleOnChangeComment = (inputText:string) => {
    if(inputText !== ''){
      setIsInputText(true);
    } else {
      setIsInputText(false);
    }
  }

  const CommentList = () => {
    const [visibleItem, setVisibleItem] = useState(null);

    const resetAllGestures = (exceptId) => {
      Object.keys(gestures).forEach((key) => {
        if (parseInt(key) !== exceptId) {
          Animated.spring(gestures[key], {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      });
    };

    const handleGestureEvent = (id) => Animated.event(
      [{ nativeEvent: { translationX: gestures[id] } }],
      { useNativeDriver: true }
    );

    const handleGestureStateChange = (id) => (event) => {
      if (event.nativeEvent.state === State.END) {
        const { translationX } = event.nativeEvent;

        if (Math.abs(translationX) > 20) {
          // One of the content has been swiped - reset others
          resetAllGestures(id);
        }

        if (translationX > 50) {
          // Swipe Right - Move modal content right
          animateSwipe(id, 0);
        } else if (translationX < -50) {
          // Swipe Left - Move modal content left
          animateSwipe(id, -80);
        } else {
          resetPosition(id);
        }
      }
    }

    const animateSwipe = (id, toValue) => {
      const others = items.filter((el, index) => { 
          el.id !== visibleItem
      });
      console.log(others.map((el) => el.id));
      Animated.spring(gestures[id], {
        toValue,
        useNativeDriver: true,
      }).start(() => {
        // Reset the swipe animation after the effect
        //resetPosition(id);
      });
    };

    const resetPosition = (id) => {
      Animated.spring(gestures[id], {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    };

    const Separator = () => {
      return (
          <View style={{width: 24, height: 1, backgroundColor: '#fff', marginVertical: 15}}/>
      );
    }
    
    return (
      <View 
        style={{ 
          //flex: 1, 
          //justifyContent: "flex-end" 
        }}
      >
        <View 
          style={{ backgroundColor: "#fff", height: 530, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 30, }}
        >
          <View style={styles.footerTopLine} />

          <Title
              text={"댓글"}
              fontSize={16}
              style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}
          />

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {isComment ? (
              comments.map(item => (
                <View style={styles.cardContainer}>
                  <PanGestureHandler
                  key={item.commentId}
                  onGestureEvent={handleGestureEvent(item.commentId)}
                  onHandlerStateChange={handleGestureStateChange(item.commentId)}
                  >
                    <Animated.View
                      style={[
                      styles.itemContainer,
                      { transform: [{ translateX: gestures[item.commentId] }] }, // Apply the swipe effect
                      ]}
                    >
                      <View style={styles.commentContainer}>
                          {item.imageUrl !== null ? (
                            <Image
                                source={{ uri: `${baseUrl}/${item.imageUrl}` }}
                                style={styles.profileImage}
                            />
                          ) : (
                            <User />
                          )}
                          <View style={styles.itemContent}>
                            <View style={{ flexDirection: "row" }}>
                              <Title
                                text={item.name}
                                fontSize={14}
                                fontWeight="bold"
                                color="#000000"
                              />
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
                    </Animated.View>
                  </PanGestureHandler>

                  <View style={styles.hidden_card}>
                    <Pressable onPress={() => console.log('11')}>
                      <Text style={styles.hiddenMenuText}>답글</Text>
                    </Pressable>
                    <Separator />
                    <Pressable onPress={() => console.log('22')}>
                      <Text style={styles.hiddenMenuText}>삭제</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            ) : null}
          </ScrollView>

          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 10 }}>
            <TextInput
              //multiline
              //numberOfLines={20}
              value={field.value}
              onChangeText={(value) => field.onChange(value) && handleOnChangeComment(value)}
              placeholder="내용을 작성해주세요"
              style={[styles.inputBox, { width: "77%", marginRight: "3%" }]}
            />
            <Pressable
              onPress={addComment}
              style={[isInputText ? styles.submitButton : styles.submitButtonDisabled, { width: "20%" }]}
              disabled={!isInputText}
            >
              <Title 
                text="입력" 
                color={Colors.White} 
              />
            </Pressable>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View 
      style={styles.container}
    >
      <Modal        
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay} onPress={onClose}>
          <TouchableOpacity onPress={onClose} style={{ flex: 1 }} />
          <CommentList />
        </View>
      </Modal>

      {/* <BottomModal
        isVisible={visible}
        onClose={onClose}
        footer={CommentList}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: "#f0f0f0",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: SCREEN_HEIGHT * 0.5,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    color: '#007BFF',
    fontSize: 16,
  },


  footerTopLine: {
    marginTop: 15,
    backgroundColor: '#838383',
    height: 1.5,
    width: 50,
    alignSelf: "center",
  },
  openButton: {
    fontSize: 20,
    color: 'blue',
    padding: 10,
  },
  itemContainer: {
    zIndex: 2,
    width: 390,
    height: 90,
    backgroundColor: '#fff',
  },
  itemContent: {
    width: 200,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 20,
  },
  commentContainer: {
    paddingVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  profileImage: {
    alignSelf: "center",
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 50,
  },
  inputBox: {
    //paddingVertical: 14,
    height: 45,
    paddingHorizontal: 20,
    backgroundColor: Colors.F4F4F4,
    borderRadius: 15,
    width: "100%",
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
  cardContainer: {
    width: "100%",
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // 카드와 메뉴의 상대 위치 설정
    marginVertical: 5,
  },
  hidden_card: {
    alignItems: 'flex-end',
    paddingRight: 20,
    justifyContent: 'center',
    position: 'absolute',
    width: 390,
    height: 90,
    backgroundColor: '#000',
    zIndex: 1,
  },
  hiddenMenuText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Test;