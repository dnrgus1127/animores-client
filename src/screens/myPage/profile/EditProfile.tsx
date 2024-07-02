import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { Colors } from "../../../styles/Colors";

const EditProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderNavigation middletitle={"프로필 수정"} />
        </SafeAreaView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
});
