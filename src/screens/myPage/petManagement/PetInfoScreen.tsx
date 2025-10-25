import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const TEMP_SPECIES_FALLBACK = '고양이';

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
			<View style={styles.loadingContainer}>
				<Text>Loading...</Text>
			</View>
		);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Pressable onPress={() => navigation.pop()} style={styles.headerButton}>
					<LeftArrow color={Colors.DarkGrey} />
				</Pressable>
				<Text style={styles.headerTitle}>펫 정보</Text>
				<View style={styles.headerRightButtons}>
					<Pressable onPress={() => navigation.navigate(StackName.PetManagement.AddPet, { petId })} style={styles.headerButton}>
						<Edit_SVG color={Colors.DarkGrey} />
					</Pressable>
					<Pressable onPress={toggleDialog} style={styles.headerButton}>
						<TrashCan_SVG color={Colors.DarkGrey} />
					</Pressable>
				</View>
			</View>

			<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
				{/* Pet Profile Section */}
				<View style={styles.profileSection}>
					<View style={styles.profileImageContainer}>
						<Image
							style={styles.profileImage}
							source={asset.profile}
						/>
					</View>
					<Text style={styles.petName}>{petData.name}</Text>
					<Text style={styles.petBreed}>{getBreedName(petData.breed.id)}</Text>
				</View>

				{/* Basic Info Section */}
				<View style={styles.infoSection}>
					<InfoCard
						iconName="calendar-outline"
						label="생일"
						value={convertYYYYMMDDToKorean(petData.birthday)}
						badge={`${daySinceBirth(petData.birthday)}일`}
					/>
					<InfoCard
						iconName="scale-outline"
						label="몸무게"
						value={`${petData.weight} kg`}
					/>
					<InfoCard
						iconName="paw-outline"
						label="품종"
						value={getBreedName(petData.breed.id)}
						badge={petData.species?.name ?? TEMP_SPECIES_FALLBACK}
					/>
					<InfoCard
						iconName={petData.gender === 0 ? 'male' : 'female'}
						label="성별"
						value={petData.gender === 0 ? '남아' : '여아'}
					/>
				</View>
			</ScrollView>

			<Dialog
				visible={showDialog}
				title={'펫 삭제'}
				description={'저장된 내용이 삭제됩니다.'}
				onCancel={toggleDialog}
				onSubmit={() => onSubmit(petId)}
			/>
		</SafeAreaView>
	);
}

function InfoCard({ iconName, label, value, badge }: { iconName: keyof typeof Ionicons.glyphMap; label: string; value: string; badge?: string }) {
	return (
		<View style={infoCardStyles.container}>
			<Ionicons name={iconName} size={24} color={Colors.Gray717171} style={infoCardStyles.icon} />
			<View style={infoCardStyles.textContainer}>
				<Text style={infoCardStyles.label}>{label}</Text>
				<Text style={infoCardStyles.value}>{value}</Text>
			</View>
			{badge && (
				<View style={infoCardStyles.badge}>
					<Text style={infoCardStyles.badgeText}>{badge}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.White,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.White,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.F9F9FB,
	},
	headerButton: {
		padding: 8,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: Colors.DarkGrey,
	},
	headerRightButtons: {
		flexDirection: 'row',
		gap: 8,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 24,
	},
	profileSection: {
		alignItems: 'center',
		paddingVertical: 32,
		paddingHorizontal: 24,
	},
	profileImageContainer: {
		width: width * 0.35,
		height: width * 0.35,
		borderRadius: (width * 0.35) / 2,
		backgroundColor: Colors.F9F9FB,
		overflow: 'hidden',
		marginBottom: 16,
		...Platform.select({
			ios: {
				shadowColor: Colors.Black,
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.1,
				shadowRadius: 8,
			},
			android: {
				elevation: 4,
			},
		}),
	},
	profileImage: {
		width: '100%',
		height: '100%',
	},
	petName: {
		fontSize: 28,
		fontWeight: 'bold',
		color: Colors.DarkGrey,
		marginBottom: 4,
	},
	petBreed: {
		fontSize: 15,
		color: Colors.Gray717171,
	},
	infoSection: {
		paddingHorizontal: 20,
		gap: 12,
	},
});

const infoCardStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.F9F9FB,
		borderRadius: 12,
		padding: 16,
		...Platform.select({
			ios: {
				shadowColor: Colors.Black,
				shadowOffset: { width: 0, height: 1 },
				shadowOpacity: 0.05,
				shadowRadius: 4,
			},
			android: {
				elevation: 1,
			},
		}),
	},
	icon: {
		marginRight: 12,
	},
	textContainer: {
		flex: 1,
	},
	label: {
		fontSize: 12,
		color: Colors.Gray717171,
		marginBottom: 4,
	},
	value: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.DarkGrey,
	},
	badge: {
		backgroundColor: '#FFF4E6',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
	},
	badgeText: {
		fontSize: 12,
		fontWeight: '500',
		color: '#F59E0B',
	},
});
