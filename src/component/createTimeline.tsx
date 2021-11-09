import React from "react";
import { useState, useContext, useEffect, useRef }  from "react";

export const CreateTimeline: React.FC =() => {
    return (
        <div className="createTimeline">
            <div className="formCardContainer"> 
                <div className="formCard">
                        <div  className="form-item r1">                    
                            <label htmlFor="">Reciever</label>                                       
                            <input type="text" className="form-input" placeholder="" />                        
                        </div>
                        <div  className="form-item s1">             
                            <label htmlFor="">Subject</label>           
                            <textarea className="textarea" placeholder="Enter details here . . . " />
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