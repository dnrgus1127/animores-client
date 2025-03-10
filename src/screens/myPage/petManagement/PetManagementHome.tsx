import {useNavigation} from "@react-navigation/native";
import {CardStyleInterpolators, createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import React, {useState} from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import {RootStackParamList} from "../../../navigation/type";
import {StackName} from "../../../statics/constants/ScreenName";
import {Colors} from "../../../styles/Colors";
import {ProfileContainer} from "./Profile";
import BreedType from "./BreedType";
import AddPet from "./AddPet";
import PetType from "./PetType";
import {FormProvider, useForm} from "react-hook-form";
import {useResetFormOnScreenFocus} from "./hooks/useNavigationFormHooks";
import {usePetQuery, useProfileData} from "./hooks/usePetQuery";
import {PetInfoScreen} from "./PetInfoScreen";

const PetStack = createStackNavigator();

export const PetManagementScreen = () => {
    const form = useForm();

    return <FormProvider {...form}>
        <PetStack.Navigator initialRouteName={StackName.PetManagement.Home}
                            screenOptions={{
                                headerShown: false,
                                animationEnabled: true,
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                            }}>
            <PetStack.Screen name={StackName.PetManagement.Home} component={PetManagementHome}/>
            <PetStack.Screen name={StackName.PetManagement.BreedType} component={BreedType}/>
            <PetStack.Screen name={StackName.PetManagement.PetType} component={PetType}/>
            <PetStack.Screen name={StackName.PetManagement.AddPet} component={AddPet}/>
            <PetStack.Screen name={StackName.PetManagement.PetInfo} component={PetInfoScreen}/>
        </PetStack.Navigator>
    </FormProvider>
}

const PetManagementHome = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList["PetManagement"], "Home">>();
    const [isEdit, setIsEdit] = useState(false);
    const {data: profileList, refetch} = useProfileData();
    const {deletePet} = usePetQuery();
    useResetFormOnScreenFocus();

    return (
        <SafeAreaView style={styles.container}>
            <HeaderNavigation
                middletitle="펫 관리" hasBackButton={true} rightTitle="편집"
                onPressBackButton={() => navigation.pop()}
                onPressRightButton={() => setIsEdit(true)}
            />
            <View style={styles.profileTitleContainer}>
                <ProfileListInfo length={profileList.length}/>
                <ProfileContainer
                    isEdit={isEdit}
                    title={"펫 추가"}
                    profileData={profileList}
                    onAddProfile={() => navigation.push(StackName.PetManagement.PetType)}
                    onDelete={(petId: number) => {
                        deletePet(petId);
                        refetch();
                    }}
                    onPress={(petId: number) => navigation.push(StackName.PetManagement.PetInfo, {petId: petId})}
                />
            </View>
        </SafeAreaView>
    );
};

const ProfileListInfo: React.ComponentType<{ length: number }> = ({length}) => {
    return <View style={styles.profileListInfo}>
        <Title text={"펫 목록"} fontSize={16} style={{lineHeight: 20}}/>
        <Text style={{color: Colors.FB3F7E, fontSize: 16, lineHeight: 20}}>{length}</Text>
    </View>
}

export default PetManagementHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    profileTitleContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: "5%",
    },
    profileListInfo: {
        width: "70%",
        borderWidth: 1,
        borderColor: Colors.F9F9FB,
        borderRadius: 99,
        paddingVertical: 10,
        marginBottom: 43,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        ...Platform.select({
            ios: {
                shadowColor: Colors.Black,
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.3,
                shadowRadius: 6,
            },
            android: {
                backgroundColor: Colors.F9F9FB,
                elevation: 4,
                shadowColor: "gray",
                shadowOpacity: 0.3,
                shadowRadius: 6,
            },
        }),
    },
});
