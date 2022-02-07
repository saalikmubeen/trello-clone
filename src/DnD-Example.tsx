// import { useDrop } from "react-dnd";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./AppStateContext";

import {
    AppContainer,
    CardContainer,
    ColumnContainer,
    ColumnTitle,
    Container,
} from "./styles";

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";

function App() {
    const { state, dispatch } = useAppState();

    // const [{ isOver }, drop] = useDrop(() => ({
    //     accept: "COLUMN",
    //     drop: () => {},
    //     collect: (monitor) => ({
    //         isOver: !!monitor.isOver(),
    //     }),
    //     hover: (item: ColumnDragItem) => {
    //         dispatch({
    //             type: "DELETE_COLUMN",
    //             columnId: item.columnId,
    //         });
    //     },
    // }));

    const onDragOver = (result: DropResult) => {
        const { destination, source } = result;

        const sourceColumn = source.droppableId;
        const targetColumn = destination?.droppableId!;
        const dragIndex = source.index;
        const hoverIndex = destination?.index!;

        console.log(sourceColumn, targetColumn);
        console.log(dragIndex, hoverIndex);

        dispatch({
            type: "MOVE_TASK",
            dragIndex,
            hoverIndex,
            sourceColumn,
            targetColumn,
        });
    };

    return (
        <>
            <Container>
                <h1
                    // ref={drop}
                    style={{
                        width: "30%",
                        height: "30%",
                        backgroundColor: "#3179ba",
                        textAlign: "center",
                    }}
                >
                    {" "}
                    &#10006;{" "}
                </h1>
            </Container>
            <AppContainer>
                <DragDropContext onDragEnd={onDragOver}>
                    {state.columns.map((column, idx) => {
                        return (
                            <Droppable droppableId={column.id} key={column.id}>
                                {(provided, snapshot) => {
                                    return (
                                        <ColumnContainer
                                            isDraggingOver={
                                                snapshot.isDraggingOver
                                            }
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <ColumnTitle>
                                                <span>{column.title}</span>
                                                <span
                                                    onClick={() => {
                                                        dispatch({
                                                            type: "DELETE_COLUMN",
                                                            columnId: column.id,
                                                        });
                                                    }}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    &#10006;
                                                </span>
                                            </ColumnTitle>
                                            {column.tasks.map((item, index) => {
                                                return (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => {
                                                            return (
                                                                <>
                                                                    <CardContainer
                                                                        isDraggingOver={
                                                                            snapshot.isDragging
                                                                        }
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            margin: "0 0 8px 0",
                                                                            ...provided
                                                                                .draggableProps
                                                                                .style,
                                                                        }}
                                                                    >
                                                                        <span>
                                                                            {
                                                                                item.text
                                                                            }
                                                                        </span>
                                                                        <span
                                                                            onClick={() =>
                                                                                dispatch(
                                                                                    {
                                                                                        type: "DELETE_TASK",
                                                                                        columnId:
                                                                                            column.id,
                                                                                        taskId: item.id,
                                                                                    }
                                                                                )
                                                                            }
                                                                        >
                                                                            &#x2715;
                                                                        </span>
                                                                    </CardContainer>
                                                                </>
                                                            );
                                                        }}
                                                    </Draggable>
                                                );
                                            })}
                                            <AddNewItem
                                                text="&#10010; Add another task"
                                                dark
                                                onAdd={(text) =>
                                                    dispatch({
                                                        type: "ADD_TASK",
                                                        columnId: column.id,
                                                        text,
                                                    })
                                                }
                                            />
                                        </ColumnContainer>
                                    );
                                }}
                            </Droppable>
                        );
                    })}

                    <AddNewItem
                        text="&#10010; Add another list"
                        dark={false}
                        onAdd={(text) =>
                            dispatch({ type: "ADD_COLUMN", title: text })
                        }
                    />
                </DragDropContext>
            </AppContainer>
        </>
    );
}

export default App;

// {
//     state.columns.map((column, idx) => {
//         return (
//             <Column
//                 title={column.title}
//                 key={column.id}
//                 columnId={column.id}
//                 index={idx}
//             >
//                 {column.tasks.map((task, taskIdx) => (
//                     <Card
//                         text={task.text}
//                         key={task.id}
//                         columnId={column.id}
//                         taskId={task.id}
//                         index={taskIdx}
//                     />
//                 ))}
//             </Column>
//         );
//     });
// }
