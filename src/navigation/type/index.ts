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
    PET : {
        [ScreenName.PatManagement]: undefined;
        [ScreenName.PetType]: undefined;
        [ScreenName.BreedType]: { petType: number, isEdit?: boolean };
        [ScreenName.AddPet]: { breed : string, petType: number };
    }
}
//
// type ValidateRootStackParamList<Stack, Params> = {
//     [K in keyof Stack]: Stack[K] extends Record<string, any>
//         ? Params[K] extends Record<string, any>
//             ? ValidateRootStackParamList<Stack[K], Params[K]> // 재귀적으로 탐색
//             : never // Stack과 Params가 불일치하면 에러
//         : Params[K]; // 기본 매핑
// };
//

type ParamList<T extends keyof RootStackParamList> = RootStackParamList[T];

let a : ParamList<"PET">;

//
// /**
//  * 중첩 구조에 대해서 타입을 추출하는 타입
//  */
// type StackParamMapping<T> = {
//     [K in keyof T]: T[K] extends Record<string, string> ? StackParamMapping<T[K]> : undefined;
// }
//
// type StackParamList = StackParamMapping<typeof StackName>;
//
// type pick<T extends keyof StackParamList> = DynamicPick<StackParamList, T>;
//
// let a: pick<"PetManagement">;
//
// // 타입 정의에서 특정
// type DynamicPick<T, K extends keyof T> = Pick<T, K>;g