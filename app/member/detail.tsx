import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, useNavigation } from 'expo-router';

export default function Details() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: "details"}} />
      <Text>
        details
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
});