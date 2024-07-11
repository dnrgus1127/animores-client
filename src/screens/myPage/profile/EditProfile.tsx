import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { IProfile } from '../../../../types/Profile';
import {
    Cancle,
    ProfileImage as DefaultProfileImage
} from "../../../assets/svg";
import SingleButton from '../../../components/button/SingleButton';
import Title from '../../../components/text/Title';
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from '../../../navigation/type';
import { ProfileService } from '../../../service/ProfileService';
import { ScreenName } from '../../../statics/constants/ScreenName';
import { Colors } from "../../../styles/Colors";

const EditProfileScreen = () => {
    const route = useRoute();
    const { item } = route.params as { item: IProfile };

    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

    const [textInput, onChangeText] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string>("");
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const navigation =
        useNavigation<
            StackNavigationProp<RootStackParamList, ScreenName.EditProfile>
        >();

    useEffect(() => {
        onChangeText(item.name)
    }, [item.name])

    useEffect(() => {
        setIsEdit(textInput === item.name && !profileImage);
    }, [textInput, profileImage]);

    //프로필 수정
    const { mutate: profileEdit } = useMutation({
        mutationFn: async (data: FormData) => {
            console.log("data@!!!!!!!!!!!!!", data)
            try {
                const response = await ProfileService.profile.edit(data);
                return response.data;
            } catch (error) {
                console.error('Error edit profile:', error);
                throw error;
            }
        },
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: '프로필이 수정되었습니다!'
            });
            navigation.navigate(ScreenName.BottomTab);
        },
        onError: (error) => {
            console.error('Error edit profile:', error);
            Toast.show({
                type: 'error',
                text1: '프로필 수정을 실패했습니다.'
            });
        }
    });

    //프로필 삭제
    const { mutate: profileDelete } = useMutation({
        mutationFn: async () => {
            const response = await ProfileService.profile.delete(item.id);
            return response.data;
        },
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: '프로필이 삭제되었습니다.'
            });
            navigation.navigate(ScreenName.BottomTab);
        },
        onError: (error) => {
            console.error('Error delete profile:', error);
            Toast.show({
                type: 'error',
                text1: '프로필 삭제를 실패했습니다.'
            });
        }
    });

    //프로필 선택
    const handleChoosePhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    }

    const handleProfileSubmit = async () => {
        try {
            const formData = new FormData();

            const requestData = {
                profileId: item.id,
                name: textInput,
                isUpdateImage: false
            }

            formData.append('request', JSON.stringify(requestData));

            if (profileImage) {
                const response = await fetch(profileImage);
                const blob = await response.blob();

                formData.append('profileImage', {
                    uri: profileImage,
                    type: blob.type,
                    name: 'profile.jpg'
                });
            }

            profileEdit(formData);
        } catch (error) {
            console.error('Error preparing formData:', error);
            Toast.show({
                type: 'error',
                text1: '프로필 수정을 실패했습니다.',
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderNavigation
                middletitle={"프로필 수정"}
                onPressBackButton={() => {
                    navigation.goBack();
                }} />
            <Pressable
                style={styles.profileImageContainer}
                onPress={handleChoosePhoto}
            >
                {item.imageUrl !== "profile/default_profile.png" ? (
                    <Image
                        source={{ uri: `${baseUrl}/${item.imageUrl}` }}
                        style={styles.profileImage}
                    />
                ) : (
                    <DefaultProfileImage
                        style={styles.profileImage}
                    />
                )}
            </Pressable>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={"닉네임을 입력하세요"}
                    placeholderTextColor={Colors.DBDBDB}
                    value={textInput}
                    defaultValue={item.name}
                    onChangeText={onChangeText}
                    style={{
                        flex: 1,
                        color: Colors.Black,
                    }}
                />
                {textInput && (
                    <Pressable
                        onPress={() => {
                            onChangeText("");
                        }}
                    >
                        <Cancle />
                    </Pressable>
                )}
            </View>
            <Title
                text='한글/영어/숫자/띄어쓰기를 사용할 수 있습니다.'
                color={Colors.AEAEAE}
                style={{ marginTop: 20, marginHorizontal: 20 }}
            />
            <View style={styles.editButtonContainer}>
                <Pressable onPress={() => profileDelete()}>
                    <Title
                        text='프로필 삭제하기'
                        color={Colors.AEAEAE}
                        style={styles.deleteProfileButton}
                    />
                </Pressable>
                <SingleButton
                    title={'수정완료'}
                    disabled={isEdit}
                    onPress={handleProfileSubmit} />
            </View>
        </SafeAreaView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    profileImageContainer: {
        alignSelf: "center",
        marginTop: 70,
        marginBottom: 36,
        width: 100,
        height: 100,
    },
    profileImage: {
        alignSelf: "center",
        width: 100,
        height: 100,
        borderRadius: 50
    },
    inputContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: Colors.C1C1C1,
        paddingVertical: 14,
        marginHorizontal: 20,
        alignItems: "center",
    },
    deleteProfileButton: {
        textDecorationLine: "underline",
        textAlign: "center",
        marginBottom: 20
    },
    editButtonContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: "auto"
    }
});