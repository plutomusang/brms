import { time } from "console";
import { useState, useContext, useEffect, useRef }  from "react";
import React from "react";
import "../sass/main.scss"

import TimerBS from "./timerBS";
import NavigationContext from '../typescript/context_navigation';
import TimelineContext from '../typescript/context_SPGetTimeline';
import {ISPGetTimeline, ITimelineChild} from "../typescript/interface_SPGetTimeline"

export const TimelineAB: React.FC =() => {
    const navigationState = useContext(NavigationContext);
    const TimelineState = useContext(TimelineContext);

    const createTimeLinerouter= () => { 
        navigationState.createTimeLinerouter(true);
    };

    return (
            <div className="timeline-container" > 
                {TimelineState.Set2.map((values) =>{
                let statusColor = values.documentStatus ? "circle" : "circle-alarm";
                let infoClass = values.isLastItem? "infoclass": "infoclass lastline";

                    return (                                    
                    <div className="timeline">
                        <div className="tl-date"> 
                            <a> {values.timeRecievedCaption}</a>
                        </div>                    
                        <div className="tl-status">
                            <div className ={statusColor}> </div> 
                            <div className ="circliner"> </div> 
                        </div>
                        <div className="tl-info">{values.personName} </div>
                        <IfDocumentStatus {...values}/>

                        <div className="tl-date-rel">  
                            <div>{values.timeReleasedCaption}</div> 
                            <div>{values.NoHrsCaption}</div> 
                        </div>
                        <div className="vliner-container"> <div className="vliner"></div> </div>

                        <div className={infoClass}>
                            <div>{values.description}</div>     
                            <IfLastItem isLast={values.documentStatus} />   
                        </div>
                        {/* <div className={lastlineClass}></div>   */}


                    </div>
                    )
                } )}
                <div className="timeline">
                    
                    <div className="tl-date"> 
                        <a></a>
                    </div>
                    <div className="tl-status">
                        <div className="circle-cross"  onClick ={() => createTimeLinerouter()}></div>
                        <div className ="circliner"> </div> 
                    </div>
                    <div className="tl-info"></div>
                    <div className="buttons">
                        <a></a>
                    </div>
                    
                    <div></div>
                    <button className="button-hidden">
                        <span className="button-acted">
                        Tag as Acted
                        </span>
                    </button>
                    <div></div>
                    <div></div>
                    
                </div>
            </div>

    )
}

function ButtomCross(props:any) {
    const isLast = props.isLast;
    if (!isLast) return <React.Fragment>
        
        </React.Fragment>
    else return <span></span>

}
function LastItem() {
    return  <div className="tl-status-last">
                <div className="circle-cross"></div>
                <div className ="circliner"> </div> 
            </div>
}
function CrudButton(timelineData: ITimelineChild) {
    const navigationState = useContext(NavigationContext);
    const editTimeLinerouter= () => { 
        navigationState.editTimeLinerouter(true, timelineData);
    };
    const deleteTimelineChildEvent= () => { 
        navigationState.DeleteTimelineChildEvent(timelineData.TimelineID);
    };    
    return  <div className="buttons">
                <div className="btnedit" onClick ={() => editTimeLinerouter()}>
                    <svg  viewBox="0 0 220 220" className="svgicon" >
                        <polygon  points="0,220 59.34,213.86 6.143,160.661"  />
                        <path  d="M132.018,34.787l53.197,53.197L69.568,203.631L16.37,150.434L132.018,34.787z M212.696,60.502
                            c9.738-9.738,9.742-25.527,0-35.268l-17.93-17.93c-9.738-9.74-25.529-9.738-35.268,0l-17.346,17.347l53.199,53.196L212.696,60.502z
                            " />          
                    </svg>
                </div>
                <div className="btnedit" onClick ={() => deleteTimelineChildEvent()}>
                    <svg className="svgicon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" /></svg>
                </div>        
            </div>
    
} 
function CrudOptionButton() {
    return <div className="optionbutton">
                <ul className="opt-ul">
                    <li>
                        <input type="radio" id="f-option" name="selector" checked />
                        <div className="check"></div>
                        <label htmlFor="f-option"></label>
                        <div className="label-caption"> <span>On Process</span> </div>
                    </li>
                    <li>
                        <input type="radio" id="s-option" name="selector" />
                        <div className="check"></div>
                        <label htmlFor="s-option"></label>
                        <div className="label-caption"> <span>Complied</span>  </div>
                    </li>
                </ul>
                <div className="buttonsOpt">
                    <div className="btnedit">
                        <svg  viewBox="0 0 220 220" className="svgicon" >
                            <polygon  points="0,220 59.34,213.86 6.143,160.661"  />
                            <path  d="M132.018,34.787l53.197,53.197L69.568,203.631L16.37,150.434L132.018,34.787z M212.696,60.502
                                c9.738-9.738,9.742-25.527,0-35.268l-17.93-17.93c-9.738-9.74-25.529-9.738-35.268,0l-17.346,17.347l53.199,53.196L212.696,60.502z
                                " />          
                        </svg>
                    </div>
                    <div className="btnedit">
                        <svg className="svgicon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" /></svg>
                    </div>         
                </div>         
        </div>
}        

function IfDocumentStatus(timelineData: ITimelineChild) {
    const isDone = timelineData.documentStatus;

    if (isDone)  return <CrudButton {...timelineData}/>
    else return <CrudButton {...timelineData}/>
    // <CrudOptionButton />
}          
function IfLastItem(props:any) {
    const isLast = props.isLast;
    if (!isLast) {
      return (
          
        <TimerBS />

      )
    } else  return <></>;
}

export const TimeLine: React.FC =() => {
    return (
            <TimelineAB />
    )
}

export default TimeLine;