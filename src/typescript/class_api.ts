import {ISPGetTimeline, DEF_TIMELINE, ITimelineChild, IDocument} from "./interface_SPGetTimeline";
export interface Iapi {
    url: string,
    key: string
}
export const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
};
export const api: Iapi = {
    url: "https://localhost:44331/api/ProcessRequest",
    key: "Mercury3356Lorreignmay29"
}
export default class API{ 
    private  factory =():string => api.url + '?key=' + api.key ;

    constructor() {
    }

    public URLGetTimeline =(id:number):string => { 
        let param = "&procedurename=spGetTimeline&DocumentTrackID=" + id;
        return this.factory() + param;
    }
    public URLSetTimeline =(o:ITimelineChild): string => {
        /*
        https://localhost:44331/api/ProcessRequest?key=Mercury3356Lorreignmay29
        &procedurename=spSetTimeline
        &TimelineID=11
        &documentTrackId=4
        &personName=Quita Jin kik
        &description=Lorem kiki kokok jaojom kiliki
        &documentStatus=0
        &isLastItem=1
        &delay=0
        &datePaused=0
        &paused=0
        &running=0
        &dateStart=0
        &IndexNumber=1
        */
       let s: string;
       s = '&procedurename=spSetTimeline';
       s +=  '&TimelineID=' + o.TimelineID;
       s +=  '&documentTrackId=' + o.documentTrackId;
       s +=  '&personName=' + o.personName;
       s +=  '&description=' + o.description;
       s +=  '&documentStatus=' + o.documentStatus;
       s +=  '&isLastItem=' + o.isLastItem;
       s +=  '&delay=' + o.delay;
       s +=  '&datePaused=' + o.datePaused;
       s +=  '&paused=' + o.paused;
       s +=  '&running=' + o.running;
       s +=  '&dateStart=' + o.dateStart;
       s +=  '&IndexNumber=' + o.IndexNumber;
       s +=  '&runningDelay=' + o.runningDelay;
       s +=  '&totalTime=' + o.totalTime;
       s +=  '&consumedTime=' + o.consumedTime;
       s +=  '&timeReleased=' + o.timeReleased;



        return this.factory() + s;
    }

    private componentDidMount= () =>{
        // POST request using fetch with error handling
        // alert("calling post");
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title: 'React POST Request Example' })
        // };
        // fetch('https://localhost:44331/api/ExecutePost', requestOptions)
        //     .then(async response => {
        //         const isJson = response.headers.get('content-type')?.includes('application/json');
        //         const data = isJson && await response.json();
    
        //         // check for error response
        //         if (!response.ok) {
        //             // get error message from body or default to response status
        //             const error = (data && data.message) || response.status;
        //             return Promise.reject(error);
        //         }
    
        //         // this.setState({ postId: data.id })
        //     })
        //     .catch(error => {
        //         // this.setState({ errorMessage: error.toString() });
        //         alert(error);
        //         console.error('There was an error!', error);
        //     });
        }
    
    
}
