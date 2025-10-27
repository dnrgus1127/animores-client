import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View, useWindowDimensions, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { ToDoService } from "../../service/ToDoService";
import styled from "styled-components/native";
import { IPet } from "../../../types/PetTypes";
import FloatingButton from "../../components/button/FloatingButton";
import CenterModal from "../../components/modal/CenterModal";
import { usePetList } from "../../hooks/usePetList";
import PetListModal from "./modal/PetListModal";
import AllToDoCardList from "./AllToDoCardList";
import TodayToDoCardList from "./TodayToDoCardList";


export default function ToDoScreen() {
  const [pets, setPets] = useState<number[]>([]);
  const { petList } = usePetList();
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false); //플로팅버튼
  const [todoIdToDelete, setTodoIdToDelete] = useState<number | null>(null); //삭제할 todo id
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: '오늘할일' },
    { key: 'second', title: '모든할일' },
  ]);


  const FirstRoute = () => (
    <View style={styles.scene}>
      <View style={{ display: 'flex', alignItems: 'center', width: '100%', flex: 1 }}>
        <TodayToDoCardList pets={pets} setTodoIdToDelete={setTodoIdToDelete} />
      </View>
      <FloatingButtonContainer isVisibleMenu={isVisibleMenu}>
        <FloatingButton
          isVisibleMenu={isVisibleMenu}
          onPressCancel={() => setIsVisibleMenu(false)}
          onPressFloating={() => setIsVisibleMenu(!isVisibleMenu)}
        />
      </FloatingButtonContainer>
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.scene}>
      <View style={{ display: 'flex', alignItems: 'center', width: '100%', flex: 1 }}>
        <AllToDoCardList pets={pets} setTodoIdToDelete={setTodoIdToDelete} />
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
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const handlePetIdsChange = useCallback((petIds: number[]) => {
    setPets(petIds);
  }, []);

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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: '#fff',
              width: layout.width/2 - 10,
              height: '100%',
              borderRadius: 30,
              borderColor: '#f8f8f8',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
              
            }}
            style={{ borderWidth: 5, borderColor: '#f8f8f8', backgroundColor: '#f8f8f8', borderRadius: 30 }}
            labelStyle={{ color: '#aeaeae', fontWeight: 'bold' }}
            activeColor="#1e1e1e"
            inactiveColor="gray"
          />
        )}
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

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});