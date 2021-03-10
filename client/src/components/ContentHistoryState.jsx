import React from 'react';
import ReactJson from 'react-json-view'
import { Divider } from 'antd';

function ContentHistoryState(props){    
    const response = props.response

    return(
        <React.Fragment>
            <Divider orientation="center">Respuesta obtenida</Divider>                                                                                          
            {
                typeof(response) === 'object'                  
                ?    <ReactJson iconStyle="circle" displayDataTypes={false} style={{ boxShadow:'0 -2px 10px #7c87a0 inset',marginTop:'5%',padding:'8px' }} src={response} />                    
                : <h5>{ response }</h5>
            }                                                                                                                                                                                      
        </React.Fragment>  
    )
}
export default ContentHistoryState


// response !== '""'