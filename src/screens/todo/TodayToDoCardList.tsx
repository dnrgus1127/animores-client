import React from "react";
import { Text, View, ScrollView, SectionList } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTodoList } from "../../hooks/useTodoList";
import ToDoCard from "./ToDoCard";


/**
 * 할 일 목록 컴포넌트
 * @param pets 펫 목록
 * @param setTodoIdToDelete 삭제할 할 일 id
 * @returns 할 일 목록 컴포넌트
 */

// SectionList 용 데이터 구조
interface IGroupedTodos {
  title: string; // 예: "2025"
  data: {
    date: string; // 예: "09-29"
    toDoList: IToDo[];
  }[];
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

// 오늘 날짜 구하기 (연도 + 날짜 문자열)
const groupByYearAndDate = (data: IToDo[]): IGroupedTodos[] => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayDateStr = dateFormat(today);

  // 오늘 날짜만 필터링
  const filtered = data.filter((todo) => {
    const d = new Date(todo.date);
    return d.getFullYear() === todayYear && dateFormat(todo.date) === todayDateStr;
  });

  if (filtered.length === 0) return [];

  return [
    {
      title: todayYear, // SectionHeader (올해)
      data: [
        {
          date: todayDateStr,
          toDoList: filtered,
        },
      ],
    },
  ];
};

export default function TodayToDoCardList({ pets, setTodoIdToDelete }: { pets: number[], setTodoIdToDelete: (id: number) => void }) {
    const { isLoading, data: toDoList } = useTodoList();

    if (isLoading || toDoList === undefined) return <Text>Loading...</Text>;

    const sections = groupByYearAndDate(toDoList ?? []);

    return (
      <View style={{ width: '100%' }}>
        <SectionList<IGroupedTodos['data'][number]>
            sections={sections}
            keyExtractor={(item, index) => `todo-${index}`}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontSize: 22, fontWeight: "bold", marginVertical: 10 }}>
                {title}년
                </Text>
            )}
            renderItem={({ item }) => (
                <View style={{ marginBottom: 15 }}>
                {/* 날짜 헤더 */}
                <Text
                    style={{ marginVertical: 5, fontSize: 18, fontWeight: "600" }}
                >
                    {item.date}
                </Text>

                {/* 해당 날짜의 할 일들 */}
                {item.toDoList.map((todo) => (
                  <ToDoCard
                    key={todo.id}
                    todo={todo}
                    onDelete={() => setTodoIdToDelete(todo.id)}
                  />
                ))}
                </View>
            )}
            ListEmptyComponent={() => (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                    오늘 할 일이 없어요 🎉
                </Text>
            )}
            contentContainerStyle={{ padding: 16 }}
        />
      </View>
    )
}