import React from "react";
import delivery from "../svg/delivery.svg"
import idea from "../svg/idea.svg"
import process from "../svg/process.svg"
import document from "../svg/document.svg"
import run from "../svg/run.svg"
import transmittal from "../svg/transmittal.svg"
import project from "../svg/project.svg"

import { useState, useContext, useEffect, useRef }  from "react";
import NavigationContext from '../typescript/context_navigation';

export const CreateDoc: React.FC =() => {
    const [docType, docTypeSet] = useState(['Track New Record', 'ARO', 'Letter of Request', 'Incoming', 'Outgoing', 'Project Design','Sports Design', 'Training Design']);
    const [docImage, docImageSet] = useState([undefined,document, transmittal, project, run, idea,process, delivery ]);
    const ctx = useContext(NavigationContext);
    const initCheck =  ctx.DocumentHeader.DocumentTrackID > 0 ? false: true;
    const [chkValue, chkValueSet] = useState(initCheck);
    const [curIndex, curIndexSet] = useState(0);
    

    const oncheckDrop= () => { 
        chkValueSet(!chkValue);
    };        
    const dataClicked= (id:number) => { 
        curIndexSet(id);
        chkValueSet(false);
    };    
    const editDocRouter= (ok:boolean) => { 
        ctx.editDocRouter(false, ctx.DocumentHeader);
    };

    const IfFormCardContainer= () => { 
        
        if (!chkValue)
        return (
            <div className="formCardContainer">
                <div className="formCard">
                    <div  className="form-item s1">             
                        <label htmlFor="">Subject</label>           
                        <textarea className="textarea" placeholder="Enter details here . . . " defaultValue={ctx.DocumentHeader.Subject} />
                    </div>
                    {/* <div  className="form-item r1">                    
                        <label htmlFor="">Reciever</label>                                       
                        <input type="text" className="form-input" placeholder="" />                        
                    </div> */}
                    <div  className="form-item">                                                
                        <label htmlFor="">Office</label>                                       
                        <input type="text" className="form-input c1" placeholder="" defaultValue={ctx.DocumentHeader.Office}/>                        
                    </div>
                    <div  className="form-item ">                                               
                        <label htmlFor="">Project Code</label>                                        
                        <input type="text" className="form-input c2" placeholder="" defaultValue={ctx.DocumentHeader.ProjectCode} />                        
                    </div>
                    <div  className="form-item " >                                                
                        <label htmlFor="">Amount</label>                                       
                        <input type="text" className="form-input c3" placeholder="" defaultValue={ctx.DocumentHeader.Amount} />
                    </div>       
                    <div  className="form-item k1">                                                
                        <label htmlFor="">Remarks</label>                                       
                        <input type="text" className="form-input" placeholder="" defaultValue={ctx.DocumentHeader.Remarks}/>
                    </div> 
                    <button className="cardbutton" onClick={()=> editDocRouter(true)}>
                        <span className="submit" >
                            Submit
                        </span>
                    </button>       
                    <button className="cardbutton" onClick={()=> editDocRouter(false)}>
                        <span className="submit">
                            Cancel
                        </span>
                    </button>                                                   
                </div>
            </div>
        )
        else return <></>
    };       
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