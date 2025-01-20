import {useNavigation} from "@react-navigation/native";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import React from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import {RootStackParamList} from "../../../navigation/type";
import {ScreenName} from "../../../statics/constants/ScreenName";
import {Colors} from "../../../styles/Colors";
import {useQuery} from "@tanstack/react-query";
import {PetService} from "../../../service/PetService";
import {IPet} from "../../../../types/PetTypes";
import {Profile, ProfileContainer} from "./Profile";
import BreedType from "./BreedType";
import AddPet from "./AddPet";
import PetType from "./PetType";

const PetStack = createStackNavigator();


export const PetManagementScreen = () => {
    return <PetStack.Navigator screenOptions={{headerShown: false}}>
        <PetStack.Screen name={"Home"} component={PatManagementScreen}/>
        <PetStack.Screen name={"breed"} component={BreedType}/>
        <PetStack.Screen name={"petType"} component={PetType}/>
        <PetStack.Screen name={"addPet"} component={AddPet}/>
    </PetStack.Navigator>
}

const PatManagementScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, ScreenName.PatManagement>>();

    const {data = []} = useQuery<Array<IPet>>(["PetList"], () => PetService.get.petList());

    return (
        <SafeAreaView style={styles.container}>
            <HeaderNavigation
                middletitle="펫 관리"
                hasBackButton={true}
                onPressBackButton={() => {
                    navigation.goBack();
                }}
                rightTitle="편집"
            />
            <View style={styles.profileTitleContainer}>
                {/* "펫 정보" 문구 및 펫 마리 수 */}
                <ProfileListInfo length={data.length}/>
                <ProfileContainer onPress={() => navigation.navigate(ScreenName.PetManagement.breed)} title={"펫 추가"}>
                    {/* 기존 펫 프로필 목록 */}
                    {data.map((pet, idx) => {
                        if (idx > 4) return;
                        return <Profile key={pet.id} imageUrl={pet.imageUrl} name={pet.name}
                                        onPress={() => navigation.navigate(ScreenName.AddPet, {
                                            petType: 1,
                                            breed: "치와와"
                                        })}/>
                    })}
                    {/* 펫 추가 */}
                </ProfileContainer>
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

export default PatManagementScreen;

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
