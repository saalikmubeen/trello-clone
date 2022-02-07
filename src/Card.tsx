import { Draggable } from "react-beautiful-dnd";
import { useAppState } from "./AppStateContext";
import { CardContainer } from "./styles";


type CardProps = {
    text: string;
    columnId: string;
    taskId: string;
    index: number;
}

const Card: React.FC<CardProps> = ({text, columnId, taskId, index}) => {
    const {dispatch} = useAppState();
    return (
        <Draggable draggableId={taskId} key={taskId} index={index}>
            {(provided, snapshot) => {
                return (
                    <CardContainer
                        isDraggingOver={snapshot.isDragging}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            ...provided.draggableProps.style,
                            margin: "0 0 8px 0",
                        }}
                    >
                        <span>{text}</span>
                        <span
                            onClick={() =>
                                dispatch({
                                    type: "DELETE_TASK",
                                    columnId: columnId,
                                    taskId: taskId,
                                })
                            }
                        >
                            &#x2715;
                        </span>
                    </CardContainer>
                );
            }}
        </Draggable>
    );
};

export { Card };
