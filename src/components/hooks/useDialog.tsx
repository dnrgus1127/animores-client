import {useState} from "react";

export const useDialog : () => [boolean, () => void] = () => {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    }

    return [showDialog, toggleDialog];

}