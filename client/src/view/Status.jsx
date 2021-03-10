import React, { useCallback, useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { Typography,Space,Empty ,Collapse } from 'antd';
import { Col, Row,Button,Form } from 'react-bootstrap';
import verify from '../components/verify'
import url from '../components/url'
import ChangePetiton from '../components/ChangePetiton'
import {color} from '../components/propStatus' 
import wait from '../images/wait.png'
import noData from '../images/noData.png'
import moment from 'moment'
const original = verify()
const { Title,Text } = Typography;
const { Panel } = Collapse;

function Status(props){   
    let refStatus =  useRef(props.match.params.code) 
    const [dataList,setData] = useState([])
    const [originalListData,setOriginalListData ] = useState([])
    const [petition,setPetition] = useState([])    

    const initial = useCallback(
        () => {
            Axios.post(url.general+"/get/status",{               
                client: original,
                state: props.match.params.code        
            })
            .then(response =>{            
                return response
            }) 
            .then(data =>{                 
                let resultado = []     
                let  aux = [];                 
                data.data.map(function(val) {               
                    const date = moment(new Date(val.date)).format('dddd, LL');   
                    let mes = { Mes: date};      
                    Object.keys(val).forEach(function(keys) {                        
                        mes[keys] = '';
                        
                    })                                                                                                                        
                    Object.keys(val).forEach(function(keys) {                       
                        mes[keys] += val[keys];                        
                    }) 
                    resultado.push(mes)                                                              
                    return resultado;
                });                                                                 
                                   
                resultado.forEach(x => {                
                    if (!aux.hasOwnProperty(x.Mes)) {
                        aux[x.Mes] = [];
                    } 
                     
                    aux[x.Mes].push({
                        mes: x.Mes,
                        code: x.code,
                        date: x.date,
                        date_petition: x.date_petition,
                        id_service: x.id_service,
                        identification: x.identification,                        
                        json: x.json,
                        nameService: x.nameService,
                        response: x.response,
                        state: x.state,
                        year: x.year
                    });
                    aux[x.Mes].sort(function(a,b){   
                        if(moment(a.mes).format() > moment(b.mes).format()){
                            return 1;
                        }else {
                            return -1;
                        }
                    }) 
                   
                });                                                                                                     
                setOriginalListData(data)                                        
                setData(aux)
            })
            .catch(error => {
                console.log(error)
            })  
        },
        [props.match.params.code],
    );

    useEffect(() => {          
        initial()
    },[initial])

    const changePetition=()=>{
        initial()
    }
    
    if(refStatus.current !== props.match.params.code){
        if(petition.length !== 0 )   
            setPetition([])
        refStatus.current = props.match.params.code        
    }

    const newa = (e,data) => {         
        e.preventDefault();    
        setPetition(data)     
    }

    return(
        <div>          
            {
                originalListData.length !== 0
                ?   <Row>            
                        <Col md={5} className="m-3">                          
                            <Collapse defaultActiveKey={['0']}  accordion bordered={false} style={{ backgroundColor:'transparent' }}>            
                                {Object.keys(dataList).map((propKey,key) =>             
                                    <Panel header={  propKey } key={ key }>   
                                        {                          
                                            dataList[propKey].map((dataSecond,keys)=>
                                                <Form onSubmit={(e,dataSubmit) => newa(e,dataSubmit={ info: dataSecond })} key={keys}>                                                                                                                                                                       
                                                    <Row>   
                                                        {
                                                            dataSecond.json !== 'null' &&
                                                                <Col md={8}>                                  
                                                                    <p className='large-text text-pass' >{ dataSecond.json }</p>                           
                                                                </Col>            
                                                        }  
                                                        {
                                                            dataSecond.identification !== 'null' &&
                                                                <Col md={8}>                                  
                                                                    <p className='large-text text-pass' >Identificación de tercero: { dataSecond.identification }</p>                           
                                                                </Col>            
                                                        }                                                                                
                                                        
                                                        <Col md={4}>                                              
                                                            <Button 
                                                                variant={color( dataSecond.state) }
                                                                type="submit">
                                                                { dataSecond.state }
                                                            </Button>                                                                                                                           
                                                        </Col>                                       
                                                    </Row>                                                                                                                                                 
                                                    <hr/>                                                                                    
                                                </Form>                     
                                            )
                                        }                                       
                                    </Panel>               
                                )}
                            </Collapse>                                                        
                        </Col>
                        <Col md={6} className="mt-4">                                
                            
                            {   
                                petition.length !== 0
                                ?   <ChangePetiton listJson={ petition } changePetition={ changePetition }/>
                                :   <div style={{ textAlign:'center' }}>
                                        <Space direction="vertical">
                                            <Title level={4}>Busca las peticiones que has realizado</Title>
                                            <Text type="secondary">Recuerda que estas seran borradas semanalmente*</Text>                    
                                        </Space>
                                        <img
                                            alt="Logeo"
                                            src={wait}
                                        />
                                    </div>    
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

export default Status
