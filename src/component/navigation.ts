import { createContext } from "react";

export const navigationDefault ={
    CreateDoc:false,
    CreateTimeline:false,
    EditDoc:false,
    EditTimeline:false,    
    DocumentTrackID:0,  
    createDocRouter: (x:boolean) => {},
    createTimeLinerouter: (x:boolean) => {},
    editDocRouter: (x:boolean) => {},
    editTimeLinerouter: (x:boolean) => {},
    viewTimeLineRouter: (id:number) => {},
}

export type  NavigationState= typeof navigationDefault;
const navigationContext = createContext<typeof navigationDefault>(navigationDefault);

export default navigationContext;
