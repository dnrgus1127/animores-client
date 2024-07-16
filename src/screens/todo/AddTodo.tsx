import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../navigation/type";
import { ScreenName } from "../../statics/constants/ScreenName";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { PetService } from "../../service/PetService";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../statics/constants/Querykey";
import Title from "../../components/text/Title";
import ToDoType from "../../statics/constants/ToDoType";

interface IPet {
  id: number;
  name: string;
  isPressed: boolean;
}

const AddTodo = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, ScreenName.AddTodo>>();

  const { data : pet } = useQuery({
    queryKey: [QueryKey.PET_LIST],
    queryFn: () => PetService.pet.list(),
  })

  const pets : IPet[]  = [...(pet?.data?.data.map(({id, name}: {id: number, name:string}) => ({
    id, name, isPressed: false})) || [])];

  const [clickedPetsId, setClickedPetsId] = useState<number[]>([]);
  const [title, setTitle] = useState<String | null>(null);
  const [tag, setTag] = useState<ToDoType | null>(null);
  const [tagWindowSelected, setTagWindowSelected] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        middletitle="일정 추가"
        hasBackButton={true}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.petSelectContainer}>
        <Title text="펫 선택" />
        <ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {pets.map(({ id, name, isPressed }) => (
                isPressed ? 
                <Pressable key={id} onPress={
                  () => {
                    setClickedPetsId(clickedPetsId.filter((petId) => petId !== id));
                    isPressed = false;
                }}>
                  <View style={styles.selectedPet}>
                    <Title text={name} />
                  </View>
                </Pressable> :
                <Pressable key={id} onPress={
                  () => {
                    setClickedPetsId([...clickedPetsId, id]);
                    isPressed = true;
                  }
                }>
                  <View style={styles.pet}>
                    <Title text={name} />
                  </View>
                </Pressable>
            ))}
          </ScrollView>
        </ScrollView>
      </View>
      <View style={styles.toDoSelectContainer}>
        <Title text="할 일" />
        <View style={styles.toDoTitleContainer}>
          <TextInput/>
          <Pressable >
            <Title text="태그"/>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  petSelectContainer: {
  },
  toDoSelectContainer: {
  },
  toDoTitleContainer: {

  },
  pet: {
    color: Colors.Black,
  },
  selectedPet: {
    color: Colors.Red
  }
});
