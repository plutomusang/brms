import React from 'react';
import { useState, useContext, useEffect, useRef }   from "react";
import ContentAB from './component/content';
import Footer from './component/footer';

import HeaderAB from './component/header';
import ToolBar from './component/toolbar';

import "./sass/main.scss";
import NavigationContext , {NavigationState, navigationDefault} from './component/navigation';
import GetTimelineContext , {GetTimelineState, spGetTimelineState } from './component/typescript/GetTimelineContext';

function App() {


  const navstate:NavigationState = {
    CreateDoc:false, 
    CreateTimeline:false,
    EditDoc:false,
    EditTimeline:false,
    DocumentTrackID:0,          
    createDocRouter: timelineRouter,
    createTimeLinerouter: ctlRouter,
    editDocRouter: editDoc,
    editTimeLinerouter: editTimeLine,
    viewTimeLineRouter: viewTimeLine,      
  };
  const[navigation, navigationSet] = useState< NavigationState>(navstate);
  const[GetTimeline, SetTimeline] = useState<GetTimelineState>(spGetTimelineState);
  function viewTimeLine(id:number) {
    navigationSet({
      CreateDoc:false, 
      CreateTimeline:false,
      EditDoc:false,
      EditTimeline:false,
      DocumentTrackID:id,          
      createDocRouter: timelineRouter,
      createTimeLinerouter: ctlRouter,
      editDocRouter: editDoc,
      editTimeLinerouter: editTimeLine,
      viewTimeLineRouter: viewTimeLine,      
    });

    spGetTimeline(id);
    // alert(navigation.DocumentTrackID )
  }
  function editDoc(x:boolean) {
    navigationSet({
      CreateDoc:x, 
      CreateTimeline:false,
      EditDoc:x,
      EditTimeline:false,
      DocumentTrackID:0,          
      createDocRouter: timelineRouter,
      createTimeLinerouter: ctlRouter,
      editDocRouter: editDoc,
      editTimeLinerouter: editTimeLine,
      viewTimeLineRouter: viewTimeLine,      
    });
  }
  function editTimeLine(x:boolean) {
    navigationSet({
      CreateDoc:false, 
      CreateTimeline:x,
      EditDoc:false,
      EditTimeline:x,
      DocumentTrackID:0,          
      createDocRouter: timelineRouter,
      createTimeLinerouter: ctlRouter,
      editDocRouter: editDoc,
      editTimeLinerouter: editTimeLine,
      viewTimeLineRouter: viewTimeLine,      
    });
  }
  function timelineRouter(x:boolean) {
    navigationSet({
      CreateDoc:x, 
      CreateTimeline:false,
      EditDoc:false,
      EditTimeline:false,
      DocumentTrackID:0,          
      createDocRouter: timelineRouter,
      createTimeLinerouter: ctlRouter,
      editDocRouter: editDoc,
      editTimeLinerouter: editTimeLine,
      viewTimeLineRouter: viewTimeLine,    
    })
  }
  function ctlRouter(x:boolean) {
    navigationSet({
      CreateDoc:false, 
      CreateTimeline:x,
      EditDoc:false,
      EditTimeline:false,
      DocumentTrackID:0,          
      createDocRouter: timelineRouter,
      createTimeLinerouter: ctlRouter,
      editDocRouter: editDoc,
      editTimeLinerouter: editTimeLine,
      viewTimeLineRouter: viewTimeLine,    
    })
  }  

  const spGetTimeline=async(id:number)=> {
    const response=await fetch("https://localhost:44331/api/ProcessRequest?key=Mercury3356Lorreignmay29&procedurename=spGetTimeline&DocumentTrackID=" + id)
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
        <GetTimelineContext.Provider value ={GetTimeline}>
          <ContentAB />
        </GetTimelineContext.Provider>
      </NavigationContext.Provider>

    </div>
  );
}

export default App;

