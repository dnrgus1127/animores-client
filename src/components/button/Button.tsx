import React from "react";
import {Pressable, StyleSheet, Text, View, ViewStyle} from "react-native";
import {Colors} from "../../styles/Colors";
import { LeftArrow } from "../../assets/svg/component/LeftArrow";
import { RightArrow } from "../../assets/svg/component/RightArrow";

interface IButton {
    children?: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
    style?: ViewStyle | Array<ViewStyle>;
}

interface IPlainButton extends IButton {
    text: string;
}

interface IIconButton extends IPlainButton {
    icon: React.ReactNode;
}

interface IArrowButton {
    direction: "left" | "right";
    onPress: () => void;
}

/**
 * @desc Button 뼈대 Component
 * @param children
 * @param onPress
 * @param disabled
 * @param style
 */
const Button: React.FC<IButton> = ({children, onPress, disabled = false, style}) => {
    return (
        <Pressable style={{flex: 1}} onPress={disabled ? () => {} : onPress}>
            <View style={[styles.buttonContainer, styles.button, disabled && styles.disabled, style]}>
                {children}
            </View>
        </Pressable>
    )
}

const PlainButton: React.FC<IPlainButton> = ({text, ...rest}) => {
    return (
        <Button {...rest}>
            <Text style={{color: Colors.White}}>{text}</Text>
        </Button>
    )
}

const IconButton: React.FC<IIconButton> = ({text, icon, ...rest}) => {
    return <Button {...rest}>
        {icon}
        <Text style={{color: Colors.White}}>{text}</Text>
    </Button>
}

const ArrowButton: React.FC<IArrowButton> = ({ direction, onPress }) => {
    const ArrowComponent = direction === "left" ? LeftArrow : RightArrow;
    return (
        <Pressable onPress={onPress}>
            <ArrowComponent />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 7,
    },
    button: {
        backgroundColor: Colors.FB3F7E,
        color: Colors.White,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    disabled: {
        backgroundColor: Colors.DBDBDB,
    }
})

export {
    PlainButton,
    IconButton,
    ArrowButton
}
