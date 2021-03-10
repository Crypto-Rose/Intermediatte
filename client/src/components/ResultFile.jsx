import React, { useState } from 'react';
import { Form,Upload, message,Button } from 'antd';
import Axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import url from '../components/url'
import ExcelExport from '../components/ExcelExport'
import file from './file'
import verify from '../components/verify'

const original = verify()


function ResultFile(props){
    const serviceCode = props.serviceCode
    let  ok = 0,accept = 0,firmed = 0,conflict = 0,intern = 0,incorrect = 0

    const [form] = Form.useForm();
    const [files,setFile] = useState([]) 
    const [countRegister,setCountRegister] = useState('') 
    const [countStatusOK,setCountStatusOK] = useState(0) 
    const [countStatusAccept,setCountStatusAccept] = useState(0) 
    const [countStatusFirmed,setCountStatusFirmed] = useState(0) 
    const [countStatusConflict,setCountStatusConflict] = useState(0) 
    const [countStatusIntern,setCountStatusIntern] = useState(0) 
    const [countStatusDataIncorrect,setCountStatusDataIncorrect] = useState(0)    

    const countStatus = (state) => {
        if(state === 200){
            ok = ok+1
            setCountStatusOK(ok)
        }
        if(state === 202){
            accept = accept+1
            setCountStatusAccept(accept)
        }
        if(state === 401){
            firmed = firmed+1
            setCountStatusFirmed(firmed)
        }
        if(state === 409){
            conflict = conflict+1
            setCountStatusConflict(conflict)
        }
        if(state === 423){
            intern = intern+1
            setCountStatusIntern(intern)
        }
        if(state === 500){
            incorrect = incorrect+1
            setCountStatusDataIncorrect(incorrect)
        }
    }

    const passData = (responseStatus) => {
        const countKey = Object.keys(responseStatus).length;  
        for(let i = 0; i < countKey; i++){
            countStatus(responseStatus[i])                             
        } 
    }

    const submitFile = (uploadFile) => {

        setCountStatusOK(0)
        setCountStatusAccept(0)
        setCountStatusFirmed(0)
        setCountStatusIntern(0)
        setCountStatusDataIncorrect(0)
        
        const header = file.header(serviceCode)
        const exEx = ExcelExport(uploadFile,header)   

        exEx
        .then(resultExcel => {           
            const multipleJsons = file.changeDataInFile(serviceCode,resultExcel)
            setCountRegister(multipleJsons.length)
            Axios.post(url.general+"/set/petitionFile",{
                multipleJsons: multipleJsons,
                serviceCode: serviceCode,    
                client: original,
            })
            .then(response =>response) 
            .then(data =>{   
                const responseStatus = data.data.status                                      
                passData(responseStatus)                                                                                                                          
            })
            .catch(error => {                                 
                console.log(error.response)                                                                                                                                             
            })  
        })
        .catch(e => {
            console.log(e)
        })
    }

    const pops = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) { 
            if (info.file.status !== 'uploading') {
            }          
            if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            }
        },
        beforeUpload: file => {
            setFile(file)                    
        },
    };

    return(

        <Form
            form={form}
            layout="vertical"               
            >                         
            <Form.Item>              
                <Upload {...pops}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>                                         
            </Form.Item>    
            <Form.Item>
                <Button
                    variant="dark"                           
                    onClick={() => 
                    submitFile(files)}>
                    Send Data of Excel
                </Button> 
                { countRegister 
                    ? <h5>Hemos encontrado: { countRegister } cantidades de registros</h5>
                    :  <h5>Estamos esperando...</h5>
                }   
                <React.Fragment>                                                                                                           
                    <h5>{ countStatusOK } 'OK'</h5>
                    <h5>{ countStatusAccept } 'Accept'</h5>
                    <h5>{ countStatusFirmed } Firmed</h5>                              
                    <h5>{ countStatusConflict } Conflict</h5>
                    <h5>{ countStatusIntern } Intern</h5>
                    <h5>{ countStatusDataIncorrect } DataIncorrect</h5>
                </React.Fragment>                                                                                                                                                                             
            </Form.Item>                                      
        </Form>

    )
}

export default ResultFile