import { ScreenName } from "../../statics/constants/ScreenName"

export type BottomStackParamList = {
    [ScreenName.Home]: undefined;
    [ScreenName.AllTodo]: undefined;
    [ScreenName.Diary]: undefined;
}

export type RootStackParamList = {
    [ScreenName.Login]: undefined;
    [ScreenName.Join]: undefined;
    [ScreenName.CreateDiary]: undefined;
    [ScreenName.AddTodo]: undefined;
	[ScreenName.PatManagement]: undefined;
	[ScreenName.PetType]: undefined;
	[ScreenName.BreedType]: undefined;
	[ScreenName.AddPet]: undefined;
	[ScreenName.Mypage]: undefined;
	[ScreenName.HomeScreen]: undefined;
}