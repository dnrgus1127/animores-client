import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View, Image } from "react-native";
import {
  Cancle,
  ProfileImage as DefaultProfileImage,
} from "../../../assets/svg";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { Colors } from "../../../styles/Colors";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/type";
import SingleButton from "../../../components/button/SingleButton";
import { useMutation } from "@tanstack/react-query";
import { ProfileService } from "../../../service/ProfileService";
import Toast from "react-native-toast-message";
import { launchImageLibrary } from "react-native-image-picker";

const CreateProfile = () => {
  const [textInput, onChangeText] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.CreateProfile>
    >();

  const handleChoosePhoto = () => {
    launchImageLibrary(
      { mediaType: "photo", includeBase64: true },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          const source = { uri: response.assets[0].uri };
          setProfileImage(source.uri || "");
        } else {
          console.log("createProfile launchImage error");
        }
      }
    );
  };

  const { mutate } = useMutation(
    ({ name, profileImage }: { name: string; profileImage: string }) =>
      ProfileService.profile.create(name, profileImage),
    {
      onSuccess: async (data) => {
        if (data && data.status === 200) {
          console.log("data", data);
          Toast.show({
            type: "success",
            text1: "프로필이 등록되었습니다.",
          });
          navigation.navigate(ScreenName.Home);
        }
      },
      onError: (error) => {
        console.error("create profile error:", error);
        Toast.show({
          type: "error",
          text1: "프로필 등록에 실패했습니다.",
        });
      },
    }
  );

  return (
    <View style={styles.container}>
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
              style={{ alignSelf: "center", marginTop: 70, marginBottom: 36 }}
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
          onPress={() => {
            mutate({ name: textInput, profileImage });
            // navigation.navigate(ScreenName.Home);
          }}
        />
      </View>
    </View>
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
