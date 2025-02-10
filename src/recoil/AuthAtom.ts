import { atom } from "recoil";
import { IProfile } from "../../types/Profile";

export const UserEmailAtom = atom<string>({
    key: 'UserEmailAtom',
    default: ''
})

export const CurrentProfileAtom = atom<IProfile | null>({
    key: 'CurrentProfileAtom',
    default: null
})