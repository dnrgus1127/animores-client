import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { IconSnsApple, IconSnsFacebook, IconSnsKakao, IconSnsNaver } from '../../assets/svg';
import { commonStyles } from '../../styles/commonStyles';
import { GoogleLogin } from './GoogleLogin';
import { KakaoLogin } from './KakaoLogin';

interface SocialLoginProps {
    onNaverLogin?: () => void;
    onKakaoLogin?: () => void;
    onFacebookLogin?: () => void;
    onAppleLogin?: () => void;
    navigation?: any;
}

const SocialLogin: React.FC<SocialLoginProps> = ({
    onNaverLogin,
    onKakaoLogin,
    onFacebookLogin,
    onAppleLogin,
    navigation,
}) => {
    // TODO: 타입 정의 필요
    return (
        <View style={commonStyles.commonRowContainer}>
            <View style={styles.loginContainer}>
                {/* <Pressable onPress={onNaverLogin}>
                    <IconSnsNaver />
                </Pressable> */}
                {/* <Pressable onPress={onKakaoLogin}>
                    <IconSnsKakao />
                </Pressable> */}
                {/* <Pressable onPress={onFacebookLogin}>
                    <IconSnsFacebook />
                </Pressable> */}
                <KakaoLogin />
                <Pressable onPress={onAppleLogin}>
                    <IconSnsApple />
                </Pressable>
                <GoogleLogin navigation={navigation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        marginTop: 30,
        flexDirection: 'row',
        
    },
});

export default SocialLogin;
