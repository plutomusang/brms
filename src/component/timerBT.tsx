import React , {useState, useRef, useEffect}  from "react";
import { api } from "../typescript/class_api";
import {timedisplay, jsDateToSQL, sqlToJSDateNumber} from '../typescript/class_timeUtil';
import {ITimelineChild} from '../typescript/interface_SPGetTimeline';

export interface ItimerData {
    timeRecieved: string,
    timeReleased: string,
    dateStart: number,
    datePaused: number,
    paused: boolean,
    delay: number,
    runningDelay: number,
    totalTime: number,
    consumedTime: number
}
export const timerData: ItimerData =
{
    timeRecieved:'2021-11-10 09:49:42.103',
    timeReleased:'2021-11-13 09:49:42.103',
    dateStart: 0,
    datePaused: 0,
    paused: false,
    delay: 0,
    runningDelay: 0,
    totalTime: 0,
    consumedTime: 0
}

interface IProps {
    timerData: ITimelineChild,
    onTimerClicked: (t:ITimelineChild) => void 
}

export const TimerBT: React.FC<IProps> = React.memo( (props) => {
    const [mytimer, mytimerSet] = useState(setInterval(() => {},0) );
    const [tmlabel, tmlabelSet] = useState('');
    const svgPlay = useRef<any>(null);
    const svgStop = useRef<any>(null);

    const play =()=> {
        mytimerSet(setInterval(() => {Display()}, 1000));
    }

    const stop =()=>{
        props.timerData.datePaused = Date.now();       
        props.timerData.timeReleased = jsDateToSQL(props.timerData.datePaused);
        Display(); 
        clearInterval(mytimer);
    }

    const Display= () => {         
        if (props.timerData.paused === true) {
            props.timerData.runningDelay = Date.now() - props.timerData.datePaused + props.timerData.delay;
        }
        if (props.timerData.paused === false){ 
            props.timerData.delay =  props.timerData.runningDelay;
        }

        props.timerData.totalTime = Date.now() - props.timerData.dateStart;
        props.timerData.consumedTime = props.timerData.totalTime - props.timerData.runningDelay;        

        let s = timedisplay(props.timerData.consumedTime);
        tmlabelSet(s);
    };

    const timerToggle =()=> {
        Display();
        props.timerData.paused = !props.timerData.paused;
        if (props.timerData.paused) {svgPlay.current.beginElement(); stop() ;}
        else {svgStop.current.beginElement();play();}
    }


    useEffect(() =>{
        correctives();
        Display();
        if (!props.timerData.paused) play();
    },[props.timerData] )


    const correctives=()=> {
        props.timerData.dateStart = props.timerData.dateStart === 0? sqlToJSDateNumber(props.timerData.timeRecieved) : props.timerData.dateStart;
        props.timerData.datePaused = props.timerData.datePaused === 0 ? props.timerData.dateStart : props.timerData.datePaused;

    }

    const ShowButton =()=>{
        if (tmlabel!= '') {
            return (
                <div  className="play-btn" onClick ={() => {timerToggle(); props.onTimerClicked(props.timerData)}}>
                <svg className="toggle" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="65" style={{fill:"silver"}}/>
                    <polygon  id="shape" points="50,40 100,70 100,70 50,100, 50,40" >
                    <animate 
                        ref={svgStop}
                        id="animate_to_stop" 
                        begin="indefinite" 
                        fill="freeze" 
                        attributeName="points" 
                        dur="500ms" 
                        to="45,45 95,45 95,95, 45,95 45,45"
                        keySplines="
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1"
                        keyTimes="0;0.22;0.33;0.55;0.66;0.88;1" 
                        calcMode="spline"

                    />

                    <animate 
                        ref={svgPlay}
                        id="animate_to_play" 
                        begin="indefinite" 
                        fill="freeze" 
                        attributeName="points" 
                        dur="500ms" 
                        to="50,40 100,70 100,70 50,100, 50,40" 
                        keySplines="
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1"
                        keyTimes="0;0.22;0.33;0.55;0.66;0.88;1" 
                        calcMode="spline"
                    />
                    </polygon>
                </svg>                
            </div>   
            )            
        }
        else return <></>
    }
    return (
        <div className="timerobj"> 
            <div className="timernum"> 
                {tmlabel}
            </div>	
            <ShowButton />
        </div>
    )
});


export default TimerBT;