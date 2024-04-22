import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Modal, { Direction } from "react-native-modal";
import { Colors } from "../../styles/Colors";
import Title from "../text/Title";

interface IProps {
  isVisible: boolean;
  propagateSwipe?: boolean;
  onClose?: () => void;
  onModalShow?: () => void;
  onModalHide?: () => void;
  swipeDirection?: Direction | Direction[];
  BottomText?: string;
  style?: StyleProp<ViewStyle>;
  footer?: () => React.ReactNode;
}

const BottomModal: React.FunctionComponent<IProps> = (props: IProps) => {
  const {
    isVisible,
    propagateSwipe = true,
    onClose,
    onModalShow,
    onModalHide,
    swipeDirection = "down",
    BottomText,
    style,
    footer,
  } = props;

  return (
    <Modal
      isVisible={isVisible}
      propagateSwipe={propagateSwipe}
      swipeDirection={swipeDirection}
      onBackdropPress={onClose}
      onModalShow={onModalShow}
      onModalHide={onModalHide}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      backdropOpacity={0.6}
      style={[style, styles.ModalStyle]}
    >
      <View style={styles.ModalContainer}>
        {footer && footer()}
        {/* 프로필 이미지: 기본 이미지로 할래요 */}
        {BottomText &&
          <Pressable>
            <Title
              text={BottomText}
              color={Colors.AEAEAE}
              style={styles.BasicTitle}
            />
          </Pressable>
        }
      </View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  ModalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.White,
    paddingBottom: 30,
  },
  ModalStyle: {
    width: "100%",
    margin: "auto",
    justifyContent: "flex-end"
  },
  BasicTitle: {
    textAlign: "center",
    marginTop: 36,
    textDecorationLine: "underline"
  }
});
