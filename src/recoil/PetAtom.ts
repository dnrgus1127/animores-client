import { atom } from "recoil";
import { IPetTypes } from "../../types/PetTypes";

export const PetListAtom = atom<IPetTypes[]>({
    key: 'PetListAtom',
    default: [],
});