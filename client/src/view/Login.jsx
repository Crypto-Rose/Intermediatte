import React, { useEffect, useState } from "react";
import { Form,Checkbox,Input,Button } from 'antd';
import Axios from 'axios';
import * as Cookies from "js-cookie";
import Crypto from 'crypto-js'
import { FaRegUserCircle } from 'react-icons/fa'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import verify from '../components/verify'
import url from '../components/url'
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [check, setCheck] = useState(true);

    useEffect(() => {   
        const original = verify()
        Axios.post(url.general+"/get/verifyEmail",{
            email: original,                                
        }).then(() => window.location.assign("/home"))                    
    },[])
    
    const handleSubmit = () => {                     
        Axios.post(url.general+"/get/login",{
            password: password,
            user: user,                 
        })
        .then((response) =>{
            if(response.status !== 200){
                console.log(response)   
            } else {
                const email = response.data[0].email
                const hash = Crypto.AES.encrypt(email,'MiPrecioso')
                if(check){
                    localStorage.setItem('persistentUser',hash)
                }                                                                                
                Cookies.set("session", hash);                                
                window.location.assign("/home")                
            }                                    
        })         
        .catch(error => { 
            console.log(error)                                                                                 
        })   
    };

    return (        
        <div className="pt-5 containerLogin">                                              
            <Form className='login' onFinish={handleSubmit}> 
                <Form.Item className='title-login'>                 
                    <FaRegUserCircle style={{ 'fontSize':'36px'}}/>                   
                </Form.Item> 
                <div className='sub-login mt-2'>
                    <Form.Item className='text-center mx-5'>
                        <h5>
                            USER LOGIN
                        </h5>
                    </Form.Item>
                    <Form.Item 
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >                                                            
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}                        
                            type="text"                          
                        />                                                                                                                           
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="remember"                            
                            noStyle
                        >
                            <Checkbox
                                checked={ check }
                                onChange={ (e) => setCheck(e.target.checked) }
                            >
                                Remember me
                            </Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="/">
                        Forgot password
                        </a>
                    </Form.Item>
                    <Form.Item style={{ textAlign:'center' }}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            LOGIN
                        </Button>                       
                    </Form.Item>               
                </div>                                   
            </Form>                                                                                                    
        </div>
    )
}

export default Login