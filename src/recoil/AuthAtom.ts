import { atom } from "recoil";
import { IProfile } from "../../types/Profile";
import { DiaryModel } from "../../model/DiaryModel";

export const UserEmailAtom = atom<string>({
    key: 'UserEmailAtom',
    default: ''
})

export const CurrentProfileAtom = atom<IProfile | null>({
    key: 'CurrentProfileAtom',
    default: null
})