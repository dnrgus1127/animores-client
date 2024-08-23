import React, {useRef, useState} from "react";
import { ImageBackground, Image, Pressable, StyleSheet, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../components/text/Title";
import { Colors } from "../../styles/Colors";
import { SvgProps } from "react-native-svg";
import HomeTheme1 from "../../assets/png/bg_home_theme1.png";
import { HomeAvatar1, HomeAvatar2, HomeAvatar3, HomeAvatar4, HomeAvatar5 } from "../../assets/svg";
import TodayTodoItem from "./TodayTodoItem";
import Swiper from 'react-native-swiper';
import Slider from './Slider';
import AvatarSwiper from './AvatarSwiper';

const ItemsSlider = [
    {
      title: "산책하기",
      discription: "집 앞 공원 한바퀴 돌고 오기",
      pet: ["심바"],
      at: "AM",
      time: "11:00",
    },
    {
      title: "밥주기",
      discription: "영양제랑 사료 2:8 황금비율로 꼭 맞춰서 줄 것",
      pet: ["호동이", "심바"],
      at: "PM",
      time: "12:00",
    },
    {
      title: "목욕시키기",
      discription: "강아지 전용 샴푸 사용, 털 꼭 말려 주어야 함",
      pet: ["심바"],
      at: "PM",
      time: "1:00",
    },
    {
      title: "놀아주기",
      discription: "던지고 물어오기 놀이 좋아함.",
      pet: ["호동이"],
      at: "PM",
      time: "6:00",
    },
]

const ItemsAvatar = [
    {
      image: <HomeAvatar1 />,
    },
    {
      image: <HomeAvatar2 />,
    },
    {
      image: <HomeAvatar3 />,
    },
    {
      image: <HomeAvatar4 />,
    },
    {
      image: <HomeAvatar5 />,
    },
]


const HomeScreen = () => {

  return (
    <ImageBackground source={ HomeTheme1 } resizeMode="cover" style={styles.homeBackground}>
      <SafeAreaView style={styles.container}>
        <Slider itemList={ItemsSlider} />
         {/* <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ width: '70%', transform: [{scaleX: 0.86}, {scaleY: 0.86}], opacity: 0.6 }}>
               <TodayTodoItem />
            </View>
            <View style={{ width: '70%', transform: [{scaleX: 1.05}, {scaleY: 1.05}] }}>
               <TodayTodoItem />
            </View>
            <View style={{ width: '70%', transform: [{scaleX: 0.86}, {scaleY: 0.86}], opacity: 0.6 }}>
               <TodayTodoItem />
            </View>
            </View>
         </View> */}
         <AvatarSwiper itemList={ItemsAvatar} />
         {/* <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
               <HomeAvatar1 />
            </View>
         </View> */}
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
    display: 'flex',
    alignItems: "center",
    marginTop: 50,
  },
  homeAvatar: {
    width: 50,
    height: 50,
  },
  slide1: {
    flex: 1,
    width: 330,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aqua',
    marginHorizontal: 'auto',
    
    paddingHorizontal: 8,
  },
})