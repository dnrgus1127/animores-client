import AxiosContext from "../screens/context/AxiosContext";
import {IBreed, IPetRequest, IPet, ISpecies} from "../../types/PetTypes";
import {apiHandler} from "./apiHandler";

export class PetService {
    static get = {
        petList: async () => {
            return apiHandler<Array<IPet>>(() => AxiosContext.get(`/api/v1/pets`), [], "PetService.get.petList")
        },
        speciesList: async (): Promise<IPet[]> => {
            return apiHandler<Array<ISpecies>>(() => AxiosContext.get(`/api/v1/pets/species`), [], "PetService.get.speciesList");
        },
        breedList : async (speciesId : number) => {
            return apiHandler<Array<IBreed>>(() => AxiosContext.get(`/api/v1/pets/breeds?speciesId=${speciesId}`), [], "PetService.get.breedList");
        },
    };
    static post = {
        addPet: async (body: IPetRequest) => {
            return apiHandler<IPet>(() => AxiosContext.post(`/api/v1/pets`, body), {id: 1, name: "더미"} ,"PetService.post.addPet")
        },
    }

}