import React from "react";
import { useState, useContext, useEffect, useRef }  from "react";
import NavigationContext from '../typescript/context_navigation';
import {ISPGetTimeline, ITimelineChild} from "../typescript/interface_SPGetTimeline";

interface ReceiverProps {
    name: string,
    description: string,
    documentTrackID: 0,
    OnCreate: false
}

export const CreateTimeline: React.FC<ReceiverProps> =({name, description}) => {
    const ctx = useContext(NavigationContext);
    const personName = ctx.TimeLineChild.personName;
    const mydescription = ctx.TimeLineChild.description;

    const [mName, setName] = useState(personName)
    const [mDescription, setDescription] = useState(mydescription)
    
    
    const editTimeLinerouter= (ok:boolean ) => { 
        if (ok) {
            ctx.TimeLineChild.personName = mName;
            ctx.TimeLineChild.description = mDescription;
        }
        ctx.editTimeLinerouter(false, ctx.TimeLineChild);
    };

    const onNameChange =(event:React.ChangeEvent<HTMLInputElement>) => {
        setName (event.target.value);
    }
    const onDescriptionChange =(event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription (event.target.value);
    }
    useEffect(() => {
       
    }, []);
    return (
        <div className="createTimeline">
            
            <div className="formCardContainer"> 
                <div className="formCard">
                        <div  className="form-item r1">                    
                            <label htmlFor="">Reciever</label>                                       
                            <input type="text" className="form-input" placeholder="" defaultValue= { ctx.TimeLineChild.personName}  onChange={onNameChange}/>                        
                        </div>
                        <div  className="form-item s1">             
                            <label htmlFor="">Subject</label>           
                            <textarea className="textarea" placeholder="Enter details here . . . " defaultValue ={ctx.TimeLineChild.description} onChange={onDescriptionChange}/>
                        </div>
                        <button className="cardbutton" onClick={()=>editTimeLinerouter(true)}>
                            <span className="submit">
                                Submit
                            </span>
                         </button>   
                         <button className="cardbutton" onClick={()=>editTimeLinerouter(false)}>
                            <span className="submit">
                                Cancel
                            </span>
                         </button>  
                </div>
            </div>
        </div>

    )

}

export default CreateTimeline;