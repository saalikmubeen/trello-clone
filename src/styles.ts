import styled from "styled-components";

type AddItemButtonProps = {
    dark?: boolean;
};

type DnDContainerProps = {
    isDraggingOver: boolean;
}



export const Container = styled.div`
    background-color: #3179ba;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;
    height: 10vh;
    width: 100%;
`;

export const AppContainer = styled.div`
    align-items: flex-start;
    background-color: #3179ba;
    display: flex;
    height: 100%;
    min-height: 90vh;
    padding: 20px;
    padding-top: 60px ;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 585px) {
        justify-content: center;
    }
`;


export const ColumnContainer = styled.div<DnDContainerProps>`
    background-color: #ebecf0;
    width: 300px;
    min-height: 40px;
    margin-right: 20px;
    border-radius: 3px;
    padding: 10px 8px;
    flex-grow: 0;
    background-color: ${(props) =>
        props.isDraggingOver ? "lightblue" : "lightgrey"};

    @media (max-width: 680px) {
        width: 250px;
    }

    @media (max-width: 585px) {
        width: 90%;
    }

    @media (max-width: 350px) {
        width: 100%;
    }
`;


export const ColumnTitle = styled.div`
    padding: 6px 16px 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CardContainer = styled.div<DnDContainerProps>`
    background-color: #fff;
    cursor: pointer;
     user-select:"none",
    margin-bottom: 0.5rem;
    padding: 0.75rem 1rem;
    color: white;
    /* max-width: 300px; */
    border-radius: 3px;
    box-shadow: #091e4240 1px 1px 2px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) =>
        props.isDraggingOver ? "#263B4A" : "#456C86"};
`;


export const AddItemButton = styled.button<AddItemButtonProps>`
    background-color: #ffffff3d;
    border-radius: 3px;
    border: none;
    color: ${(props) => (props.dark ? "#000" : "#fff")};
    cursor: pointer;
    max-width: 300px;
    padding: 10px 12px;
    text-align: left;
    transition: background 85ms ease-in;
    width: 100%; 
    order: -1;
    &:hover {
        background-color: #ffffff52;
    }
`;


export const NewItemFormContainer = styled.div`
    max-width: 300px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
`;

export const NewItemFormButton = styled.button`
    background-color: #5aac44;
    border-radius: 3px;
    border: none;
    box-shadow: none;
    color: #fff;
    padding: 6px 12px;
    text-align: center;
`;

export const NewItemFormInput = styled.input`
    border-radius: 3px;
    border: none;
    box-shadow: #091e4240 0px 1px 0px 0px;
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
    width: 100%;
`;
