import {IProfile} from "../../../types/Profile";
import {ScreenName, StackName} from "../../statics/constants/ScreenName"

export type RootStackParamList = {
    [ScreenName.Login]: undefined;
    [ScreenName.Join]: undefined;
    [ScreenName.JoinCompleted]: undefined;
    [ScreenName.CreateDiary]: undefined;
    [ScreenName.AddTodo]: undefined;
	[ScreenName.Mypage]: undefined;
	[ScreenName.Home]: undefined;
	[ScreenName.Profiles]: undefined;
	[ScreenName.CreateProfile]: undefined;
	[ScreenName.UserVerification]: undefined;
	[ScreenName.ResetPassword]: undefined;
	[ScreenName.NewPassword]: undefined;
	[ScreenName.BottomTab]: undefined;
	[ScreenName.EditProfile]: { item: IProfile };
	[ScreenName.ProfileManagement]: undefined;
	[ScreenName.ToDoList]: undefined
    PetManagement : PetManagementParamList;
}

type PetManagementParamList = {
    [StackName.PetManagement.Home]: undefined;
    [StackName.PetManagement.PetType]: undefined;
    [StackName.PetManagement.BreedType]: { petType: number, isEdit?: boolean };
    [StackName.PetManagement.AddPet]: { breed : string, petType: number };
}