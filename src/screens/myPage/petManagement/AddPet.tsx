import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";
import AddAnotherAnimal from "./AddAnotherAnimal";
import BasicPetType from "./BasicPetType";

const AddPet = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, ScreenName.AddPet>>();

  const [anotherAnimal, setAnotherAnimal] = useState<boolean>(false);

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
        {anotherAnimal ? (
          <AddAnotherAnimal />
        ) : (
          <>
            <BasicPetType
              isAnotherAnimal={() => {setAnotherAnimal(true)}}
            />
          </>
        )}
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
});
