import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

type ColorType = 'yellow' | 'blue' | 'pink' | 'green';

interface SummaryCardProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  count: string;
  detail: string;
  color: ColorType;
}

const colorStyles = {
  yellow: {
    bg: '#FEF9C3',
    text: '#A16207',
    border: '#FDE68A',
  },
  blue: {
    bg: '#DBEAFE',
    text: '#1E40AF',
    border: '#BFDBFE',
  },
  pink: {
    bg: '#FCE7F3',
    text: '#BE185D',
    border: '#FBCFE8',
  },
  green: {
    bg: '#D1FAE5',
    text: '#065F46',
    border: '#BBF7D0',
  },
};

const SummaryCard = ({ icon, title, count, detail, color }: SummaryCardProps) => {
  const colors = colorStyles[color];

  return (
    <View style={styles.card}>
      {/* 픽셀 장식 상단 라인 */}
      <View style={styles.topLine} />

      <View style={[styles.iconBox, { backgroundColor: colors.bg, borderColor: colors.border }]}>
        <Feather name={icon} size={20} color={colors.text} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.countText}>{count}</Text>
      </View>

      <Text style={styles.detailText}>{detail}</Text>
    </View>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    position: 'relative',
    overflow: 'hidden',
  },
  topLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#F3F4F6',
  },
  iconBox: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  titleText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  detailText: {
    fontSize: 11,
    color: '#D1D5DB',
  },
});
