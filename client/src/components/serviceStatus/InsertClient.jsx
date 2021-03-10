import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { JsonEditor as Editor } from 'jsoneditor-react'
import ReactJson from 'react-json-view';
import Axios from 'axios';
import { Typography,Divider } from 'antd';
import verify from '../verify'
import ace from 'brace';
import Ajv from 'ajv';
import url from '../url'
import { informativeText,colorInformative } from '../propStatus' 
const ajv = new Ajv({ allErrors: true, verbose: true });
const original = verify()
const { Title } = Typography;

function InsertClient(props){    
    const listJson = props.list  

    const [json,setJson] = useState(listJson.json)    
    const [response,setResponse] = useState(listJson.response)
    const [state,setState] = useState(parseInt(listJson.state))

    const submit=(data)=>{
        console.log(data)
        Axios.put(url.general+"/set/petition",{   
            client: original,                
            codeJson: data.code,
            json: data.json,
            serviceCode:1
        })
        .then(response =>{                        
            return response
        }) 
        .then(data =>{    
            setResponse(JSON.stringify(data.data))
            setState(data.status)    
            props.changePetition()  
        })
        .catch(error => {
            console.log(error)
        })  
    }

    const handleChange=(data)=> {        
        try{
            setJson(JSON.parse(data))
        }catch(e){
            setJson(0)
        }             
    }
    return (
        <div>     
            <Title level={4} style={{textAlign:'center'}}>Inserción y actualización de clientes</Title>       
            <Divider>Vista Detallada</Divider>
            <h5 style={{ color:colorInformative(state) }} className="mb-4">La peticion con estado { state }, { informativeText(state) }</h5>

            { console.log(listJson.json,typeof(listJson.json)) }              
            {
                json !== 0
                ?   <Editor
                        value={ json }    
                        ace={ace}
                        ajv={ajv}
                        theme="ace/theme/github"
                        onChange={handleChange}
                    />
                : <h5>Problemas con el JSON</h5>
            }
            

            <Button
                className="my-3"
                variant="info"   
                value={ listJson.code }                        
                onClick={() => 
                submit({ code: listJson.code,json: json })}>
                Send Data Client
            </Button>            
            {
                response !== '""' &&                
                    <ReactJson theme="shapeshifter:inverted" iconStyle="circle" displayDataTypes={false} style={{ boxShadow:'0 -2px 10px #7c87a0 inset',marginBottom:'5%',padding:'8px' }} src={JSON.parse(response)} />
            }
        </div>
    )    
}

export default InsertClient


/*<textarea
rows="8"
type="text"
name="json" 
className="form-control mb-3"    
value={ listJson.json }             
onChange={(e)=> {
    setJson(e.target.value)                                                          
}}>                          
</textarea> */