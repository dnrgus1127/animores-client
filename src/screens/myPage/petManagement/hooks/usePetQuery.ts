import {useQuery, useMutation} from "@tanstack/react-query";
import {IBreed, IPet, IPetDetails} from "../../../../../types/PetTypes";
import {QueryKey} from "../../../../statics/constants/Querykey";
import {PetService} from "../../../../service/PetService";

export const usePetDetails = (petId?: number) => {
    if (!petId) return;
    const {data} = useQuery<IPetDetails>([QueryKey.PET, petId], () => PetService.get.pet(petId))
    return data;
}

/**
 * @desc 펫 품종 목록을 가져오는 커스텀 훅 (Tanstack Query Cache 이용)
 * @param petType
 */
export function useBreedList(petType: number) {
    const {data} = useQuery<IBreed[]>([QueryKey.BREED_LIST, petType], () => PetService.get.breedList(petType), {
        enabled: !!petType,
        initialData: [],
    });
    return data;
}

export function useProfileData() {
    return useQuery<Array<IPet>, unknown, Array<IPet>>([QueryKey.PET_LIST],
        () => PetService.get.petList(),
        {initialData: []}
    );
}

export function usePetQuery() {
    const {mutate} = useMutation({
        mutationFn: (petId: number) => PetService.DELETE.pet(petId),
    })

   return {deletePet : mutate}
}

