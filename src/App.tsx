import React from 'react';
import { useState, useContext, useEffect, useRef }   from "react";
import ContentAB from './component/content';
import Footer from './component/footer';

import HeaderAB from './component/header';
import ToolBar from './component/toolbar';

import "./sass/main.scss";
import NavigationContext from './typescript/context_navigation';


import TimelineContext  from './typescript/context_SPGetTimeline';
import {ISPGetTimeline, DEF_TIMELINE, ITimelineChild, IDocument} from "./typescript/interface_SPGetTimeline";
import NavigationRouter from "./typescript/class_NavigationRouter";
import API from "./typescript/class_api";
import INavigation from "./typescript/interface_Navigation";
import DocViewContext from "./typescript/context_DocView";
import {IDocView, IDocumentView, DEF_DOCVIEW, DEF_DOCUMENTVIEW, IDocViewEvents, DEF_DOCVIEWEVENTS} from "./typescript/interface_DocView";

function App() {

  const inav=() => {
    return new NavigationRouter(
      timelineRouter, 
      createTimeLine, 
      editDoc, 
      editTimeLine, 
      viewTimeLine,
      DeleteDocViewEvent,
      DeleteTimelineChildEvent,
      UpdateTimeline,
      UpdateDocument,

      );
  }
  const[documentView, SetDocument] = useState<IDocumentView>(DEF_DOCUMENTVIEW);
  const[TimelineData, SetTimeline] = useState<ISPGetTimeline>(DEF_TIMELINE);
  const[navigation, navigationSet] = useState< INavigation>(inav().state);
  function UpdateTimeline(Records:ITimelineChild) {
    
    //SetTimeline(Object.assign ({},Records));
    spSetTimeline(Records);

  }

  function UpdateDocument(Records:IDocument) {
    // alert("calling post");
    //SetTimeline(Object.assign ({},Records));
    // spSetTimeline(Records);
  }












  function DeleteDocViewEvent(id:number) {
    alert("delete Document Data " + id);
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
  function editDoc(x:boolean, documentHeader:IDocument) {
    inav().editDoc(x,documentHeader, navigationSet);
    if (!x){
      spSetDocumentTrack(documentHeader);

    }
  }
  function editTimeLine(x:boolean, timelinechild:ITimelineChild) {
    inav().editTimeLine(x,timelinechild, navigationSet);    
    if (!x) {
      spSetTimeline(timelinechild);

    }
  }

  function timelineRouter(x:boolean) {    
    inav().timelineRouter(x, navigationSet);
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
    const response=await fetch(api.URLSetDocument(o) )
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
    // alert('hit')
    const response=await fetch(api.URLspDocView() )
                        .then((res) => res.json())
                        .then((data) => 
                        {
                          // alert(data.Set1.length)
                          SetDocument(data);
                          // alert(documentView.Set1[].length)
                        })
                        .catch((err) => {
                          alert(err);
                        })
}
useEffect(() => {
  spDocView();
}, []);

  return (
    <div className="App">
      <NavigationContext.Provider value = {navigation} >
        <HeaderAB />
        <ToolBar />
        <DocViewContext.Provider value={documentView}>            
        <TimelineContext.Provider value ={TimelineData}>
          
            <ContentAB />
          
        </TimelineContext.Provider>
        </DocViewContext.Provider>
      </NavigationContext.Provider>

    </div>
  );
}

export default App;

