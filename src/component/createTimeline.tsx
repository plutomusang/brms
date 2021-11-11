import React from "react";
import { useState, useContext, useEffect, useRef }  from "react";
import NavigationContext from '../typescript/context_navigation';
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
    useEffect(() => {
       
    }, []);
    return (
        <div className="createTimeline">
            
            <div className="formCardContainer"> 
                <div className="formCard">
                        <div  className="form-item r1">                    
                            <label htmlFor="">Reciever</label>                                       
                            <input type="text" className="form-input" placeholder="" defaultValue= { ctx.TimeLineChild.personName}/>                        
                        </div>
                        <div  className="form-item s1">             
                            <label htmlFor="">Subject</label>           
                            <textarea className="textarea" placeholder="Enter details here . . . " defaultValue ={ctx.TimeLineChild.description} />
                        </div>
                        <button className="cardbutton">
                            <span className="submit">
                                Submit
                            </span>
                         
                         </button>   
                </div>
            </div>
        </div>

    )

}

export default CreateTimeline;