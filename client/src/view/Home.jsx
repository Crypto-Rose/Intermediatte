import React, { useState,useEffect, useCallback } from 'react';
import { Row,Col,Button } from 'react-bootstrap'
import { Empty } from 'antd';
import Axios from 'axios';
import ContentHistoryState from '../components/ContentHistoryState'
import EmptyHistoryState from '../components/EmptyHistoryState'
import '../components/css/blog.css'
import Paginate from '../components/Paginate'
import History from '../components/History';
import moment from 'moment'
import verify from '../components/verify'
import url from '../components/url'
import noData from '../images/noData.png'
let day = moment();

function Home(props) {
    const serviceCode = props.code
    const [resp, setRespList] = useState([])       
    const [historyList, setHistoryList] = useState([])  
    const [code,setCodeJson] = useState(0)
    const [json, setJson] = useState([]) 
    const [state, setState] = useState('') 
    const [response,setResponse] = useState('') 
    const [listJson, setListJson] = useState([]) 
    const original = verify()

    const initialHistory = useCallback(
        () => {
            Axios.post(url.general+'/get/history',{
                serviceCode: serviceCode,
                client: original
            })
            .then(response => response)
            .then((data) => { 
                const countKey = Object.keys(data.data).length;            
                let info= []
                for(let i=0;i< countKey; i++){   
                    info.push(data.data[i])                  
                }               
                setHistoryList(info)  
            }) 
        },
        [original,serviceCode],
    );

    useEffect(() => {          
        initialHistory()                
    },[initialHistory])
    
    const submit = (data) => {         
        const jsonSend = data.json           
        const jsonCode = data.code
        let jsonProcess = 0

        setState('') 
        if(resp.length !== 0 )   
            resp.shift() 
        console.log(jsonCode)
        if( jsonCode === null){
            console.log('entra aca')
            jsonProcess = Axios.post(url.general+"/set/thirdParty",{
                json: jsonSend,
                serviceCode: serviceCode,    
                client: original        
            })
        }else {
            jsonProcess = Axios.put(url.general+"/set/thirdParty",{
                json: jsonSend,
                codeJson: jsonCode,  
            })
        }        
        
        jsonProcess.then(response =>response) 
        .then(data =>{   
            console.log(data)                        
            setRespList([
                ...resp,                              
                {
                    status: data.status,
                    statusText: data.statusText,
                    info: data.data,                    
                }
            ]) 
            day = moment().format();
            const j=({'date':day,'json':jsonSend,'response':JSON.stringify(data.data),'state':data.status })
            setHistoryList([...historyList,j]) 
            initialHistory()                                                       
        })
        .catch(error => { 
            console.log(error) 
            if(error.response){
                setRespList([
                    ...resp,                                                                                                                                           
                    {       
                        status: error.response.status,
                        statusText: error.response.statusText,
                        info: error.toString(),                    
                    }
                ])   
                initialHistory()   
            }                                                                                                                                  
        })         
    }

    const newJson = (n) => {        
        setListJson(n)      
    }

    const newa = (c,j,s,r) => {
        setCodeJson(c)
        setJson(j)
        setState(s)
        setResponse(r)
    }

    const handleChange= (data) => {      
        setJson(data) 
    } 
    

    return(        
        <div className='home mt-5' style={{ wordWrap:'break-word' }}>   
            <Row>  
                <Col md={5}>

                    { historyList.length !== 0
                        ?   <div>
                                <History newa={ newa } listJson={ listJson }/>
                                <Paginate newJson={ newJson } list={ historyList }/>                                    
                            </div>
                        :   <Empty
                                image={ noData
                                }
                                imageStyle={{
                                    height: 300,
                                }}
                                description={
                                <span>
                                    No hay información para mostrar
                                </span>
                                }
                            />   
                    } 
                    
                </Col>   
                <Col md={7}>                                                           

                    <textarea
                        rows="8"
                        type="text"
                        name="json"
                        className="form-control mb-3"  
                        value={ json }  
                        onChange={(e)=> {
                            handleChange(e.target.value)                                                          
                        }}>                          
                    </textarea> 

                    <Button
                        variant="dark"                           
                        onClick={() => 
                        submit(
                            code                                
                            ? { code: code,json: json }
                            : { code: null,json: json }
                        )}>
                        Send Data
                    </Button>     
                    {   state 
                        ?   <ContentHistoryState                                    
                            state={ state }
                            response={ response }/>                                                                                                
                        :   <EmptyHistoryState
                            resp={ resp }/>                          
                    }   
                </Col>   
            </Row>                                                 
        </div>
    )    
}

export default Home;
