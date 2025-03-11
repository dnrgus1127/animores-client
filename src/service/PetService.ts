import AxiosContext from "../screens/context/AxiosContext";
import {IBreed, IPet, IPetRequest, IPetResponse, ISpecies} from "../../types/PetTypes";
import {apiHandler} from "./apiHandler";

const DEFAULT_DATA: IPetResponse = {
    name: "", birthday: "", breed: {id: 1, name: "치와와"}, gender: 1, imageId: 1, weight: 1,
    species: {id: 1, name: "고양이"}
}

const PET_API = `/api/v1/pets`;

export class PetService {
    static get = {
        pet: async (petId: number) => {
            return apiHandler<IPetResponse>(() => AxiosContext.get(`${PET_API}/${petId}`), DEFAULT_DATA, "PetService.get.pet");
        },
        petList: async () => {
            return apiHandler<Array<IPet>>(() => AxiosContext.get(`${PET_API}`), [], "PetService.get.petList")
        },
        speciesList: async (): Promise<IPet[]> => {
            return apiHandler<Array<ISpecies>>(() => AxiosContext.get(`${PET_API}/species`), [], "PetService.get.speciesList");
        },
        breedList : async (speciesId : number) => {
            return apiHandler<Array<IBreed>>(() => AxiosContext.get(`${PET_API}/breeds?speciesId=${speciesId}`), [], "PetService.get.breedList");
        },
    };
    static post = {
        addPet: async (body: IPetRequest) => {
            return apiHandler<IPet>(() => AxiosContext.post(`${PET_API}`, body), {
                id: 1,
                name: "더미"
            }, "PetService.post.addPet")
        },
    };
    static PUT = {
        editPet: async (body: IPetRequest, petId: number) => {
            return apiHandler<any>(() => AxiosContext.put(`${PET_API}/${petId}`, body), null, "PetService.PUT.editPet");
        }
    };
    static DELETE = {
        pet: async (petId: number) => {
            return apiHandler(() => AxiosContext.delete(`/api/v1/pets/${petId}`), null, "PetService.DELETE.petDelete")
        }
    }
}