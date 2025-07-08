import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { socialLoginStyles } from './style';

interface SocialLoginButtonProps {
  icon: React.ReactNode;
  text: string;
  buttonStyle: any;
  textStyle: any;
  onPress: () => void;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  icon,
  text,
  buttonStyle,
  textStyle,
  onPress,
}) => {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <View style={socialLoginStyles.textCenterWrap}>
        {icon}
        <Text style={textStyle}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}; 