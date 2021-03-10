import React, { useRef, useState } from 'react';
import { Tabs,Form,Input,Upload, message,Button } from 'antd';
import Axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import url from '../components/url'
import verify from '../components/verify'
import ContentHistoryState from '../components/ContentHistoryState'
import EmptyHistoryState from '../components/EmptyHistoryState'
import ExcelExport from '../components/excelExport'
import 'antd/dist/antd.css';

const original = verify()
const { TextArea } = Input;
const { TabPane } = Tabs;

function ParameterJson(props){
    const serviceCode = props.params.serviceCode
    const refJson = useRef(props.params.paramJson)
    
    const [form] = Form.useForm();
    const [resp, setRespList] = useState([])  
    const [json, setJson] = useState([]) 
    const [state, setState] = useState('') 
    const [response,setResponse] = useState('') 
    const [files,setFile] = useState([]) 

    const handleChange= (data) => {      
        setJson(data) 
    } 

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

    const submitFile = (file) => {       
        const header = ["portfolio","id","checkDigit","documentTypeTag","name","address","telephones","cellphone","fax","city","email","zone","group","free1","free2","toleranceDays","maxCredit","regimenTag","paymentForm","cree","economicActivity","natureValue","firstName","secondName","firstLastName","secondLastName","year","applyRteFte","applyMaxRteFte","applyMaxRteIva","applyMaxRteIca","areaIca","contactName","contactPhone","contactEmail","accountPortfolio","idVendor","priceListServices","priceListArticules"]
        const exEx = ExcelExport(file,header)   

        exEx
        .then(r => {           
            let newArr = []
            for (let key = 1; key < r.length; key++){
                
                if(r[key].documentTypeTag){
                    r[key]["documentType"] = {tag:r[key].documentTypeTag}
                    delete  r[key]["documentTypeTag"] 
                }
                
                if(r[key].regimenTag){
                    r[key]["regimen"] = {tag:r[key].regimenTag}
                    delete  r[key]["regimenTag"] 
                } 

                if(r[key].natureValue){
                    r[key]["nature"] = {value:r[key].natureValue}
                    delete  r[key]["natureValue"] 
                }   
                newArr.push(r[key])                
            }

            Axios.post(url+"/set/petitionFile",{
                jsonMultiple: newArr,
                serviceCode: serviceCode,    
                client: original,
            })
            .then(response =>response) 
            .then(data =>{   
                as(data)
                props.reload()
            })
            .catch(error => { 
                if(error.response){
                    as(error.response) 
                }    
                props.reload()
                console.log(error.response)                                                                                                                                             
            })  
        })
        .catch(e => {
            console.log(e)
        })
    }

    const submit = (jsonSend) => {         
                    
        setState('') 
        if(resp.length !== 0 )   
            resp.shift() 

        Axios.post(url.general+"/set/petition",{
            json: jsonSend,
            serviceCode: serviceCode,    
            client: original,
        })
        .then(response =>response) 
        .then(data =>{   
            as(data)
            props.reload()
        })
        .catch(error => { 
            if(error.response){
                as(error.response) 
            }    
            props.reload()
            console.log(error.response)                                                                                                                                             
        })      
    }

    if(refJson.current !== props.params.paramJson){
        setJson(props.params.paramJson)
        setState(props.params.paramState)
        setResponse(props.params.paramResponse)
        refJson.current = props.params.paramJson
    }

    const pops = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {           
            if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            }
        },
        beforeUpload: file => {
            setFile(file)                    
        },
    };

    return(
        <React.Fragment> 
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Json" key="1">
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
                            <Button
                                variant="dark"                           
                                onClick={() => 
                                submit(json)}>
                                Send Data
                            </Button>   
                        </Form.Item>                                      
                    </Form>       
                </TabPane>
                <TabPane tab="Excel" key="2">
                    <Form
                        form={form}
                        layout="vertical"               
                        >                         
                        <Form.Item>              
                            <Upload {...pops}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </Upload>                                         
                        </Form.Item>    
                        <Form.Item>
                            <Button
                                variant="dark"                           
                                onClick={() => 
                                submitFile(files)}>
                                Send Data
                            </Button>   
                        </Form.Item>                                      
                    </Form>   
                </TabPane>            
            </Tabs>                                                                          
            {   state 
                ?   <ContentHistoryState                                    
                    state={ state }
                    response={ response }/>                                                                                                
                :   <EmptyHistoryState
                        resp={ resp }/>                          
            }              
        </React.Fragment>  
    )
}        
        
export default ParameterJson