import React from 'react';

import { useState, useContext, useEffect, useRef }  from "react";
import routerContext from '../typescript/context_router';
import {DEF_ICONSSM} from '../typescript/class_icons';
import {IDocViewEvents, IDocView, IDocumentView} from "../typescript/interface_DocView";
import DocViewContext from '../typescript/context_DocView';

export const DocView = ({boom} : {boom: React.Dispatch<React.SetStateAction<IDocViewEvents>> }) => {
    const routerctx = useContext(routerContext);

    const dv = useContext(DocViewContext);
    
    const [icons, setIcons] = useState(DEF_ICONSSM)
    const onReload =() => {

    }

    // const onProcessData = 
    // [{
    //     "DocumentTrackID": 0,
    //     "DocTypeID": 0,
    //     "ControlNumber": "",
    //     "personName": "",
    //     "NoDays": ""
        
    // }];
    // const onActedData = 
    // [{
    //     "DocumentTrackID": 0,
    //     "DocTypeID": 0,
    //     "ControlNumber": "",
    //     "Office": "",
    //     "NoDays": ""
        
    // }];    
    // type SPGetOnActedtype = typeof onActedData;
    // type SPGetOnProcesstype = typeof onProcessData;

    // const [onProcess, setOnProcess] = useState<SPGetOnProcesstype >(onProcessData);
    // const [onActed, setonActed] = useState<SPGetOnActedtype >(onActedData);

    // const spDocView=async()=> {
    //     const response=await fetch("https://localhost:44331/api/ProcessRequest?key=Mercury3356Lorreignmay29&procedurename=spDocView")
    //                         .then((res) => res.json())
    //                         .then((data) => 
    //                         {
    //                             setOnProcess(data.Set1);
    //                             setonActed(data.Set2);
    //                         })
    //                         .catch((err) => {
    //                           alert(err);
    //                         })
    // }


    function router (id: number) {
        
        routerctx.viewTimeLineRouter(id);
    }
    const trigger =()=> {
        // spDocView();
        // boom({ReloadAll:trigger})
    }

    useEffect(() => {
        boom({ReloadAll:trigger})
        //alert(dv.Set1[1].ControlNumber);
        // spDocView();
        
    }, []);
    return (
        <div className="docView"> 
            {/* <button onClick={trigger}>callsp</button> */}
            <div className="headerpart">
                On Process
            </div>
            <div className="contentpart">
                {dv.Set1.map((values) => {
                    
                    return (
                        <div className="recordlist" onClick ={() => router(values.DocumentTrackID)}>
                            <div ><img className="docIcon" src={icons[+values.DocTypeID]} alt="" /> </div>
                            <div className="fld"> {values.ControlNumber}</div>
                            <div className="fld">{values.personName + ' ' + values.DocumentTrackID}</div>
                            <div className="fld">{values.NoDays}</div>           
                        </div>  
                    )
                })}                    
            </div>
            <div className="headerpart headeracted">
                Acted
            </div>
            <div className="contentpart">
                {dv.Set2.map((values) => {
                    return (
                        <div className="recordlist" onClick ={() => router(values.DocumentTrackID)}>
                            <div ><img className="docIcon" src={icons[+values.DocTypeID]} alt="" /> </div>
                            <div className="fld"> {values.ControlNumber}</div>
                            <div className="fld">{values.Office}</div>
                            <div className="fld">{values.NoDays}</div>           
                        </div>  
                    )
                })} 
                  
            </div>            
        </div>

    )
} 

export default DocView;
