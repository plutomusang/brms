import { useState, useEffect }   from "react";
import ContentAB from '../component/content';
import ToolBar from '../component/toolbar';

import NavigationContext from '../typescript/context_navigation';


import TimelineContext  from '../typescript/context_SPGetTimeline';
import {ISPGetTimeline, DEF_TIMELINE, ITimelineChild, IDocument, DEF_TIMELINECHILD} from "../typescript/interface_SPGetTimeline";
import NavigationRouter from "../typescript/class_NavigationRouter";
import API from "../typescript/class_api";
import INavigation, {DEF_NAVIGATION}  from "../typescript/interface_Navigation";
import DocViewContext from "../typescript/context_DocView";
import routerContext from '../typescript/context_router';
import { IDocumentView, DEF_DOCUMENTVIEW, IDocView} from "../typescript/interface_DocView";
import {DEF_FUNCCREATETIMECALLS, Ifunc_CreateTimeCalls, IRouters } from '../typescript/interface_routers';
import logger from "../config/logger";
import Popup from "../component/popup";
import IpopUp from "../typescript/interface_popup"
import Popupers , {IPopupers} from '../component/popupers';
import moment from "moment";
import AccordionDB, { iOrderByObj } from '../component/accordionDB';
interface iAccordionProps {
  sortID: number[],
  orderList: iOrderByObj[]
}

const WorkBench =()=> {

  const inav=() => {
    return new NavigationRouter();
  }
  const [onWB, setWB] = useState(true);
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
    editTimeRecieve: EditTimeRecieved,
    editTimeReleased: EditTimeReleased,
    updateCreateTime:UpdateCreateTime,
  });
  function UpdateCreateTime(timeCalls:Ifunc_CreateTimeCalls){
    // alert (timeCalls.message);
    // logger.info

    // setPopupers({
    //   classname:'pop-upers open',
    //   header: "Date Created",
    //   message:timeCalls.message, //'03/01/2022 10:51:10 PM',
    //   type: "InputDateTime",
    //   cap1: "Update",
    //   cap2: "Cancel",
    //   id:1,
    //   returnFuntion: returnUpdateCreateTime,
    // }); 


    setPopupers({
      classname:"pop-upers open",
      header: "Date Started",
      message:"test",
      type: "Input",
      cap1: "Update",
      cap2: "Cancel",
      id:0,
      returnFuntion: updateTimeRecieved,
    }); 


    timeCalls.createTimeCalls(true, '2022-03-01 10:51:10')
    // alert('router TimeReleased');
  }
  function returnUpdateCreateTime (ok:boolean, id:number, value:string,obj?: ITimelineChild, obj2?: Ifunc_CreateTimeCalls ){
    let tmchld: Ifunc_CreateTimeCalls = obj2 ?? DEF_FUNCCREATETIMECALLS;
    tmchld.createTimeCalls(ok, '2022-1-1 12:22');
  }

  const[documentView, SetDocument] = useState<IDocumentView>(DEF_DOCUMENTVIEW);
  const[set1, setToSet1] = useState<IDocView[]> (DEF_DOCUMENTVIEW.Set1);
  const[set2, setToSet2] = useState<IDocView[]> (DEF_DOCUMENTVIEW.Set2);
  const[set3, setToSet3] = useState<IDocView[]> (DEF_DOCUMENTVIEW.Set3);
  const[set4, setToSet4] = useState<IDocView[]> (DEF_DOCUMENTVIEW.Set4);

  const [set1_props, set1_setProps] = useState<iAccordionProps>({ sortID: [0,0,0,0,0], orderList: []})
  const [set2_props, set2_setProps] = useState<iAccordionProps>({ sortID: [0,0,0,0,0], orderList: []})
  const [set3_props, set3_setProps] = useState<iAccordionProps>({ sortID: [0,0,0,0,0], orderList: []})
  const [set4_props, set4_setProps] = useState<iAccordionProps>({ sortID: [0,0,0,0,0], orderList: []})
  const spGetOnProcess=async(Orderby:string , searchCriteria: string)=> {
    const api = new API();
    const response = await fetch( api.URLDoccumentView('spGetOnProcess',Orderby, searchCriteria )) //'https://localhost:44331/api/ProcessRequest?key=Mercury3356Lorreignmay29&procedurename=spGetOnProcess&Orderby=' + Orderby + '&Search=' + searchCriteria )
                    .then ((res) => res.json())
                    .then((data)=> 
                    {         
                      setToSet1(data.Set1);
                      // logger.info(data.Set1, 'App.tsx')
                    })
                    .catch((err)=> {
                      alert(err);
                    })
  } 

  //spGetActed 
  const spGetActed=async(Orderby:string , searchCriteria: string)=> {
    const api = new API();
    const response = await fetch(api.URLDoccumentView('spGetActed',Orderby, searchCriteria )) //'https://localhost:44331/api/ProcessRequest?key=Mercury3356Lorreignmay29&procedurename=spGetActed&Orderby=' + Orderby + '&Search=' + searchCriteria )
                    .then ((res) => res.json())
                    .then((data)=> 
                    {         
                      setToSet2(data.Set1);
                      // logger.info(data.Set1, 'App.tsx')
                    })
                    .catch((err)=> {
                      alert(err);
                    })
  } 
  //spGetParked
  const spGetParked=async(Orderby:string , searchCriteria: string)=> {
    // logger.info('https://localhost:44338/api/ProcessRequest?key=Mercury3356Lorreignmay29&procedurename=spGetActed&Orderby=' + Orderby + '&Search=' + searchCriteria, 'App.tsx' );
    const api = new API();
    const response = await fetch(api.URLDoccumentView('spGetParked',Orderby, searchCriteria )) //'https://localhost:44331/api/ProcessRequest?key=Mercury3356Lorreignmay29&procedurename=spGetParked&Orderby=' + Orderby + '&Search=' + searchCriteria )
                    .then ((res) => res.json())
                    .then((data)=> 
                    {         
                      setToSet3(data.Set1);
                      // logger.info(data.Set1, 'App.tsx')
                    })
                    .catch((err)=> {
                      alert(err);
                    })
  } 
  //spGetInbox
  const spGetInbox=async(Orderby:string, searchCriteria: string)=> {
    const api = new API();
    const response = await fetch(api.URLDoccumentView('spGetInbox',Orderby, searchCriteria )) //'https://localhost:44331/api/ProcessRequest?key=Mercury3356Lorreignmay29&procedurename=spGetInbox&Orderby=' + Orderby + '&Search=' + searchCriteria )
                    .then ((res) => res.json())
                    .then((data)=> 
                    {         
                      setToSet4(data.Set1);
                      // logger.info(data.Set1, 'App.tsx')
                    })
                    .catch((err)=> {
                      alert(err);
                    })
  } 
  const ReturnCallAccordionDB=(rdropID:number, sortCriteria: string, searchCriteria: string)=> {
    if (rdropID === 1) spGetOnProcess(sortCriteria, searchCriteria);
    if (rdropID === 2) spGetActed(sortCriteria, searchCriteria);
    if (rdropID === 3) spGetParked(sortCriteria, searchCriteria);
    if (rdropID === 4) spGetInbox(sortCriteria,searchCriteria);

    // logger.info(rdropID + ' ' + sortCriteria, 'App.tsx');
  }
  const AccordionDBOnClick=(id:number) => {
    // routerctx.viewTimeLineRouter(id);
    // alert(id);
    inav().viewTimeLine(id, navigationSet);
    spGetTimeline(id);
  }
  const[TimelineData, SetTimeline] = useState<ISPGetTimeline>(DEF_TIMELINE);
  const[navigation, navigationSet] = useState< INavigation>(DEF_NAVIGATION);
  const[logged, setLog] = useState<string>('true');
  const [loginstate, setLogin] = useState(JSON.parse(document.cookie));
  
  const[popUpClass, setPop] = useState<IpopUp>({
    classname:"pop-up",
    message:"Continue deleting thie record?",
    id:0,
    returnFuntion: deleteDocument,
  });

  const[popUpersClass, setPopupers] = useState<IPopupers>({
    classname:"pop-upers",
    header: "Edit",
    message:"Continue deleting this record?",
    type: "Input",
    cap1: "Update",
    cap2: "Cancel",
    id:0,
    obj: DEF_TIMELINECHILD,
    returnFuntion: update,
  });
  function update(ok:boolean, id:number, value:string, obj?:ITimelineChild ){
    // alert('update popupers');

      let myclassname = ok? 'pop-upers open': 'pop-upers';

      setPopupers({
        classname:myclassname,
        header: "Date Started",
        message:value,
        type: "InputDateTime",
        cap1: "Update",
        cap2: "Cancel",
        id:id,
        obj: obj,
        returnFuntion: updateTimeRecieved,
      }); 
    
  }
  function updateTimeRecieved(ok:boolean, id:number, value:string, obj?:ITimelineChild ){
    // alert('update popupers');
      if (ok)
      {
        var dt = new Date(value);
        var tm = dt.getTime();
        var tmRcv = (moment(dt).format('MM/DD/YYYY hh:mm')) ;

        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dt);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dt);

        var tmCaption = mo + ' ' + da + ', ' + formatAMPM(dt);
        let tmchld:ITimelineChild = obj ?? DEF_TIMELINECHILD;
        tmchld.dateStart = tm;
        tmchld.timeRecieved = tmRcv;
        tmchld.timeRecievedCaption = tmCaption;
        spSetTimeline(tmchld);

      }
      setPopupers({
        classname:'pop-upers',
        header: "Date Started",
        message:value,
        type: "InputDateTime",
        cap1: "Update",
        cap2: "Cancel",
        id:id,
        obj: obj,
        returnFuntion: updateTimeRecieved,
      }); 
  }
  function formatAMPM(date:Date) {
    var hours = date.getHours();
    var minutes:any = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  function EditTimeRecieved(timelinechild:ITimelineChild){
    // alert('router Timerecieved');
    update(true,timelinechild.TimelineID,timelinechild.timeRecieved, timelinechild);
  }

  function EditTimeReleased(timelinechild:ITimelineChild){
    alert('router TimeReleased');
  }

  const popOpen=(open:boolean,Header:string, id:number )=>{

    let classname = open? 'pop-up open': 'pop-up';
    let obj:(ok:boolean, id:number)=>{}|void = deleteTimeline;
    if (Header === 'Document') obj = deleteDocument;
    
    setPop({
      classname:classname,
      message:"Continue deleting thie record?",
      id: id,
      returnFuntion: obj,
    });
  }

  

  function deleteDocument(ok:boolean, recId:number) {
    let id = recId;
    
    popOpen(false, 'Document', 0)
    
    if (ok) {
      inav().DeleteDocViewEvent(id, navigationSet);
      spDeleteDocumentTrack(id);
    }
  }
  function deleteTimeline(ok:boolean, recId:number) {
    let id = recId;
    // logger.info('Timeline deleted '  + popUpClass.id + ', ' + navigation.DocumentTrackID);
    popOpen(false, 'Timeline', 0)
    
    if (ok) {
      spDeleteTimeline(id, navigation.DocumentTrackID)
    }

  }
  function DeleteDocViewEvent(id:number) {
    popOpen(true, 'Document', id);
  }
  function DeleteTimelineChildEvent(TimelineId:number, DocumentTrackID: number) {

    popOpen(true, 'Timeline', TimelineId);
    navigation.DocumentTrackID = DocumentTrackID;


  }
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
    const response=await fetch(api.URLspDocView(loginstate.id) )
                        .then((res) => res.json())
                        .then((data) => 
                        {
                          
                            // logger.info(JSON.stringify(data));
                            SetDocument(data);
                            // logger.info(data, 'workbench')
                            setToSet1(data.Set1);
                            setToSet2(data.Set2);
                            setToSet3(data.Set3);
                            setToSet4(data.Set4);
                            // alert(documentView)
                        })
                        .catch((err) => {
                          alert(err);
                        })
}
const[ctr, counter]= useState(0)

useEffect(() => {
  counter(ctr + 1)
  spDocView();

  // logger.info(popUpersClass);
  // logger.info( popUpersClass.obj);

}, [popUpersClass]);

  const IfContent =()=> {
    if (logged=='true')return  <ContentAB />
    else return <></>
    
  }
  const [nctr,setCtr] = useState(1);

  const onCtrClick = () => {
    setCtr(nctr + 1);
  }

  return (
    <routerContext.Provider value = {routers}>
      <NavigationContext.Provider value = {navigation} >

        <Popup {...popUpClass}/>
        <Popupers 
            header={popUpersClass.header}
            classname={popUpersClass.classname}
            id={popUpersClass.id}
            cap1={popUpersClass.cap1}
            cap2={popUpersClass.cap2}
            message={popUpersClass.message}
            type={popUpersClass.type}
            obj={popUpersClass.obj}
            returnFuntion= {popUpersClass.returnFuntion}
            />        
        <ToolBar />

        <DocViewContext.Provider value={documentView}>            
          <TimelineContext.Provider value ={TimelineData}>
          <div className="content">                 
              <div className="wrapper">
                
                  {/* <button onClick={onCtrClick}>Test {nctr}</button> */}
                  <aside>
                    <AccordionDB pannelCaption='Parked' 
                      fieldNames={['Document Type', 'Office-ProjCode', 'Subject', 'Last Action', 'Aging' ]}
                      fieldIds={['DocType','office', 'Subject', 'personName', 'NoDays' ]}
                      sortID={set3_props.sortID}
                      orderByList={set3_props.orderList}
                      dataSet={set3} 
                      RDropID={3}
                      returnCall={ReturnCallAccordionDB}
                      onClick = {AccordionDBOnClick}                         
                    /> 

                    <AccordionDB pannelCaption='On Process' 
                      fieldNames={['Document Type', 'Office-ProjCode', 'Subject', 'Last Action', 'Aging' ]}
                      fieldIds={['DocType', 'office','Subject', 'personName', 'NoDays' ]}
                      sortID={set1_props.sortID}
                      orderByList={set1_props.orderList}
                      dataSet={set1} 
                      RDropID={1}
                      returnCall={ReturnCallAccordionDB}
                      onClick = {AccordionDBOnClick}    
                    />

                    <AccordionDB pannelCaption='Acted' 
                      fieldNames={['Document Type', 'Office-ProjCode','Subject', 'Last Action', 'Aging' ]}
                      fieldIds={['DocType', 'office','Subject', 'personName', 'NoDays' ]}
                      sortID={set2_props.sortID}
                      orderByList={set2_props.orderList}
                      dataSet={set2} 
                      RDropID={2}
                      returnCall={ReturnCallAccordionDB}
                      onClick = {AccordionDBOnClick}    
                    />
                  </aside>
                  <IfContent />
              </div>
            </div>
          </TimelineContext.Provider>
        </DocViewContext.Provider>
      </NavigationContext.Provider>
    </routerContext.Provider>

  );
}

export default WorkBench;

