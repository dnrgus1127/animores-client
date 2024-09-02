import React, {useRef, useState} from "react";
import { ImageBackground, Image, Pressable, StyleSheet, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../components/text/Title";
import { Colors } from "../../styles/Colors";
import { SvgProps } from "react-native-svg";
import HomeTheme1 from "../../assets/png/bg_home_theme1.png";
import { HomeAvatar1, HomeAvatar2, HomeAvatar3, HomeAvatar4, HomeAvatar5, FeedIcon, WalkIcon, MedicineIcon, BathIcon } from "../../assets/svg";
import TodayTodoItem from "./TodayTodoItem";
import Swiper from "react-native-swiper";
import TodoSwiper from "./TodoSwiper";
import AvatarSwiper from "./AvatarSwiper";
import { ToDoService } from "../../service/ToDoService";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../statics/constants/Querykey";

// const ItemsSlider = [
//     {
//       title: "산책하기",
//       discription: "집 앞 공원 한바퀴 돌고 오기",
//       pet: ["심바"],
//       at: "AM",
//       time: "11:00",
//     },
//     {
//       title: "밥주기",
//       discription: "영양제랑 사료 2:8 황금비율로 꼭 맞춰서 줄 것",
//       pet: ["호동이", "심바"],
//       at: "PM",
//       time: "12:00",
//     },
//     {
//       title: "목욕시키기",
//       discription: "강아지 전용 샴푸 사용, 털 꼭 말려 주어야 함",
//       pet: ["심바"],
//       at: "PM",
//       time: "1:00",
//     },
//     {
//       title: "놀아주기",
//       discription: "던지고 물어오기 놀이 좋아함.",
//       pet: ["호동이"],
//       at: "PM",
//       time: "6:00",
//     },
// ]

const ItemsAvatar = [
    {
      image: <HomeAvatar1 />,
      emotion: <WalkIcon width="100" height="100" />,
    },
    {
      image: <HomeAvatar2 />,
      emotion: <FeedIcon width="100" height="100" />,
    },
    {
      image: <HomeAvatar3 />,
      emotion: <BathIcon width="100" height="100" />,
    },
    {
      image: <HomeAvatar4 />,
      emotion: <MedicineIcon width="100" height="100" />,
    },
    {
      image: <HomeAvatar5 />,
      emotion: <WalkIcon width="100" height="100" />,
    },
]

const HomeScreen = () => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

  const { data: todayToDo } = useQuery({
    queryKey: [QueryKey.PROFILE_LIST],
    queryFn: () => ToDoService.todo.today(1, 5),
  });

  const todayTodoList = [...(todayToDo?.data?.data?.toDoList || [])];

  if (todayTodoList.length < 1) {
    todayTodoList.push({
      id: 0,
      title: "산책",
      pets: [
        {
          id: 0,
          name: "심바"
        },
        {
          id: 1,
          name: "호동"
        },
        {
          id: 2,
          name: "레오"
        },
      ],
      isAllDay: true,
      date: "2024-08-30",
      time: "10:00",
      isUsingAlarm: true,
      color: "red",
      completeProfileImage: "",
      completeDateTime: ""
    });
  }

  return (
    <ImageBackground source={ HomeTheme1 } resizeMode="cover" style={styles.homeBackground}>
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 20 }}>
          <Text style={styles.profile}>프로필 아이콘</Text>
        </View>
        <TodoSwiper itemList={todayTodoList} />
        <AvatarSwiper itemList={ItemsAvatar} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  petState: {
    paddingHorizontal: 40,
    backgroundColor: "#fff",
  },
  homeAvatar: {
    width: 50,
    height: 50,
  },
})