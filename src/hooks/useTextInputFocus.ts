import { useState } from "react";

const useTextInputFocus = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onBlur = () => setIsFocused(false);
  const onFocus = () => setIsFocused(true);

  return { isFocused, onBlur, onFocus };
};

export default useTextInputFocus;
