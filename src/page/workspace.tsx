import { useState, useEffect }   from "react";
import ContentAB from '../component/content';
import ToolBar from '../component/toolbar';

import NavigationContext from '../typescript/context_navigation';


import TimelineContext  from '../typescript/context_SPGetTimeline';
import {ISPGetTimeline, DEF_TIMELINE, ITimelineChild, IDocument} from "../typescript/interface_SPGetTimeline";
import NavigationRouter from "../typescript/class_NavigationRouter";
import API from "../typescript/class_api";
import INavigation, {DEF_NAVIGATION}  from "../typescript/interface_Navigation";
import DocViewContext from "../typescript/context_DocView";
import routerContext from '../typescript/context_router';
import { IDocumentView, DEF_DOCUMENTVIEW} from "../typescript/interface_DocView";
import {IRouters } from '../typescript/interface_routers';
import logger from "../config/logger";

const WorkBench =()=> {

  const inav=() => {
    return new NavigationRouter();
  }
  const[routers, SetRouter] = useState<IRouters>({
    createDocRouter: createDocument,
    createTimeLinerouter: createTimeLine,
    editDocRouter: editDoc,
    editTimeLinerouter: editTimeLine,
    viewTimeLineRouter: viewTimeLine,
    DeleteDocViewEvent: DeleteDocViewEvent,
    DeleteTimelineChildEvent: DeleteTimelineChildEvent,
    UpdateTimeline: UpdateTimeline,
    UpdateDocument:  UpdateDocument,
    login: Login,
  });

  const[documentView, SetDocument] = useState<IDocumentView>(DEF_DOCUMENTVIEW);
  const[TimelineData, SetTimeline] = useState<ISPGetTimeline>(DEF_TIMELINE);
  const[navigation, navigationSet] = useState< INavigation>(DEF_NAVIGATION);
  const[logged, setLog] = useState<string>('true');
  function UpdateTimeline(Records:ITimelineChild) {
    
    //SetTimeline(Object.assign ({},Records));
    spSetTimeline(Records);

  }

  function Login(un: string, pw:string) {

    if (un == 'admin' && pw =='admin'){
      setLog('true');
      localStorage.setItem("log", 'true');
      alert('Login');
    }
  }
  function UpdateDocument(Records:IDocument) {
    // alert("calling post");
    //SetTimeline(Object.assign ({},Records));
    // spSetTimeline(Records);
  }

  function DeleteDocViewEvent(id:number) {
    alert("delete Document Data " + id);
    inav().DeleteDocViewEvent(id, navigationSet);
    spDeleteDocumentTrack(id);

  }
  function DeleteTimelineChildEvent(TimelineId:number, DocumentTrackID: number) {
    alert("Delete Timeline Child Data " + TimelineId);
    spDeleteTimeline(TimelineId, DocumentTrackID)

  }

  function viewTimeLine(id:number) {
    inav().viewTimeLine(id, navigationSet);
    spGetTimeline(id);
  }
  function editDoc(x:boolean,willSave:boolean, documentHeader:IDocument) {
    inav().editDoc(x,documentHeader, navigationSet);
    
    if (!x && willSave){

      spSetDocumentTrack(documentHeader);

    }
  }
  function editTimeLine(x:boolean,willSave:boolean, timelinechild:ITimelineChild) {
    inav().editTimeLine(x,timelinechild, navigationSet);    

    if (!x && willSave) {
      
      spSetTimeline(timelinechild);

    }
  }

  function createDocument(x:boolean) {    

    inav().createDocument(x, navigationSet);

  }
  function createTimeLine(x:boolean, documentHeader: IDocument) {
    inav().createTimeLinerouter(x,documentHeader, navigationSet);
  }
  const spDeleteDocumentTrack=async(o:number)=> {
    const api = new API();
    //alert (api.URLSetTimeline(o));

    const response=await fetch(api.URLDeleteDocumentTrack(o) )
    .then((res) => res.json())
    .then((data) => 
    {
      // SetTimeline(data);
      spDocView();
    })
    .catch((err) => {
      alert(err);
    })
  }
  const spDeleteTimeline=async(TimelineId:number, documentTrackID: number)=> {
    const api = new API();
    //alert (api.URLSetTimeline(o));

    const response=await fetch(api.URLDeleteTimeline(TimelineId, documentTrackID) )
    .then((res) => res.json())
    .then((data) => 
    {
       SetTimeline(data);
       spDocView();
    })
    .catch((err) => {
      alert(err);
    })
  }    
  const spSetDocumentTrack=async(o:IDocument)=> {
    const api = new API();
    //alert (api.URLSetTimeline(o));
    // logger.info(api.URLSetDocument(o));
    const response=await fetch(api.URLSetDocument(o) )
    .then((res) => res.json())
    .then((data) => 
    {
      // logger.info(JSON.stringify(data));
      SetTimeline(data);
      spDocView();
    })
    .catch((err) => {
      alert(err);
    })
  }

  const spSetTimeline=async(o:ITimelineChild)=> {
    const api = new API();
    //alert (api.URLSetTimeline(o));

    const response=await fetch(api.URLSetTimeline(o) )
    .then((res) => res.json())
    .then((data) => 
    {
      SetTimeline(data);
      spDocView();
    })
    .catch((err) => {
      alert(err);
    })
  }
  const spGetTimeline=async(id:number)=> {
    const api = new API();
    // alert (api.URLGetTimeline(id));
    const response=await fetch(api.URLGetTimeline(id)).then((res) => res.json()).then((data) => 
      {
        SetTimeline(data);
      })
      .catch((err) => {
        alert(err);
      })
  }
  const spDocView=async()=> {
    const api = new API()
    // logger.info(api.URLspDocView(), 'spDocView');
    const response=await fetch(api.URLspDocView() )
                        .then((res) => res.json())
                        .then((data) => 
                        {
                          
                            // logger.info(JSON.stringify(data));
                            SetDocument(data);
                          
                          // alert(documentView.Set1[].length)
                        })
                        .catch((err) => {
                          alert(err);
                        })
}
const[ctr, counter]= useState(0)
useEffect(() => {
  
  counter(ctr + 1)
  spDocView();
}, []);

  const IfContent =()=> {
    if (logged=='true')return  <ContentAB />
    else return <></>
    
  }
  return (
    <routerContext.Provider value = {routers}>
      <NavigationContext.Provider value = {navigation} >
        <ToolBar />
        <DocViewContext.Provider value={documentView}>            
          <TimelineContext.Provider value ={TimelineData}>
            
              {/* <ContentAB /> */}
              <IfContent />
          </TimelineContext.Provider>
        </DocViewContext.Provider>
      </NavigationContext.Provider>
    </routerContext.Provider>

  );
}

export default WorkBench;

