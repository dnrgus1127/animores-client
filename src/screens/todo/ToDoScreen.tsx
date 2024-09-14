import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { RootStackParamList } from "../../navigation/type";
import { ScreenName } from "../../statics/constants/ScreenName";
import { useQuery } from "@tanstack/react-query";
import { ToDoService } from "../../service/ToDoService";
import { QueryKey } from "../../statics/constants/Querykey";
import { IListToDoParam } from "../../../types/AddToDo";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { PetService } from "../../service/PetService";
import { useRecoilState } from "recoil";

import { ScrollView } from "react-native-gesture-handler";
import { IToDo } from "../../../types/ToDo";
import { IPetTypes } from "../../../types/PetTypes";
import { PetListAtom } from "../../recoil/PetAtom";
import PetListModal from "./modal/PetListModal";

const AllTodoScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.ToDoList>
    >();
  const [queryParam, setQueryParam] = useState<IListToDoParam>({
    done: null,
    pets: null,
    page: 1,
    size: 15,
  });

  const [petList, setPetList] = useRecoilState<IPetTypes[]>(PetListAtom);
  useEffect(() => {
    if (petList.length === 0) {
      PetService.pet.list().then((response) => {
        setPetList(response.data.data);
      });
    }
  }, []);

  const [usePetListWindow, setUsePetListWindow] = useState<boolean>(false);
  const [clickedPetIds, setClickedPetIds] = useState<number[]>([]);
  useEffect(() => {
    setQueryParam({
      ...queryParam,
      pets: clickedPetIds.length === 0 ? null : clickedPetIds,
    });
  }, [clickedPetIds]);

  const PetListButton = () => {
    return (
      <Pressable onPress={() => setUsePetListWindow(true)}>
        <Text
          style={{ fontSize: 18, alignItems: "center", textAlign: "center" }}
        >
          {queryParam.pets == undefined
            ? "전체"
            : queryParam.pets
                .map(
                  (pet) => petList.find((petType) => petType.id === pet)?.name
                )
                .join(", ")}{" "}
          V
        </Text>
      </Pressable>
    );
  };

  // const [toDoList, setToDoList] = useState<IToDo[]>(toDoData?.data?.toDoList || []);
  // const groupedToDoList= Object.groupBy(toDoList, ({date}) => date);

  interface IToDoListResponse {
    curPage: number;
    size: number;
    totalPage: number;
    totalCount: number;
    toDoList: IToDo[];
  }

  const { data: toDoData } = useQuery({
    queryKey: [QueryKey.TODO_LIST, queryParam],
    queryFn: () => ToDoService.todo.list(queryParam),
  });

  return (
    <SafeAreaView>
      <HeaderNavigation middletitle={<PetListButton />} hasBackButton={false} />
      <ScrollView>
        {/* {Object.keys(groupedToDoList).map((date) => {
          return (
            <View key={date}>
              <Text>{date}</Text>
              {groupedToDoList[date]?.map((toDo) => {
                return (
                  <View key={toDo.id}>
                    <Text>{toDo.title}</Text>
                  </View>
                )
              })}
            </View>
          )
        }
        )} */}
      </ScrollView>
      {usePetListWindow && (
        <PetListModal
          queryIdList={queryParam.pets || []}
          setClickedPetIds={setClickedPetIds}
          setUsePetListWindow={setUsePetListWindow}
        />
      )}
    </SafeAreaView>
  );
};

export default AllTodoScreen;
