import React from "react";
import { TimelineAB } from "./timeline";
import TimelineHeader from "./timelineHeader";

export const ContentAB: React.FC =() => {
    return (
        <div className="content">
            <div className="wrapper">
                <aside> aside </aside>
                <div className="card">
                    
                    <div>
                    <TimelineHeader />    
                    </div>
                    <div>
                    <TimelineAB /> 
                    </div>
                    
                </div>

            </div>

        </div>

    )
}

export default ContentAB