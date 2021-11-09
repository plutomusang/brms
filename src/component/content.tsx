import React from "react";
import { useState, useContext, useEffect, useRef }  from "react";
import CreateDoc from "./createDoc";
import DocView from "./docView";
import { TimelineAB } from "./timeline";
import TimelineHeader from "./timelineHeader";
import NavigationContext from './navigation';
import CreateTimeline from "./createTimeline";
export const ContentAB: React.FC =() => {
    const navigationState = useContext(NavigationContext);
    const Display= () => { 
        return (navigationState.CreateDoc ? <DisplayCreateDoc /> : <DisplayTimeline /> );
    }
    const IFCreateTimeline = () => {
        return (navigationState.CreateTimeline ? <CreateTimeline /> : <TimelineAB /> );
    }
    const DisplayTimeline= () => { 
        return (
            <div className="timelineContainer">
                <div className="timelineContainer">
                    <div>
                        <TimelineHeader />    
                    </div>
                    <div>
                        <IFCreateTimeline /> 
                    </div>
                
                </div>
            </div>
        )
    }
    const DisplayCreateDoc= () => { 
        return (

            <div className="createDocContainer">
                 <CreateDoc />
            </div>
        )
    }    
    return (
        <div className="content">
            <div className="wrapper">
                <aside> <DocView /> </aside>
                <Display />
            </div>


        </div>

    )
}

export default ContentAB