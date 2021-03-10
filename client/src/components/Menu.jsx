import React, { useEffect, useState } from 'react';
import { Menu as MenuAn} from 'antd';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie' 
import listStatus from './listStatus'
import url  from './url'
import Logo from '../images/Logo.jpeg'

const { SubMenu } = MenuAn

function Menu(){
    const [service, setService] = useState([])

    useEffect(() => {          
        Axios.get(url.general+'/get/service')
        .then(response => {            
            setService(response.data)                
        })
        .catch(error => {
            console.log(error)
        })              
    },[])   

    const back = () => {
        Cookies.remove('session');
        localStorage.removeItem("persistentUser");
        window.location='/'
    }

    return (        
        <MenuAn mode="horizontal" style={{ zIndex:'1' }}>
            <MenuAn.Item>  
                <Link to="/home">                
                    <img src={ Logo } alt="Logo" width="80"/> 
                </Link>          
            </MenuAn.Item>    
            <MenuAn.Item>
                |
            </MenuAn.Item>  
            <SubMenu
                title="Estados"
                key="SubStatus">
                    {listStatus.map((data) =>                       
                        <MenuAn.Item key={data.code}> 
                            <Link to={ data.link }>                                                                   
                                {data.code}  
                            </Link>                                              
                        </MenuAn.Item>
                    )}
            </SubMenu>  

            <SubMenu
                title="Servicios"
                key="SubService"> 
                <SubMenu
                    title="Inserción y actualización"
                    key="SubServiceIA">   
                        {service.filter((a) =>{return a.category === "Inserción y actualización" }).map((d) =>                       
                            <MenuAn.Item key={d.code} value={[d.title,d.code]}> 
                                <Link to={() =>url.service(d.code) }>  
                                    { d.title }  
                                </Link>                                         
                            </MenuAn.Item>
                        )}                
                </SubMenu>   
                <SubMenu
                    title="Inserción"
                    key="SubServiceI">  
                        {service.filter((a) =>{return a.category === "Inserción" }).map((d) =>                       
                            <MenuAn.Item key={d.code}> 
                                <Link to={() =>url.service(d.code) }>  
                                    { d.title }  
                                </Link>                                               
                            </MenuAn.Item>
                        )}                 
                </SubMenu>                     
                <SubMenu
                    title="Lectura"
                    key="SubServiceL">  
                        {service.filter((a) =>{return a.category === "Lectura" }).map((d) =>                       
                            <MenuAn.Item key={d.code}> 
                                <Link to={() =>url.service(d.code) }>  
                                    { d.title }  
                                </Link>                                             
                            </MenuAn.Item>
                        )}                  
                </SubMenu>   
                <SubMenu
                    title="Consulta"
                    key="SubServiceC"> 
                    {service.filter((a) =>{return a.category === "Consulta" }).map((d) =>                       
                        <MenuAn.Item key={d.code}> 
                            <Link to={() =>url.service(d.code) }>  
                                { d.title }  
                            </Link>                                             
                        </MenuAn.Item>
                    )}                   
                </SubMenu>   
            </SubMenu>          
            <MenuAn.Item key="perfil:1" >
                <Link to="/home/perfil">  
                    Perfil
                </Link>                
            </MenuAn.Item>
            <MenuAn.Item key="conf:2">Configuración</MenuAn.Item>
            <MenuAn.Item key="sign:3" onClick={back}>Salir</MenuAn.Item>            
        </MenuAn>
    );
}

export default Menu
