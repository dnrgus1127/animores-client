import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  AddIcon,
  CancleIcon,
  CreateRocordButton,
  WriteIcon,
} from "../../assets/svg";
import Title from "../text/Title";
import { ScreenName } from "../../statics/constants/ScreenName";

interface FloatingButtonProps {
  isVisible: boolean;
  onPressCancel: () => void;
  onPress: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = (
  { navigation }: any,
  { isVisible, onPressCancel, onPress }
) => {
  return (
    <Pressable
      style={styles.CreateRocordIcon}
      onPress={() => {
        onPress();
      }}
    >
      {isVisible ? (
        <View style={styles.PinkButtonContainer}>
          <Pressable
            onPress={() => navigation.navigate(ScreenName.AddTodo)}
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
            onPress={() => navigation.navigate(ScreenName.CreateRecord)}
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
            onPress();
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
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  RenderItemContainer: {
    marginTop: 20,
  },
  Top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  TitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  MoreIcon: {
    alignSelf: "flex-end",
  },
  contentContainer: {
    flexDirection: "row",
    marginTop: 22,
    marginHorizontal: 20,
  },
  CommentIconContainer: {
    flexDirection: "row",
    marginTop: 18,
    marginBottom: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  BottomLine: {
    borderBottomWidth: 8,
    borderBottomColor: Colors.F4F4F4,
  },
  FooterContainer: {
    position: "absolute",
    bottom: 34,
    width: "100%",
  },
  Footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  FooterTopLine: {
    backgroundColor: Colors.Gray838383,
    height: 1.5,
    width: 50,
    alignSelf: "center",
  },
  ButtonContainer: {
    backgroundColor: Colors.FB3F7E,
    flex: 1,
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  },
  CreateRocordIcon: {
    position: "absolute",
    bottom: 68,
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
