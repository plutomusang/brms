import React, { useState } from 'react'

interface props {
    classname: string;
}
const Popup:React.FC<props>=(props)=> {
    const [pop, setPop] = useState(props.classname)
    const popupclick =()=> {
        setPop('pop-up open');
    }
    const popClose =()=> {
        setPop('pop-up');
    }
    return(
        <div>
{/* 
            <div className="popbutton" >
                <button onClick={popupclick}><span>Click Me</span></button>
            </div> */}

            <div className={pop}>
                <button className='close' onClick={popClose}>Close</button>
                <div className="content">
                    <div className="title"> <h1>Delete</h1></div>
                    <div className="message"> <h1> Do you want continue deleting this record?</h1></div>
                    <div >
                        <button className="popbut" onClick={popClose}>Yes</button>
                        <button className="popbut" onClick={popClose}>No</button>
                    </div>                    
                </div>
            </div>
        </div>

    )

}

export default Popup;