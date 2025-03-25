import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useState} from "react";
import {Image, Platform, Pressable, StyleSheet, View} from "react-native";
import {IPet, ISpecies} from "../../../../types/PetTypes";
import SingleButton from "../../../components/button/SingleButton";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import {RootStackParamList} from "../../../navigation/type";
import {StackName} from "../../../statics/constants/ScreenName";
import {Colors} from "../../../styles/Colors";
import {useQuery} from "@tanstack/react-query";
import {QueryKey} from "../../../statics/constants/Querykey";
import {PetService} from "../../../service/PetService";
import PngImage from "../../../assets/png";
import {useFormContext} from "react-hook-form";

const PetType = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList["PetManagement"], "PetType">>();
  const form = useFormContext();
  const [userSelectPetType, setUserSelectPetType] = useState<number>(0);
  // 펫 리스트 로딩 전 중 & 로딩 실패 시에 대한 화면 필요
  const {data: petSpeciesList} = useQuery<ISpecies[]>([QueryKey.PET_SPECIES], PetService.get.speciesList, {initialData: []});

  const onPressNextButton = () => {
      form.setValue("petSpecies", userSelectPetType);
      navigation.push(StackName.PetManagement.BreedType)
  }

  return (
    <View style={styles.container}>
      <HeaderNavigation
        middletitle="펫 추가"
        hasBackButton={true}
        onPressBackButton={() => navigation.pop()}
      />
      <View style={styles.paddingContainer}>
        <View style={{ flex: 1 }}>
          <Title
            text={"종류가 무엇인가요?"}
            fontSize={16}
            fontWeight="bold"
            style={{ marginTop: 52, marginBottom: 31 }}
          />
          {petSpeciesList.map((petSpeciesItem: IPet) => {
            return (
              <Pressable
                key={petSpeciesItem.id}
                onPress={() => setUserSelectPetType(petSpeciesItem.id)}
                style={[userSelectPetType === petSpeciesItem.id ? styles.selectedType : styles.unselectedType]}
              >
                <Image source={PngImage.petType[`${PngImage.getPetType(petSpeciesItem.name)}`]}/>
                <Title text={petSpeciesItem.name} fontWeight={userSelectPetType ? "bold" : "normal"}
                       style={{marginLeft: 16, alignSelf: "center"}}/>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <SingleButton title={"다음"} disabled={!userSelectPetType} style={{marginTop: 70}} onPress={onPressNextButton}/>
        </View>
      </View>
    </View>
  );
};

export default PetType;

const baseStyles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    backgroundColor: Colors.F9F9FB,
    paddingVertical: 8,
    marginBottom: 16,
    paddingLeft: 20,
    borderRadius: 10,
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  paddingContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  selectedType: {
    ...baseStyles.pressable,
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
    ...baseStyles.pressable,
    opacity: 0.4,
    backgroundColor: Colors.F9F9FB,
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
});
