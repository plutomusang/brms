import { useState, useContext, useEffect, useRef }  from "react";
import TMContext , {TimerState} from './timerState';


export const TimerBS: React.FC =() => {
    const tmState = useContext(TMContext);
    const [mytimer, mytimerSet] = useState(setInterval(() => {},0) );
    const [tmlabel, tmlabelSet] = useState('00:00:00');
    const svgPlay = useRef<any>(null);
    const svgStop = useRef<any>(null);
    
    const router= () => { 
        if (!tmState.running) start();
        else if (tmState.paused) resume();
        else stop();
    };
    const stop= () => { 
        tmState.datePaused = Date.now();
        tmState.paused = true;
        svgPlay.current.beginElement();
        clearInterval(mytimer);
        run();
    };
    const resume= () => { 
        tmState.paused = false;
        tmState.delay += Date.now() - tmState.datePaused;
        svgStop.current.beginElement();
        mytimerSet(setInterval(() => {run()}, 1000));
    };
    const start= () => { 
        tmState.delay =0;
        tmState.running = true; 
        tmState.dateStart = Date.now();
        svgStop.current.beginElement();
        mytimerSet(setInterval(() => {run()}, 1000));
    };
    const run= () => { 
        let time = timeparser(Date.now() - tmState.dateStart - tmState.delay);
        let s = time[0] + ':' + time[1] + ':' + time[2] ;
        tmlabelSet(s);
    };  
    const timeparser= (elapsed: number):string[] => {
        let units: number[] = [3600000,60000,1000];
        let time: string[] = [];
        let index: number = 0;
        while (index < units.length) {
            let t: number = Math.floor(elapsed/units[index]);
            elapsed -= t*units[index];
            let st:string = (index > 0 && t < 10) ?  '0' + t : t.toString();
            time.push(st);
            index++;
        }
        return time;
    }  
    useEffect(() => {
        router();
    }, []);
    return (
        <div className="timerobj"> 	
            <div className="timernum"> 
                <time id="timer">{tmlabel}</time>	
            </div>	
            <div  className="play-btn" onClick ={() => router()}>
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
        </div>
    )
}

// function TimerBSContext(){
    
//     const[tm, tmSet] = useState<TimerState>({
//         delay:0,
//         datePaused: 1633947074561,
//         paused: true,
//         running: true,
//         dateStart: 1633946836818
//     });
//     return (
//         <TMContext.Provider value={tm}>
//             <TimerBS />
//         </TMContext.Provider>
//     )
// };

export default TimerBS;
