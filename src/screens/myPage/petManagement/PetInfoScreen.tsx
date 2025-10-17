import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import asset from '../../../assets/png';
import { TrashCan_SVG } from '../../../assets/svg/TrashCan';
import { Edit_SVG } from '../../../assets/svg/component/Edit';
import { LeftArrow } from '../../../assets/svg/component/LeftArrow';
import { convertYYYYMMDDToKorean, daySinceBirth } from '../../../components/Calendar/utils';
import { Dialog } from '../../../components/Dialog';
import { useDialog } from '../../../components/hooks/useDialog';
import { useNavigationParams } from '../../../hooks/useNavigation';
import { RootStackParamList } from '../../../navigation/type';
import { StackName } from '../../../statics/constants/ScreenName';
import { Colors } from '../../../styles/Colors';
import { useBreed } from './hooks/useBreed';
import { usePetForm } from './hooks/usePetForm';
import { usePet, usePetQuery, useProfileData } from './hooks/usePetQuery';

const { width } = Dimensions.get('window');

export function PetInfoScreen() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList['PetManagement'], 'PetInfo'>>();
	const { petId } = useNavigationParams<'PetManagement', 'PetInfo'>();
	const { data: petData, isSuccess, isFetching } = usePet(petId);
	const { getBreedName } = useBreed();
	const { deletePet } = usePetQuery();
	const [showDialog, toggleDialog] = useDialog();
	const { refetch } = useProfileData();
	const { initFormValues } = usePetForm();

	const onSubmit = (petId: number) => {
		toggleDialog();
		deletePet(petId);
		navigation.pop();
	};

	useEffect(() => {
		return () => {
			refetch();
		};
	}, []);

	useEffect(() => {
		isSuccess && initFormValues(petData);
	}, [petData]);

	if (isFetching || !isSuccess)
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);

	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={['#ffcf9b', '#FFAF87', '#FF8C78', '#FA5F6E']}
				style={styles.background1}
			></LinearGradient>
			<View style={styles.background2}></View>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
			>
				<View
					style={[styles.headerButtonBox, { height: width * 0.08, opacity: 0.8 }]}
				>
					<Pressable onPress={() => navigation.pop()}>
						<LeftArrow color={Colors.White} />
					</Pressable>
					<View style={{ flexDirection: 'row', gap: 5, opacity: 0.8 }}>
						<Pressable onPress={() => navigation.navigate(StackName.PetManagement.AddPet, { petId })}>
							<Edit_SVG color={Colors.DarkGrey} />
						</Pressable>
						<Pressable onPress={toggleDialog}>
							<TrashCan_SVG color={Colors.DarkGrey} />
						</Pressable>
					</View>
				</View>
				<Image
					style={[
						{
							width: width * 0.6,
							height: width * 0.6,
							marginTop: width * 0.1,
						},
					]}
					source={asset.profile}
				></Image>
				<View style={styles.nameContainer}>
					<Text style={styles.name}>{petData.name}</Text>
					<Text style={styles.nameGender}>{petData.gender === 0 ? '군' : '양'}</Text>
				</View>
				<View style={styles.petInfoContainer}>
					<PetInfo title="품종" content={getBreedName(petData.breed.id)} subTitle={'고양이'} />
					<PetInfo title="몸무게" content={`${petData.weight} Kg`} subTitle="정상 체중" />
					<PetInfo
						title="태어난지"
						content={`${daySinceBirth(petData.birthday)}일`}
						subTitle={convertYYYYMMDDToKorean(petData.birthday)}
					/>
				</View>
				<Dialog
					visible={showDialog}
					title={'펫 삭제'}
					description={'저장된 내용이 삭제됩니다.'}
					onCancel={toggleDialog}
					onSubmit={() => onSubmit(petId)}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

function PetInfo({ title, content, subTitle }: { title: string; content: string; subTitle: string }) {
	return (
		<Shadow style={styles.petInfoBox}>
			<View style={petInfoStyle.container}>
				<Text style={petInfoStyle.title}>{title}</Text>
				<Text style={petInfoStyle.content}>{content}</Text>
				<Text style={petInfoStyle.subTitle}>{subTitle}</Text>
			</View>
		</Shadow>
	);
}

const baseStyle = StyleSheet.create({
	item: {
		paddingHorizontal: 15,
		paddingVertical: 13,
		fontWeight: 'bold',
		color: Colors.DarkGrey,
		fontSize: 12,
		borderBottomWidth: 0.5,
		borderColor: Colors.C1C1C1,
	},
	shadow: {
		shadowColor: Colors.Black,
		shadowOffset: { width: 3, height: 3 },
		elevation: 2,
	},

	profileButton: {
		backgroundColor: Colors.White,
		borderRadius: 4,
		width: '50%',
		padding: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		borderWidth: 0.5,
		borderColor: Colors.C1C1C1,
	},
	shadowText: {
		textShadowColor: 'rgba(0, 0, 0, 0.3)', // 그림자 색상
		textShadowOffset: { width: 2, height: 2 }, // 그림자 위치
		textShadowRadius: 10, // 그림자 퍼짐 정도
	},
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	background1: {
		flex: 0.7,
		backgroundColor: Colors.Black,
	},
	background2: {
		flex: 0.3,
		backgroundColor: Colors.White,
	},

	scrollView: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingTop: 60,
		gap: 15,
	},
	content: {
		backgroundColor: Colors.White,
		width: '100%',
		borderRadius: 5,
		...baseStyle.shadow,
	},
	nameContainer: {
		flexDirection: 'row',
		gap: 5,
	},

	petInfoContainer: {
		width: '100%',
		flexDirection: 'column',
		gap: 10,
	},
	petInfoBox: {
		width: '100%',
		paddingVertical: 20,
		paddingHorizontal: 20,
		backgroundColor: Colors.White,
		borderRadius: 10,
	},

	name: {
		fontSize: 35,
		lineHeight: 40,
		fontWeight: 'bold',
		color: Colors.White,
		...baseStyle.shadowText,
	},

	nameGender: {
		fontSize: 20,
		fontWeight: 'bold',
		color: Colors.White,
		alignSelf: 'flex-end',
		lineHeight: 40,
		...baseStyle.shadowText,
	},

	headerButtonBox: {
		position: 'absolute',
		width: '100%',
		height: 30,
		marginTop: 15,
		paddingHorizontal: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

const petInfoStyle = StyleSheet.create({
	container: {},
	title: {
		fontSize: 14,
		marginBottom: 8,
	},
	content: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	subTitle: {
		fontSize: 12,
		color: Colors.Gray717171,
	},
});
