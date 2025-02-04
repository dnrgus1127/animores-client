import {useCallback, useMemo} from "react";
import {useMutation} from "@tanstack/react-query";
import {IPetDetails, IPetResponse} from "../../../../../types/PetTypes";
import {PetService} from "../../../../service/PetService";
import {useBreedList, useProfileData} from "./usePetQuery";
import {useFormContext} from "react-hook-form";
import {convertYYYYMMDDToKorean, formatToYYYYMMDD} from "../../../../components/Calendar/utils";

export const usePetForm = (onSuccess: () => void, petId?: number) => {
    const {refetch} = useProfileData();
    const form = useFormContext();
    const breedList = useBreedList(form.getValues("petSpecies"));

    const {mutate} = useMutation({
        mutationFn: async (data: IPetResponse) => {
            if (petId) return PetService.PUT.editPet(data, petId);
            return PetService.post.addPet(data);
        },
        onSuccess: () => {
            refetch().then(onSuccess)
        },
    })

    const submit = useCallback(() => {
        mutate({
            breedId: breedList.filter(breedInfo => breedInfo.name === form.getValues("breed"))[0].id,
            imageId: 1,
            name: form.getValues("name") || "뽀삐",
            gender: form.getValues("gender"),
            birthday: formatToYYYYMMDD(form.getValues("birthday")),
            weight: Number(form.getValues("weight"))
        })
    }, [form])

    const initFormValues = (petDetails: IPetDetails) => {
        form.setValue("name", petDetails.name);
        form.setValue("birthday", convertYYYYMMDDToKorean(petDetails.birthday));
        form.setValue("weight", `${petDetails.weight}`);
        form.setValue("gender", petDetails.gender);
        // 어떤 품종인지에 대한 정보가 필요함
        form.setValue("petSpecies", 1);
        form.setValue("breed", breedList.find((breed) => breed.id === petDetails.breed.id)?.name);
    }

    const clearValue = useCallback((filedName: string) => {
        form.setValue(filedName, "");
    }, [form]);

    return {submit, initFormValues, clearValue};
}