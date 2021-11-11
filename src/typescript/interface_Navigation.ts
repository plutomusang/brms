import {DEF_TIMELINECHILD, ITimelineChild, DEF_DOCUMENTHEADER, IDocument} from "./interface_SPGetTimeline"
export const DEF_NAVIGATION: INavigation = {
    ViewTimeline:false,
    CreateDoc:false,
    CreateTimeline:false,
    EditDoc:false,
    EditTimeline:false,    
    DocumentTrackID:0,  
    TimeLineChild: DEF_TIMELINECHILD,
    DocumentHeader: DEF_DOCUMENTHEADER,
    createDocRouter: (x:boolean) => {},
    createTimeLinerouter: (x:boolean) => {},
    editDocRouter: (x:boolean, documentHeader:IDocument) => {},
    editTimeLinerouter: (x:boolean, timelinechild:ITimelineChild) => {},
    viewTimeLineRouter: (id:number) => {},
    DeleteDocViewEvent: (id:number) => {},
    DeleteTimelineChildEvent: (id:number) => {}
}
export default interface INavigation {
    ViewTimeline:boolean,
    CreateDoc:boolean,
    CreateTimeline:boolean,
    EditDoc:boolean,
    EditTimeline:boolean,    
    DocumentTrackID:number,  
    TimeLineChild:ITimelineChild,
    DocumentHeader: IDocument,
    createDocRouter: (x:boolean) => {} | void,
    createTimeLinerouter: (x:boolean) => {} | void,
    editDocRouter: (x:boolean, documentHeader:IDocument) => {} | void,
    editTimeLinerouter: (x:boolean,  timelinechild:ITimelineChild) => {} | void,
    viewTimeLineRouter: (id:number) => {} | void ,
    DeleteDocViewEvent: (id:number) => {} | void , 
    DeleteTimelineChildEvent: (id:number) => {} | void 
}