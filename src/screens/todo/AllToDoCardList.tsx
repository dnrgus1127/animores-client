import React, { useCallback, useState, useEffect } from "react";
import { Text, View, ScrollView, SectionList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../navigation/type";
import { ScreenName } from "../../statics/constants/ScreenName";
import { FlatList } from "react-native-gesture-handler";
import { useTodoList } from "../../hooks/useTodoList";
import ToDoCard from "./ToDoCard";

/**
 * 할 일 목록 컴포넌트
 * @param pets 펫 목록
 * @param setTodoIdToDelete 삭제할 할 일 id
 * @returns 할 일 목록 컴포넌트
 */

const todayFormat = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0부터 시작하므로 +1 필요
    const day = date.getDate();

    return (
        `${year}년 ${month}월 ${day}일`
    )
}
const yearFormat = (dateStr:string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();

    return (
        `${year}년`
    )
}
const dateFormat = (dateStr:string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1; // 0부터 시작하므로 +1 필요
    const day = date.getDate();

    return (
        `${month}월 ${day}일`
    )
}

export default function AllToDoCardList({ pets, setTodoIdToDelete }: { pets: number[], setTodoIdToDelete: (id: number) => void }) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, ScreenName.AllTodo>>();
  const { isLoading, data: toDoList } = useTodoList(pets);
  // ✅ 전체 체크 상태 관리
  const [checkItems, setCheckItems] = useState<string[]>([]);

  useEffect(() => {
      console.log(checkItems)
  }, [checkItems])

  // 할 일 체크 시
  const checkItemHandler = useCallback((id: string, isChecked: boolean) => {
      setCheckItems((prev) => {
          if (isChecked) {
              return prev.includes(id) ? prev : [...prev, id];
          } else {
              return prev.filter((item) => item !== id);
          }
      });
  }, []);

  const onClickUpdateTodo = () => {
    navigation.navigate(ScreenName.UpdateTodo)
  }

    if (isLoading || toDoList === undefined) return <Text>Loading...</Text>;
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
            style={{ width: '100%', marginVertical: "5%", overflow: 'visible' }}
            contentContainerStyle={{ paddingHorizontal: "5%" }}
            data={[...toDoList].sort((a, b) => {
                const aChecked = checkItems.includes(String(a.id));
                const bChecked = checkItems.includes(String(b.id));

                // 1️⃣ 체크 안 된 항목을 위로
                if (aChecked !== bChecked) {
                    return Number(aChecked) - Number(bChecked);
                }

                // 2️⃣ 같은 그룹 내에서 날짜순 정렬 (오름차순)
                const aDate = new Date(a.date || a.createdAt);
                const bDate = new Date(b.date || b.createdAt);

                return aDate.getTime() - bDate.getTime();
            })}
            renderItem={({ item }) => (
                <View>
                    {/* 날짜 헤더 */}
                    <Text
                        style={{ marginVertical: 5, fontSize: 18, fontWeight: "600" }}
                    >
                        {yearFormat(item.date)}
                    </Text>
                    <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: 'bold' }}>
                        {dateFormat(item.date)}
                    </Text>
                    <ToDoCard
                        todo={item}
                        onDelete={() => {
                            setTodoIdToDelete(item.id)
                        }}
                        isChecked={checkItems.includes(String(item.id))}
                        onCheckChange={checkItemHandler}
                        onClickUpdateTodo={onClickUpdateTodo}
                    />
                </View>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            keyExtractor={(item) => `todo-${item.id}`}
        />
      </View>
    )
}