import { useState } from "react";
import { AddNewItemForm } from "./AddNewItemForm";
import { AddItemButton } from "./styles";

type AddItemProps = {
    dark?: boolean;
    text: string;
    onAdd: (text: string) => void;
};

export const AddNewItem = ({ text, dark, onAdd }: AddItemProps) => {
    const [show, setShow] = useState(false);

    return (
        <>
            {show ? (
                <AddNewItemForm onAdd={
                    (text: string) => {
                        onAdd(text);
                        setShow(false);
                    }
                }/>
            ) : (
                <AddItemButton dark={dark} onClick={() => setShow(true)}>{text}</AddItemButton>
            )}
        </>
    );
};
