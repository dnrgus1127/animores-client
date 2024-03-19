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
  hasBackButton?: boolean;
  textStyle?: StyleProp<TextStyle>;
  onPressRightButton?: () => void;
}

const HeaderNavigation = (props: IProps) => {
  const {
    middletitle,
    rightTitle,
    onPressBackButton,
    hasBackButton = true,
    textStyle,
    onPressRightButton,
  } = props;

  const HIT_SLOP = { top: 10, left: 10, right: 10, bottom: 10 };

  return (
    <>
      <View style={styles.HeaderContainer}>
        {hasBackButton && (
          <TouchableOpacity
            onPress={onPressBackButton}
            hitSlop={HIT_SLOP}
            style={styles.TouchOpacityBackButton}
          >
            <BackButton />
          </TouchableOpacity>
        )}
        {middletitle && (
          <View style={styles.TitleContainer}>
            <Title text={middletitle} fontSize={18} style={styles.Title} />
          </View>
        )}
        {rightTitle && (
          <Pressable
            onPress={onPressRightButton}
            style={styles.RightTitleContainer}
          >
            <Title
              text={rightTitle}
              fontSize={18}
              color={Colors.DBDBDB}
              style={[styles.RightTitle, textStyle]}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.BorderBottom} />
    </>
  );
};

export default HeaderNavigation;

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: "row",
    height: 64,
    alignItems: "center",
  },
  TouchOpacityBackButton: {
    paddingLeft: 20,
	zIndex: 1
  },
  TitleContainer: {
    width: "100%",
    position: "absolute",
  },
  RightTitleContainer: {
    flex: 1,
    marginRight: 20,
  },
  Title: {
    alignItems: "center",
    textAlign: "center",
  },
  RightTitle: {
    textAlign: "right",
  },
  BorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#DBDBDB",
    width: "100%",
  },
});
