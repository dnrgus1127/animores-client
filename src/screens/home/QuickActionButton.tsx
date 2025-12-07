import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type ColorType = 'yellow' | 'blue' | 'pink' | 'green';

interface QuickActionButtonProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  color: ColorType;
  onPress?: () => void;
}

const colorStyles = {
  yellow: {
    bg: '#FEFCE8',
    text: '#CA8A04',
    border: '#FDE68A',
  },
  blue: {
    bg: '#EFF6FF',
    text: '#2563EB',
    border: '#BFDBFE',
  },
  pink: {
    bg: '#FDF2F8',
    text: '#DB2777',
    border: '#FBCFE8',
  },
  green: {
    bg: '#F0FDF4',
    text: '#16A34A',
    border: '#BBF7D0',
  },
};

const QuickActionButton = ({ icon, label, color, onPress }: QuickActionButtonProps) => {
  const colors = colorStyles[color];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        }
      ]}
      onPress={onPress}
    >
      {/* 픽셀 장식 */}
      <View style={[styles.pixelDot, { backgroundColor: colors.text, opacity: 0.2 }]} />

      <View style={styles.iconContainer}>
        <Feather name={icon} size={20} color={colors.text} />
      </View>

      <Text style={[styles.label, { color: colors.text }]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default QuickActionButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden',
    minWidth: 70,
  },
  pixelDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 1,
  },
  iconContainer: {
    position: 'relative',
    zIndex: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    position: 'relative',
    zIndex: 10,
  },
});
