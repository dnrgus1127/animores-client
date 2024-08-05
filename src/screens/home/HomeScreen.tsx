import React from "react";
import { ImageBackground, Image, Pressable, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../components/text/Title";
import { Colors } from "../../styles/Colors";
import { SvgProps } from "react-native-svg";
import HomeTheme1 from "../../assets/png/bg_home_theme1.png";
import { HomeAvatar1 } from "../../assets/svg";
import TodayTodoItem from "./TodayTodoItem";


const HomeScreen = () => {


  return (
    <ImageBackground source={ HomeTheme1 } resizeMode="cover" style={styles.homeBackground}>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
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
        </View>
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
    alignItems: "center",
    marginTop: 50,
  },
  homeAvatar: {
    width: 50,
    height: 50,
  },
})