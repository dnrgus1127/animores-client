import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable
} from "react-native";
import { Colors } from "../../styles/Colors";

interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
}

const CenterModal: React.FC<ModalComponentProps> = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Modal</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
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
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: Colors.White,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: Colors.FB3F7E,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: Colors.White,
    fontSize: 16,
  },
});
