import React, { useState } from 'react';
import { Tabs,Form,Input,Button,Row,Col,DatePicker } from 'antd';
import Axios from 'axios';
import { BiCalendar } from "react-icons/bi";
import { TiBusinessCard } from "react-icons/ti";
import moment from 'moment' 
import url from '../url'
import verify from '../verify'
import EmptyHistoryState from '../EmptyHistoryState'
import ResultFile from '../ResultFile'

const original = verify()
const { TabPane } = Tabs;

function ThirdParty(props) {     
    const [form] = Form.useForm();
    const [resp, setRespList] = useState([])  
    const [year,setYear] = useState('')
    const [id,setId] = useState('')       
    const [date,setDate] = useState(moment().format())
    const serviceCode = 8
    const format="YYYY-MM-DD h:mm:ss A"

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
                    
        if(resp.length !== 0 )   
            resp.shift()       
        
        Axios.post(url.general+"/set/petitionConsult",{
            info: data,
            serviceCode: serviceCode,    
            client: original        
        })                       
        .then(response => {            
            return response
        }) 
        .then(data =>{   
            as(data)
                
        })
        .catch(error => {                        
            if(error.response){
                as(error.response) 
            }    
            console.log(error)                                                                                                                                             
        })                  
    }

    return(      
        <React.Fragment>
        <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Json" key="1">
                <Row>
                    <Col span={11}>
                        <Form
                            form={form}
                            layout="vertical"               
                        >             
                            <Form.Item label="Ingrese fecha y hora de la petición" required tooltip="This is a required field">
                                <DatePicker
                                    showTime
                                    use12Hours
                                    format={ format } 
                                    value={                                    
                                            moment(date, format)                                   
                                        }
                                    onChange={
                                        (e)=>{                                  
                                            setDate(e)
                                        }
                                    }         
                                />   
                            </Form.Item> 
                            <Form.Item label="Ingrese el año de trabajo a consultar." required tooltip="This is a required field">
                                <Input                    
                                    allowClear
                                    type='number'                                                   
                                    min='2000'
                                    max='2030'                           
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
                            <Form.Item label="Ingrese el documento de identificación del tercero" required tooltip="This is a required field">
                                <Input                    
                                    allowClear
                                    type='text'                                                       
                                    placeholder="99999999"
                                    prefix={<TiBusinessCard/>}                     
                                    style={{
                                        width:'50%'
                                    }}
                                    value={ id }
                                    onChange={
                                        (e)=>{                                   
                                            setId(e.target.value)
                                        }
                                    }   
                                />  
                            </Form.Item>                                                 
                            <Form.Item>
                                <Button
                                    variant="info">
                                    Clean Data
                                </Button>  
                                <Button
                                    variant="dark"                           
                                    onClick={() => 
                                    submit({ year: year,id:id,date:date }
                                    )}>
                                    Send Data
                                </Button>   
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={12} offset={1}>
                        <EmptyHistoryState resp={ resp }/>  
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

export default ThirdParty;

