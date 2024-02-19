import React = require("react");
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Modal, { Direction } from "react-native-modal";
import { Colors } from "../../statics/styles/Colors";

interface IProps {
  isVisible: boolean;
  propagateSwipe?: boolean;
  onClose?: () => void;
  onModalShow?: () => void;
  onModalHide?: () => void;
  swipeDirection?: Direction | Direction[];
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
      style={[style, { width: "100%", margin: "auto" }]}
    >
      <View style={styles.ModalContainer}>{footer && footer()}</View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  ModalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.White,
    height: 132,
  },
});
