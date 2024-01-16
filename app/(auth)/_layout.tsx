import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect } from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, Pressable, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import Login from './login';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "로그인",
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
              <Text style={styles.title}>로그인</Text>
            </View>
          ),
        }}
      />
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
