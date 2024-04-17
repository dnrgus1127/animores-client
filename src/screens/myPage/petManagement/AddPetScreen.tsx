import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Image,
  ImageProps,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PngImage from "../../../assets/png";
import SingleButton from "../../../components/button/SingleButton";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";

interface IType {
  id: number;
  name: string;
  image: ImageProps;
}

const AddPetScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, ScreenName.AddPetScreen>>();

  const [petType, setPetType] = useState<string>("");

  const type: IType[] = [
    { id: 1, name: "강아지", image: PngImage.petType.dog },
    { id: 2, name: "고양이", image: PngImage.petType.cat },
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
      <View style={styles.PaddingContainer}>
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
              onPress={() => {
                setPetType(t.name);
              }}
              style={[
                styles.PressableType,
                petType === ""
                  ? styles.PressableType
                  : petType === t.name
                    ? styles.selectedType
                    : styles.unselectedType,
              ]}
            >
              <Image source={t.image} />
              <Title
                text={t.name}
                fontWeight={petType ? 'bold' : 'normal'}
                style={{ marginLeft: 16, alignSelf: "center" }}
              />
            </Pressable>
          );
        })}
        <SingleButton
          title={"다음"}
          disabled={!petType}
          onPress={() => {
            if (petType) {
              navigation.navigate(ScreenName.BreedType);
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AddPetScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  PaddingContainer: {
    paddingHorizontal: 20,
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
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
        shadowColor: "gray",
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
    }),
  },
  unselectedType: {
    opacity: 0.4,
    backgroundColor: Colors.F9F9FB,
  },
});
