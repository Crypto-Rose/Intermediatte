import React, { useState } from 'react';
import { Tabs,Form,Input,Button,Row,Col,message } from 'antd';
import Axios from 'axios';
import ReactJson from 'react-json-view'
import url from '../components/url'
import verify from '../components/verify'
import EmptyHistoryState from '../components/EmptyHistoryState'
import ResultFile from '../components/ResultFile'

const original = verify()
const { TextArea } = Input;
const { TabPane } = Tabs;

function Template(props){    
    const serviceCode = props.code   
    let jsonReplace = 0;    
    const [form] = Form.useForm();
    const [resp, setRespList] = useState([])  
    const [json, setJson] = useState([])
    const [jsonPreview, setJsonPreview] = useState([])
    const [preview, setPreview] = useState(false) 
    const [loadings, setLoadings] = useState(false) 
    
    const handleChange= (data) => {      
        setJson(data) 
    } 

    const saveData=(rs) => {
        setRespList([
            ...resp,                              
            {
                status: rs.status,
                statusText: rs.statusText,
                info: rs.data,                    
            }
        ])
    }
    
    const submit = (jsonSend) => {  
        setLoadings(true)
        try{
            console.log(jsonSend)
            if(jsonSend.length !== 0 ){
                jsonSend.replace('\n', "")
                jsonReplace = JSON.stringify(JSON.parse(jsonSend));
                if(resp.length !== 0 )   
                resp.shift() 
    
                Axios.post(url.general+"/set/petitionGeneral",{
                    json: jsonReplace,
                    serviceCode: serviceCode,    
                    client: original,
                })
                .then(response =>response) 
                .then(data =>{   
                    setLoadings(false)
                    console.log(data)
                    saveData(data)            
                })
                .catch(error => { 
                    setLoadings(false)
                    console.log(error)
                    if(error.response){
                        saveData(error.response) 
                    }                                                                                                                                                                        
                }) 
            } else {
                setLoadings(false) 
                message.error('Process content error, validate');
            } 
        }catch(e){
            console.log(e)
        }        
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
        <React.Fragment>              
            <Tabs defaultActiveKey="1" type="card">            
                <TabPane tab="Json" key="1">
                    <Row>
                        <Col span={12} >
                            <Form
                                form={form}
                                layout="vertical"               
                                >  
                                <Form.Item label="Ingrese el Json de inserci&oacute;n" required tooltip="This is a required field">
                                    <TextArea
                                        allowClear
                                        rows="8"
                                        type="text"
                                        name="json"
                                        value={ json }  
                                        onChange={(e)=> {
                                            handleChange(e.target.value)                                                          
                                    }}/> 
                                    
                                </Form.Item>                            
                                <Form.Item> 
                                    <Row>
                                        <Col span={6}>
                                            <Button
                                                variant="dark"    
                                                loading={loadings}                       
                                                onClick={() => 
                                                submit(json)}>
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
                            <EmptyHistoryState
                                resp={ resp }/>                                                 
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
        </React.Fragment>  
    )
}

export default Template
