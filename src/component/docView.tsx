import React from 'react';
import transmittal from "../svg/transmittal_a.svg";
import document from "../svg/document_a.svg";
import project from "../svg/idea_a.svg";
import delivery from "../svg/delivery_a.svg";
import { useState, useContext, useEffect, useRef }  from "react";
import NavigationContext from './navigation';



export const DocView: React.FC =() => {
    const navigationState = useContext(NavigationContext);
    const [icons, setIcons] = useState([transmittal,document,project,delivery])
    const onProcessData = 
    [{
        "DocumentTrackID": 0,
        "DocTypeID": 0,
        "ControlNumber": "",
        "personName": "",
        "NoDays": ""
        
    }];
    const onActedData = 
    [{
        "DocumentTrackID": 0,
        "DocTypeID": 0,
        "ControlNumber": "",
        "Office": "",
        "NoDays": ""
        
    }];    
    type SPGetOnActedtype = typeof onActedData;
    type SPGetOnProcesstype = typeof onProcessData;

    const [onProcess, setOnProcess] = useState<SPGetOnProcesstype >(onProcessData);
    const [onActed, setonActed] = useState<SPGetOnActedtype >(onActedData);

    const spDocView=async()=> {
        const response=await fetch("https://localhost:44331/api/ProcessRequest?key=Mercury3356Lorreignmay29&procedurename=spDocView")
                            .then((res) => res.json())
                            .then((data) => 
                            {
                                setOnProcess(data.Set1);
                                setonActed(data.Set2);
                            })
                            .catch((err) => {
                              alert(err);
                            })
    }


    function router (id: number) {
        navigationState.viewTimeLineRouter(id);
    }

    useEffect(() => {
        spDocView();
    }, []);
    return (
        <div className="docView"> 
            <div className="headerpart">
                On Process
            </div>
            <div className="contentpart">
                {onProcess.map((values) => {
                    return (
                        <div className="recordlist" onClick ={() => router(values.DocumentTrackID)}>
                            <div ><img className="docIcon" src={icons[+values.DocTypeID -1]} alt="" /> </div>
                            <div className="fld"> {values.ControlNumber}</div>
                            <div className="fld">{values.personName}</div>
                            <div className="fld">{values.NoDays}</div>           
                        </div>  
                    )
                })}                    
            </div>
            <div className="headerpart headeracted">
                Acted
            </div>
            <div className="contentpart">
                {onActed.map((values) => {
                    return (
                        <div className="recordlist" onClick ={() => router(values.DocumentTrackID)}>
                            <div ><img className="docIcon" src={icons[+values.DocTypeID -1]} alt="" /> </div>
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
