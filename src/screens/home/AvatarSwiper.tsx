import React, {useRef, useState} from "react";
import { ImageBackground, Image, Pressable, StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import {IItemsSlider} from "./HomeScreen";
import Animated, { useAnimatedScrollHandler, useSharedValue, SharedValue, useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";
import { WithLocalSvg } from "react-native-svg";
import { HomeAvatar1 } from "../../assets/svg";

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
            [-width * 0, 0, width * 0],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  });

  return (
    <Animated.View style={[styles.itemWrap, rnAnimatedStyle]}>
      <View style={styles.item}>
        {item.image}
      </View>
    </Animated.View>
  )
};

const AvatarSwiper = ({itemList}: IImageList) => {
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

export default AvatarSwiper;

const styles = StyleSheet.create({
    itemWrap: {
        height: 270,
        width: width,
        alignItems: "center",
        gap: 20,
        
    },
    item: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
})