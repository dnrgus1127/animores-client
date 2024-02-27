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
import { Colors } from "../../statics/styles/Colors";
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

const CreatRecord = ({ navigation }: any) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

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

  // TODO: 서버에 이미지 전송 로직 추가
  const handleSubmit = () => {};

  return (
    <SafeAreaView style={styles.Container}>
      <HeaderNavigation
        middletitle="일지 작성하기"
        rightTitle={"완료"}
        hasBackButton={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={handleSubmit}
      />
      <ScrollView>
        <TextInput
          multiline
          numberOfLines={20}
          placeholder="내용을 작성해주세요"
          style={{
            padding: 16,
            textAlignVertical: "top",
          }}
        />
        <View style={styles.BottomLine} />
        <Pressable onPress={uploadImage} style={styles.ImageContainer}>
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
        <View style={styles.VideoContainer}>
          <Title text={"동영상 등록 (최대 60초)"} />
          <AddImage style={{ marginTop: 11 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatRecord;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  BottomLine: {
    borderBottomWidth: 6,
    borderBottomColor: Colors.F4F4F4,
  },
  ImageContainer: {
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
  VideoContainer: {
    marginLeft: 20,
    marginBottom: 34,
  },
});
