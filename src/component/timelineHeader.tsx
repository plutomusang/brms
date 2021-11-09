import { createContext } from "react";
import transmittal from "../svg/transmittal_a.svg";
import document from "../svg/document_a.svg";
import project from "../svg/idea_a.svg";
import delivery from "../svg/delivery_a.svg";
import NavigationContext from './navigation';
import GetTimelineContext from './typescript/GetTimelineContext';
import { useState, useContext, useEffect, useRef }  from "react";

export const TimelineHeader: React.FC =() => { 
    const navigationState = useContext(NavigationContext);
    const GetTimelineState = useContext(GetTimelineContext);
    const [icons, setIcons] = useState([transmittal,document,project,delivery])
    const editDocRouter= () => { 
        navigationState.editDocRouter(true);
    };
    return (
        <div className="cardContainer"> 
            <div >
                <img className="docTypeIcon" src={icons[GetTimelineState.Set1[0].DocTypeID -1]} alt="" />
            </div>
            <div>
                <b>{GetTimelineState.Set1[0].DocType}</b>
            </div>
            <div >
                <div className="buttonResize">
                    
                    <div className="btnedit" onClick ={() => editDocRouter()}>
                        <svg  width="24" height="24" viewBox="0 0 220 220" className="svgicon" >
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
            <div></div>
            <div className="resizeContentNum">
                <span className="subtext">{GetTimelineState.Set1[0].ControlNumber}</span>
            </div>
            <div className="rightContent">
            <b className="subtext">Day 360 </b>
            </div>
            <div></div>
            <div className="description">
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et urna metus. In porttitor, ante vitae laoreet faucibus, enim lorem. */}
                {GetTimelineState.Set1[0].Subject}
            </div>
            <div></div>
        </div>
    )
}

export default TimelineHeader;