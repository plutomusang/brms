import React from "react";
import delivery from "../svg/delivery.svg"
import idea from "../svg/idea.svg"
import process from "../svg/process.svg"
import document from "../svg/document.svg"
import run from "../svg/run.svg"
import transmittal from "../svg/transmittal.svg"
import project from "../svg/project.svg"

import { useState, useContext, useEffect, useRef, useCallback, memo }  from "react";
import NavigationContext from '../typescript/context_navigation';
import {DEF_ICONS, DEF_DOCTYPE} from '../typescript/class_icons';
import routerContext from "../typescript/context_router";

import Dynalist from "./dynalist";
import DynalistAB from "./dynalistAB";
import logger from "../config/logger";
import API from "../typescript/class_api";
import moment from 'moment';

export const CreateDoc: React.FC =() => {
    logger.info('rendered', 'CreateDoc')
    const [docType, docTypeSet] = useState(DEF_DOCTYPE);
    const [docImage, docImageSet] = useState(DEF_ICONS);
    const ctx = useContext(NavigationContext);
    const routers = useContext(routerContext);
    const initCheck =  ctx.DocumentHeader.DocumentTrackID > 0 ? false: true;
    const [chkValue, chkValueSet] = useState(initCheck);
    const [curIndex, curIndexSet] = useState(0);
    const[value, setValue] = useState('value');
    const[userID, setUserID] = useState(0);
    const [autoParked, setAutoParked] = useState(false);

    const api = new API();
    const [func_CreateTimeCalls, setfunc_CreateTimeCalls] = useState (
        {
            createTimeCalls: myCreateTimeCalls,
            message: "",
        }
    );
    function myCreateTimeCalls (onCurrent:boolean, values: string) {
        // setIsTimeToCur(onCurrent) ;
        // setTimeCreate(values) ;
        // alert(values);
    }

    const onclikAutoParked =()=> {
        setAutoParked(!autoParked);
    };
    const onTextChanged =(id:number , data: string)=> {
        setValue(data);
        setUserID(id);
    } 
    const [typeId, setTypeId] = useState(ctx.DocumentHeader.DocTypeID);

    const oncheckDrop= () => { 
        // logger.info('oncheckDrop' );
        chkValueSet(!chkValue);
    };        
    const dataClicked= (id:number) => { 
        // logger.info('data clicked' + id);
        setTypeId(id);
        curIndexSet(id);
        chkValueSet(false);
    };    
    const editDocRouter= (ok:boolean, subject:string ,office:string ,projectcode:string , amount:number, remarks:string, recepient:string, dateCreate: string ) => { 
        if (ok) {
            if (ctx.DocumentHeader.DocumentTrackID === 0) {
                var dt = new Date(Date.now());
                var currentTime = moment(dt).format('HH:mm');
                dateCreate = getIsoDateTime(ctx.DocumentHeader.DateCreated, true) + ' ' + currentTime;
            }
            ctx.DocumentHeader.Subject = subject;
            ctx.DocumentHeader.Office = office;
            ctx.DocumentHeader.ProjectCode = projectcode;
            ctx.DocumentHeader.Amount = amount;
            ctx.DocumentHeader.Remarks = remarks;
            ctx.DocumentHeader.DateCreated = dateCreate;
            ctx.DocumentHeader.DocTypeID = typeId;
            ctx.DocumentHeader.AutoParked = autoParked;

        }
        
        routers.editDocRouter(false, ok, ctx.DocumentHeader);
    };

    const IfFormCardContainer= React.memo (() => { 
        const [subject, subjectSet] = useState(ctx.DocumentHeader.Subject);
        const [office, officeSet] = useState(ctx.DocumentHeader.Office);
        const [projectcode, projectcodeSet] = useState(ctx.DocumentHeader.ProjectCode);
        const [amount, amountSet] = useState(ctx.DocumentHeader.Amount);
        const [remarks, remarksSet] = useState(ctx.DocumentHeader.Remarks);
        const [dateCreate, dateCreateSet] = useState(ctx.DocumentHeader.DateCreated);
        const [recepient, recepientSet] = useState(ctx.DocumentHeader.Recepient);
        const [docID, setDocID] = useState(ctx.DocumentHeader.DocTypeID);
        const [docType, setDocType] = useState(ctx.DocumentHeader.DocType);


        const onSubjectSet =(event:React.ChangeEvent<HTMLTextAreaElement>) => {subjectSet (event.target.value);}
        const onOfficeSet =(event:React.ChangeEvent<HTMLInputElement>) => officeSet (event.target.value);
        const onProjectcodeSet =(event:React.ChangeEvent<HTMLInputElement>) => projectcodeSet (event.target.value);
        const onAmountSet =(event:React.ChangeEvent<HTMLInputElement>) => amountSet (parseInt(event.target.value));
        const onRemarksSet =(event:React.ChangeEvent<HTMLInputElement>) => remarksSet (event.target.value);
        const onDateCreateSet =(event:React.ChangeEvent<HTMLInputElement>) => dateCreateSet (event.target.value + ' ' + getIsoDateTime(ctx.DocumentHeader.DateCreated, false));
        const onTimeCreateSet =(event:React.ChangeEvent<HTMLInputElement>) => dateCreateSet (getIsoDateTime(ctx.DocumentHeader.DateCreated, true) + ' ' + event.target.value);

        const Recepienttsx =React.memo( () => {
            // const onRecepientSet = (event:React.ChangeEvent<HTMLInputElement>) => ctx.DocumentHeader.Recepient=event.target.value;
            const[value, setValue] = useState(ctx.DocumentHeader.Recepient);
            const[userID, setUserID] = useState(0);
            const onTextChanged =(id:number , data: string)=> {
                setValue(data);
                setUserID(id);
                ctx.DocumentHeader.Recepient=data;
            } 
            
            if (ctx.DocumentTrackID  === 0)
            return (
                    <div className="form-item r1">
                        <label>Reciever</label>    
                        <Dynalist 
                        apiGet={api.factory() + "&procedurename=spGetUsers"}
                        apiSet={api.factory() + "&procedurename=spSetUsers&id="}
                        apiDelete={api.factory() + "&procedurename=spDeleteUsers&id="}
                        value={value}
                        id={userID}
                        header={'Reciever'}
                        onTextChanged={onTextChanged}
                        />
                    </div>
                );
            else return <> </>
        });
        // logger.info(chkValue);

        if (!chkValue)
        return (
            <div className="formCardContainer">
                <div className="formCard">                

                    <div  className="form-item s1">   

                        <label htmlFor="">Subject</label>           
                        <textarea className="textarea" placeholder="Enter details here . . . " defaultValue={ctx.DocumentHeader.Subject } onChange={onSubjectSet} />
                    </div>
                    <Recepienttsx />
                    <div  className="form-item">                                                
                        <label htmlFor="">Office</label>                                       
                        <input type="text" className="form-input c1" placeholder="" defaultValue={ctx.DocumentHeader.Office} onChange={onOfficeSet}/>                        
                    </div>
                    <div  className="form-item ">                                               
                        <label htmlFor="">Project Code</label>                                        
                        <input type="text" className="form-input c2" placeholder="" defaultValue={ctx.DocumentHeader.ProjectCode} onChange={onProjectcodeSet} />                        
                    </div>
                    <div  className="form-item " >                                                
                        <label htmlFor="">Amount</label>                                       
                        <input type="text" className="form-input c3" placeholder="" defaultValue={ctx.DocumentHeader.Amount} onChange={onAmountSet} />
                    </div>       
                    <div  className="form-item k1">                                                
                        <label htmlFor="">Remarks</label>                                       
                        <input type="text" className="form-input" placeholder="" defaultValue={ctx.DocumentHeader.Remarks} onChange={onRemarksSet}/>
                    </div> 
                    <div  className="form-item">                                                
                        <label htmlFor="">Date Created</label>                                       
                        <input type="date" defaultValue={getIsoDateTime(ctx.DocumentHeader.DateCreated,true)} onChange={onDateCreateSet}></input>
                    </div>            
                    <div  className="form-item">
                        <label htmlFor="">Time</label>
                        <input type="time" defaultValue={getIsoDateTime(ctx.DocumentHeader.DateCreated,false)} onChange={onTimeCreateSet}></input>
                    </div>
                    <div  className="form-item">                                                
                        <label  htmlFor="">Auto Park</label>                                       
                        <input type="checkbox" className="form-checkbox" placeholder=""  onClick={onclikAutoParked} checked={autoParked}/>
                    </div>                     


                    <button className="cardbutton" onClick={()=> editDocRouter(true, subject, office,projectcode  , amount, remarks, recepient, dateCreate)}>
                        <span className="submit" >
                            Submit
                        </span>
                    </button>       
                    <button className="cardbutton" onClick={()=> editDocRouter(false, subject, office,projectcode  , amount, remarks, recepient, dateCreate)}>
                        <span className="submit">
                            Cancel
                        </span>
                    </button>                                                   
                </div>
            </div>
        )
        else return <></>
    });
    const getDocTypeCaption=() => {
        return ctx.DocumentHeader.DocTypeID === 0? "Track New Record" : ctx.DocumentHeader.DocType;
    }
    useEffect(() => {
        if (ctx.DocumentHeader.DocumentTrackID > 0 ) {
            dataClicked(ctx.DocumentHeader.DocTypeID);
        }
        
    }, []);
    
    return (
        <div className="createDoc">
            <div className="combocontainer">

                <DynalistAB
                    apiGet={api.factory() + "&procedurename=spGetDoctype"}
                    apiSet={api.factory() + "&procedurename=spSetDoctype&id="}
                    apiDelete={api.factory() + "&procedurename=spDeleteDoctype&id="}
                    value={getDocTypeCaption()}
                    id={ctx.DocumentHeader.DocTypeID}
                    picIndex={ctx.DocumentHeader.picIndex}
                    header={"DocType"}
                    openState={chkValue}
                    onTextChanged={onTextChanged}
                    dataClicked={dataClicked}
                    oncheckDrop={oncheckDrop}
                />           

            </div>
            
            <IfFormCardContainer />
        </div>        
    )
}
const getIsoDateTime =(sdate:string, isDate:boolean)=> {
    let dt:Date = new Date(sdate);
    var currentDate = moment(dt).format('YYYY-MM-DD');
    var currentTime = moment(dt).format('HH:mm');

    if (isDate) return  currentDate;
    else return currentTime

}
export default memo(CreateDoc);