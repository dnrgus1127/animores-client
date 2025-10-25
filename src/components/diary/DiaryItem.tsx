import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import { CommentIcon, More, UserImage } from '../../assets/svg';
import Title from '../text/Title';
import { Colors } from '../../styles/Colors';
import { DiaryItemProps } from './types';
import { diaryStyles } from './styles';

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
                <UserImage />
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
            {item?.imageUrl && <View style={{ marginTop: 22 }}>{/* TODO: 이미지 */}</View>}
            <Pressable
                onPress={handlePressComment}
                style={diaryStyles.commentIconContainer}
            >
                <CommentIcon />
                <Title
                    text={item?.commentCount}
                    color={Colors.AEAEAE}
                    style={{ marginLeft: 8 }}
                />
            </Pressable>

            {showSeparator && !isLastItem && <View style={diaryStyles.bottomLine} />}
        </View>
    );
};

export default DiaryItem;
