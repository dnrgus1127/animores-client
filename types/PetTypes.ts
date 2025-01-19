import { ImageProps } from "react-native";

export interface IPet {
    id: number;
    name: string;
    imageUrl?: ImageProps;
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