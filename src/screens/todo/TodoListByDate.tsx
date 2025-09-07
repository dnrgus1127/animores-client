import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { usePeriodTodoList, useTodosByIds } from "../../hooks/useTodoList";
import ToDoCard from "./ToDoCard";

interface TodoListByDateProps {
    date: string; // YYYY-MM-DD
}

const TodoListByDate: React.FC<TodoListByDateProps> = ({ date }) => {
    // 1) 날짜별 요약 조회
    const { isLoading: overviewLoading, data: periodTodos } = usePeriodTodoList(date, date, false, 1, 200);
    // 2) 요약에서 id 추출 후 상세 조회 훅 사용
    const todoIds = useMemo(() => (periodTodos ?? []).map(item => item.todoId), [periodTodos]);
    const { isLoading: detailLoading, todos } = useTodosByIds(todoIds);
    const isLoading = overviewLoading || detailLoading;
    if (isLoading) return <Text>Loading...</Text>;

    if (!todos.length) {
        return (
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ color: "#838383" }}>해당 날짜의 할 일이 없습니다.</Text>
            </View>
        );
    }

    return (
        <FlatList
            style={{ width: '100%', height: '100%', marginVertical: "5%", overflow: 'visible' }}
            contentContainerStyle={{ paddingHorizontal: "5%", height: "100%" }}
            data={todos}
            renderItem={({ item }) => (
                <ToDoCard
                    todo={item}
                    onDelete={() => {}}
                />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            keyExtractor={(item) => `todo-${item.id}`}
        />
    );
}

export default TodoListByDate;


