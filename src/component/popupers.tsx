import moment from 'moment';
import React, { useState , useEffect, useCallback, useRef} from 'react'
import logger from "../config/logger";
import { DEF_TIMELINECHILD, ITimelineChild } from '../typescript/interface_SPGetTimeline';
import {DEF_FUNCCREATETIMECALLS, Ifunc_CreateTimeCalls } from '../typescript/interface_routers';
export interface IPopupers {
    classname: string;
    message:  string;
    header: string;
    type: string;
    cap1: string;
    cap2: string;
    id: number;    
    obj?:ITimelineChild;
    obj2?: Ifunc_CreateTimeCalls;
    returnFuntion: (ok:boolean, id:number, value: string, obj?:ITimelineChild, obj2?:Ifunc_CreateTimeCalls) => {}| void | undefined;
}

const Popupers:React.FC<IPopupers>=(props)=> {
    const [pop, setPop] = useState(props.classname);
    //logger.info(props);

    const popClose =(classname:string)=> {
        setPop(classname);
    }
    useEffect(() => {       
        setPop(props.classname);
        // logger.info(props);
    }, [props]); 
    
    return(
        <div>
            <div className={pop}>

                {/* <button className='close' onClick={()=>popClose(false)}>Close</button> */}
                <div className="content">
                    {/* <div className="title"> <h1>Delete</h1></div>
                    <div className="message"> <h1>{props.message}</h1></div> */}

                    <OnType message={props.message} props={props} setPop={popClose}/>
                 
                </div>
            </div>
        </div>

    )

}

interface IOnType {
    props: IPopupers,
    message:string,
    setPop:(value:string)=>void,
}
const OnType:React.FC<IOnType> =(o)=> {
    
    const [inputValue, SetInputValue] = useState(o.props.message);
    const inputrefDate = useRef<HTMLInputElement>(null);
    const inputrefTime = useRef<HTMLInputElement>(null);

    const getIsoDateTime =(sdate:string, isDate:boolean)=> {
        if ((o.props.type == "InputDateTime") || (o.props.type == "InputDate")) {    
            
            let dt:Date = new Date(sdate);
            
            if (isValidDate(dt)){
                var currentDate = moment(dt).format('YYYY-MM-DD');
                var currentTime = moment(dt).format('HH:mm');
                // logger.info(currentTime, 'getIsoDateTime Popupers');
                // const number = moment(sdate, ["hh:mm A"]).format("HH:mm");
                // logger.info(number, '0 getIsoDateTime popupers');
                // logger.info(sdate, '1 getIsoDateTime popupers');
                // logger.info(currentTime, '2 getIsoDateTime popupers');
                // currentTime = "22:00";
                // logger.info(dt.toISOString(), 'timelineAC');
                // logger.info(dt.toLocaleString(), 'timelineAC');
                // logger.info(currentTime, 'timelineAC');
                // logger.info(currentDate, 'timelineAC');
                // logger.info(dt.getFullYear().toString() + '-' + (dt.getMonth() + 1).toString() + '-' + dt.getDate().toString(), 'timelineAC');
                // logger.info(moment(dt).format('YYYY-MM-DD'));
                // logger.info(moment(dt).format('hh:mm'));
            if (isDate) return  currentDate;
            else return currentTime
            } else return sdate;
        } else return sdate;
        
    }
    function isValidDate(d:Date) {
        if (Object.prototype.toString.call(d) === "[object Date]") {
            // it is a date
            if (isNaN(d.getTime())) {  // d.valueOf() could also work
              // date is not valid
              return false
            } else {
              // date is valid
              return true
            }
          } else {
            // not a date
            return false
          }
    }
    const onChange=(events:React.ChangeEvent<HTMLInputElement>) => {
        
        //var newDateObj = moment(oldDateObj).add(30, 'm').toDate();
        SetInputValue(events.target.value)
    }
    const onDateTimeChange=(events:React.ChangeEvent<HTMLInputElement>) => {
        var currentTime = moment(inputrefTime.current?.value, ["HH.mm"]).format("hh:mm A");
        let sdt:string = inputrefDate.current?.value + ' ' + currentTime;
        // let dt:Date = new Date(sdt)
        // var currentTime = moment(inputrefTime.current?.value).format('hh:mm');
        // logger.info(inputrefTime.current?.value, 'popupers');
        // logger.info(sdt, 'popupers');
        // logger.info(sdt, 'onDateTimeChange popupers');
        // let dt:Date = new Date(sdt);
        // logger.info(dt, 'popupers');
        // logger.info(getIsoDateTime(sdt, true), 'popupers');
        // logger.info(getIsoDateTime(sdt, false), 'popupers');
        SetInputValue(sdt)
        // alert('hit');
        // setmDate(events.target.value)
    }
    const onTimeChange=(events:React.ChangeEvent<HTMLInputElement>) => {
        // setmTime(events.target.value)
    }

    const popClose =(ok:boolean )=> {
        o.setPop('pop-upers');
        o.props.returnFuntion(ok, o.props.id, inputValue,o.props.obj ?? DEF_TIMELINECHILD, o.props.obj2 ?? DEF_FUNCCREATETIMECALLS);
    }

    const onkeyDown =(events:React.KeyboardEvent<HTMLInputElement>) => {
        if (events?.key === 'Enter') { 
            popClose(true);
          }
        
    }
    useEffect(()=>{
        SetInputValue(o.props.message)
      },[o.props])


    switch  (o.props.type) {
        case 'Input':
            return (
                <React.Fragment>
                <div className="title"><h1>{o.props.header}</h1></div>
                <input className="dyna-input" type="text" value={inputValue} onChange={onChange} onKeyDown={onkeyDown}/>
                <div >
                    <button className="popbut" onClick={()=>popClose(true)}>{o.props.cap1}</button>
                    <button className="popbut" onClick={()=>popClose(false)}>{o.props.cap2}</button>
                </div>   
                </React.Fragment>
            )
            break;
        case 'InputDate': 
            return (
                <React.Fragment>
                <div className="title"><h1>{o.props.header}</h1></div>
                <input className="dyna-input" type="date" value={inputValue} onChange={onChange} onKeyDown={onkeyDown}/>
                <div >
                    <button className="popbut" onClick={()=>popClose(true)}>{o.props.cap1}</button>
                    <button className="popbut" onClick={()=>popClose(false)}>{o.props.cap2}</button>
                </div>   
                </React.Fragment>
            )
            break;

        case 'InputDateTime': 
            return (
                <React.Fragment>
                <div className="title"><h1>{o.props.header}</h1></div>
                <div className='inputDateTime'>
                    <input ref={inputrefDate} className="dyna-input" type="date" value={getIsoDateTime(inputValue, true)}  onChange={onDateTimeChange} onKeyDown={onkeyDown}/>
                    <input ref={inputrefTime} className="dyna-input" type="time" value={getIsoDateTime(inputValue, false)}  onChange={onDateTimeChange} onKeyDown={onkeyDown}/>
                </div>
                <div >
                    <button className="popbut" onClick={()=>popClose(true)}>{o.props.cap1}</button>
                    <button className="popbut" onClick={()=>popClose(false)}>{o.props.cap2}</button>
                </div>   
                </React.Fragment>
            )
            break;

        default:
            return (
                <React.Fragment>
                    <div className="title"><h1>{o.props.header}</h1></div>
                    <div className="message"> <h2>{o.message}</h2></div>
                    <div >
                        <button className="popbut" onClick={()=>popClose(true)}>{o.props.cap1}</button>
                        <button className="popbut" onClick={()=>popClose(false)}>{o.props.cap2}</button>
                    </div> 
                </React.Fragment>
            
            )
            break;
    }
    /*
    if (o.props.type === 'Input'){
        //logger.info(o.props);
        return (
            <React.Fragment>
            <div className="title"><h1>{o.props.header}</h1></div>
            <input className="dyna-input" type="text" value={inputValue} onChange={onChange} onKeyDown={onkeyDown}/>
            <div >
                <button className="popbut" onClick={()=>popClose(true)}>{o.props.cap1}</button>
                <button className="popbut" onClick={()=>popClose(false)}>{o.props.cap2}</button>
            </div>   
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <div className="title"><h1>{o.props.header}</h1></div>
                <div className="message"> <h2>{o.message}</h2></div>
                <div >
                    <button className="popbut" onClick={()=>popClose(true)}>{o.props.cap1}</button>
                    <button className="popbut" onClick={()=>popClose(false)}>{o.props.cap2}</button>
                </div> 
            </React.Fragment>
        
        )
    }
    */
}

export default Popupers;
