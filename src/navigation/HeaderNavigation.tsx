import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { BackButton } from "../assets/svg";
import Title from "../components/text/Title";
import { Colors } from "../styles/Colors";

interface IProps {
  middletitle: string;
  rightTitle?: string;
  onPressBackButton?: () => void;
  onPressRightButton?: () => void;
  hasBackButton?: boolean;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  content?: string;
}

const HeaderNavigation = (props: IProps) => {
  const {
    middletitle,
    rightTitle,
    onPressBackButton,
    onPressRightButton,
    hasBackButton = true,
    textStyle,
    onPress,
    content,
  } = props;

  const HIT_SLOP = { top: 10, left: 10, right: 10, bottom: 10 };
  const isRightTitleDisabled = !content;

  return (
    <>
      <View style={styles.headerContainer}>
        {hasBackButton && (
          <TouchableOpacity
            onPress={onPressBackButton}
            hitSlop={HIT_SLOP}
            style={styles.touchOpacityBackButton}
          >
            <BackButton />
          </TouchableOpacity>
        )}
        {middletitle && (
          <View style={styles.titleContainer}>
            <Title
              text={middletitle}
              fontSize={18}
              style={styles.title} />
          </View>
        )}
        {rightTitle && (
          <Pressable
            onPress={onPress}
            style={styles.rightTitleContainer}
          >
            <Title
              text={rightTitle}
              fontSize={18}
              style={[styles.rightTitle, textStyle]}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.borderBottom} />
    </>
  );
};

export default HeaderNavigation;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    backgroundColor: Colors.White
  },
  touchOpacityBackButton: {
    paddingLeft: 20,
    zIndex: 1
  },
  titleContainer: {
    width: "100%",
    position: "absolute",
  },
  rightTitleContainer: {
    flex: 1,
    marginRight: 20,
  },
  title: {
    alignItems: "center",
    textAlign: "center",
  },
  rightTitle: {
    textAlign: "right",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#DBDBDB",
    width: "100%",
  },
});
