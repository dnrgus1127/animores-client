import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../navigation/type";
import { ScreenName } from "../../statics/constants/ScreenName";
import { useMutation } from "@tanstack/react-query";
import { DiaryService } from "../../service/DiaryService";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DiaryFormEditor from "../../components/diary/DiaryFormEditor";

const CreatDiary = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, ScreenName.CreateDiary>>();

  // 일지 등록
  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
       const {data} = await DiaryService.diary.create(formData);
       return data;
    }
  });

  const handleSubmit = async (content: string, imageUrls: string[]) => {
    try {
      const profile = await AsyncStorage.getItem("userInfo");

      if (!profile) {
        console.error("Profile not found");
        return;
      }

      const parsedProfile = JSON.parse(profile);
      const profileId = parsedProfile?.id;

      if (!content) {
        console.error("Content is empty");
        return;
      }

      const formData = new FormData();
      formData.append("profileId", String(profileId));
      formData.append("content", content);

      console.log("profileId:", profileId, "content:", content);

      mutate(formData, {
        onSuccess: (response) => {
          console.log('서버응답', response);
          if (response?.data){
            Toast.show({
              type: 'success',
              text1: '일지가 등록되었습니다.',
            });
            navigation.goBack();
          } else {
            console.warn("응답에 data 없음");
          }
        },
        onError: (error) => {
          console.error('Delete error:', error?.response?.data || error.message);
        }
      });
    } catch (error) {
      console.error("handleSubmit error:", error);
    }
  }

  return (
    <DiaryFormEditor
      headerTitle="일지 작성하기"
      submitButtonText="완료"
      onSubmit={handleSubmit}
      onBack={() => navigation.goBack()}
    />
  );
};

export default CreatDiary;
