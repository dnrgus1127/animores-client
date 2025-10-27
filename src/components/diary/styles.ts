import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/Colors';

/**
 * 일지 컴포넌트 공통 스타일
 */
export const diaryStyles = StyleSheet.create({
    // DiaryItem 스타일
    renderItemContainer: {
        paddingTop: 20,
        backgroundColor: Colors.White,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleContainer: {
        flex: 1,
        marginLeft: 12,
    },
    moreIcon: {
        alignSelf: 'flex-end',
    },
    contentContainer: {
        flexDirection: 'row',
        marginTop: 22,
    },
    commentIconContainer: {
        flexDirection: 'row',
        marginTop: 18,
        marginBottom: 20,
        alignItems: 'center',
    },
    bottomLine: {
        borderBottomWidth: 6,
        borderBottomColor: Colors.F4F4F4,
    },

    // DiaryList 스타일
    flatList: {
        width: '100%',
        height: '100%',
    },
    flatListContent: {
        paddingHorizontal: 20,
    },
    centerContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageText: {
        color: '#838383',
        fontSize: 14,
    },

    // DiaryFormEditor 스타일
    formContainer: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    textInput: {
        padding: 16,
        textAlignVertical: 'top',
        minHeight: 150,
    },
    formBottomLine: {
        borderBottomWidth: 6,
        borderBottomColor: Colors.F4F4F4,
    },
    imageContainer: {
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 34,
    },
    selectedImageContainer: {
        marginTop: 11,
        marginRight: 9,
        flexDirection: 'row',
    },
    selectedImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    videoContainer: {
        marginLeft: 20,
        marginBottom: 34,
    },

    // DiaryActionModal 스타일
    bottomModalContainer: {
        marginTop: 15,
    },
    footer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    footerTopLine: {
        backgroundColor: Colors.Gray838383,
        height: 1.5,
        width: 50,
        alignSelf: 'center',
    },
    buttonContainer: {
        backgroundColor: Colors.FB3F7E,
        flex: 1,
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
    },
});
