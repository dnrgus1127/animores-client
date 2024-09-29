import React from "react";
import { Modal, StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { Colors } from "../../styles/Colors";
import Title from "../text/Title";

interface ModalComponentProps {
  visible: boolean;
  title: string;
  subTitle: string;
  onClose: () => void;
  onDelete: () => void;
}

const width = Dimensions.get("window").width;

const CenterModal: React.FC<ModalComponentProps> = ({
  isVisible,
  title,
  subTitle,
  onClose,
  onDelete,
}) => {
  return (
    <Modal
      transparent={true}
      isVisible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Title
            text={title}
            fontSize={16}
            fontWeight="bold"
            style={styles.modalText}
          />
          <Title
            text={subTitle}
            fontSize={14}
            color={Colors.AEAEAE}
            style={styles.modalSubText}
          />
          <Pressable style={styles.pressableButton} onPress={onDelete}>
            <Title text="삭제" color={Colors.FF4040} fontSize={15} />
          </Pressable>
          <View style={styles.line} />
          <Pressable style={styles.pressableButton} onPress={onClose}>
            <Title text="취소" fontSize={15} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CenterModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  modalContainer: {
    paddingTop: 44,
    paddingBottom: 17,
    backgroundColor: Colors.White,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  modalSubText: {
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 40,
  },
  line: {
    height: 1,
    width: width - 80,
    borderWidth: 0.8,
    borderColor: Colors.DBDBDB,
  },
  pressableButton: {
    paddingVertical: 16,
    width: width - 80,
    alignItems: "center",
  },
});
