import React from "react";
import { useState, useContext, useEffect, useRef }  from "react";
import CreateDoc from "./createDoc";
import DocView from "./docView";
import { TimelineAB } from "./timeline";
import TimelineHeader from "./timelineHeader";
import NavigationContext from './navigation';
export const ContentAB: React.FC =() => {
    const navigationState = useContext(NavigationContext);
    const Display= () => { 
        if (navigationState.CreateDoc) {
           return (
                <DisplayCreateDoc />
           ) 
        }
        else  {
            return (
                <DisplayTimeline />
            )
        }

    }
    const DisplayTimeline= () => { 
        return (
            <div className="timelineContainer">
                <div className="TimelineContainer">
                    <div>
                    <TimelineHeader />    
                    </div>
                    <div>
                    <TimelineAB /> 
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