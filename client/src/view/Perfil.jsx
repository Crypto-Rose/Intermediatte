import React, { useEffect, useState } from 'react';
import { Divider,Avatar,Badge,Space,Typography, message,Modal,notification } from 'antd';
import { Container,Col, Row,Button } from 'react-bootstrap';
import Axios from 'axios';
import moment from 'moment'
import Cookies from 'js-cookie' 
import perfil  from "../images/perfil.jpg";
import verify from '../components/verify'
import url from '../components/url'


const original = verify()
const { Text,Paragraph  } = Typography;


function Perfil(){    
    const [dataPerfil, setDataPerfil] = useState([]);
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [changeButtonConnection, setChangeButtonConnection] = useState(true)
    const [loanding, setLoanding] = useState(true)

    const back = () => {
        Cookies.remove('session');
        localStorage.removeItem("persistentUser");
        window.location='/'
    }

    const config = {
        title: 'Cambios realizados exitosamente',
        content: (
            <p> Por favor, inicie sesión nuevamente.</p>
        ),
        onOk() {
            back()
        },
    };   
    
    

    useEffect(() => {          
        Axios.post(url.general+'/get/perfil',{
            client: original
        })
        .then(response => {        
            for(let i in response.data){               
                setUser(response.data[i].user)
                setEmail(response.data[i].email)
            }         
            setDataPerfil(response.data)                
        })
        .catch(error => {
            console.log(error)
        })              
    },[]) 

    const handleSave = (e) => {
    
        let user = 0
        let emails = 0
        if(e.userAfter !== undefined)
            user = e.userAfter
        else 
            user = e.userBefore

        if(e.emailAfter !== undefined)
            emails = e.emailAfter
        else 
            emails = e.emilBefore
           
            setUser(user)
            setEmail(emails)
            Axios.put(url.general+'/set/saveInfoClient',{
                client: original,
                user: user ,
                email: emails 
            })
            .then(response => response)
            .then(data => {
                console.log(data)
                if(e.userAfter !== undefined)
                    message.success('Cambios realizados correctamente');            

                if(e.emailAfter !== undefined)
                    Modal.success(config); 
            })
            .catch(error => {
                console.log(error)
            })  
        
    }

    const checkConnection = () => {
        setChangeButtonConnection(false)
        Axios.post(url.general+'/get/verifyConnection',{
            client: original,
        })
        .then(response => response)
        .then(data => {
            setChangeButtonConnection(true)
            notification['success']({
                message: 'Exitoso',
                description:
                  'Su servicio funciona correctamente, puede enviar peticiones sin ningún problema',
            });
           
        })
        .catch(error => {
            if(error.response){                
                setChangeButtonConnection(true)
                notification['error']({
                    message: 'Fallo',
                    description:
                      'Su servicio no funciona correctamente, estamos haciendo todo lo posible para resolverlo',
                });               
            }                
            console.log(error)
        })  
        
    }
    
    return (
    
        dataPerfil.map((data,key) =>
            <Container key={ key } fluid className="perfil">            
                <Row className="dev">               
                    <Col className="child">
                        <Space direction="vertical" style={{ marginTop: '-8%'}}>
                            <Avatar
                                size={{
                                    xs: 80,
                                    sm: 100, 
                                    md: 124,
                                    lg: 132, 
                                    xl: 164, 
                                    xxl: 180 
                                }}
                                src={ perfil }
                            />    
                            <Badge color={data.state === 1 ? "green" : "red" } offset={[10, 10]}>  
                                <p style={{ fontSize:'18px',fontWeight:'600' }}>{ data.name }</p>                                                         
                            </Badge>            
                            <Text type="secondary">Usuario activo desde: { moment(data.date).format('LLLL','es')  }</Text>                            
                        </Space>   
                        <Divider orientation="left">Datos de Usuario</Divider>       
                        <Row style={{ textAlign:'initial' }}>
                            
                            <Col md={{ span: 3, offset: 3 }}>                                
                                <label>Usuario: </label>
                                <Paragraph editable={{ onChange: (e) => handleSave({ userAfter: e,userBefore: data.user,emilBefore: data.email })  }}>{ user }</Paragraph>                                
                            </Col>                           
                            <Col md={{ span: 3, offset: 1 }}>
                                <label>Correo:</label>
                                <Paragraph editable={{ onChange: (e) => handleSave({ emailAfter: e, emilBefore: data.email,userBefore: data.user }) }} >{  email }</Paragraph>
                            </Col>                                               
                        </Row>                                                                 
                        <Divider orientation="left">Conexión a Kansas</Divider>  
                        <Row style={{ textAlign:'initial' }}>
                            
                            <Col md={{ span: 3, offset: 3 }}>                                
                                <label>ID: </label>
                                <Paragraph copyable={{ tooltips: false }}>{ data.id }</Paragraph>                                                        
                            </Col>
                            <Col md={{ span: 3, offset: 1 }}>
                                <label>KEY:</label>
                                <Paragraph copyable={{ tooltips: false }}>{ data.key }</Paragraph>    
                            </Col>                                         
                        </Row>          
                        <Divider/>
                        <Row style={{ textAlign:'center' }}>                                                
                            <Col>
                                {
                                    changeButtonConnection
                                    ? <Button variant="outline-info" onClick={ checkConnection } >Comprobar el estado de mi conexión a Kansas</Button>
                                    : <Button variant="outline-warning">Realizando prueba de conexión</Button>
                                }                                                        
                            </Col>                                         
                        </Row>    
                    </Col>                
                </Row>            
            </Container>
        )               
    )
}

export default Perfil

