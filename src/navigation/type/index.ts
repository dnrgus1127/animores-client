import { ScreenName } from "../../statics/constants/ScreenName"

export type BottomStackParamList = {
    [ScreenName.Home]: undefined;
    [ScreenName.AllTodo]: undefined;
    [ScreenName.Record]: undefined;
}

export type RootStackParamList = {
    [ScreenName.Login]: undefined;
    [ScreenName.Join]: undefined;
    [ScreenName.CreateRecord]: undefined;
    [ScreenName.AddTodo]: undefined;
	[ScreenName.PatManagement]: undefined;
	[ScreenName.AddPetScreen]: undefined;
	[ScreenName.BreedType]: undefined;
}