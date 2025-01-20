import { IPet } from "../../types/PetTypes";
import PngImage from "../assets/png";

export const petTypes: IPet[] = [
    { id: 1, name: "강아지", imageUrl: PngImage.petType.dog },
    { id: 2, name: "고양이", imageUrl: PngImage.petType.cat },
];