import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  AddIcon,
  CancleIcon,
  CreateRocordButton,
  WriteIcon,
} from "../../assets/svg";
import { ScreenName } from "../../statics/constants/ScreenName";
import { Colors } from "../../styles/Colors";
import Title from "../text/Title";

interface FloatingButtonProps {
  isVisibleMenu: boolean;
  onPressCancel: () => void;
  onPressFloating: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  isVisibleMenu,
  onPressCancel,
  onPressFloating,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.CreateDetailRocordIcon}
      onPress={() => {
        onPressFloating();
      }}
    >
      {/* TODO: never수정 */}
      {isVisibleMenu ? (
        <View style={styles.PinkButtonContainer}>
          <Pressable
            onPress={() => {
                navigation.navigate(ScreenName.AddTodo as never);
            }}
            style={styles.PinkButton}
          >
            <Title
              text={"일정 추가"}
              fontSize={16}
              color={Colors.White}
              style={{
                textAlign: "center",
                marginRight: 12,
                paddingBottom: 3,
              }}
            />
            <AddIcon />
          </Pressable>
          <Pressable
            onPress={() => {
                navigation.navigate(ScreenName.CreateRecord as never);
            }}
            style={[styles.PinkButton, { marginTop: 16 }]}
          >
            <Title
              text={"일지 쓰기"}
              fontSize={16}
              color={Colors.White}
              style={{
                textAlign: "center",
                marginRight: 12,
                paddingBottom: 3,
              }}
            />
            <WriteIcon />
          </Pressable>
          <Pressable
            onPress={() => {
              onPressCancel();
            }}
            style={styles.CancleIconContainer}
          >
            <CancleIcon />
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={styles.CreateRocordIcon}
          onPress={() => {
            onPressFloating();
          }}
        >
          <CreateRocordButton />
        </Pressable>
      )}
    </Pressable>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  CreateDetailRocordIcon: {
    position: "absolute",
    bottom: 68,
    right: 0,
    zIndex: 1,
  },
  // TODO: bottom 수정
  CreateRocordIcon: {
    position: "absolute",
    bottom: -68,
    right: 0,
    zIndex: 1,
  },
  CancleIconContainer: {
    marginTop: 27,
    alignItems: "flex-end",
    marginRight: 12,
  },
  PinkButtonContainer: {
    marginRight: 20,
  },
  PinkButton: {
    backgroundColor: Colors.FB3F7E,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
  },
});
