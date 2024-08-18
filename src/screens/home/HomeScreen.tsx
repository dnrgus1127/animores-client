import React, {useRef, useState} from "react";
import { ImageBackground, Image, Pressable, StyleSheet, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../components/text/Title";
import { Colors } from "../../styles/Colors";
import { SvgProps } from "react-native-svg";
import HomeTheme1 from "../../assets/png/bg_home_theme1.png";
import { HomeAvatar1 } from "../../assets/svg";
import TodayTodoItem from "./TodayTodoItem";
import Swiper from 'react-native-swiper';
import Slider from './Slider';

export interface IimagesSlider {
    image: string;
    title: string;
}
const ImagesSlider = [
    {
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=362&q=80",
        title: "Dog 1"
    },
    {
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        title: "Dog 2"
    },
    {
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=362&q=80",
        title: "Dog 3"
    },
    {
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        title: "Dog 4"
    },
]


const HomeScreen = () => {

  return (
    <ImageBackground source={ HomeTheme1 } resizeMode="cover" style={styles.homeBackground}>
      <SafeAreaView style={styles.container}>
        <Slider itemList={ImagesSlider} />
         {/* <View style={{ height: 150, backgroundColor: '#fff', width: '100%' }}>
            <Swiper showsButtons={true} bounces={true} loop={false} loadMinimal={true} style={{ overflow: 'visibility !important' }} containerStyle={{ backgroundColor: 'tomato'}}>
               <View style={styles.slide1}>
                  <TodayTodoItem />
               </View>
               <View style={styles.slide1}>
                  <TodayTodoItem />
               </View>
               <View style={styles.slide1}>
                  <TodayTodoItem />
               </View>
            </Swiper>
         </View> */}

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
         <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
               <HomeAvatar1 />
            </View>
         </View>
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