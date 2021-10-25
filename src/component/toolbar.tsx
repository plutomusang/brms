import React from "react";
import addNew from '../svg/addnew.svg';
import search from '../svg/search.svg';
export const ToolBar: React.FC =() => {
    return (

        <div className="toolbar">
            <div className="tbContainer">
                <div>
                    <button className="btntoolbarhidden">
                        
                        <span className="btntoolbar">
                            <img src={addNew} /> 
                            <div>Create  </div>
                        </span>
                    </button>
                </div>

                <div className="searchbar">
                    <div className="searchContent">
                        <div>BRMS#</div>
                        <div className="whiteBox"></div>
                        <img src={search} />
                    </div>                    
                </div>

            </div>

        </div>
    )
}

export default ToolBar;