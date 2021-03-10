import React from 'react';
import ReactJson from 'react-json-view'
import { Divider  } from 'antd';
import { informativeText,colorInformative } from './propStatus'

function EmptyHistoryState(props){
    const resp = props.resp
    
    return (
        resp.map((val,index) =>
        <React.Fragment key={index}>              
            <Divider style={{ color:colorInformative(val.status) }}>
                La petición con estado {val.status}({val.statusText}), {informativeText(val.status)}
            </Divider>                                                 
            {
                val.info.error || typeof(val.info) === "object"
                ? <ReactJson src={val.info.error ? val.info.error : val.info} />
                : <h5>{ val.info }</h5>
            }                                                                              
        </React.Fragment>                                    
        ) 
    )
}


export default EmptyHistoryState