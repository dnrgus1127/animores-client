import { Dimensions } from "react-native"

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
export const nicknameRegex = /^(?=.*[\w가-힣])[\w가-힣]{3,20}$/
export const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/
export const phoneNumberRegex = /^01([0|1|6|7|8|9]{1})+(\d{7,8})$/


 