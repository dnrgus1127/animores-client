import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../styles/Colors';
import Title from '../text/Title';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  style?: ViewStyle;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = Colors.FB3F7E,
  message,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Title
          text={message}
          fontSize={16}
          color={Colors.Gray717171}
          style={styles.message}
        />
      )}
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 16,
    textAlign: 'center',
  },
});
