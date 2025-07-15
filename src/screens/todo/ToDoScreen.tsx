import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { ToDoService } from "../../service/ToDoService";

import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { IPet } from "../../../types/PetTypes";
import FloatingButton from "../../components/button/FloatingButton";
import CenterModal from "../../components/modal/CenterModal";
import { usePetList } from "../../hooks/usePetList";
import { useTodoList } from "../../hooks/useTodoList";
import PetListModal from "./modal/PetListModal";
import ToDoCard from "./ToDoCard";


export default function ToDoScreen() {
  const [pets, setPets] = useState<number[]>([]);
  const { petList } = usePetList();
  const { isLoading, data: toDoList } = useTodoList(pets);
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false); //플로팅버튼
  const [todoIdToDelete, setTodoIdToDelete] = useState<number | null>(null); //삭제할 todo id

  const handlePetIdsChange = useCallback((petIds: number[]) => {
    setPets(petIds);
  }, []);

  
  if(isLoading || toDoList === undefined) return <Text>Loading...</Text>;
  return (
    <>
      <HeaderNavigation
        middletitle={
          <PetListButtonComponent
            pets={pets}
            petList={petList}
            onPetIdsChange={handlePetIdsChange}
          />}
        hasBackButton={false}
      />
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <FlatList
          data={toDoList}
          renderItem={({ item }) => (
            <ToDoCard
              todo={item}
              onDelete={() => {
                setTodoIdToDelete(item.id)
              }}
            />
          )}
          keyExtractor={(item) => `todo-${item.id}`}
        />
      </View>
      <FloatingButtonContainer isVisibleMenu={isVisibleMenu}>
        <FloatingButton
          isVisibleMenu={isVisibleMenu}
          onPressCancel={() => setIsVisibleMenu(false)}
          onPressFloating={() => setIsVisibleMenu(!isVisibleMenu)}
        />
      </FloatingButtonContainer>
      <CenterModal
        visible={todoIdToDelete != null}
        title="할 일을 삭제하시겠어요?"
        subTitle="삭제 이후에는 할 일이 영구적으로 삭제되며, 복원하실 수 없습니다."
        onClose={() => setTodoIdToDelete(null)}
        onDelete={() => {
          if (todoIdToDelete === null) return;
          ToDoService.todo.delete(todoIdToDelete);
          // TODO delete 이후 데이터 갱신하는 로직으로 수정
          // setToDoList(toDoList.filter((todo) => todo.id !== todoIdToDelete));
          setTodoIdToDelete(null);
        }}
      />
    </>
  );
}


// PetListButton 관련 유틸리티 함수
function getPetListString(pets: number[], petList: IPet[]): string {
  let petListString =
    pets.length === 0
      ? "전체"
      : pets
          .map((pet) => petList.find((petType) => petType.id === pet)?.name)
          .join(", ");

  if (petListString.length > 10 && pets !== null && pets.length > 1) {
    const firstPet = petList.find((pet) => pets && pet.id === pets[0]);
    if (firstPet) {
      petListString = firstPet.name + " 외 " + (pets.length - 1);
    }
  }

  return petListString;
}


// PetListButton 컴포넌트 인터페이스
interface PetListButtonProps {
  pets: number[];
  petList: IPet[];
  onPetIdsChange: (petIds: number[]) => void;
}


function PetListButtonComponent({
  pets,
  petList,
  onPetIdsChange,
}: PetListButtonProps) {
  const [showPetListWindow, setShowPetListWindow] = useState(false);
  const [clickedPetIds, setClickedPetIds] = useState<number[]>(pets || []);

  const displayText = getPetListString(pets, petList);

  useEffect(() => {
    onPetIdsChange(clickedPetIds.length === 0 ? [] : clickedPetIds);
  }, [clickedPetIds, onPetIdsChange]);

  return (
    <View>
      <Pressable onPress={() => setShowPetListWindow(true)}>
        <Text
          style={{ fontSize: 18, alignItems: "center", textAlign: "center" }}
        >
          {displayText} V
        </Text>
      </Pressable>
      
      {showPetListWindow && (
        <PetListModal
          queryIdList={pets}
          setClickedPetIds={setClickedPetIds}
          setUsePetListWindow={setShowPetListWindow}
        />
      )}
    </View>
  );
}

interface IFloatingButtonContainer {
  isVisibleMenu: boolean;
}

const FloatingButtonContainer = styled.View<IFloatingButtonContainer>`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${(props) => (props.isVisibleMenu ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.0)")};
  z-index:${(props) => (props.isVisibleMenu ? 1 : 0)};
  top:${(props) => (props.isVisibleMenu ? 0 : null)};
`;