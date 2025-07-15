import React, { ReactNode, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

interface SwipeableCardProps {
    children: ReactNode;
    hiddenContent: ReactNode;
    cardStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    hiddenCardStyle?: StyleProp<ViewStyle>;
    hiddenMenuWidth?: number;
    timingDuration?: number;
}

const SwipeableCard = ({
    children,
    hiddenContent,
    cardStyle,
    containerStyle,
    hiddenCardStyle,
    hiddenMenuWidth = 70,
    timingDuration = 500
}: SwipeableCardProps) => {
    // xOffset은 카드의 X 좌표 위치
    const xOffset = useSharedValue(0);
    // card의 높이를 저장하는 state
    const [cardHeight, setCardHeight] = useState(0);

    // 슬라이드 제스처 핸들러
    const pan = Gesture.Pan()
        .onUpdate(e => {
            xOffset.value = Math.max(-hiddenMenuWidth, Math.min(0, e.translationX));
        })
        .onEnd(e => {
            if (xOffset.value < -hiddenMenuWidth / 2) {
                xOffset.value = withTiming(-hiddenMenuWidth, { duration: timingDuration });
            } else {
                xOffset.value = withTiming(0, { duration: timingDuration });
            }
        });

    // 애니메이션 스타일
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: xOffset.value }],
        };
    });


    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.hiddenCard, hiddenCardStyle, { height: cardHeight || 'auto' }]}>
                {hiddenContent}
            </View>
            <GestureDetector gesture={pan}>
                <Animated.View 
                    style={[styles.card, cardStyle, animatedStyle]}
                    onLayout={(event) => {
                        const { height } = event.nativeEvent.layout;
                        setCardHeight(height);
                    }}
                >
                    {children}
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    card: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        top: 0,
        left: 0,
    },
    hiddenCard: {
        position: 'relative',
        zIndex: 1,
        width: '100%',
        height: '100%',
    },
});

export default SwipeableCard; 