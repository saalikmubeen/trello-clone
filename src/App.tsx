import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import { Card } from "./Card";
import { Column } from "./Column";
import { AppContainer, Container } from "./styles";


function App() {
    const { state, dispatch } = useAppState();

    const onDragEnd = (result: DropResult) => {
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
                <AddNewItem
                    text="&#10010; Add another list"
                    dark={false}
                    onAdd={(text) =>
                        dispatch({ type: "ADD_COLUMN", title: text })
                    }
                />
        </Container>

            <AppContainer>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.columns.map((column, idx) => {
                        return (
                            <Column
                                title={column.title}
                                key={column.id}
                                columnId={column.id}
                            >
                                {column.tasks.map((task, taskIdx) => (
                                    <Card
                                        text={task.text}
                                        key={task.id}
                                        columnId={column.id}
                                        taskId={task.id}
                                        index={taskIdx}
                                    />
                                ))}
                            </Column>
                        );
                    })}
                </DragDropContext>
            </AppContainer>
            </>
    );
}

export default App;
