import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { JsonEditor as Editor } from 'jsoneditor-react';
import ReactJson from 'react-json-view';
import { Typography,Divider } from 'antd';
import url from '../url'
import Axios from 'axios';
import verify from '../verify'
import { informativeText,colorInformative } from '../propStatus' 
const original = verify()
const { Title } = Typography;

function InsertProduct(props){

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
            serviceCode:4
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
            <Title level={4} style={{textAlign:'center'}}>Inserción de productos</Title>
            <Divider>Vista Detallada</Divider>
            <h5 style={{ color:colorInformative(state) }} className="mb-4">La peticion con estado { state }, { informativeText(state) }</h5>
            <Editor
            value={ JSON.parse(listJson.json) }                      
            theme="ace/theme/github"
            onChange={handleChange}
            />              

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
                    <ReactJson theme="shapeshifter:inverted" iconStyle="circle" displayDataTypes={false} src={JSON.parse(response)} />
            }
        </div>
    )
}

export default InsertProduct