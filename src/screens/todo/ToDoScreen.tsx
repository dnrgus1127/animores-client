import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../../navigation/type";
import { ScreenName } from "../../statics/constants/ScreenName";

const AllTodoScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, ScreenName.ToDoList>>();

  return (
    <View>
      <Text>
        모든할일
      </Text>
    </View>
  )
}

export default AllTodoScreen