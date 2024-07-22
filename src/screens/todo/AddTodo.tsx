import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
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
import { Controller, Form, FormProvider, useController, useFieldArray, useForm } from "react-hook-form";

interface IPet {
  id: number;
  name: string;
  isPressed: boolean;
}

enum RepeatUnit {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

enum WeekDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

interface IRepeat {
  unit: RepeatUnit;
  interval: number;
  weekDays: WeekDay[];
}

interface IAddTodo {
  clickedPetsId: number[];
  content: string | null;
  tag: ToDoType | null;
  date: string | null;
  isAllDay: boolean;
  color: string;
  isUsingAlarm: boolean;
  repeat: IRepeat | null;
}

const AddTodo = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, ScreenName.AddTodo>>();

  const methods = useForm<IAddTodo>({
    defaultValues: {
      clickedPetsId: [],
      content: null,
      tag: null,
      date: null,
      isAllDay: false,
      color: '#ffffff',
      isUsingAlarm: true,
      repeat: null,
    }
  })

  const { control, handleSubmit, setValue} = methods;
  const onSubmit = (data: IAddTodo) => console.log(data);

  const { data: pet } = useQuery({
    queryKey: [QueryKey.PET_LIST],
    queryFn: () => PetService.pet.list(),
  });

  const [pets, setPets] = useState<IPet[]>(
    pet?.data?.data.map(({ id, name }: { id: number, name: string }) => ({
      id,
      name,
      isPressed: false,
    })) || []
  );

  const handlePetPress = (id: number) => {
    setPets((prevPets) => {
      const updatedPets = prevPets.map((pet) =>
        pet.id === id ? { ...pet, isPressed: !pet.isPressed } : pet
      );
      const clickedPetsId = updatedPets.filter((pet) => pet.isPressed).map((pet) => pet.id);
      setValue('clickedPetsId', clickedPetsId);  // clickedPetsId 업데이트
      return updatedPets;
    });
  };


  const [tagWindowSelected, setTagWindowSelected] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        middletitle="일정 추가"
        rightTitle="완료"
        hasBackButton={true}
        onPressBackButton={() => {
            navigation.goBack();
          }}
        onPressRightButton={handleSubmit(onSubmit)}
      />
      <FormProvider {...methods}>
        <ScrollView>
          <View style={styles.petSelectContainer}>
            <Title text="펫 선택" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {pets.map(({ id, name, isPressed }) => (
                <Pressable key={id} onPress={() => handlePetPress(id)}>
                  <View style={ isPressed ? styles.selectedPet : styles.pet}>
                  <Title text={name} />
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <View style={styles.toDoSelectContainer}>
            <Title text="할 일" />
            <View style={styles.toDoTitleContainer}>
              <Controller
              control={control}
              render={({ field : { onChange , onBlur,  value} }) => (
                <TextInput
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  setValue('tag', null);
                }}
                placeholder="태그 선택 또는 직접 입력"
                value= {value || ''}
                />
              )}
              name="content"
              />
              <Pressable onPress={() => setTagWindowSelected(true)}>
              <Title text="태그"/>
              </Pressable>
              <Modal
              animationType="slide"
              visible={tagWindowSelected}
              onRequestClose={() => setTagWindowSelected(!tagWindowSelected)}>
              {
              Object.values(ToDoType).map((tag) => 
                <Pressable key={tag} onPress={() => {
                  setValue('tag',tag);
                  setValue('content', null);
                  }}>
                  <Title text={tag}/>
                </Pressable>)
              }
              </Modal>
            </View>
          </View>
        </ScrollView>
      </FormProvider>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pet: {
    backgroundColor: Colors.Black,
  },
  selectedPet: {
    backgroundColor: Colors.Red
  }
});
