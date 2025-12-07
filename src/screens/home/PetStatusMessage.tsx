import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface PetStatusMessageProps {
  icon: string;
  iconColor?: string;
  message: string;
  description: string;
}

const PetStatusMessage = ({
  icon,
  iconColor = '#EC4899',
  message,
  description
}: PetStatusMessageProps) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: `${iconColor}20` }]}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.dotIndicator}>
        <View style={[styles.dot, { backgroundColor: '#FCA5A5' }]} />
        <View style={[styles.dot, { backgroundColor: '#C4B5FD' }]} />
        <View style={[styles.dot, { backgroundColor: '#93C5FD' }]} />
      </View>
    </View>
  );
};

export default PetStatusMessage;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconText: {
    fontSize: 28,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  dotIndicator: {
    flexDirection: 'row',
    gap: 6,
    marginLeft: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
