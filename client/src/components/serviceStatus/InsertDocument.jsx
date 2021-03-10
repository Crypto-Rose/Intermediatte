import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { JsonEditor as Editor } from 'jsoneditor-react';
import ReactJson from 'react-json-view';
import { Typography,Divider } from 'antd';
import Axios from 'axios';
import ace from 'brace';
import Ajv from 'ajv';
import url from '../url'
import verify from '../verify'
import { informativeText,colorInformative } from '../propStatus' 
const ajv = new Ajv({ allErrors: true, verbose: true });
const original = verify()
const { Title } = Typography;

function InsertDocument(props){
    const listJson = props.list    
    console.log(listJson)
    const [json,setJson] = useState(listJson.json)    
    const [response,setResponse] = useState(listJson.response)
    const [state,setState] = useState(listJson.state)

    const submit=(data)=>{
        console.log(data)
        Axios.put(url.general+"/set/petition",{  
            client: original,               
            codeJson: data.code,
            json: data.json,
            serviceCode: 2
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
        const jsonString = JSON.stringify(data)        
        setJson(jsonString)           
    }

    return(
        <div>
            <Title level={4} style={{textAlign:'center'}}>Inserción de documentos</Title>
            <Divider>Vista Detallada</Divider>
            <h5 style={{ color:colorInformative(state) }} className="mb-4">La peticion con estado { state }, { informativeText(state) }</h5> 
            
            <Editor
            value={ JSON.parse(listJson.json) }           
            ace={ace}
            ajv={ajv}
            theme="ace/theme/github"
            onChange={handleChange}
            />   

            <Button
                className="my-3"
                variant="info"   
                value={ listJson.code }                        
                onClick={() => 
                submit({ code: listJson.code,json: json })}>
                Send Data Document
            </Button>  
            
            {
                response !== '""' &&
                    <ReactJson theme="shapeshifter:inverted" iconStyle="circle" indentWidth={ 3 } displayDataTypes={false} src={JSON.parse(response)} />
            }
        </div>
    )
}

export default InsertDocument
