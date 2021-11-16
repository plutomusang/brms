import INavigation,  {DEF_NAVIGATION}  from "./interface_Navigation";
import {DEF_TIMELINECHILD, ITimelineChild, DEF_DOCUMENTHEADER, IDocument, ISPGetTimeline} from "./interface_SPGetTimeline"
export default class NavigationRouter{
    public state:INavigation;
    constructor() {

        this.state = Object.assign ({},DEF_NAVIGATION);        

        
    };
    public DeleteDocViewEvent(id:number, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state = Object.assign ({},DEF_NAVIGATION);  
        setData(this.state);
    };
    public DeleteTimelineChildEvent(id:number, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state.ViewTimeline=true;
        this.state.CreateDoc=false;
        this.state.CreateTimeline=false;
        this.state.EditDoc=false;
        this.state.EditTimeline=false;
        this.state.DocumentTrackID=id;  
        // this.state.TimeLineChild=DEF_TIMELINECHILD;
        // this.state.DocumentHeader=DEF_DOCUMENTHEADER;
        this.state = Object.assign ({},DEF_NAVIGATION);  
        setData(this.state);
    };        
    public viewTimeLine(id:number, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state.ViewTimeline=true;
        this.state.CreateDoc=false;
        this.state.CreateTimeline=false;
        this.state.EditDoc=false;
        this.state.EditTimeline=false;
        this.state.DocumentTrackID=id;  
        // this.state.TimeLineChild= DEF_TIMELINECHILD; 
        // this.state.DocumentHeader=DEF_DOCUMENTHEADER;
        // alert('viewTimeLine DocumentTrackID' + this.state.DocumentHeader.DocumentTrackID)
        setData(this.state);
    };
    public editDoc(x:boolean ,  documentheader:IDocument, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state.ViewTimeline=true;
        this.state.CreateDoc=x;
        this.state.CreateTimeline=false;
        this.state.EditDoc=false;
        this.state.EditTimeline=false;
        this.state.DocumentTrackID=0;  
        // this.state.TimeLineChild=DEF_TIMELINECHILD;
        this.state.DocumentHeader=documentheader;
        // alert('editDoc DocumentTrackID' + this.state.DocumentHeader.DocumentTrackID)
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
        // this.state.DocumentHeader=DEF_DOCUMENTHEADER;
        this.state.DocumentTrackID = this.state.TimeLineChild.documentTrackId;
        
        // alert('editTimeLine DocumentTrackID' + this.state.DocumentHeader.DocumentTrackID)
        // alert('editTimeLine TimeLineChild' + this.state.TimeLineChild.documentTrackId)
        setData(this.state);
    }    
    public timelineRouter(x:boolean, setData: React.Dispatch<React.SetStateAction<INavigation>>) {
        this.state.ViewTimeline=true;
        this.state.CreateDoc=x;
        this.state.CreateTimeline=false;
        this.state.EditDoc=false;
        this.state.EditTimeline=false;
        this.state.DocumentTrackID=0;  
        this.state.TimeLineChild= Object.assign ({}, DEF_TIMELINECHILD);
        this.state.DocumentHeader= Object.assign ({},DEF_DOCUMENTHEADER);
        // alert('timelineRouter DocumentTrackID' + this.state.DocumentHeader.DocumentTrackID)
        setData(this.state);
    }  
    public createTimeLinerouter(x:boolean, documentHeader: IDocument,  setData: React.Dispatch<React.SetStateAction<INavigation>>) {

        this.state.ViewTimeline=true;
        this.state.CreateDoc=false;
        this.state.CreateTimeline=x;
        this.state.EditDoc=false;
        this.state.EditTimeline=false;
        this.state.DocumentTrackID=0;  
        // this.state.TimeLineChild=DEF_TIMELINECHILD;
        this.state.DocumentHeader=  documentHeader;
        this.state.DocumentTrackID = documentHeader.DocumentTrackID;
        // alert('createTimeLinerouter DocumentTrackID' + this.state.DocumentHeader.DocumentTrackID)
        setData(this.state);
    }     
}

