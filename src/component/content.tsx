
import React, { useMemo, memo } from "react";
import { useState, useContext, useEffect }  from "react";
import CreateDoc from "./createDoc";
import DocView from "./docView";
import TimeLineAC from "./timelineAC";
import TimelineHeader from "./timelineHeader";
import NavigationContext from '../typescript/context_navigation';
import CreateTimeline from "./createTimeline";
import logo from '../svg/BudgetLogo.svg';
import {IDocViewEvents, DEF_DOCVIEWEVENTS} from "../typescript/interface_DocView";
import logger from "../config/logger";



export const ContentAB: React.FC =() => {
    logger.info('Rendered', 'ContentAB');
    const navigationState = useContext(NavigationContext);
    
    const[Bomb, SetBomb] = useState<IDocViewEvents>(DEF_DOCVIEWEVENTS);


    const Display= () => { 
        return (navigationState.CreateDoc ? <DisplayCreateDoc /> : <DisplayTimeline /> );
    }
    const IFCreateTimeline = () => {
        return (navigationState.CreateTimeline ? <CreateTimeline name="xxx" description="des" documentTrackID={0} OnCreate={false} /> : <TimeLineAC /> );
    }
    const DisplayTimeline= () => { 
        if (navigationState.ViewTimeline) {
            return (
                <div className="timelineContainer">
                    <div className="timelineContainer">
                        <div>
                            <TimelineHeader />    
                        </div>
                        <div className='timeLineWrapper'>
                            <IFCreateTimeline /> 
                        </div>
                    
                    </div>
                </div>
            )        
        }
        else {
            return (
            <div className="timelineContainer">
                <div className="timelineContainer">
                    <div className="splashContent">
                        <img className="splash" src={logo} />
                    </div>
                </div>
            </div>
            )

        }
    }
    const DisplayCreateDoc= () => { 
        return (

            <div className="createDocContainer">
                 <CreateDoc />
            </div>
        )
    }    

    return (
        <>
              <Display />
        </>
    )
}

export default memo(ContentAB)