import React, { useLayoutEffect,useState } from 'react';
import * as Cookies from "js-cookie";
import Axios from 'axios';
import { Spin } from 'antd';
import Base from '../view/Base'
import verify from '../components/verify'

function Blog() {   
    const [load, setLoad] = useState(false)

    useLayoutEffect(() => {
        if(!Cookies.get("session") && !localStorage.getItem('persistentUser')){             
            setLoad(false)        
            window.location.assign("/")                        
        } else {
            const original = verify()
            Axios.post("http://localhost:3000/get/verifyEmail",{
                email: original,                                
            })
            .then(setLoad(true))         
            .catch(() => window.location.assign("/"))   
        }                           
    },[])

    return( 
        <React.Fragment>
            {
                load 
                ?   <Base/>                                                                                 
                :   <div className="example">
                        <Spin size="large" />
                    </div>            
            }
        </React.Fragment>                                   
    )    
}

export default Blog;
