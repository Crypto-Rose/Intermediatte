import React, { useCallback, useEffect, useState } from 'react';
import Axios from 'axios';
import { Row,Col,Divider,Typography } from 'antd';
import url from '../url'
import verify from '../verify'
import History from '../History';
import Paginate from '../Paginate'
import { informativeText,colorInformative } from '../propStatus' 
import moment from 'moment' 
import ReactJson from 'react-json-view';
const original = verify()
const { Text,Title } = Typography;

function ThirdParty() {     
    const [historyList, setHistoryList] = useState([])  
    const [listData,setListData] = useState([])
    const [year,setYear] = useState('')
    const [id,setId] = useState('')    
    const [state, setState] = useState(0) 
    const [response,setResponse] = useState('') 
    const [date,setDate] = useState('')
    const [viewData, setViewData] = useState(false)
    const serviceCode = 8

    const initial = useCallback(
        () => {            
            Axios.post(url.general+'/get/history',{   
                serviceCode: serviceCode,            
                client: original        
            })
            .then(response =>{  
                return response
            }) 
            .then(data =>{  
                const countKey = Object.keys(data.data).length;            
                let info= []
                for(let i=0;i< countKey; i++){   
                    info.push(data.data[i])                  
                }               
                setHistoryList(info) 
            })
            .catch(error => {                
                console.log(error,'mal')
            })  
        },
        [serviceCode],
    );

    useEffect(() => {          
        initial()
    },[initial])

    const newJson = (n) => {  
        setListData(n)      
    }
                
    const newa = (data) => { 
        setViewData(true)         
        setYear(data.year)        
        setState(data.state)
        try{
            setResponse(JSON.parse(data.response)) 
        }catch(err){
            setResponse(data.response) 
        }            
        setDate(data.date_petition)    
        setId(data.identification)
    }

    return(      
        <Row justify="center">              
            <Col span={10}>
                <Divider orientation="center" style={{paddingRight:'52px'}}>Peticiones realizadas</Divider>
                <History                   
                    newa={ newa }
                    listData={ listData }/>
                <Paginate                    
                    newJson={ newJson }
                    list={ historyList }/>     

            </Col>
            <Col
                span={10}
                offset={3}
                className="mr-1"
            > 
                <Divider orientation="center">Vista detallada</Divider>
                {   state !== 0 &&
                        <h5 style={{ color:colorInformative(state) }}>La peticion con estado { state }, { informativeText(state) }</h5>                                                                                                           
                }      

                {
                    viewData
                    ?   <React.Fragment>
                            <Divider dashed />                                
                            <Text strong>Año: </Text><Text > { year }</Text><br/>
                            <Text strong>Identificación del tercero:</Text><Text > { id }</Text><br/>
                            <Text strong>Fecha y Hora de la peticion: </Text><Text > { moment(date).format('LLLL') }</Text><br/>                        
                        </React.Fragment>
                    :  <Title level={5} style={{ textAlign:'center' }}>{'Debe escoger alguna petición' }</Title>               
                }  
                {
                    response &&
                        <ReactJson iconStyle="circle" displayDataTypes={false} style={{ boxShadow:'0 -2px 10px #7c87a0 inset',marginTop:'5%',padding:'8px' }} src={response} />
                }                                                                 
            </Col>
        </Row>                 
    )    
}

export default ThirdParty;

