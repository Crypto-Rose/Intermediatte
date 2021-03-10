import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {BarsOutlined,DownloadOutlined} from '@ant-design/icons';

import url from './url'


function MenuLateral(props){  
    
    const [urlReal, SetUrlReal] = useState('')

    useEffect(() => {          
        const path = url.service(props.codeService)        
        SetUrlReal(path.pathname)
    },[props])  

    const saveTitleSecond = (e) =>{             
        props.changeTitleSecond("")
    }
    
    return(   
        <React.Fragment>              
            <Menu                
                style={{                    
                    height: '100vh',                                         
                }}                                      
                mode="inline"
                collapsed="true"     
                onClick={saveTitleSecond}       
            >
                <Menu.Item key="1" icon={<BarsOutlined /> }>  
                    <Link to={ urlReal+"/consult" }>
                        Consult
                    </Link>                                  
                </Menu.Item>
                <Menu.Item key="2" icon={<DownloadOutlined />}>
                <Link to={ urlReal+"/service" }>
                    Insert
                </Link>                      
                </Menu.Item>
            </Menu>    
        </React.Fragment> 
    )
}

export default MenuLateral