import {useQuery, useMutation} from "@tanstack/react-query";
import {IBreed, IPet, IPetDetails, IPetResponse} from "../../../../../types/PetTypes";
import {QueryKey} from "../../../../statics/constants/Querykey";
import {PetService} from "../../../../service/PetService";

export const usePet = (petId: number) => {
    return useQuery<IPetResponse>([QueryKey.PET, petId], () => PetService.get.pet(petId))
}

/**
 * @desc 펫 품종 목록을 가져오는 커스텀 훅 (Tanstack Query Cache 이용)
 * @param speciesId
 */
export function useBreedList(speciesId: number) {
    const {data} = useQuery<IBreed[]>([QueryKey.BREED_LIST, speciesId], () => PetService.get.breedList(speciesId), {
        enabled: speciesId !== undefined,
        placeholderData: [],
    });
    return data;
}

export function useProfileData() {
    return useQuery<Array<IPet>, unknown, Array<IPet>>([QueryKey.PET_LIST],
        () => PetService.get.petList(),
        {placeholderData: []}
    );
}

export function usePetQuery() {
    const {mutate} = useMutation({
        mutationFn: (petId: number) => PetService.DELETE.pet(petId),
    })

   return {deletePet : mutate}
}

