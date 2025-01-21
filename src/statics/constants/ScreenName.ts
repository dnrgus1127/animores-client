export enum ScreenName {
	BottomTab = 'BottomTab',
	Home = 'Home',
	Calendar = 'Calendar',
	AllTodo = 'AllTodo',
	Login = 'Login',
	Join = 'Join',
	JoinCompleted = 'JoinCompleted',
	CreateDiary = 'CreateDiary',
	Diary = 'Diary',
	AddTodo = 'AddTodo',
	AlertSetting = 'AlertSetting',
	CustomerService = 'CustomerService',
	Information = 'Information',
	Mypage = 'Mypage',
	Notice = 'Notice',
	PetManagement = 'PetManagement',
	Profile = 'Profile',
	Profiles = 'Profiles',
	CreateProfile = 'CreateProfile',
	UserVerification = 'UserVerification',
	ResetPassword = 'ResetPassword',
	NewPassword = 'NewPassword',
	VersionInformation = 'VersionInformation',
	PetType = 'PetType',
	BreedType = 'BreedType',
	AddPet = 'AddPet',
	EditProfile = 'EditProfile',
	ProfileManagement = 'ProfileManagement',
	ToDoList = 'ToDoList',
}

/**
 * ScreenName 실제 Navigation Stack 별로 나눠 가독성을 높이기 위하여 수정 중
 */
export const StackName = {
    PetManagement : {
		Home: "Home",
        PetType: "PetType",
        BreedType : "BreedType",
        AddPet: "AddPet",
    } as const
} as const;