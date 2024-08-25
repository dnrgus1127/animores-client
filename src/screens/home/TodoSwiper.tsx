import React, {useRef, useState} from "react";
import { ImageBackground, Image, Pressable, StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import {IItemsSlider} from "./HomeScreen";
import Animated, { useAnimatedScrollHandler, useSharedValue, SharedValue, useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";
import TodayTodoItem from "./TodayTodoItem";

interface ISliderItem {
    item: IItemslider;
    index: number;
    scrollX: SharedValue<number>
}

interface IImageList {
  itemList: IItemsSlider[]
}

const { width } = Dimensions.get("screen");



const SliderItem = ({item, index, scrollX}: ISliderItem) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1.1, 0.9],
            Extrapolation.CLAMP,
          ),
        },
      ],
      opacity: interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0.6, 1, 0.6],
        Extrapolation.CLAMP,
      ),
    }
  });

  return (
    <Animated.View style={[styles.itemWrap, rnAnimatedStyle]}>
      <View style={styles.item}>
        <TodayTodoItem item={item} index={index} />
      </View>
    </Animated.View>
  )
};

const TodoSwiper = ({itemList}: IImageList) => {
  const scrollX = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
      onScroll: (e) => {
          scrollX.value = e.contentOffset.x;
      }
  })

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        data={itemList}
        renderItem={({item, index}) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        //keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
      />
    </View>
  )
}

export default TodoSwiper;

const styles = StyleSheet.create({
    itemWrap: {
        width: width,
        alignItems: "center",
        
    },
    item: {
        width: 300,
        justifyContent: "center",
        borderRadius: 8,
        overflow: "hidden",
    },
})