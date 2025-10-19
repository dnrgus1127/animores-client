import React, { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import { IMAGE_BASE_URL } from '@env';
import { CommentIcon, More, UserImage } from '../../assets/svg';
import Title from '../text/Title';
import { Colors } from '../../styles/Colors';
import { DiaryItemProps } from './types';
import { diaryStyles } from './styles';
import DiaryImage from './DiaryImage';

dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);

const MORE_LENGTH = 17; // 17자 이상이면 말줄임

/**
 * 개별 일지 아이템 컴포넌트
 */
const DiaryItem: React.FC<DiaryItemProps> = ({
    item,
    onPressMore,
    onPressComment,
    enableActions = true,
    showSeparator = true,
    index,
    totalCount,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const contentToShow =
        item?.content.length > MORE_LENGTH
            ? item?.content.slice(0, MORE_LENGTH) + '...'
            : item?.content;

    // media 배열에서 이미지만 필터링 및 URL 변환
    const imagesToDisplay = React.useMemo(() => {
        if (item?.media && item.media.length > 0) {
            return item.media
                .filter((mediaItem) => mediaItem.type === 'I')
                .sort((a, b) => a.order - b.order)
                .map((mediaItem) => `${IMAGE_BASE_URL}/${mediaItem.url}`);
        }

        return [];
    }, [item?.media]);


    const handlePressMore = () => {
        if (enableActions && onPressMore) {
            onPressMore(item);
        }
    };

    const handlePressComment = () => {
        if (enableActions && onPressComment) {
            onPressComment(item);
        }
    };

    const isLastItem = typeof index === 'number' && typeof totalCount === 'number'
        ? index === totalCount - 1
        : false;

    return (
        <View style={diaryStyles.renderItemContainer}>
            <View style={diaryStyles.top}>
                {item?.imageUrl ? (
                    <Image
                        source={{ uri: `${IMAGE_BASE_URL}/${item.imageUrl}` }}
                        style={diaryStyles.profileImage}
                    />
                ) : (
                    <UserImage />
                )}
                <View style={diaryStyles.titleContainer}>
                    <Title
                        text={item?.name}
                        fontSize={16}
                        fontWeight={'bold'}
                        style={{ marginBottom: 2 }}
                    />
                    <Title
                        text={dayjs
                            .utc(item?.createdAt)
                            .utcOffset(9)
                            .format('YYYY.MM.DD HH:mm A')}
                        color={Colors.AEAEAE}
                    />
                </View>
                <Pressable onPress={handlePressMore}>
                    <More style={diaryStyles.moreIcon} />
                </Pressable>
            </View>
            <View style={diaryStyles.contentContainer}>
                <Title text={isExpanded ? item?.content : contentToShow} />
                {!isExpanded && item?.content.length > MORE_LENGTH && (
                    <Pressable
                        onPress={() => {
                            setIsExpanded(true);
                        }}
                    >
                        <Title
                            text={'더 보기'}
                            color={Colors.AEAEAE}
                            style={{ marginLeft: 6 }}
                        />
                    </Pressable>
                )}
            </View>
            {imagesToDisplay.length > 0 && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={diaryStyles.imageGalleryContainer}
                >
                    {imagesToDisplay.map((imageUrl, index) => (
                        <View key={index} style={diaryStyles.imageWrapper}>
                            <DiaryImage
                                uri={imageUrl}
                                style={diaryStyles.diaryImage}
                            />
                        </View>
                    ))}
                </ScrollView>
            )}
            <Pressable
                onPress={handlePressComment}
                style={diaryStyles.commentIconContainer}
            >
                <CommentIcon />
                <Title
                    text={String(item?.commentCount)}
                    color={Colors.AEAEAE}
                    style={{ marginLeft: 8 }}
                />
            </Pressable>

            {showSeparator && !isLastItem && <View style={diaryStyles.bottomLine} />}
        </View>
    );
};

export default DiaryItem;
