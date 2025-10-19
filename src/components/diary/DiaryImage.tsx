import React, { useState } from 'react';
import { Image, View, StyleSheet, ImageStyle, StyleProp } from 'react-native';
import { ImagePickerIcon } from '../../assets/svg';
import { Colors } from '../../styles/Colors';
import Title from '../text/Title';

interface DiaryImageProps {
    /** 이미지 URL */
    uri: string;
    /** 이미지 스타일 */
    style?: StyleProp<ImageStyle>;
}

/**
 * 일지 이미지 컴포넌트
 * 이미지 로딩 실패 시 대체 UI 표시
 */
const DiaryImage: React.FC<DiaryImageProps> = ({ uri, style }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <View style={[styles.errorContainer, style]}>
                <ImagePickerIcon width={30} height={30} />
                <Title
                    text="이미지 없음"
                    fontSize={10}
                    color={Colors.AEAEAE}
                    style={styles.errorText}
                />
            </View>
        );
    }

    return (
        <Image
            source={{ uri }}
            style={style}
            onError={() => setHasError(true)}
        />
    );
};

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: Colors.F4F4F4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        marginTop: 4,
    },
});

export default DiaryImage;
