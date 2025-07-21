import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddImage } from "../../assets/svg";
import Title from "../../components/text/Title";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { Colors } from "../../styles/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../navigation/type";
import { ScreenName } from "../../statics/constants/ScreenName";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DiaryService } from "../../service/DiaryService";
import Toast from "react-native-toast-message";
import { FormProvider, useController, useForm, useFormContext } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DiaryModel } from "../../model/DiaryModel";

const UpdateDiary = () => {
  const route = useRoute();
  const queryClient = useQueryClient();
  const { item } = route.params as { item: DiaryModel.IDiaryModel };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, ScreenName.UpdateDiary>>();

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const methods = useForm({
    defaultValues: {
      diary: item.content,
    },
  });

  const { control, handleSubmit: formSubmit } = methods;
  const { field } = useController({
    control,
    name: 'diary',
    rules: { required: true },
  });

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    //이미지 업로드
    const cameraImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });

    //이미지 취소한 경우
    if (cameraImage.canceled) {
      return null;
    }

    // 이미지가 이미 업로드된 것인지 확인
    if (imageUrls.includes(cameraImage.assets[0].uri)) {
      return null;
    }

    setImageUrls([...imageUrls, cameraImage.assets[0].uri]);
  };

  // 일지 수정
  const { mutate } = useMutation({
    mutationFn: async (data: { diaryId: string; payload: { profileId: number; content: string } }) => {
      return DiaryService.diary.update(Number(data.diaryId), data.payload);
    }
  });

  const handleSubmit = async (diaryId: string) => {
    try {
      // 프로필·컨텐츠
      const profile = await AsyncStorage.getItem("userInfo");
      const parsedProfile = profile ? JSON.parse(profile) : null;
      const profileId = parsedProfile?.id;
      const content = methods.getValues('diary')

      if (!profileId || !content) {
        Toast.show({ type: "error", text1: "내용을 입력해주세요." });
        return;
      }

      // JSON payload 생성
      const payload = { profileId, content };

      // mutate 호출
      mutate({ diaryId, payload }, {
        onSuccess: (response) => {
            Toast.show({
              type: 'success',
              text1: '일지가 수정되었습니다.',
            });
            // ✅ 일지 목록 다시 패치
            queryClient.invalidateQueries({ queryKey: ['DIARY_LIST'] });
            navigation.goBack();
        },
        onError: (error) => {
          console.error('Update error:', error);
            Toast.show({
                type: 'error',
                text1: '일지 수정이 실패했습니다.'
            });
        }
      });
    } catch (error) {
      console.error("handleSubmit error:", error);
    }
  }

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={styles.container}>
        <HeaderNavigation
          middletitle="일지 수정하기"
          rightTitle={"완료"}
          hasBackButton={true}
          onPressBackButton={() => {
            navigation.goBack();
          }}
          onPressRightButton={() => handleSubmit(item.diaryId)}
          content={methods.getValues('diary')}
        />
        <ScrollView>
          <TextInput
            multiline
            numberOfLines={20}
            value={field.value}
            onChangeText={field.onChange}
            placeholder={'내용을 작성해주세요'}
            style={{
              padding: 16,
              textAlignVertical: "top",
              minHeight: 150,
            }}
          />
          <View style={styles.bottomLine} />
          <Pressable onPress={uploadImage} style={styles.imageContainer}>
            <Title text={"사진 등록"} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {imageUrls.length > 0 ? (
                imageUrls.map((url, index) => (
                  <View key={index} style={styles.selectedImageContainer}>
                    <Image source={{ uri: url }} style={styles.selectedImage} />
                    {index === imageUrls.length - 1 && (
                      <AddImage style={{ marginLeft: 11 }} />
                    )}
                  </View>
                ))
              ) : (
                <AddImage style={{ marginTop: 11 }} />
              )}
            </ScrollView>
          </Pressable>
          <View style={styles.videoContainer}>
            <Title text={"동영상 등록 (최대 60초)"} />
            <AddImage style={{ marginTop: 11 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </FormProvider>
  );
};

export default UpdateDiary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  bottomLine: {
    borderBottomWidth: 6,
    borderBottomColor: Colors.F4F4F4,
  },
  imageContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 34,
  },
  selectedImageContainer: {
    marginTop: 11,
    marginRight: 9,
    flexDirection: "row",
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  videoContainer: {
    marginLeft: 20,
    marginBottom: 34,
  },
});
