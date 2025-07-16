import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTodoList } from "../../hooks/useTodoList";
import ToDoCard from "./ToDoCard";


/**
 * 할 일 목록 컴포넌트
 * @param pets 펫 목록
 * @param setTodoIdToDelete 삭제할 할 일 id
 * @returns 할 일 목록 컴포넌트
 */
export default function ToDoCardList({ pets, setTodoIdToDelete }: { pets: number[], setTodoIdToDelete: (id: number) => void }) {
    const { isLoading, data: toDoList } = useTodoList(pets);

    if (isLoading || toDoList === undefined) return <Text>Loading...</Text>;
    return (<FlatList
        style={{ width: '100%', height: '100%', marginVertical: "5%", overflow: 'visible' }}
        contentContainerStyle={{ paddingHorizontal: "5%", height: "100%" }}
        data={toDoList}
        renderItem={({ item }) => (
            <ToDoCard
                todo={item}
                onDelete={() => {
                    setTodoIdToDelete(item.id)
                }}
            />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        keyExtractor={(item) => `todo-${item.id}`}
    />)
}