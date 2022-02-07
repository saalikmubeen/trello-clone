import * as React from "react";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import {Droppable} from "react-beautiful-dnd";
import { ColumnContainer, ColumnTitle } from "./styles";

type ColumnProps = {
    title: string;
    columnId: string;
    children?: React.ReactNode;
};

const Column = ({ title, columnId, children }: ColumnProps) => {
    const { dispatch } = useAppState();

    return (
        <Droppable droppableId={columnId} key={columnId}>
            {(provided, snapshot) => {
                return (
                    <ColumnContainer
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <ColumnTitle>
                            <span>{title}</span>
                            <span
                                onClick={() => {
                                    dispatch({
                                        type: "DELETE_COLUMN",
                                        columnId,
                                    });
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                &#10006;
                            </span>
                        </ColumnTitle>
                        {children}
                        <AddNewItem
                            text="&#10010; Add another task"
                            dark
                            onAdd={(text) =>
                                dispatch({ type: "ADD_TASK", columnId, text })
                            }
                        />
                    </ColumnContainer>
                );
            }}

        </Droppable>
    );
};

export { Column };

// export const Column = ({
//     text,
//     children,
// }: React.PropsWithChildren<ColumnProps>) => {
//     return (
//         <ColumnContainer>
//             <ColumnTitle>{text}</ColumnTitle>
//             {children}
//         </ColumnContainer>
//     );
// };

// Here is the React.PropsWithChildren type definition:
// type React.PropsWithChildren<P> = P & {
// children?: React.ReactNode;  // type intersection.
// }
