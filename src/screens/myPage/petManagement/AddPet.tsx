import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image, ImageProps, Pressable, View, StyleSheet, Platform } from "react-native";
import PngImage from "../../../assets/png";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";
import { ScrollView } from "react-native-gesture-handler";
import SingleButton from "../../../components/button/SingleButton";

interface IType {
  id: number;
  name: string;
  image: ImageProps;
}

const AddPet = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, ScreenName.AddPet>>();

  const [petType, setPetType] = useState<string>('');

  const type: IType[] = [
    { id: 1, name: "강아지", image: PngImage.petType.dog },
    { id: 2, name: "고양이", image: PngImage.petType.cat },
    { id: 3, name: "물고기", image: PngImage.petType.fish },
    { id: 4, name: "새", image: PngImage.petType.bird },
    { id: 5, name: "토끼", image: PngImage.petType.rabbit },
  ];

  return (
    <ScrollView style={styles.Container}>
      <HeaderNavigation
        middletitle="펫 추가"
        hasBackButton={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Title
          text={"종류가 무엇인가요?"}
          fontSize={16}
          fontWeight="bold"
          style={{ marginTop: 52, marginBottom: 31 }}
        />
        {type.map((t: IType) => {
          return (
            <Pressable
              key={t.id}
              onPress={() => { setPetType(t.name) }}
              style={[
                styles.PressableType,
                petType === t.name ? styles.selectedType : styles.unselectedType
              ]}>
              <Image source={t.image} />
              <Title
                text={t.name}
                style={{ marginLeft: 16, alignSelf: "center" }}
              />
            </Pressable>
          );
        })}
        <View style={styles.AddPetContainer}>
          <Title
            text={"+ 다른 동물이예요"}
            fontSize={16}
            color={Colors.Gray717171}
            style={{ paddingVertical: 28, paddingLeft: 16 }}
          />
        </View>
        <SingleButton title="다음" disabled={!petType} />
      </View>
    </ScrollView>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  PressableType: {
    flexDirection: "row",
    backgroundColor: Colors.F9F9FB,
    paddingVertical: 8,
    marginBottom: 16,
    paddingLeft: 20,
    borderRadius: 10,
  },
  AddPetContainer: {
    borderWidth: 1,
    borderColor: Colors.DBDBDB,
    borderRadius: 10,
    borderStyle: "dashed",
  },
  selectedType: {
    borderWidth: 1,
    borderColor: Colors.F9F9FB,
    ...Platform.select({
      ios: {
        shadowColor: Colors.Black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
        shadowColor: "gray",
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
    }),
  },
  unselectedType: {
    opacity: 0.4,
  },
});
