import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {ReactNode} from "react";
import {IPet} from "../../../../types/PetTypes";
import {Colors} from "../../../styles/Colors";
import {IMAGE_BASE_URL} from "@env";


interface ProfileContainerProps {
    children: ReactNode,
    onPress: () => void,
    title: string
}

export const ProfileContainer: React.FC<ProfileContainerProps> = (props) => {
    const {children, onPress, title} = props;
    return <View style={styles.container}>
        <AddProfile onPress={onPress} text={title}/>
        {children}
    </View>
}

export const Profile: React.FC<{ petInfo: IPet }> = ({petInfo}) => {
    return <Pressable style={styles.profile}>
        <Image style={styles.image} source={{uri: `${IMAGE_BASE_URL}/${petInfo.imageUrl}`}}/>
        <Text style={styles.profileName}>{petInfo.name}</Text>
    </Pressable>
}

export const AddProfile: React.FC<{ onPress: () => void, text?: string }> = ({onPress, text}) => {
    return <Pressable onPress={onPress} style={styles.profile}>
        <View style={[styles.image, styles.borderDot]}>
            <View style={[styles.stick]}></View>
            <View style={[styles.stick, styles.verticalStick]}></View>
        </View>
        <Text style={styles.profileName}>{text}</Text>
    </Pressable>
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 25
    },
    profile: {
        width: "35%",
        alignItems: "center"
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    borderDot: {
        borderStyle: "dashed",
        borderColor: Colors.Gray717171,
        borderWidth: 2,
    },
    stick: {
        width: "25%",
        height: 2,
        backgroundColor: Colors.Black,
    },
    verticalStick: {
        transform: 'rotateZ(90deg)'
    },
    profileName: {
        marginTop: 5,
    }
})