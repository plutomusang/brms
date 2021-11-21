import React, { useState } from 'react'

const Popup:React.FC=()=> {
    const [pop, setPop] = useState('pop-up')
    const popupclick =()=> {
        setPop('pop-up open');
    }
    const popClose =()=> {
        setPop('pop-up');
    }
    return(
        <div>

            <div className="popbutton" >
                <button onClick={popupclick}><span>Click Me</span></button>
            </div>

            <div className={pop}>
                <div className="content">
                    <div className="container">
                    <div className="dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    
                    <span className="close" onClick={popClose}>close</span>
                    
                    <div className="title">
                        <h1>subscribes</h1>
                    </div>
                    
                    {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/cXsiNryL.png" alt="Car"/> */}
                    
                    <div className="subscribe">
                        <h1>Subscribe to get the latest <span>news &amp; updates</span>.</h1>
                        <form action="">
                            <input type="email" placeholder="Your email address"/>
                            <input type="submit" value="Subscribe"/>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Popup;