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

const { width } = Dimensions.get('screen');



const SliderItem = ({item, index, scrollX}: ISliderItem) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index-1) * width, index * width, (index+1) * width],
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  });

  return (
    <Animated.View style={[styles.itemWrap, rnAnimatedStyle]}>
      {/* <ImageBackground
          style={styles.image} source={{ uri: item.image }}
      >
          <View
              style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10
              }}
          >
              <Text style={styles.title}>{item.title}</Text>
          </View>

      </ImageBackground> */}
      <View style={styles.item}>
        <TodayTodoItem item={item} index={index} />
      </View>
    </Animated.View>
  )
};

const Slider = ({itemList}: IImageList) => {
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
            justifyContent: 'center',
            alignItems: 'center'
          }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
      />
    </View>
  )
}

export default Slider;

const styles = StyleSheet.create({
    itemWrap: {
        height: 200,
        width: width,
        alignItems: 'center',
        gap: 20,
        
    },
    item: {
        width: 300,
        height: "100%",
        borderRadius: 8,
        overflow: 'hidden',
    },
})