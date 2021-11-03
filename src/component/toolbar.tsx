import React from "react";
import addNew from '../svg/addnew.svg';
import InputBox from "./inputbox";
import { useState, useContext, useEffect, useRef }  from "react";
import NavigationContext from './navigation';

export const ToolBar: React.FC =() => {
    const navigationState = useContext(NavigationContext);

    function router () {
        navigationState.updateStatus(true);
    }
    return (

        <div className="toolbar">
            <div className="tbContainer">
                <div>
                    <button className="btntoolbarhidden" onClick ={() => router()}>
                        
                        <span className="btntoolbar">
                            <img src={addNew} /> 
                            <div>Create </div>
                        </span>
                    </button>
                </div>

                <div className="searchbar">
                    <InputBox />
                    {/* <div className="searchContent">
                        <div>BRMS#</div>
                        <div className="whiteBox"></div>
                        <img src={search} />
                    </div>                     */}
                </div>

            </div>

        </div>
    )
}

export default ToolBar;