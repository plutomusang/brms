import {createContext} from "react";


const timelineState=
[
    {
        "personName": "Ran Dome",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis scelerisque odio sit amet dictum. Etiam eget pharetra ligula. Vestibulum eget faucibus nisl. Sed in eros ornare, dapibus erat eu, commodo orci, Pellentesque.",
        "timeRecieved": "08-08 Tue 3PM",
        "timeReleased": "4PM",
        "NoHrs": "",
        "documentStatus": true,
        "isLastItem":false,
        "documentTrackId":1,
        "delay":0,
        "datePaused": 0,
        "paused": false,
        "running": false,
        "dateStart": 0
    },
    {
        "personName": "Lobortis Scelerisque",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus.",
        "timeRecieved": "08-08 Tue 3PM",
        "timeReleased": "4PM",
        "NoHrs": "",
        "documentStatus": true,
        "isLastItem":false,
        "documentTrackId":2,
        "delay":0,
        "datePaused": 0,
        "paused": false,
        "running": false,
        "dateStart": 0        
    },
    {
        "personName": "Neque Porro",
        "description": "Lorem ipsum dolor sit amet.",
        "timeRecieved": "08-08 Tue 3PM",
        "timeReleased": "Pending",
        "NoHrs": "",
        "documentStatus": false,
        "isLastItem":true,
        "documentTrackId":3,
        "delay":0,
        "datePaused": 0,
        "paused": false,
        "running": false,
        "dateStart": 0        
    }                        
]

export type TimerlineState = typeof timelineState;
const TimelineContext = createContext<TimerlineState>(timelineState);

export default TimelineContext;