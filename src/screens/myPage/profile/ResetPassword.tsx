import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  Cancle,
  ProfileImage as DefaultProfileImage,
} from "../../../assets/svg";
import SingleButton from "../../../components/button/SingleButton";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { ProfileService } from "../../../service/ProfileService";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";

const ResetPassword = () => {

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        middletitle={"비밀번호 재설정"}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.paddingContainer}>
        <Text>ResetPassword</Text>
      </View>
    </SafeAreaView>
  )
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  paddingContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
})