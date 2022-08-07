import React, { useState, useEffect, useRef, memo } from 'react';
import {IDocView} from '../typescript/interface_DocView';
import DEF_OrderByObj from "../json/def_OrderByObj.json"
import logger from '../config/logger';
import {DEF_ICONS, DEF_DOCTYPE} from '../typescript/class_icons';


export interface iOrderByObj {
    fieldID: number,
    sortID: number
}

export interface iTree {
    fieldNames: string[],
    fieldIds: string[],
    sortID: number[],
    dataSet: IDocView[],
    orderByList: iOrderByObj[],
    pannelCaption: string,
    RDropID: number,
    returnCall: (id:number, sortCriteria: string, searchCriteria: string)=> | void,
    onClick: (id:number )=> | void ,
}
export const DefOrderByList = DEF_OrderByObj;



const AccordionDB:React.FC<iTree>=(props) => {
    const [rdropID, setRdropID] = useState('activator' + props.RDropID);
    const [caption, setCaption] = useState(props.pannelCaption);
    const [fldNames,setFldNames] = useState(props.fieldNames);
    const [criteria, setCriteria] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [docImage, docImageSet] = useState(DEF_ICONS);

    const { height, width } = useWindowDimensions();
    const [ wrapH, setwraph] = useState<any>('');
    const wrapDivRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLUListElement>(null);
    const root = document.documentElement;
    const[ctr, setCtr] = useState(0);
    const[isReady, setReady]  = useState(true);
    const onSearchSet =(event:React.ChangeEvent<HTMLInputElement>) => { 

        setCriteria(event.target.value);
        if(isReady) {
            setReady(false);
            const delayDebounceFn = setTimeout(() => {
                // Send Axios request here
                
                props.returnCall(props.RDropID, sortCriteria, event.target.value);

                setReady(true);
              }, 1000);
            
        }
          
        // logger.info(event.target.value, 'accordionDB.tsx')
    };

    // const [windowDimensions, setWindowDimensions] = useState(useWindowDimensions());
    const [ulDimensions, setULDimensions] = useState(useULDimension(wrapRef));
    const [pannelCheck, setPannelCheck] = useState(true);
    // const [withMargin, setMargin] = useState('')
    const onclik =()=> {
        setPannelCheck(!pannelCheck);
        setCtr(ctr + 1);
        
    };
    const onclikRefresh=()=> {
        setCriteria('');
        props.returnCall(props.RDropID, sortCriteria , '');
    }
    const onclikColumnSelector=()=> {
        setCriteria('');
        props.returnCall(props.RDropID, sortCriteria , '');
    } 
    const onClick_Sort =(mfieldID: number)=> {
        const arrSrt = [1,2,1];
        // logger.info(mfieldID, 'accordiondb');
        // logger.info(props.sortID, 'accordiondb');
        props.sortID[mfieldID] = arrSrt[props.sortID[mfieldID]];
        let orderBy: iOrderByObj = {
            fieldID: mfieldID,
            sortID: props.sortID[mfieldID]
        }

        
        props.orderByList.map((v, index) => {
            if (v.fieldID === mfieldID) { delete props.orderByList[index] }
        });

        // logger.info(orderBy, 'accordiondb');
        props.orderByList.push(orderBy);
        // logger.info(props.orderByList, 'accordiondb');
        let srtName = ['', 'asc','desc']
        let comma = '';        
        let sql = '';    

        props.orderByList.map((v, index) => {
            sql =  props.fieldIds[props.orderByList[index].fieldID] + ' ' + srtName[props.orderByList[index].sortID] + comma + sql ;            
            comma = ", ";
            
        });

        // logger.info(props.fieldIds, 'accordiondb');
        // logger.info(srtName, 'accordiondb');
        // logger.info(props.orderByList, 'accordiondb');
        // logger.info(sql, 'accordiondb');
        setSortCriteria(sql);
        props.returnCall(props.RDropID, sql, criteria);
    };
    const withMargin=()=> {
        let h1: any = wrapRef.current?.clientHeight;        
        let h2: any = wrapDivRef.current?.clientHeight;     

        if (parseInt(h1) < parseInt(h2)  ) return 'addMargin'
        else return ''
        
    }

    useEffect(()=>{
        // logger.info('useEffect ' + caption + ' ' + props.dataSet.length + ' ' + wrapRef.current?.clientHeight);
        let x1 = Math.floor(window.innerHeight * .6);
        let h1: any = wrapRef.current?.clientHeight;        
        let x2 = parseInt(h1);
        let x3 = x2 > x1 ?  '0' : x1 + 'px' ;

        // logger.info ({'x3':x3, 'x2': x2 , 'x1': x1 })
        // root.style.setProperty('--wh', x3 + '');

        setCtr(ctr + 1);
    },[props.dataSet])
    function getHeight() {
        let h1: any = wrapRef.current?.clientHeight;     
        let wh = Math.floor(window.innerHeight - (225 + 225 - 77 ));
        let y = parseInt(h1);
        const o = {
            'y':y , 'Nan': Number.isNaN(y), 'WH' : wh
        }
        // logger.info (o);
        if (o.Nan) {
            return "0"
        } else {
            if (o.y > wh) o.y = wh
            return ((o.y<=0) ? 100: o.y + 40) + 'px';
            // return (o.y + 30) + 'px';
        }
        
    }
    const activatorChecked = {
        height: getHeight(),
    };
    const activatorUnChecked = {
        height: 0,
    };
    // logger.info('accordion Redraw', 'Accordion');
    return (            
            <div className="rdrop">
                <input type="checkbox" className="activator"  id={rdropID} onClick={onclik} checked={pannelCheck}/>
                <label htmlFor={rdropID} className="activator-label">
                    
                    <div className="updown">
                    <svg className="dynasvgIcon" viewBox="0 0 529.16 529.16">
                        <circle  className="dc1" cx="264.58" cy="264.58" r="221.59"/>
                        <circle  className="dc2"  cx="264.58" cy="264.58" r="184.42"/>
                        <rect  className="dc1" transform="matrix(0.707107 0.707107 -0.707107 0.707107 264.58 162.259)" width="144.69" height="144.69"/>
                        <rect  className="dc2" transform="matrix(0.707107 0.707107 -0.707107 0.707107 264.58 119.269)" width="144.69" height="144.69"/>
                    </svg>
                    </div>
                    <div className="caption">{caption}</div>

                </label>
                <div className="inputSearchIcon">
                                <input type="text" value={criteria} onChange={onSearchSet}/>
                                <div className="svgsrch">
                                    <svg version="1.1"  x="0px" y="0px" viewBox="0 0 183.792 183.792" >
                                        <path d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22
                                        c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583
                                        c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0
                                        C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806
                                        c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25
                                        c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z"/>
                                    </svg>
                                </div>
                                <div className="menuCls" onClick={onclikRefresh}>
                                    <svg className='svg-revert' width="6.5mm" height="6.5mm" version="1.1" viewBox="0 0 2540 2540">
                                        <circle className="svg-revert-tail" transform="matrix(0.721285 0.193268 -0.193268 0.721285 1275.86 1267.23)" r="1128.89"/>
                                        <circle className="svg-revert-bg" transform="matrix(0.463308 0.124143 -0.124143 0.463308 1275.86 1267.23)" r="1128.89"/>
                                        <polygon className="svg-revert-arrow" points="776.83,222.32 866.47,67.05 1589.84,484.68 1172.2,1208.05 1016.93,1118.41 1344.92,550.31 "/>
                                        <rect className="svg-revert-bg" transform="matrix(0.967485 0.558578 -0.505541 0.875623 1626.22 421.639)" width="213.69" height="1805.35"/>
                                        <polygon className="svg-revert-arrow" points="1773.97,2311.72 1684.43,2466.81 961.95,2049.68 1379.08,1327.19 1534.16,1416.73 1206.57,1984.13 "/>
                                    </svg>
                                </div>
                                {/* <div className="menuCls" onClick={onclikColumnSelector}>
                                    <svg className='svg-menu' width="6.5mm" height="6.5mm" version="1.1" viewBox="0 0 2540 2540">
                                        <rect className="svg-menu-bg" x="273.87" y="381.94" width="1992.23" height="369.37" rx="143.22" ry="184.69"/>
                                        <rect className="svg-menu-bg" x="273.87" y="1085.31" width="1992.23" height="369.37" rx="143.22" ry="184.69"/>
                                        <rect className="svg-menu-bg" x="273.87" y="1788.68" width="1992.23" height="369.37" rx="143.22" ry="184.69"/>                   
                                    </svg>
                                </div>                                 */}
                </div>                                    
                <div  className="dabwrapper" style={ (pannelCheck?activatorChecked : activatorUnChecked )}>
                    <div className="grower">
                        <div   className="tableContainer">


                            <div className="tableHeader">
                                { fldNames.map((values, index) => {
                                        return (
                                            <div className="headerfield" >
                                                <input type="checkbox" className="fldChkbox" id= {"fldActivator" + props.RDropID + '-' + index} />
                                                <label htmlFor={"fldActivator" + props.RDropID + '-' + index} className="fldlabel">
                                                    <div className="fldname">
                                                        {values}
                                                    </div>
                                                    <div className="clsIcon" onClick={() => onClick_Sort(index)}>
                                                        <svg  className="fldsvgIcon" width="3mm" height="3mm" viewBox="0 0 2540 2540">
                                                            <polygon  points="2096.58,639.57 2321.47,864.46 1273.77,1912.16 226.07,864.46 450.96,639.57 1273.77,1462.37 "/>
                                                        </svg>                                               
                                                    </div>
                                                </label>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            
                            <div ref={wrapDivRef} className={"tableWrapper " + withMargin()}>
                                <ul ref={wrapRef} className={"myul"}>
                                    { /*props.dataSet.filter((o) => o.DocType === 'BRMS Development').map((values, index) => {*/
                                        props.dataSet.map((values, index) => {
                                        return (
                                            <li key={index} onClick={() => props.onClick(values.DocumentTrackID)}>
                                            <div className="fldContainer" >
                                                <div className="imgContainer">
                                                    {/* <svg  className="imgclass" width="5.4mm" height="5.4mm" viewBox="0 0 2540 2540">
                                                        <circle cx="1270" cy="1270" r="1266.31"/>
                                                    </svg>      
                                                    */}
                                                    <img src={docImage[values.picIndex]} alt=""/>
                                                </div>
                                                <div className="fldvalue">
                                                    {values.DocType}
                                                </div>
                                            </div>
                                            <div className="fldvalue">
                                                    {values.Office}
                                            </div>
                                            <div className="fldvalue">
                                                    {values.Subject}
                                            </div>
                                            <div className="fldvalue">
                                                    {values.personName}                                                    
                                            </div>                                            
                                            <div className="fldvalue">
                                                    {values.NoDays}                                                    
                                            </div>                     
                                        </li>   

                                        )
                                    })  

                                    }

                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

    );
}

function getWindowDimensions() {
    const { 
        innerWidth: width, 
        innerHeight: height 
    } = window;
    return {
      width,
      height
    };
  }

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        // logger.info(getWindowDimensions());
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}


function getULDimensions(ul:React.RefObject<HTMLUListElement>) {
    const width = ul.current?.clientWidth;
    const height = ul.current?.clientHeight;
    return {
      width,
      height
    };
  }

function useULDimension(ul:React.RefObject<HTMLUListElement>) {
    const [ulDimensions, setULDimensions] = useState(getULDimensions(ul));
    useEffect(() => {
        function handleResize() {
            setULDimensions(getULDimensions(ul));
          }
        ul.current?.addEventListener('resize', handleResize);
        return () => ul.current?.removeEventListener('resize', handleResize);
    },[]);
}
export default memo(AccordionDB);
