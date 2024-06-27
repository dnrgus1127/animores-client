import { RouteProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import Title from "../../components/text/Title";
import { RootStackParamList } from "../../navigation/type";
import { ScreenName } from "../../statics/constants/ScreenName";

type HomeScreenRouteProp = RouteProp<RootStackParamList, ScreenName.Home>;

interface IProps {
  route: HomeScreenRouteProp;
}

const HomeScreen = (props: IProps) => {
  const { route } = props;
  console.log('route', route)

  return (
    <View>
      <Title text="홈" />
    </View>
  );
};

export default HomeScreen;
