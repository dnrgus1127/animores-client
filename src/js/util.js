import { Dimensions } from "react-native"

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
