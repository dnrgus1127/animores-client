import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const useKeyboardHeight = () => {
  const inset = useSafeAreaInsets();
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (Platform.OS === "ios") {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardWillShow",
        (e) => {
          setHeight(e.endCoordinates.height - inset.bottom);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardWillHide",
        () => setHeight(0)
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }
  }, []);
  return { height };
};

export default useKeyboardHeight;
