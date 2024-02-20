import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BackButton } from "../assets/svg";
import Title from "../components/text/Title";

interface IProps {
  title: string;
  onPressBackButton?: () => void;
  hasBackButton?: boolean;
  hasHeaderTitle?: boolean;
}

const HeaderNavigation = (props: IProps) => {
  const {
    title,
    onPressBackButton,
    hasBackButton = true,
    hasHeaderTitle = true,
  } = props;

  return (
    <>
      <View style={styles.HeaderContainer}>
        {hasBackButton && (
          <TouchableOpacity
            onPress={onPressBackButton}
            style={styles.TouchOpacityBackButton}
          >
            <BackButton />
          </TouchableOpacity>
        )}
        {hasHeaderTitle && (
          <View style={styles.TitleContainer}>
            <Title text={title} fontSize={18} style={styles.Title} />
          </View>
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
  },
  TitleContainer: {
    width: "100%",
    position: "absolute",
    paddingBottom: 4,
  },
  Title: {
    textAlign: "center",
  },
  BorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#DBDBDB",
    width: "100%",
  },
});
