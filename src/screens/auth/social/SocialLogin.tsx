import React from 'react';
import { View } from 'react-native';
import { AppleLogin } from './AppleLogin';
import { GoogleLogin } from './GoogleLogin';
import { KakaoLogin } from './KakaoLogin';
import { socialLoginStyles } from './style';

const SocialLogin: React.FC = () => {
    return (
        <View style={socialLoginStyles.buttonWrap}>
            <KakaoLogin />
            <GoogleLogin />
            <AppleLogin />
        </View>
    );
};

export default SocialLogin;
