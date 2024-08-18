import React, {useRef, useState} from "react";
import { ImageBackground, Image, Pressable, StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import {IimagesSlider} from "./HomeScreen";
import { useSharedValue } from "react-native-reanimated";

interface ISliderItem {
    item: IimagesSlider;
    index: number;
}

interface IimageList {
  itemList: IimagesSlider[]
}

const { width } = Dimensions.get('screen');

const Slider = ({itemList}: IimageList) => {
  const scrollX = useSharedValue(0);

  const SliderItem = ({item, index}: ISliderItem) => (
      <View key={item.id} style={styles.item}>
          <ImageBackground
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

          </ImageBackground>
      </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
          data={itemList}
          renderItem={({item, index}) => (
            <SliderItem item={item} index={index} />
          )}
          //keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
      />
    </View>
  )
}

export default Slider;

const styles = StyleSheet.create({
    item: {
        height: 200,
        width: width,
        alignItems: 'center',
        gap: 20,
        
    },
    title: {
        fontSize: 18,
    },
    image: {
        //flex: 1,
        width: 300,
        height: "100%",
        borderRadius: 8,
        overflow: 'hidden',
    },
})