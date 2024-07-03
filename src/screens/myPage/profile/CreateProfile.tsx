import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from 'expo-image-picker';
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  Cancle,
  ProfileImage as DefaultProfileImage,
} from "../../../assets/svg";
import SingleButton from "../../../components/button/SingleButton";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { ProfileService } from "../../../service/ProfileService";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";
import React, { useState } from "react";

const CreateProfile = () => {
  const [textInput, onChangeText] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.CreateProfile>
    >();

  //프로필 선택
  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("갤러리 권한은 필수입니다. 권한을 허용해주세요.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await ProfileService.profile.create(data);
      return response.data;
    }
  });

  const handleProfileSubmit = async () => {
    const formData = new FormData();
    formData.append('request', JSON.stringify({ name: textInput }));

    if (profileImage) {
      console.log('profileImage', profileImage);

      //이미지 파일을 Blob 형식으로 변환
      const response = await fetch(profileImage);
      const blob = await response.blob();

      //파일을 formData에 추가
      formData.append('profileImage', {
        uri: profileImage,
        type: blob.type,
        name: 'profile.jpg'
      });
    }

    mutate(formData, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: '프로필이 생성되었습니다!'
        });
        navigation.navigate(ScreenName.BottomTab);
      },
      onError: (error) => {
        console.error('Error creating profile:', error);
        Toast.show({
          type: 'error',
          text1: '프로필 생성에 실패했습니다.'
        });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        middletitle={"프로필 추가"}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.paddingContainer}>
        <Pressable onPress={handleChoosePhoto}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{
                alignSelf: "center",
                marginTop: 70,
                marginBottom: 36,
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          ) : (
            <DefaultProfileImage
              style={{
                alignSelf: "center",
                marginTop: 70,
                marginBottom: 36
              }}
            />
          )}
        </Pressable>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"닉네임을 입력하세요"}
            placeholderTextColor={Colors.DBDBDB}
            value={textInput}
            onChangeText={onChangeText}
            style={{
              flex: 1,
              color: Colors.Black,
            }}
          />
          {textInput && (
            <Pressable
              onPress={() => {
                onChangeText("");
              }}
            >
              <Cancle />
            </Pressable>
          )}
        </View>
        <Title
          text="한글/영어/숫자/띄어쓰기를 사용할 수 있습니다."
          color={Colors.AEAEAE}
          style={{ marginTop: 20 }}
        />
        <SingleButton
          title="추가하기"
          disabled={!textInput}
          onPress={handleProfileSubmit}
          style={{ marginTop: 70 }} 
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  paddingContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.C1C1C1,
    paddingVertical: 14,
    alignItems: "center",
  },
});