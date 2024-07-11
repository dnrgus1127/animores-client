import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image, Platform, Pressable, StyleSheet, View } from "react-native";
import { IPetTypes } from "../../../../types/PetTypes";
import SingleButton from "../../../components/button/SingleButton";
import Title from "../../../components/text/Title";
import { petTypes } from "../../../data/PetTypes";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";

const PetType = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.PetType>
    >();

  const [petType, setPetType] = useState<string>("");

  return (
    <View style={styles.container}>
      <HeaderNavigation
        middletitle="펫 추가"
        hasBackButton={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.paddingContainer}>
        <View style={{ flex: 1 }}>
          <Title
            text={"종류가 무엇인가요?"}
            fontSize={16}
            fontWeight="bold"
            style={{ marginTop: 52, marginBottom: 31 }}
          />
          {petTypes.map((t: IPetTypes) => {
            return (
              <Pressable
                key={t.id}
                onPress={() => {
                  setPetType(t.name);
                }}
                style={[
                  styles.pressableType,
                  petType === ""
                    ? styles.pressableType
                    : petType === t.name
                    ? styles.selectedType
                    : styles.unselectedType,
                ]}
              >
                <Image source={t.image} />
                <Title
                  text={t.name}
                  fontWeight={petType ? "bold" : "normal"}
                  style={{ marginLeft: 16, alignSelf: "center" }}
                />
              </Pressable>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <SingleButton
            title={"다음"}
            disabled={!petType}
            onPress={() => {
              if (petType) {
                navigation.navigate(ScreenName.BreedType);
              }
            }}
            style={{ marginTop: 70 }} 
          />
        </View>
      </View>
    </View>
  );
};

export default PetType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  paddingContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pressableType: {
    flexDirection: "row",
    backgroundColor: Colors.F9F9FB,
    paddingVertical: 8,
    marginBottom: 16,
    paddingLeft: 20,
    borderRadius: 10,
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
  buttonContainer: {
    justifyContent: "flex-end",
  },
});
