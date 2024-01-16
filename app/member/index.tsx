import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect } from 'react';
import { Stack, useNavigation, Link } from 'expo-router';
import { StyleSheet, Text, View, Pressable, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';

export default function MemberHome() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "My home",
          header: () => (
            <View style={styles.separator}>
              <Link style={styles.topLink} href="/" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="angle-left"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Text style={styles.title}>모든할일</Text>
            </View>
          ),
        }}
      />
      <Text>Home Screen</Text>
      <Link href={{ pathname: 'member/detail'} as never}>Go to Details</Link>
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
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  topLink: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  }
});
