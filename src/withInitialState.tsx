import * as React from "react";
import { AppState } from "./AppStateContext";

type InjectedProps = {
    initialState: AppState;
};


export function withInitialState<TProps>(Component: React.ComponentType<TProps & InjectedProps>) {

    const Wrapper = (props: Omit<TProps, keyof InjectedProps>) => {
        const [initialState, setInitialState] = React.useState<AppState>({
            columns: [],
        });

        console.log(initialState);


        React.useEffect(() => {
            const data = localStorage.getItem("appState");
            console.log(data)
            if (data) {
                setInitialState(JSON.parse(data));
            }
        }, []);

        return <Component {...props as TProps} initialState={initialState} />;
    };

    return Wrapper;
}