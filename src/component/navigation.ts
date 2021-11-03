import { createContext } from "react";

const navigationState={
    CreateDoc:'false',
    Timeline:'true',
}

export type NavigationState = typeof navigationState;
const navigationContext = createContext({
    CreateDoc:false,
    updateStatus: (x:boolean) => {},
});

export default navigationContext;
