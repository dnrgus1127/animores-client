import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {createContext, useContext, useEffect, useState} from "react";
import {Colors} from "../../../styles/Colors";
import {IMAGE_BASE_URL} from "@env";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming
} from "react-native-reanimated";
import {IPet} from "../../../../types/PetTypes";

export interface ProfileData {
    name: string,
    imageUrl?: string,
    onPress?: () => void;
}

interface ProfileContainerProps {
    onAddProfile: () => void,
    onPress: (id: number) => void,
    title: string,
    profileData: Array<IPet>,
    isEdit: boolean
}

interface ProfileProps extends ProfileData {
    isEdit?: boolean
}

const SHAKE_DEG = 1;
const SHAKE_DURATION = 130;

// 한 줄에 표시 될 프로필 개수
const ProfileContainerContext = createContext<number>(0);
/**
 * @desc profile 이 필요한 profileData Array 를 전달하여 프로필 목록 표시
 */
export const ProfileContainer: React.FC<ProfileContainerProps> = (props) => {
    const {onAddProfile, title, profileData, isEdit, onPress} = props;
    return <ProfileContainerContext.Provider value={2}>
        <View style={styles.container}>
            {!isEdit && <AddProfile onPress={onAddProfile} name={title}/>}
            {profileData.map((data, idx) => {
                if (idx > 4) return;
                return <Profile key={idx} index={idx} imageUrl={data.imageUrl} name={data.name}
                                onPress={() => onPress(data.id)} isEdit={isEdit}/>
            })}
        </View>
    </ProfileContainerContext.Provider>
}

export const Profile: React.FC<ProfileProps & { index: number }> = ({imageUrl, name, onPress, index}) => {
    const translateX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: `${translateX.value}deg`, // 회전 값 적용
            }]
        }
    });

    return <Pressable style={[styles.profile]} onPress={onPress}>
        <Animated.View style={animatedStyle}>
            <Image style={[styles.image, {backgroundColor: Colors.Black}]}
                   source={{uri: `${IMAGE_BASE_URL}/${imageUrl}`}}/>
        </Animated.View>
        <Text style={styles.profileName}>{name}</Text>
    </Pressable>
}

const AddProfile: React.FC<ProfileProps> = ({onPress, name}) => {
    const [isPressed, setIsPressed] = useState(false);

    return <Pressable onPress={onPress} style={styles.profile} onPressIn={() => setIsPressed(true)}
                      onPressOut={() => setIsPressed(false)}>
        <View style={[styles.image, isPressed ? styles.pressInBorderDot : styles.borderDot]}>
            <View style={[baseStyle.stick, isPressed && baseStyle.backgroundBlack]}></View>
            <View style={[styles.verticalStick, isPressed && baseStyle.backgroundBlack]}></View>
        </View>
        <Text style={styles.profileName}>{name}</Text>
    </Pressable>
};

const DeleteIcon: React.FC<any> = () => {
    return <Animated.View style={[styles.deleteIcon]}>
        <View style={styles.deleteIconStick}></View>
    </Animated.View>
}

const baseStyle = StyleSheet.create({
    border: {
        borderStyle: "dashed",
        borderWidth: 2,
    },
    backgroundBlack: {
        backgroundColor: Colors.Black,
    },
    stick: {
        width: "25%",
        height: 2,
        backgroundColor: Colors.Gray717171,
    }
})

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
        alignItems: "center",
        position: "relative"
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    borderDot: {
        ...baseStyle.border,
        borderColor: Colors.Gray717171,
    },
    pressInBorderDot: {
        ...baseStyle.border,
        borderColor: Colors.Black
    },
    verticalStick: {
        ...baseStyle.stick,
        transform: 'rotateZ(90deg) translateX(-1%)'
    },
    pressIn: {
        borderColor: Colors.Black,
    },
    profileName: {
        marginTop: 5,
    },
    deleteIcon: {
        position: "absolute",
        backgroundColor: Colors.Warning,
        width: "20%",
        aspectRatio: 1,
        borderRadius: 20,
        top: -10,
        right: -10,
        alignItems: "center",
        justifyContent: "center",
        opacity: .7
    },
    deleteIconStick: {
        width: "50%",
        height: 2.5,
        backgroundColor: Colors.White
    }
})