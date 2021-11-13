import INavigation,  {DEF_NAVIGATION}  from "./interface_Navigation";
import {DEF_TIMELINECHILD, ITimelineChild, DEF_DOCUMENTHEADER, IDocument, ISPGetTimeline} from "./interface_SPGetTimeline"
export default class NavigationRouter{
    public state:INavigation;
    constructor(
        _createDocRouter: (x:boolean) => {} | void,
        _createTimeLinerouter: (x:boolean) => {} | void,
        _editDocRouter: (x:boolean, documentHeader:IDocument) => {} | void,
        _editTimeLinerouter: (x:boolean, timelinechild:ITimelineChild) => {} | void,
        _viewTimeLineRouter: (id:number) => {} | void, 
        _DeleteDocViewEvent: (id:number) => {} | void , 
        _DeleteTimelineChildEvent: (id:number) => {} | void,
        _UpdateTimeline: (Records:ITimelineChild) => {} | void,
        _UpdateDocument: (Records:IDocument) => {} | void) {

        this.state = Object.assign ({},DEF_NAVIGATION);        
        this.state.createDocRouter= _createDocRouter;
        this.state.createTimeLinerouter= _createTimeLinerouter;
        this.state.editDocRouter= _editDocRouter;
        this.state.editTimeLinerouter= _editTimeLinerouter;
        this.state.viewTimeLineRouter= _viewTimeLineRouter;
        this.state.DeleteDocViewEvent= _DeleteDocViewEvent;
        this.state.DeleteTimelineChildEvent= _DeleteTimelineChildEvent;
        this.state.UpdateTimeline= _UpdateTimeline;
        this.state.UpdateDocument= _UpdateDocument;
        
    };
    public DeleteDocViewEvent(id:number, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state.ViewTimeline=true;
        this.state.CreateDoc=false;
        this.state.CreateTimeline=false;
        this.state.EditDoc=false;
        this.state.EditTimeline=false;
        this.state.DocumentTrackID=id;  
        this.state.TimeLineChild=DEF_TIMELINECHILD;
        this.state.DocumentHeader=DEF_DOCUMENTHEADER;
        setData(this.state);
    };
    public DeleteTimelineChildEvent(id:number, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state.ViewTimeline=true;
        this.state.CreateDoc=false;
        this.state.CreateTimeline=false;
        this.state.EditDoc=false;
        this.state.EditTimeline=false;
        this.state.DocumentTrackID=id;  
        this.state.TimeLineChild=DEF_TIMELINECHILD;
        this.state.DocumentHeader=DEF_DOCUMENTHEADER;
        setData(this.state);
    };        
    public viewTimeLine(id:number, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state.ViewTimeline=true;
        this.state.CreateDoc=false;
        this.state.CreateTimeline=false;
        this.state.EditDoc=false;
        this.state.EditTimeline=false;
        this.state.DocumentTrackID=id;  
        this.state.TimeLineChild=DEF_TIMELINECHILD;
        this.state.DocumentHeader=DEF_DOCUMENTHEADER;
        setData(this.state);
    };
    public editDoc(x:boolean ,  documentheader:IDocument, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state.ViewTimeline=true;
        this.state.CreateDoc=x;
        this.state.CreateTimeline=false;
        this.state.EditDoc=false;
        this.state.EditTimeline=false;
        this.state.DocumentTrackID=0;  
        this.state.TimeLineChild=DEF_TIMELINECHILD;
        this.state.DocumentHeader=documentheader;
        setData(this.state);
    }
    public editTimeLine(x:boolean, timelinechild:ITimelineChild, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state.ViewTimeline=true;
        this.state.CreateDoc=false;
        this.state.CreateTimeline=x;
        this.state.EditDoc=false;
        this.state.EditTimeline=x;
        this.state.DocumentTrackID=0;  
        this.state.TimeLineChild=timelinechild;
        this.state.DocumentHeader=DEF_DOCUMENTHEADER;
        setData(this.state);
    }    
    public timelineRouter(x:boolean, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state.ViewTimeline=true;
        this.state.CreateDoc=x;
        this.state.CreateTimeline=false;
        this.state.EditDoc=false;
        this.state.EditTimeline=false;
        this.state.DocumentTrackID=0;  
        this.state.TimeLineChild=DEF_TIMELINECHILD;
        this.state.DocumentHeader=DEF_DOCUMENTHEADER;
        setData(this.state);
    }  
    public ctlRouter(x:boolean, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state.ViewTimeline=true;
        this.state.CreateDoc=false;
        this.state.CreateTimeline=x;
        this.state.EditDoc=false;
        this.state.EditTimeline=false;
        this.state.DocumentTrackID=0;  
        this.state.TimeLineChild=DEF_TIMELINECHILD;
        this.state.DocumentHeader=DEF_DOCUMENTHEADER;
        setData(this.state);
    }     
}
