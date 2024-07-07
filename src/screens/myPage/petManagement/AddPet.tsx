import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IGenderType } from "../../../../types/GenderType";
import asset from "../../../assets/png";
import { CalanderIcon, CameraIcon, ImagePickerIcon } from "../../../assets/svg";
import Input from "../../../components/Input/Input";
import SingleButton from "../../../components/button/SingleButton";
import Title from "../../../components/text/Title";
import { genderType } from "../../../data/GenderTypes";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { GenderType } from "../../../statics/constants/GenderType";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";
import BottomModal from "../../../components/modal/BottomModal";

const AddPet = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, ScreenName.AddPet>>();

  const form = useForm({ mode: "onChange" });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const [gender, setGender] = useState<string>(GenderType.남아);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  //앨범 선택
  const handleOpenImagePicker = async () => {
    //접근 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("이미지를 등록하시려면 사진첩 권한이 필요합니다.");
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  const handleOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("카메라를 사용하려면 카메라 권한이 필요합니다.");
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  const footerPicture = () => {
    return (
      <View style={styles.bottomModalContainer}>
        <View style={styles.footerTopLine} />
        <View style={[styles.footer, { marginTop: 48 }]}>
          <Pressable
            onPress={handleOpenImagePicker}
            style={[styles.buttonContainer, { marginRight: 10 }]}
          >
            <Title
              text={"사진 보관함"}
              fontSize={16}
              color={Colors.White}
              style={styles.modalTitle}
            />
            <ImagePickerIcon />
          </Pressable>
          <Pressable onPress={handleOpenCamera} style={styles.buttonContainer}>
            <Title
              text={"사진 찍기"}
              fontSize={16}
              color={Colors.White}
              style={styles.modalTitle}
            />
            <CameraIcon />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderNavigation
        middletitle="펫 추가"
        hasBackButton={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={styles.horizontalContainer}>
        <FormProvider {...form}>
          {/* TODO: 이미지 변경 */}
          <Pressable onPress={() => setIsVisible(true)}>
            <Image
              source={asset.profile}
              style={{
                marginTop: 50,
                marginBottom: 10,
                alignSelf: "center",
              }}
            />
          </Pressable>
          <Input
            title="반려동물 이름"
            name={"name"}
            placeholder={"반려동물의 이름을 입력해주세요"}
            isRevised={true}
          />
          <Input
            title="품종"
            name={"breed"}
            defaultValue="말티즈" //TODO: 앞에서 선택한 품종
            editable={false}
            children={<Title text={"수정"} color={Colors.AEAEAE} />}
            onPress={() => {
              navigation.navigate(ScreenName.BreedType);
            }}
          />
          <Title text={"성별"} fontWeight="bold" style={{ marginTop: 40 }} />
          <View style={styles.rowView}>
            {genderType.map((g: IGenderType, index: number) => {
              return (
                <Pressable
                  key={g.id}
                  onPress={() => {
                    setGender(g.type);
                  }}
                  style={[
                    {
                      backgroundColor:
                        g.type === gender ? Colors.FB3F7E : Colors.F9F9FB,
                      marginRight: index === 0 ? 9 : 0,
                    },
                    styles.genderContainer,
                  ]}
                >
                  <Title
                    text={g.type}
                    color={g.type === gender ? Colors.White : Colors.DBDBDB}
                    style={{ textAlign: "center" }}
                  />
                </Pressable>
              );
            })}
          </View>
          {/* TODO: 달력 */}
          <Input
            title="생년월일"
            name={"birthday"}
            editable={false}
            children={<CalanderIcon />}
          />
          <Input
            title="몸무게"
            name={"weight"}
            children={<Title text={"kg"} />}
          />
        </FormProvider>
        <SingleButton
          title={"완료"}
          disabled={isValid}
          onPress={() => {
            if (!isValid) {
              console.log("navigation 이동");
            }
          }}
          style={{ marginTop: 70 }} 
        />
      </ScrollView>
      <BottomModal
        isVisible={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
        footer={footerPicture}
        BottomText={"기본 이미지로 할래요"}
      />
    </View>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  horizontalContainer: {
    paddingHorizontal: 20,
  },
  genderContainer: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 8,
  },
  rowView: {
    flexDirection: "row",
  },
  bottomModalContainer: {
    marginTop: 15,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  footerTopLine: {
    backgroundColor: Colors.Gray838383,
    height: 1.5,
    width: 50,
    alignSelf: "center",
  },
  buttonContainer: {
    backgroundColor: Colors.FB3F7E,
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  modalTitle: {
    textAlign: "center",
    marginRight: 4,
  },
});
