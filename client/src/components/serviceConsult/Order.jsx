import React, { useCallback, useEffect, useState } from 'react';
import { Row,Col,Button,Divider,Typography } from 'antd';
import Axios from 'axios';
import ReactJson from 'react-json-view'
import url from '../url'
import verify from '../verify'
import History from '../History';
import Paginate from '../Paginate'
import ContentHistoryState from '../ContentHistoryState'
import { informativeText,colorInformative } from '../propStatus' 

const { Text,Title } = Typography;

const original = verify()


function Order(){   
    const [historyList, setHistoryList] = useState([])  
    const [listData,setListData] = useState([])
    const [resp, setRespList] = useState([])  
    const [json, setJson] = useState([]) 
    const [state, setState] = useState(0)  
    const [response,setResponse] = useState('') 
    const [year,setYear] = useState('') 
    const [viewData, setViewData] = useState(false)
    const serviceCode = 3

        
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

    const reload =() => {
        initial()
    }

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
        const jsonCode = data.code
        const year = data.year
        let jsonProcess = 0
        setState('') 
        if(resp.length !== 0 )   
            resp.shift() 

        if( jsonCode === null){           
            jsonProcess = Axios.post(url.general+"/set/petition",{
                json: jsonSend,
                serviceCode: serviceCode,    
                client: original,
                year:year        
            })
        }else {
            jsonProcess = Axios.put(url.general+"/set/petition",{
                json: jsonSend,
                codeJson: jsonCode,
                serviceCode: serviceCode,    
                client: original,
                year:year
            })
        }        
        
        jsonProcess.then(response =>response) 
        .then(data =>{               
            as(data)
            reload()
        })
        .catch(error => { 
            
            if(error.response){
                as(error.response) 
            }    
            reload()
            console.log(error.response)                                                                                                                                             
        })          
    }

    return(   
        <Row justify="center">  
            <Col span={10}  >
                <Divider orientation="center" style={{paddingRight:'52px'}}>Peticiones realizadas</Divider>
                <History                    
                    newa={ newa }
                    list={ historyList }/>
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
                    ? <React.Fragment>
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
                    :  <Title level={5} style={{ textAlign:'center' }}>{viewData ? 'Error de tipo de dato' : 'Debe escoger alguna petición' }</Title>               
                }                                                                                                                                                                                       
            </Col>
        </Row>               
    )    
}

export default Order