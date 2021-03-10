import React, { useState,useEffect, useRef } from 'react';
import { Collapse } from 'antd';
import { Col, Row,Button,Form } from 'react-bootstrap';
import {color} from './propStatus' 
import moment from 'moment'
const { Panel } = Collapse;

function Paginate(props){   
    const history = useRef(props.list)
    const historyList = props.list    
    const [dataHistory, setDataHistory] = useState([])  
    
    const datasHistory= (e,data) => {
        e.preventDefault();     
        console.log(data.info)                
        props.newa(data.info)                            
    }

    useEffect(() => {   
            
            let resultado = []     
            let  aux = [];                 
            if(history.current === historyList){ 
                historyList.map(function(val) {               
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
            }                      
            resultado.forEach(x => {                
                if (!aux.hasOwnProperty(x.Mes)) {
                    aux[x.Mes] = [];
                } 
                 
                aux[x.Mes].push({
                    mes: x.Mes,
                    code: x.code,
                    date: x.date,
                    dete_petition: x.date_petition,
                    identification: x.identification,
                    json: x.json,
                    response: x.response,
                    state: x.state,
                    year: x.year
                });

                aux[x.Mes].sort(function(a,b){                        
                    if(moment(a.Mes).format() > moment(b.Mes).format()){
                        return 1;
                    }else {
                        return -1;
                    }
                }) 
               
            });        
             
            console.log(aux)                                                            
            setDataHistory(aux)
    },[historyList])

    
    return(
        <Collapse defaultActiveKey={['0']}  accordion bordered={false} style={{ backgroundColor:'transparent' }}>            
            {Object.keys(dataHistory).map((propKey,key) =>             
                <Panel header={  propKey } key={ key }>   
                    {                          
                        dataHistory[propKey].map((dataSecond,keys)=>
                            <Form onSubmit={(e,dataSubmit) => datasHistory(e,dataSubmit={ info: dataSecond })} key={keys}>                                                               
                                {
                                    dataSecond.year !== 'null'
                                    ? <p className='large-text text-pass' >{ dataSecond.year }</p>
                                    : <p className='large-text text-pass' >{' '}</p>
                                } 
                                {
                                    dataSecond.identification !== 'null' &&                 
                                        <p className='large-text text-pass' >{ dataSecond.identification }</p>
                                }     
                                <Row style={{textAlign:'center'}}>                                                                                       
                                    <Col md={8}>                                  
                                        {
                                            dataSecond.json &&
                                                <p className='large-text text-pass' >{ dataSecond.json }</p>                           
                                        }                                                                                                                                                      
                                    </Col>            
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
    )
}

export default Paginate






