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

export interface IPetDetails {
    imageId: number;
    name: string;
    gender: number;
    birthday: string;
    weight: number;
}

export interface IPetRequest extends IPetDetails {
    breedId : number;
}

export interface IPetResponse extends IPetDetails {
    breed: IBreed;
    species: ISpecies;
}
