import {useFocusEffect} from "@react-navigation/native";
import {useCallback} from "react";
import {useFormContext} from "react-hook-form";

export const useResetFormOnScreenFocus = () => {
    const {reset} = useFormContext();

    useFocusEffect(
        useCallback(() => {
            // 이 화면으로 다시 돌아오면 form 값 초기화
            reset();
        }, [])
    );
}