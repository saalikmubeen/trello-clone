import React, { createContext, useContext, useReducer, useEffect } from "react";
import { nanoid } from 'nanoid'

type Task = {
    id: string;
    text: string;
};

type Column = {
    id: string;
    title: string;
    tasks: Task[];
};

export type AppState = {
    columns: Column[];
};

const appData: AppState = {
    columns: [
        {
            id: "c0",
            title: "To Do",
            tasks: [{ id: "c0-0", text: "Generate app scaffold" }, {id: "c0-1", text: "Learn Blockchain and ethereum"}],
        },
        {
            id: "c1",
            title: "In Progress",
            tasks: [{ id: "c1-0", text: "Learn Typescript" }],
        },
        {
            id: "c2",
            title: "Done",
            tasks: [{ id: "c2-0", text: "Begin to use static typing" }, {id: "c2-1", text: "Learn Node.js"}],
        },
    ]
};

type Action =
    | { type: "ADD_COLUMN"; title: string }
    | { type: "ADD_TASK"; columnId: string; text: string }
    | { type: "MOVE_COLUMN"; dragIndex: number; hoverIndex: number }
    | { type: "MOVE_TASK"; dragIndex: number; hoverIndex: number; sourceColumn: string; targetColumn: string }
    | { type: "DELETE_TASK"; columnId: string; taskId: string }
    | { type: "DELETE_COLUMN"; columnId: string }
    | { type: "LOCAL_STORAGE_LOAD", data: AppState }




type AppStateContextProps = {
    state: AppState;
    dispatch: React.Dispatch<Action>;
};



const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);


const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_COLUMN":
            return {
                ...state,
                columns: [
                    ...state.columns,
                    {
                        id: nanoid(),
                        title: action.title,
                        tasks: [],
                    },
                ],
            };

        case "ADD_TASK":
            return {
                ...state,
                columns: state.columns.map((column) => {
                    if (column.id === action.columnId) {
                        return {
                            ...column,
                            tasks: [
                                ...column.tasks,
                                {
                                    id: nanoid(),
                                    text: action.text,
                                },
                            ],
                        };
                    } else {
                        return column;
                    }
                }),
            };

        case "MOVE_COLUMN":
            const column = state.columns[action.dragIndex];
            const newColumns = state.columns.filter(
                (i, idx) => idx !== action.dragIndex
            );
            newColumns.splice(action.hoverIndex, 0, column);
            return {
                ...state,
                columns: newColumns,
            };

        case "MOVE_TASK":
            const sourceColumn = state.columns.find(
                (column) => column.id === action.sourceColumn
            )!;

            if (action.sourceColumn === action.targetColumn) {
                const task = sourceColumn.tasks[action.dragIndex];
                const newTasks = sourceColumn.tasks.filter(
                    (i, idx) => idx !== action.dragIndex
                );
                newTasks.splice(action.hoverIndex, 0, task);

                return {
                    ...state,
                    columns: state.columns.map((column) => {
                        if (column.id === action.sourceColumn) {
                            return {
                                ...column,
                                tasks: newTasks,
                            };
                        } else {
                            return column;
                        }
                    }),
                }
            }

            const targetColumn = state.columns.find(
                (column) => column.id === action.targetColumn
            )!;

            const [sourceTask] = sourceColumn.tasks.splice(action.dragIndex, 1);

            targetColumn.tasks.splice(action.hoverIndex, 0, sourceTask);

            return {
                ...state,
                columns: state.columns.map((column) => {
                    if (column.id === action.sourceColumn) {
                        return {
                            ...column,
                            tasks: sourceColumn.tasks,
                        };
                    } else if (column.id === action.targetColumn) {
                        return {
                            ...column,
                            tasks: targetColumn.tasks,
                        };
                    } else {
                        return column;
                    }
                }),
            };

        case "DELETE_COLUMN":
            return {
                ...state,
                columns: state.columns.filter((column) => column.id !== action.columnId),
            };

        case "DELETE_TASK":
            return {
                ...state,
                columns: state.columns.map((column) => {
                    if (column.id === action.columnId) {
                        return {
                            ...column,
                            tasks: column.tasks.filter((task) => task.id !== action.taskId),
                        };
                    } else {
                        return column;
                    }
                }),
            };

        case "LOCAL_STORAGE_LOAD":
            return action.data;

        default:
            return state;
    }
}


export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appReducer, {columns: []} as AppState);

    React.useEffect(() => {
        const data = localStorage.getItem("appState");
        if (data) {
            dispatch({ type: "LOCAL_STORAGE_LOAD", data: JSON.parse(data) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("appState", JSON.stringify(state));
    }, [state]);

    return (
        <AppStateContext.Provider value={{ state: state, dispatch: dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    return useContext(AppStateContext);
}