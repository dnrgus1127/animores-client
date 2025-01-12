import {useQuery} from "@tanstack/react-query";
import {IBreed} from "../../../../../types/PetTypes";
import {QueryKey} from "../../../../statics/constants/Querykey";
import {PetService} from "../../../../service/PetService";

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
