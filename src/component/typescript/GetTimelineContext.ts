import { createContext } from "react";

export const spGetTimelineState =
{
    "Header": "spGetTimeline",
    "Set1": [
        {
            "DocumentTrackID": 1,
            "DocTypeID": 1,
            "DocType": "ARO",
            "Subject": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat sodales metus et convallis. Donec volutpat interdum ipsum faucibus tincidunt. Pellentesque sagittis ullamcorper libero in pharetra. Etiam dictum lacus in est vulputate efficitur. Etiam pellentesque risus fringilla condimentum convallis. Duis eu facilisis felis. Phasellus in ligula urna. Duis non dui eget nulla aliquam auctor.",
            "Office": "CBO",
            "ProjectCode": "1022-1",
            "Amount": 2000.0000,
            "Remarks": "MOOE",
            "DateCreated": "11/07/2021 12:00:00 AM",
            "DateCompleted": "",
            "isActed": false,
            "ControlNumber": "AR-1"
        }
    ],
    "Set2": [
        {
            "TimelineID": 2,
            "documentTrackId": 1,
            "personName": "Rand Dome",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis scelerisque odio sit amet dictum. Etiam eget pharetra ligula. Vestibulum eget faucibus nisl. Sed in eros ornare, dapibus erat eu, commodo orci, Pellentesque.",
            "timeRecieved": "11/07/2021 9:40:15 AM",
            "timeReleased": "11/07/2021 9:40:15 AM",
            "NoHrs": 0,
            "documentStatus": true,
            "isLastItem": false,
            "delay": 0,
            "datePaused": 0,
            "paused": false,
            "running": false
        }
    ]
}

export type  GetTimelineState= typeof spGetTimelineState;
const GetTimelineContext = createContext<typeof spGetTimelineState>(spGetTimelineState);

export default GetTimelineContext;