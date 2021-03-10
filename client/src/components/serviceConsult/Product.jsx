import React, { useCallback, useEffect, useState } from 'react';
import Axios from 'axios';
import { Row,Col,Button,Divider,Typography } from 'antd';
import ReactJson from 'react-json-view'
import file from '../file'
import url from '../url'
import verify from '../verify'
import History from '../History';
import Paginate from '../Paginate'
import ContentHistoryState from '../ContentHistoryState'
import importExcel from '../import'
import { informativeText,colorInformative } from '../propStatus' 

import 'moment/locale/es';
const original = verify()
const { Title,Text } = Typography;

function Product(){

    const [historyList, setHistoryList] = useState([])  
    const [listData,setListData] = useState([])
    const [json, setJson] = useState([]) 
    const [state, setState] = useState(0) 
    const [response,setResponse] = useState([]) 
    const [year,setYear] = useState('') 
    const [viewData, setViewData] = useState(false)
    const serviceCode = 4


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
                console.log(error)
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
        setJson(JSON.parse(data.json))
        setState(data.state)
        setResponse(data.response)        
        setYear(data.year)      
    }

    const submit = (data) => {
        const dataComplet = file.changeDatainImport(data,serviceCode)  
        importExcel.saveAsExcel(dataComplet)
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
                {   state !== 0 && 
                    <ContentHistoryState                                                                           
                    response={ response }/>                
                }     
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
                    typeof(json) === 'object' && viewData
                    ?   <React.Fragment>
                            <Divider dashed />
                            <div style={{ textAlign:'end' }}>
                        
                                <Button                
                                    onClick={() => 
                                        submit(json)
                                    }>
                                    Import Json in Excel
                                </Button>        
                            </div>  
                            <Text strong>Año: </Text><Text > { year }</Text><br/>
                            <Text strong>Json:</Text>                        
                            <ReactJson displayDataTypes={false} src={json} />     
                        </React.Fragment>
                    : <Title level={5} style={{ textAlign:'center' }}>{viewData ? 'Error de tipo de dato' : 'Debe escoger alguna petición' }</Title>
                }                                              
            </Col>
        </Row>   
    )    
}

export default Product