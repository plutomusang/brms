import React from "react";
import delivery from "../svg/delivery.svg"
import idea from "../svg/idea.svg"
import process from "../svg/process.svg"
import document from "../svg/document.svg"
import run from "../svg/run.svg"
import transmittal from "../svg/transmittal.svg"
import project from "../svg/project.svg"

import { useState, useContext, useEffect, useRef, useCallback }  from "react";
import NavigationContext from '../typescript/context_navigation';
import {DEF_ICONS, DEF_DOCTYPE} from '../typescript/class_icons';
import routerContext from "../typescript/context_router";
export const CreateDoc: React.FC =() => {
    const [docType, docTypeSet] = useState(DEF_DOCTYPE);
    const [docImage, docImageSet] = useState(DEF_ICONS);
    const ctx = useContext(NavigationContext);
    const routers = useContext(routerContext);
    const initCheck =  ctx.DocumentHeader.DocumentTrackID > 0 ? false: true;
    const [chkValue, chkValueSet] = useState(initCheck);
    const [curIndex, curIndexSet] = useState(0);

    const [typeId, setTypeId] = useState(ctx.DocumentHeader.DocTypeID);

    const oncheckDrop= () => { 
        chkValueSet(!chkValue);
    };        
    const dataClicked= (id:number) => { 
        setTypeId(id);
        curIndexSet(id);
        chkValueSet(false);
    };    
    const editDocRouter= (ok:boolean, subject:string ,office:string ,projectcode:string , amount:number, remarks:string, recepient:string ) => { 
        if (ok) {
            ctx.DocumentHeader.Subject = subject;
            ctx.DocumentHeader.Office = office;
            ctx.DocumentHeader.ProjectCode = projectcode;
            ctx.DocumentHeader.Amount = amount;
            ctx.DocumentHeader.Remarks = remarks;
            ctx.DocumentHeader.DocTypeID = typeId;

        }
        routers.editDocRouter(false, ctx.DocumentHeader);
    };

    const IfFormCardContainer= React.memo (() => { 
        const [subject, subjectSet] = useState(ctx.DocumentHeader.Subject);
        const [office, officeSet] = useState(ctx.DocumentHeader.Office);
        const [projectcode, projectcodeSet] = useState(ctx.DocumentHeader.ProjectCode);
        const [amount, amountSet] = useState(ctx.DocumentHeader.Amount);
        const [remarks, remarksSet] = useState(ctx.DocumentHeader.Remarks);
        const [recepient, recepientSet] = useState(ctx.DocumentHeader.Recepient);
    
        const onSubjectSet =(event:React.ChangeEvent<HTMLTextAreaElement>) => {subjectSet (event.target.value);}
        const onOfficeSet =(event:React.ChangeEvent<HTMLInputElement>) => officeSet (event.target.value);
        const onProjectcodeSet =(event:React.ChangeEvent<HTMLInputElement>) => projectcodeSet (event.target.value);
        const onAmountSet =(event:React.ChangeEvent<HTMLInputElement>) => amountSet (parseInt(event.target.value));
        const onRemarksSet =(event:React.ChangeEvent<HTMLInputElement>) => remarksSet (event.target.value);
        
        const Recepienttsx =React.memo( () => {
            const onRecepientSet = (event:React.ChangeEvent<HTMLInputElement>) => ctx.DocumentHeader.Recepient=event.target.value;
            if (ctx.DocumentHeader.DocumentTrackID  === 0)
            return (
                    <div  className="form-item r1">                    
                        <label htmlFor="">Reciever</label>                                       
                        <input type="text" className="form-input" placeholder="" defaultValue={ctx.DocumentHeader.Recepient}  onChange={onRecepientSet} />                        
                    </div> 
                );
            else return <> </>
        });
        if (!chkValue)
        return (
            <div className="formCardContainer">
                <div className="formCard">
                    <div  className="form-item s1">             
                        <label htmlFor="">Subject</label>           
                        <textarea className="textarea" placeholder="Enter details here . . . " defaultValue={ctx.DocumentHeader.Subject } onChange={onSubjectSet} />
                    </div>
                    <Recepienttsx />
                    {/* <div  className="form-item r1">                    
                        <label htmlFor="">Reciever</label>                                       
                        <input type="text" className="form-input" placeholder="" />                        
                    </div> */}

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
                    <button className="cardbutton" onClick={()=> editDocRouter(true, subject, office,projectcode  , amount, remarks, recepient)}>
                        <span className="submit" >
                            Submit
                        </span>
                    </button>       
                    <button className="cardbutton" onClick={()=> editDocRouter(false, subject, office,projectcode  , amount, remarks, recepient)}>
                        <span className="submit">
                            Cancel
                        </span>
                    </button>                                                   
                </div>
            </div>
        )
        else return <></>
    });       
    useEffect(() => {
        if (ctx.DocumentHeader.DocumentTrackID > 0 ) {
            dataClicked(ctx.DocumentHeader.DocTypeID);
        }
        
    }, []);
    return (
        <div className="createDoc">
            <div className="combocontainer">
                <div className="selector">
                    <input type="checkbox" className="list-toggle" id="list-toggle" checked={chkValue} onChange ={() => oncheckDrop()} />
                    <label htmlFor="list-toggle" className="nav-toggle-label"> 
                        <div id="selectfield">
                            <img src={docImage[curIndex]} alt="" />
                            <h1>{docType[curIndex]}</h1>
                            <div >
                                
                                    <svg className="svgIcon" viewBox="0 0 529.16 529.16">
                                        <circle  className="c1" cx="264.58" cy="264.58" r="221.59"/>
                                        <circle  className="c2"  cx="264.58" cy="264.58" r="184.42"/>
                                        <rect  className="c1" transform="matrix(0.707107 0.707107 -0.707107 0.707107 264.58 162.259)" width="144.69" height="144.69"/>
                                        <rect  className="c2" transform="matrix(0.707107 0.707107 -0.707107 0.707107 264.58 119.269)" width="144.69" height="144.69"/>
                                    </svg>
                                

                            </div>
                        </div>
                    </label>
                    <ul id="list">
                        <li className="options" onClick ={() => dataClicked(1)}>
                            <img src={document} alt="" />
                            <p>ARO</p>
                        </li>
                        <li className="options"  onClick ={() => dataClicked(2)}>
                            <img src={transmittal} alt="" />
                            <p>Letter of Request</p>
                        </li>     
                        <li className="options"  onClick ={() => dataClicked(3)}>
                            <img src={project} alt="" />
                            <p>Incoming</p>
                        </li>                        
                        <li className="options"  onClick ={() => dataClicked(4)}>
                        <img src={run} alt="" />
                            <p>Outgoing</p>
                        </li>                        
                        <li className="options"  onClick ={() => dataClicked(5)}>
                            <img src={idea} alt="" />
                            <p>Project Design</p>
                        </li>
                        <li className="options"  onClick ={() => dataClicked(6)}>
                            <img src={process} alt="" />
                            <p>Sports Design</p>
                        </li>   
                        <li className="options"  onClick ={() => dataClicked(7)}>
                            <img src={delivery} alt="" />
                            <p>Training Design</p>
                        </li>                                             
                    </ul>
                </div>                
            </div>
            <IfFormCardContainer />
        </div>        
    )
}

export default CreateDoc;