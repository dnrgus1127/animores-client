import {useCallback, useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {IPetRequest, IPetResponse} from "../../../../../types/PetTypes";
import {PetService} from "../../../../service/PetService";
import {useBreedList, useProfileData} from "./usePetQuery";
import {useFormContext, useWatch} from "react-hook-form";
import {convertYYYYMMDDToKorean, formatToYYYYMMDD} from "../../../../components/Calendar/utils";

export const usePetForm = (onSuccess?: () => void, petId?: number) => {
    const [speciesId, setSpeciesId] = useState<number>(0);
    const {refetch} = useProfileData();
    const form = useFormContext();
    const breedList = useBreedList(speciesId);

    const {mutate} = useMutation({
        mutationFn: async (data: IPetRequest) => {
            if (petId) return PetService.PUT.editPet(data, petId);
            return PetService.post.addPet(data);
        },
        onSuccess: () => {
            refetch().then(onSuccess)
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const watchedSpecies = useWatch({
        name: "petSpecies",
        control: form.control,
    })

    useEffect(() => {
        setSpeciesId(form.getValues("petSpecies"));
    }, [])

    useEffect(() => {
        setSpeciesId(watchedSpecies);
    }, [watchedSpecies])

    const submit = useCallback(() => {
        if (!breedList) return;
        const data = {
            breedId: breedList.filter(breedInfo => breedInfo.name === form.getValues("breed"))[0].id,
            imageId: 1,
            name: form.getValues("name") || "뽀삐",
            gender: form.getValues("gender"),
            birthday: formatToYYYYMMDD(form.getValues("birthday")),
            weight: Number(form.getValues("weight"))
        }
        mutate(data);
    }, [form, breedList])


    const initFormValues = (petData: IPetResponse) => {
        form.setValue("name", petData.name);
        form.setValue("birthday", convertYYYYMMDDToKorean(petData.birthday));
        form.setValue("weight", `${petData.weight}`);
        form.setValue("gender", petData.gender);
        form.setValue("breed", petData.breed.name);
        form.setValue("petSpecies", petData.species.id);
        setSpeciesId(petData.species.id);
    }

    const clearValue = useCallback((filedName: string) => {
        form.setValue(filedName, "");
    }, [form]);

    return {submit, initFormValues, clearValue};
}