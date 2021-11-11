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
import INavigation from "./typescript/interface_Navigation";
function App() {

  const inav=() => {
    return new NavigationRouter(
      timelineRouter, 
      ctlRouter, 
      editDoc, 
      editTimeLine, 
      viewTimeLine,
      DeleteDocViewEvent,
      DeleteTimelineChildEvent
      );
  }
  
  const[TimelineData, SetTimeline] = useState<ISPGetTimeline>(DEF_TIMELINE);
  const[navigation, navigationSet] = useState< INavigation>(inav().state);

  function DeleteDocViewEvent(id:number) {
    alert("delete Document Data " + id);
  }
  function DeleteTimelineChildEvent(id:number) {
    alert("Delete Timeline Child Data " + id);
  }

  function viewTimeLine(id:number) {
    inav().viewTimeLine(id, navigationSet);
    spGetTimeline(id);
  }
  function editDoc(x:boolean, documentHeader:IDocument) {
    inav().editDoc(x,documentHeader, navigationSet);
    
  }
  function editTimeLine(x:boolean, timelinechild:ITimelineChild) {
    inav().editTimeLine(x,timelinechild, navigationSet);
  }

  function timelineRouter(x:boolean) {    
    inav().timelineRouter(x, navigationSet);
  }
  function ctlRouter(x:boolean) {
    inav().ctlRouter(x, navigationSet);
  }  

  const spGetTimeline=async(id:number)=> {
    const response=await fetch("http://wigigateway.doktrack.com/api/ProcessRequest?key=Mercury3356Lorreignmay29&procedurename=spGetTimeline&DocumentTrackID=" + id)
      .then((res) => res.json())
      .then((data) => 
      {
        SetTimeline(data);
      })
      .catch((err) => {
        alert(err);
      })
  }

  

  return (
    <div className="App">
      <NavigationContext.Provider value = {navigation} >
        <HeaderAB />
        <ToolBar />
        <TimelineContext.Provider value ={TimelineData}>
          <ContentAB />
        </TimelineContext.Provider>
      </NavigationContext.Provider>

    </div>
  );
}

export default App;

