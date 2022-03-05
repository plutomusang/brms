import React from 'react';

import { useState, useContext, useEffect, useRef }  from "react";
import routerContext from '../typescript/context_router';
import {iconSmall} from '../typescript/class_icons';
import {IDocViewEvents, IDocView, IDocumentView} from "../typescript/interface_DocView";
import DocViewContext from '../typescript/context_DocView';
import logger from '../config/logger';

export const DocView = ({boom} : {boom: React.Dispatch<React.SetStateAction<IDocViewEvents>> }) => {
    logger.info('rendered', 'DocView');
    const routerctx = useContext(routerContext);
    const { height, width } = useWindowDimensions();
    // logger.info('width: ' + width);

    const dv = useContext(DocViewContext);
    
    const onReload =() => {

    }


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
    // logger.info('rdrawn', 'docview');
    return (
        <div className="docView"> 
            {/* <button onClick={trigger}>callsp</button> */}
            <div className="headerpart">
                Parked
            </div>    
            <div className="contentpart">
                {dv.Set3.map((values) => {
                    
                    return (
                        <div key={values.DocumentTrackID} className="recordlist" onClick ={() => router(values.DocumentTrackID)}>
                            <div ><img className="docIcon" src={iconSmall(values.picIndex)} alt="" /> </div>
                            <div className="fld"> {values.DocType}</div>
                            <div className="fld">{values.Subject }</div>
                            <div className="fld">{values.personName }</div>
                            <div className="fld">{values.NoDays}</div>           
                        </div>  
                    )
                })}   
            </div>    
            <div className="headerpart headeracted">
                On Process
            </div>
            <div className="contentpart">
                {dv.Set1.map((values) => {
                    
                    return (
                        <div key={values.DocumentTrackID} className="recordlist" onClick ={() => router(values.DocumentTrackID)}>
                            <div ><img className="docIcon" src={iconSmall(values.picIndex)} alt="" /> </div>
                            <div className="fld"> {values.DocType}</div>
                            <div className="fld">{values.Subject }</div>
                            <div className="fld">{values.personName }</div>
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
                        <div key={values.DocumentTrackID} className="recordlist" onClick ={() => router(values.DocumentTrackID)}>
                            <div ><img className="docIcon" src={iconSmall(values.picIndex)} alt="" /> </div>
                            <div className="fld"> {values.DocType}</div>
                            <div className="fld">{values.Subject}</div>
                            <div className="fld">{values.personName }</div>
                            <div className="fld">{values.NoDays}</div>           
                        </div>  
                    )
                })} 
                  
            </div>            
        </div>

    )
} 

function getWindowDimensions() {
    const { 
        innerWidth: width, 
        innerHeight: height 
    } = window;
    return {
      width,
      height
    };
  }
  
export  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}



export default DocView;
