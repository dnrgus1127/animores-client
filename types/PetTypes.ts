export interface IPet {
    id: number;
    name: string;
    imageUrl?: string;
}

export interface IBreed {
    id : number;
    name : string;
}

export interface ISpecies {
    id : number;
    name : string;
}

export interface IPetRequest {
    breedId : number;
    imageId : number;
    name : string;
    gender : number;
    birthday : string;
    weight : number;
}