import React,{ useState } from 'react';
import { Container,Col, Row,} from 'react-bootstrap'
import { Card, Divider, Space,Typography } from 'antd';
import { FiFileText,FiGlobe } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { BiBook } from "react-icons/bi";
import {useSpring, animated} from 'react-spring'
import agregar from '../images/agregar.jpg'
import consultar from '../images/consultar.jpg'
import estadis from '../images/estadis.jpg'
import manual from '../images/manual.jpg'
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Title } = Typography;


function Wait(){
    const [isVisibleService, setIsVisibleService] = useState(true);
    const [isVisibleStatus, setIsVisibleStatus] = useState(true);
    const propsInit = useSpring({
        from:
            {   opacity: 0,
                marginLeft: -500
            },
        to:{
                opacity: 1,
                marginLeft: 0
            },
        config:{
                delay:1000,
                duration:1200
            }
    })
    const propsSec = useSpring({
        from:
            {
                opacity: 0,
                marginRight: -500
            },
        to:
            {
                opacity: 1,
                marginRight: 0
            },
        config:
            {
                delay:1000,
                duration:1200
            }
    })    
    const propsService = useSpring({
        opacity: !isVisibleService ? 1 : 0,
        config: { delay:1000, duration:1200 }       
    })     
    const propsStatus = useSpring({
        opacity: !isVisibleStatus ? 1 :  0,
        config: { delay:1000, duration:1200 } 
    })    

    return(             
        
            <Container fluid style={{ background:'#fafafa' }}>    
                <animated.div style={propsInit}>          
                <Row className="card-init">    
                    <Col sm={4}>
                        <Space align="center">
                            <Title level={3}>SERVICIOS HECHOS PARA TI</Title>
                        </Space> 
                    </Col>                                            
                    <Col sm={4}>
                    {
                        isVisibleService 
                        ?    <Card 
                                className="card1"                           
                                hoverable={true}   
                                onClick={
                                    () => {
                                        setIsVisibleService(!isVisibleService);
                                    }
                                }                                                             
                                cover={
                                    <img
                                        alt="example"
                                        src={ agregar }                            
                                        style={{ padding: '15px'}}
                                    />
                                }
                                actions={[                     
                                    <h5><FiGlobe className="iconsPrincipal"/>VEAMOS LOS SERVICIOS</h5>
                                ]}
                            >                        
                                <Meta
                                    title="CONSULTA E INCLUYE"
                                    description="Agrega y consulta las peticiones de tus servicios"
                                />
                            </Card>
                        :    <animated.div style={propsService}> 
                                <Card 
                                    className="card1"
                                    hoverable={true}   
                                    onClick={
                                        () => {
                                            setIsVisibleService(!isVisibleService);
                                        }
                                    }                                                             
                                    cover={
                                            
                                        <Space direction="vertical" className="servicePrincipal">                               
                                            <a href="/home/services/client">Inserción y actualización de clientes</a>
                                        
                                            <a href="/home/services/document">Inserción de documentos</a>
                                            
                                            <a href="/home/services/order">Inserción de pedidos</a>                        
                                            
                                            <a href="/home/services/product">Inserción de productos</a>                        
                                        
                                            <a href="/home/services/iu/thirdParty">Inserción y actualización de terceros</a>                        
                                        
                                            <a href="/home/services/balanceSheet">Lectura balance general</a>                        
                                            
                                            <a href="/home/services/productStock">Consulta de existencias de un producto</a>                        
                                        
                                            <a href="/home/services/thirdParty">Lectura de cartilla de terceros clientes y proveedores</a>                        
                                                                        
                                        </Space>                 
                                
                                    }
                                    actions={[                     
                                        <h5><FiGlobe className="iconsPrincipal"/></h5>
                                    ]}
                                >
                                    <Meta
                                        title="ESCOGE"
                                        description="Selecciona el servicio que necesites"
                                    />
                                </Card>
                            </animated.div>                             
                    }

                    </Col>  
                               
                    <Col sm={4}>
                        {
                            isVisibleStatus
                            ?   <Card  
                                    hoverable={true}   
                                    className="card2"     
                                    onClick={
                                        () => {
                                            setIsVisibleStatus(!isVisibleStatus);
                                        }
                                    }               
                                    cover={                                
                                        <img
                                            alt="example"
                                            src={ consultar }
                                            style={{ padding: '15px'}}
                                        />
                                    }
                                    actions={[
                                        <h5><FiFileText className="iconsPrincipal"/>REVISEMOS LOS ESTADOS</h5>
                                    ]}
                                >                                                    
                                    <Meta
                                        title="INDAGA"
                                        description="Consulta los estados de las peticiones que has realizado"
                                    />                                                         
                                </Card> 
                                :   <animated.div style={propsStatus}>
                                        <Card  
                                            hoverable={true} 
                                            className="card2"      
                                            onClick={
                                                () => {
                                                    setIsVisibleStatus(!isVisibleStatus);
                                                }
                                            }               
                                            cover={
                                            
                                                <Space direction="vertical" className="statusPrincipal">                                    
                                                    <a href="/home/status/200">200 (OK) -Exitoso</a>                                       
                                                    <a href="/home/status/202">202 (Accept)</a>                                         
                                                    <a href="/home/status/409">409 (conflict) </a>                                                                
                                                    <a href="/home/status/423">423 (Problem server)</a>                                                                 
                                                    <a href="/home/status/500">500 (Internal server error)</a> 
                                                    <a href="/home/status/204">204 (No content)</a>                                                              
                                                    <a href="/home/status/500">401 (Firmed)</a> 
                                                </Space>    
                                            
                                            }
                                            actions={[
                                                <h5><FiFileText key="setting"/></h5>                 
                                            ]}
                                        >
                                        {
                                        
                                            <Meta
                                                title="SELECCIONA"
                                                description="Elige el estado de consulta que necesites"
                                            />
                                        }  
                                        </Card>
                                    </animated.div>
                        }
                    
                    </Col>                 
                </Row>
                </animated.div>  
                <Divider dashed/>
                <animated.div style={propsSec}>
                <Row className="card-init">                                              
                    <Col sm={4}> 
                        <Link to="/home/statistic"> 
                            <Card     
                                hoverable={true}   
                                className="card3"               
                                cover={
                                <img
                                    alt="example"
                                    src={ estadis }
                                    style={{ padding: '15px' }}
                                />
                                }
                                actions={[                        
                                    <h5><GoGraph className="iconsPrincipal"/>PODEMOS VER TUS REPORTES</h5>
                                ]}
                            >
                                <Meta                       
                                    title="ESTADISTICAS"
                                    description="Consulta las estadisticas según tus reportes de actividad"
                                />
                            </Card>               
                        </Link>        
                       
                    </Col>                
                    <Col sm={4}> 
                        <Card     
                            hoverable={true}                  
                            className="card4"
                            cover={
                            <img
                                alt="example"
                                src={ manual }
                                style={{ padding: '15px' }}
                            />
                            }
                            actions={[                        
                                <h5><BiBook className="iconsPrincipal"/>NUESTRA AYUDA, SE ENCUENTRA AQUI </h5>
                            ]}
                        >
                            <Meta                       
                                title="MANUALES"
                                description="Si tienes alguna duda, puedes empezar por aqui"
                            />
                        </Card>
                    </Col>   
                    <Col sm={4}>
                        <Space align="center" direction="vertical">
                            <Title level={3}>CONECTANDO TU MUNDO</Title>
                            <Title level={3}>CON EL NUESTRO</Title>
                        </Space>  
                    </Col>                                     
                </Row>
                </animated.div>
            </Container>                                                                                          
    )     
}

export default Wait
