import {DEF_TIMELINECHILD, ITimelineChild, DEF_DOCUMENTHEADER, IDocument, ISPGetTimeline} from "./interface_SPGetTimeline"
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
    createTimeLinerouter: (x:boolean, documentHeader:IDocument) => {},
    editDocRouter: (x:boolean, documentHeader:IDocument) => {},
    editTimeLinerouter: (x:boolean, timelinechild:ITimelineChild) => {},
    viewTimeLineRouter: (id:number) => {},
    DeleteDocViewEvent: (id:number) => {},
    DeleteTimelineChildEvent: (TimelineId:number, DocumentTrackID: number) => {},
    UpdateTimeline: (Records:ITimelineChild) => {},
    UpdateDocument: (Records:IDocument) => {}
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
    createTimeLinerouter: (x:boolean, documentHeader:IDocument) => {} | void,
    editDocRouter: (x:boolean, documentHeader:IDocument) => {} | void,
    editTimeLinerouter: (x:boolean,  timelinechild:ITimelineChild) => {} | void,
    viewTimeLineRouter: (id:number) => {} | void ,
    DeleteDocViewEvent: (id:number) => {} | void , 
    DeleteTimelineChildEvent: (TimelineId:number, DocumentTrackID: number) => {} | void ,
    UpdateTimeline: (Records:ITimelineChild) => {} | void,
    UpdateDocument: (Records:IDocument) => {} | void
}
