import React, { useCallback, useEffect, useState } from 'react';
import Axios from 'axios';
import ReactJson from 'react-json-view'
import { Row,Col,Button,Divider,Typography,Empty  } from 'antd';
import url from '../url'
import verify from '../verify'
import History from '../History';
import ContentHistoryState from '../ContentHistoryState'
import file from '../file'
import { informativeText,colorInformative } from '../propStatus' 
import importExcel from '../import'
import noData from '../../images/noData.png'
const original = verify()
const { Title } = Typography;

function JsonConsult(props){ 

    const code = props.code
    console.log(code)
    const [historyList, setHistoryList] = useState([])  
    const [paramState, setParamState] = useState(0) 
    const [paramResponse,setParamResponse] = useState([]) 
    const [paramJson,setParamJson] = useState([]) 
    const [viewData, setViewData] = useState(false)

        const initial = useCallback(
            () => {
        
                Axios.post(url.general+'/get/history',{   
                    serviceCode: code,            
                    client: original        
                })
                .then(response =>{            
                    return response
                }) 
                .then(data =>{  
                    console.log(data)
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
            [code],
        );
        
        useEffect(() => {          
            initial()
        },[initial])       
    
            
        const newa = (data) => {    
            setViewData(true)            
            setParamJson(JSON.parse(data.json))            
            setParamState(data.state)
            try{
                setParamResponse(JSON.parse(data.response)) 
            }catch(err){
                setParamResponse(data.response) 
            }            
        }

        const submit = (data) => {
            const dataComplet = file.changeDatainImport(data,code)  
            importExcel.saveAsExcel(dataComplet)
        }

    return(  
        <div>
            {
                historyList.length !== 0
                ?   <Row justify="center">  
                        <Col span={10}  >
                            <Divider orientation="center" style={{paddingRight:'52px'}}>Peticiones realizadas</Divider>
                            <History                    
                                newa={ newa }
                                list={ historyList }/>
                            

                            {   paramState !== 0 && 
                                    <ContentHistoryState                                                                           
                                    response={ paramResponse }/>                
                            }     
                        </Col>
                        <Col
                            span={10}
                            offset={3}
                            className="mr-1"
                        > 
                            <Divider orientation="center">Vista detallada</Divider>
                            {   paramState !== 0 &&
                                    <h5 style={{ color:colorInformative(paramState) }}>La peticion con estado { paramState }, { informativeText(paramState) }</h5>                                                                                                           
                            }      
                            {
                                typeof(paramJson) === 'object' && viewData
                                ? <React.Fragment>
                                    <Divider dashed />
                                    <div style={{ textAlign:'end' }}>
                                
                                        <Button                
                                            onClick={() => 
                                                submit(paramJson)
                                            }>
                                            Import Json in Excel
                                        </Button>        
                                    </div>                        
                                    <ReactJson displayDataTypes={false} src={paramJson} />     
                                    </React.Fragment>
                                :  <Title level={5} style={{ textAlign:'center' }}>{viewData ? 'Error de tipo de dato' : 'Debe escoger alguna petición' }</Title>               
                            }                                                                                                                                                                                       
                        </Col>
                    </Row>
                :   <Empty
                        image={ noData }
                        imageStyle={{
                        height: 300,
                        }}
                        description={
                        <span>
                            No hay datos por el momento
                        </span>
                        }
                    >                                                
                    </Empty>                      
            }
            
        </div>                  
    )    
}

export default JsonConsult
