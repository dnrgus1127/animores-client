import AxiosContext from "../screens/context/AxiosContext";
import {IBreed, IPetDetails, IPet, ISpecies, IPetResponse} from "../../types/PetTypes";
import {apiHandler} from "./apiHandler";

const PET_API = `/api/v1/pets`;

export class PetService {
    static get = {
        pet: async (petId: number) => {
            return apiHandler<IPetDetails>(() => AxiosContext.get(`${PET_API}/${petId}`), {
                name: "", birthday: "", breed: {id: 1, name: "치와와"}, gender: 1, imageId: 1, weight: 1
            }, "PetService.get.pet");
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
        addPet: async (body: IPetResponse) => {
            return apiHandler<IPet>(() => AxiosContext.post(`${PET_API}`, body), {
                id: 1,
                name: "더미"
            }, "PetService.post.addPet")
        },
    };
    static PUT = {
        editPet: async (body: IPetResponse, petId: number) => {
            return apiHandler<any>(() => AxiosContext.put(`${PET_API}/${petId}`, body), null, "PetService.PUT.editPet");
        }
    };
    static DELETE = {
        pet: async (petId: number) => {
            return apiHandler(() => AxiosContext.delete(`/api/v1/pets/${petId}`), null, "PetService.DELETE.petDelete")
        }
    }
}