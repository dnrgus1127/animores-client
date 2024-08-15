import React from "react";
import { ImageBackground, Image, Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../styles/Colors";


const TodayTodoItem = () => {
  return (
    <View style={styles.todayTodo}>
      <View style={{ flexDirection: "row", alignItems: "center"}}>
        <View style={{ flexDirection: "row", alignItems: "baseline", width: "45%" }}>
          <Text style={{ fontSize: 15 }}>
            AM
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            11:00
          </Text>
        </View>
        <Text style={{ fontSize: 20, marginLeft: 20, width: "45%", marginLeft: "10%" }}>
          산책하기
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center"}}>
        <View style={{ flexDirection: "row", alignItems: "baseline", width: "45%" }}>
          <Text style={[styles.petTag, { backgroundColor: "#E1F0FF", color: "#80A5F1" }]}>
            호동이
          </Text>
          <Text style={[styles.petTag, { backgroundColor: "#E0F5E0", color: "#87D287", marginLeft: 5 }]}>
            심바
          </Text>
        </View>
        <View>
        <Text style={{ width: "45%", marginLeft: "10%", color: "#AEAEAE" }}>
          영양제랑 사료 2:8 황금비율로 꼭 맞춰서...
        </Text>
        </View>
      </View>
    </View>
  )
}

export default TodayTodoItem;

const styles = StyleSheet.create({
  todayTodo: {
    padding: 15,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: "auto",
  },
  petTag: {
    fontSize: 15,
    paddingVertical: 4, 
    paddingHorizontal: 10, 
    borderRadius: 3, 
    overflow: "hidden",
  },
})