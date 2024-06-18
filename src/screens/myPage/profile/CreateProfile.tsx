import React from 'react';
import { View } from 'react-native';
import HeaderNavigation from '../../../navigation/HeaderNavigation';
import { ProfileImage } from '../../../assets/svg';

const CreateProfile = () => {
	return (
		<View>
			<HeaderNavigation middletitle={'프로필 추가'} />
			<ProfileImage style={{alignSelf:"center", marginTop: 70}} />
		</View>
	);
};

export default CreateProfile;