import React, {useRef, useState} from "react";
import { ImageBackground, Image, Pressable, StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue, SharedValue, useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";

interface ISliderItem {
    item: IImageList;
    index: number;
    scrollX: SharedValue<number>;
}

interface IImageList {
  itemList: {
    image: React.FC<SvgProps>;
    emotion: React.FC<SvgProps>;
  }
}

const { width } = Dimensions.get("screen");



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
      <View style={styles.petState}>
        {item.emotion}
      </View>
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
    <View style={{ flex: 3 }}>
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

export default AvatarSwiper;

const styles = StyleSheet.create({
  itemWrap: {
    height: 270,
    width: width,
    alignItems: "center",
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