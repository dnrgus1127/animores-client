import { StyleSheet } from 'react-native';

export const baseSocialButtonStyle = StyleSheet.create({
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        borderRadius: 12,
        marginBottom: 12,
        paddingHorizontal: 16,
        position: 'relative',
    },
    textCenterWrap: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        zIndex: -1,
    },
    socialText: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: 'bold',
        fontFamily: 'Pretendard',
    },
});

export const socialLoginStyles = StyleSheet.create({
    buttonWrap: {
        width: '100%',
    },
    kakaoButton: {
        ...baseSocialButtonStyle.socialButton,
        backgroundColor: '#FEE500',
    },
    kakaoText: {
        ...baseSocialButtonStyle.socialText,
        color: '#3C1E1E',
    },
    googleButton: {
        ...baseSocialButtonStyle.socialButton,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#747775',
    },
    googleText: {
        ...baseSocialButtonStyle.socialText,
        color: '#222',
    },
    appleButton: {
        ...baseSocialButtonStyle.socialButton,
        backgroundColor: '#222',
    },
    appleText: {
        ...baseSocialButtonStyle.socialText,
        color: '#fff',
    },
    textCenterWrap: baseSocialButtonStyle.textCenterWrap,
}); 