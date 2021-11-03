import React from 'react';
import transmittal from "../svg/transmittal_a.svg";
import document from "../svg/document_a.svg";
import project from "../svg/idea_a.svg";
import delivery from "../svg/delivery_a.svg";
import { useState, useContext, useEffect, useRef }  from "react";
import NavigationContext from './navigation';
export const DocView: React.FC =() => {
    const navigationState = useContext(NavigationContext);
    function router () {
        navigationState.updateStatus(false);
    }
    return (
        <div className="docView"> 
            <div className="headerpart">
                On Process
            </div>
            <div className="contentpart">
                <div className="recordlist" onClick ={() => router()}>
                    <div ><img className="docIcon" src={transmittal} alt="" /> </div>
                    <div className="fld"> CBO-T00101</div>
                    <div className="fld">Nequere Porrotoi</div>
                    <div className="fld">3 Days</div>           
                </div>  
                <div className="recordlist" onClick={() => router()}>
                    <div ><img className="docIcon" src={document} alt="" /> </div>
                    <div className="fld"> CBO-T00102</div>
                    <div className="fld">Armondilu Ruikoil</div>
                    <div className="fld">3 Days</div>           
                </div>                     
            </div>
            <div className="headerpart headeracted">
                Acted
            </div>
            <div className="contentpart">
                <div className="recordlist" onClick={() => router()}>
                    <div ><img className="docIcon" src={delivery} alt="" /> </div>
                    <div className="fld"> CBO-T00101</div>
                    <div className="fld"></div>
                    <div className="fld"></div>           
                </div>  
                <div className="recordlist" onClick= {() => router()}>
                    <div ><img className="docIcon" src={project} alt="" /> </div>
                    <div className="fld"> CBO-T00102</div>
                    <div className="fld"></div>
                    <div className="fld"></div>           
                </div>                     
            </div>            
        </div>

    )
} 

export default DocView;
