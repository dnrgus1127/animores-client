import React, { useEffect } from 'react';
import { Modal, Pressable, StyleSheet, View, Text } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    withDelay
} from 'react-native-reanimated';
import { Colors } from '../../styles/Colors';

type SlideUpModalProps = {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    contentHeight?: number;
};

export const SlideUpModal: React.FC<SlideUpModalProps> = ({
    isVisible,
    onClose,
    children,
    contentHeight = 70,
}) => {
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (isVisible) {
            // 모달이 열릴 때
            opacity.value = withDelay(
                30, // 슬라이드 업 애니메이션을 위한 딜레이
                withTiming(1, {
                    duration: 200,
                })
            );
        } else {
            // 모달이 닫힐 때
            opacity.value = 0;
        }
    }, [isVisible]);

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    if (!isVisible) return null;

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.container}>
                <Animated.View style={[styles.overlay, overlayStyle]}>
                    <Pressable
                        style={styles.pressable}
                        onPress={onClose}
                    />
                </Animated.View>
                <View
                    style={[styles.content, { height: `${contentHeight}%` }]}
                >
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    pressable: {
        flex: 1,
    },
    content: {
        backgroundColor: Colors.White,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingTop: 30,
        paddingBottom: 30,
        alignItems: 'center',
    },
}); 