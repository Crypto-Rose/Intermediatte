import React, { useState } from 'react';
import Axios from 'axios';
import ReactJson from 'react-json-view';
import { DatePicker,Input,Row,Col,Button as ButtonAnt } from 'antd';
import { AiOutlineCalendar } from "react-icons/ai";
import { RiUserShared2Line } from "react-icons/ri";
import moment from 'moment' 
import { Typography,Divider } from 'antd';
import url from '../url'
import verify from '../verify'
import { informativeText,colorInformative } from '../propStatus' 
const { Title } = Typography;
const original = verify()

function ReadingThirdParty(props){
    const list = props.list    
    const [response,setResponse] = useState(list.response)
    const [state,setState] = useState(parseInt(list.state))
    const [loading, setLoading] = useState(false)
    const [year,setYear] = useState(list.year)
    const [id,setId] = useState(list.identification)
    const [date,setDate] = useState(list.date_petition)
    const format="YYYY-MM-DD h:mm:ss A"

    const submit=(data)=>{
        console.log(data)
        setLoading(true)
        Axios.put(url.general+"/set/consultPetition",{ 
            client: original,              
            info: data,  
            serviceCode: 8,
        })
        .then(response =>{                        
            return response
        }) 
        .then(data =>{  
            console.log(data)  
            setLoading(false)
            setResponse(JSON.stringify(data.data))
            setState(data.status)    
            props.changePetition()  
        })
        .catch(error => {
            setLoading(false)
            console.log(error)
        })  
    }

    const handleChangeDate = (date, dateString) => {
        setDate(dateString)
        console.log(date, dateString)
    }
    

    return(
            <div>
                <Title level={4} style={{textAlign:'center'}}>Lectura de cartilla de terceros clientes y proveedores</Title>
                <Divider>Vista Detallada</Divider>
                <h5 style={{ color:colorInformative(state) }} className="mb-4">La peticion con estado { state }, { informativeText(state) }</h5>
                <Row className="mb-3">                    
                    <Col span={8}>
                        <label>Año</label>
                        <Input
                            type="number"
                            prefix={<AiOutlineCalendar />}
                            min={2000}
                            max={2030}
                            placeholder="2020"
                            value={ year }
                            onChange={
                                (e) => {
                                    setYear(e.target.value)
                                }
                            }                           
                        />
                    </Col>                                                        
                    <Col span={12} offset={4}>
                        <label>Fecha y hora de petici&oacute;n</label>                              
                        <DatePicker
                            showTime
                            use12Hours
                            format={ format }
                            value={ moment(date, format) }
                            onChange={
                                handleChangeDate
                            }         
                        />                        
                    </Col>  
                </Row> 
                <Row>      
                    <Col span={10} >
                        <label>Documento de identificaci&oacute;n del tercero</label>
                        <Input                                
                            type="number"
                            prefix={<RiUserShared2Line/>}
                            placeholder="999999999"   
                            value={ id }
                            onChange={
                                (e) => {
                                    setId(e.target.value)
                                }
                            }                                   
                        />
                    </Col>                                                         
                </Row>                 
        
                <ButtonAnt
                    className="my-4"
                    type="primary"
                    loading={ loading }
                    value={ list.code }   
                    onClick={() => 
                    submit({ code: list.code,year:year,id:id,date:date })}>
                    Send data client
                </ButtonAnt>              
        
                {
                    response === '""'
                    ? <h5>No hay informaci&oacute;n</h5>
                    : <ReactJson theme="shapeshifter:inverted" iconStyle="circle" displayDataTypes={false} style={{ boxShadow:'0 -2px 10px #7c87a0 inset',marginBottom:'5%',padding:'8px' }} src={JSON.parse(response)} />
                }
            </div>
    )
}

export default ReadingThirdParty