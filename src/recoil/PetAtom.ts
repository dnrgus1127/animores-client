import { atom } from "recoil";
import { IPet } from "../../types/PetTypes";

export const PetListAtom = atom<IPet[]>({
    key: 'PetListAtom',
    default: [],
});