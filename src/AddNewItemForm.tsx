import React, { useState, useRef, useEffect } from "react";
import {
    NewItemFormButton,
    NewItemFormContainer,
    NewItemFormInput,
} from "./styles";

type AddNewItemFormProps = {
    onAdd: (text: string) => void;
}

export const AddNewItemForm: React.FC<AddNewItemFormProps> = ({onAdd}) => {
    const [item, setItem] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);


    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter"){
                onAdd(item);
                setItem("");
            }
    }


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })

    return (
        <NewItemFormContainer>
            <NewItemFormInput
                placeholder="Add new item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                ref={inputRef}
                onKeyPress={handleKeyPress}
            />
            <NewItemFormButton onClick={() => {
                if (!item.trim()){
                    return;
                }
                
                onAdd(item);
                setItem("");
            }}>
                Create
            </NewItemFormButton>
        </NewItemFormContainer>
    );
};
