import React, { useState } from 'react';
import Axios from 'axios';
import { Tabs,Form,Input,Row,Col,Button } from 'antd';
import ReactJson from 'react-json-view'
import{ BiCalendar } from "react-icons/bi";
import url from '../url'
import verify from '../verify'
import ContentHistoryState from '../ContentHistoryState'
import EmptyHistoryState from '../EmptyHistoryState'
import ResultFile from '../ResultFile'

const original = verify()
const { TextArea } = Input;
const { TabPane } = Tabs;

function Product(props){

    const [form] = Form.useForm();
    const [resp, setRespList] = useState([])  
    const [json, setJson] = useState([]) 
    const [jsonPreview, setJsonPreview] = useState([])
    const [state, setState] = useState('') 
    const [response] = useState('') 
    const [year,setYear] = useState('') 
    const [preview, setPreview] = useState(false)
    const serviceCode = 4

    const as=(rs) => {
        setRespList([
            ...resp,                              
            {
                status: rs.status,
                statusText: rs.statusText,
                info: rs.data,                    
            }
        ])
    }

    const submit = (data) => {         
        const jsonSend = data.json    
        jsonSend.replace('\n', "")
        const jsonReplace = JSON.stringify(JSON.parse(jsonSend));        
        const year = data.year
        
        setState('') 
        if(resp.length !== 0 )   
            resp.shift() 
        
        Axios.post(url.general+"/set/petitionYear",{
            json: jsonReplace,
            serviceCode: serviceCode,    
            client: original,
            year:year        
        })
        .then(response =>response) 
        .then(data =>{    
            console.log(data)           
            as(data)         
        })
        .catch(error => { 
            
            if(error.response){
                as(error.response) 
            }                
            console.log(error.response)                                                                                                                                             
        })          
    }

    const verifyJsonBeforeConvert = () =>{
        try{
            if(JSON.parse(json)){
                setJsonPreview(json)
                setPreview(true)
            }                            
        }catch(e){
            console.log(e)
        }
    }

    return(                    
        <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Json" key="1">
                <Row>
                    <Col span={12}>
                        <Form
                            form={form}
                            layout="vertical"               
                        >             
                            <Form.Item label="Ingrese el año de inserci&oacute;n" required tooltip="This is a required field">
                                <Input                    
                                    allowClear
                                    type='number'
                                    min='2000'
                                    max='2030'
                                    placeholder="Year"
                                    prefix={<BiCalendar/>}                     
                                    style={{
                                        width:'50%'
                                    }}
                                    value={ year }
                                    onChange={                                
                                        (e)=>{                                                                   
                                            setYear(e.target.value)
                                        }
                                    }
                                />   
                            </Form.Item>  
                            <Form.Item label="Ingrese el Json con informacion del documento" required tooltip="This is a required field">
                                <TextArea 
                                    allowClear                   
                                    rows="8"
                                    type="text"
                                    name="json"                           
                                    value={ json }  
                                    onChange={(e)=> {
                                        setJson(e.target.value)                                                          
                                    }}                        
                                />    
                            </Form.Item>   
                            <Form.Item>
                                <Row>
                                    <Col span={6}>
                                        <Button
                                            variant="dark"                           
                                            onClick={() => 
                                            submit({ json: json,year:year })}>
                                            Send Data
                                        </Button>
                                    </Col>
                                    <Col span={6} offset={12}> 
                                        <Button onClick={ verifyJsonBeforeConvert } style={{textAlign:'end'}}>
                                            Format Json
                                        </Button>                                           
                                    </Col>
                                </Row>                                 
                            </Form.Item>
                        </Form>                                                               
                        {   state 
                            ?   <ContentHistoryState                                    
                                state={ state }
                                response={ response }/>                                                                                                
                            :   <EmptyHistoryState
                                    resp={ resp }/>                          
                        }         
                    </Col>
                    <Col span={9} offset={3}>
                        <h5>Preview Json</h5>       
                        {                            
                            preview && json.length !== 0 &&
                                <ReactJson src={JSON.parse(jsonPreview)} />                                
                        }                                                                      
                    </Col>   
                </Row>
            </TabPane>
            <TabPane tab="Excel" key="2">
                <ResultFile serviceCode={ serviceCode }/>
            </TabPane>   
        </Tabs>                                
    )    
}

export default Product