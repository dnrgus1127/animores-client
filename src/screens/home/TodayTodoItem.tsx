import React from "react";
import { ImageBackground, Image, Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../styles/Colors";
import { TodosModel } from "../../model/TodosModel";

const TodayTodoItem = ({item, index}: {item: TodosModel.ITodayListModel, index: number}) => {

  // AM 또는 PM 표기
  function getAmPm(time) {
    chars = time.split(':');
    let hour = 0;
    hour = chars[0]
    return hour < 12 ? 'AM' : 'PM';
  }
  
  // 24시간 형식을 12시간 형식으로 변환
  function convert12hourFormat(time) {
    chars = time.split(':');
    let convertHour = 0;
    if (chars > 12) {
      convertHour = chars % 12 || 12;
    } else {
      convertHour = chars[0]
    }
    return `${convertHour}:${chars[1]}`;
  }

  return (
    <View style={styles.todayTodo}>
      <View style={{ flexDirection: "row", alignItems: "center"}}>
        <View style={{ flexDirection: "row", alignItems: "baseline", width: "45%" }}>
          <Text style={{ fontSize: 15 }}>
            {getAmPm(item.time)}
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {convert12hourFormat(item.time)}
          </Text>
        </View>
        <Text style={{ fontSize: 20, marginLeft: 20, width: "45%", marginLeft: "10%" }}>
          {item.title}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center"}}>
        <View style={{ flexDirection: "row", alignItems: "baseline", width: "45%" }}>
        { item.pets.map((pet) => (
          <Text style={[styles.petTag, { backgroundColor: "#E1F0FF", color: "#80A5F1", marginRight: 5 }]}>
            {pet.name}
          </Text>
        ))}
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={{ width: "45%", marginLeft: "10%", color: "#AEAEAE"}}>
          {/* {item.content} */}
          집 앞 공원 한바퀴 돌고 오기
        </Text>
      </View>
    </View>
  )
}

export default TodayTodoItem;

const styles = StyleSheet.create({
  todayTodo: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  petTag: {
    fontSize: 15,
    paddingVertical: 4, 
    paddingHorizontal: 10, 
    borderRadius: 3, 
    overflow: "hidden",
  },
})