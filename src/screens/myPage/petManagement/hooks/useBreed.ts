import {useBreedList} from "./usePetQuery";

export const useBreed = (petType: number = 1) => {
    const breedList = useBreedList(petType);

    const getBreedName = (petId: number) => {
        const breed = breedList.find(breed => {
            return breed.id === petId;
        });

        return breed ? breed.name : "";
    }

    return {getBreedName}
}