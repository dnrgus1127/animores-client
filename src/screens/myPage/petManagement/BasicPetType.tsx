import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  ImageProps,
  Platform,
  Pressable,
} from "react-native";
import Title from "../../../components/text/Title";
import PngImage from "../../../assets/png";
import SingleButton from "../../../components/button/SingleButton";
import { Colors } from "../../../styles/Colors";

interface IProps {
  isAnotherAnimal: () => void;
}

interface IType {
  id: number;
  name: string;
  image: ImageProps;
}

const BasicPetType = (props: IProps) => {
  const { isAnotherAnimal } = props;

  const [petType, setPetType] = useState<string>("");

  const type: IType[] = [
    { id: 1, name: "강아지", image: PngImage.petType.dog },
    { id: 2, name: "고양이", image: PngImage.petType.cat },
    { id: 3, name: "물고기", image: PngImage.petType.fish },
    { id: 4, name: "새", image: PngImage.petType.bird },
    { id: 5, name: "토끼", image: PngImage.petType.rabbit },
  ];

  return (
    <>
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
      <Pressable onPress={isAnotherAnimal} style={styles.AddPetContainer}>
        <Title
          text={"+ 다른 동물이예요"}
          fontSize={16}
          color={Colors.Gray717171}
          style={{ paddingVertical: 28, paddingLeft: 16 }}
        />
      </Pressable>
      <SingleButton title="다음" disabled={!petType} />
    </>
  );
};

export default BasicPetType;

const styles = StyleSheet.create({
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
