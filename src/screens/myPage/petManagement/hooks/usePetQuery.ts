import { useMutation, useQuery } from '@tanstack/react-query';
import { IBreed, IPet, IPetResponse } from '../../../../../types/PetTypes';
import { PetService } from '../../../../service/PetService';
import { QueryKey } from '../../../../statics/constants/Querykey';

export const usePet = (petId: number) => {
	return useQuery<IPetResponse>({
		queryKey: [QueryKey.PET, petId],
		queryFn: () => PetService.get.pet(petId),
	});
};

/**
 * @desc 펫 품종 목록을 가져오는 커스텀 훅 (Tanstack Query Cache 이용)
 * @param speciesId
 */
export function useBreedList(speciesId: number) {
	const { data } = useQuery<IBreed[]>({
		queryKey: [QueryKey.BREED_LIST, speciesId],
		queryFn: () => PetService.get.breedList(speciesId),
		enabled: speciesId !== undefined,
		placeholderData: [],
	});
	return data;
}

export function useProfileData() {
	return useQuery<Array<IPet>, unknown, Array<IPet>>({
		queryKey: ['QueryKey.PET_LIST'],
		queryFn: async () => {
			const data = await PetService.get.petList();
			console.log(data, 'data');
			return data;
		},
		staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
	} as any);
}

export function usePetQuery() {
	const { mutate } = useMutation({
		mutationFn: (petId: number) => PetService.DELETE.pet(petId),
	});

	return { deletePet: mutate };
}
