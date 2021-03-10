import React, { useState } from 'react';
import Axios from 'axios';

function Form(){

    const [json, setJson] = useState('')
    const [id, setId] = useState('')
    const [key, setKey] = useState('')
    const [year,setYear] = useState('')
    const [identity,setIdentity] = useState('')
    const [date,setDate] = useState('')

    const submitState = (e,url) => {    
        e.preventDefault()
        console.log(json,id,key,url)
        Axios.post("http://localhost:3000/api/"+url,{
            json: json,
            id: id,            
            key: key,
        })
        .then(response => console.log(response))       
        .catch(error => console.log(error))                
    }

    const submitStateYear = (e,url) => {    
        e.preventDefault()
        console.log(json,id,key,url)
        Axios.post("http://localhost:3000/api/"+url,{
            json: json,
            year: year,
            id: id,            
            key: key,
        })
        .then(response => console.log(response))       
        .catch(error => console.log(error))                
    }

    const getThirdsubmitState = () => {
        
        for(let i =0; i<100; i++){
            Axios.post("http://localhost:3000/api/get/thirdParty",{
                year: year,
                identity:identity,
                date:date,
                id: id,            
                key: key,
            })
            .then(response => console.log(response))       
            .catch(error => console.log(error))            
        }              
    }
    return(
        <React.Fragment>
            <div>
                <h3>FORM INTERMEDIATE GET THIRDPARTY</h3>
                <div className="formRegister">
                    <label>year</label>                
                    <input
                        type="text"
                        name="year"
                        onChange={(e)=>{
                        setYear(e.target.value)
                    }}/>   
                    <label>identity</label>                
                    <input
                        type="text"
                        name="identity"
                        onChange={(e)=>{
                        setIdentity(e.target.value)
                    }}/>                     
                    <label>id</label>
                    <input
                        type="text"
                        name="id"
                        onChange={(e)=>{
                        setId(e.target.value)
                    }}/>         
                    <label>date</label>
                    <input
                        type="text"
                        name="date"
                        onChange={(e)=>{
                        setDate(e.target.value)
                    }}/>                
                    <label>key</label>
                    <input
                        type="text"
                        name="key"
                        onChange={(e)=>{
                        setKey(e.target.value)
                    }}/>                
                    <button onClick={getThirdsubmitState}>Send</button>                
                </div>            
            </div>
            <div>
                <h3>FORM INTERMEDIATE SET CLIENT</h3>
                <form className="formRegister" onSubmit={(e)=>submitState(e,'set/client')}>
                    <label>json</label>                
                    <textarea
                        cols='60' rows='8'
                        type="text"
                        name="json"
                        onChange={(e)=>{
                        setJson(e.target.value)
                    }}/>                     
                    <label>id</label>
                    <input
                        type="text"
                        name="id"
                        onChange={(e)=>{
                        setId(e.target.value)
                    }}/>                
                    <label>key</label>
                    <input
                        type="text"
                        name="key"
                        onChange={(e)=>{
                        setKey(e.target.value)
                    }}/>                
                    <button type="submit">send</button>             
                </form>            
            </div>
            <div>
                <h3>FORM INTERMEDIATE SET DOCUMENT</h3>
                <form className="formRegister" onSubmit={(e)=>submitState(e,'set/document')}>
                    <label>json</label>                
                    <textarea
                        cols='60' rows='8'
                        type="text"
                        name="json"
                        onChange={(e)=>{
                        setJson(e.target.value)
                    }}/>                     
                    <label>id</label>
                    <input
                        type="text"
                        name="id"
                        onChange={(e)=>{
                        setId(e.target.value)
                    }}/>                
                    <label>key</label>
                    <input
                        type="text"
                        name="key"
                        onChange={(e)=>{
                        setKey(e.target.value)
                    }}/>                
                    <button type="submit">send</button>              
                </form>            
            </div>
            <div>
                <h3>FORM INTERMEDIATE SET ORDER</h3>
                <form className="formRegister" onSubmit={(e)=>submitStateYear(e,'set/order')}>
                    <label>json</label>                
                    <textarea
                        cols='60' rows='8'
                        type="text"
                        name="json"
                        onChange={(e)=>{
                        setJson(e.target.value)
                    }}/>  
                    <label>year</label>
                    <input
                        type="text"
                        name="year"
                        onChange={(e)=>{
                        setYear(e.target.value)
                    }}/>                     
                    <label>id</label>
                    <input
                        type="text"
                        name="id"
                        onChange={(e)=>{
                        setId(e.target.value)
                    }}/>                
                    <label>key</label>
                    <input
                        type="text"
                        name="key"
                        onChange={(e)=>{
                        setKey(e.target.value)
                    }}/>                
                    <button type="submit">send</button>              
                </form>            
            </div>
            <div>
                <h3>FORM INTERMEDIATE SET PRODUCT</h3>
                <form className="formRegister" onSubmit={(e)=>submitStateYear(e,'set/product')}>
                    <label>json</label>                
                    <textarea
                        cols='60' rows='8'
                        type="text"
                        name="json"
                        onChange={(e)=>{
                        setJson(e.target.value)
                    }}/>  
                    <label>year</label>
                    <input
                        type="text"
                        name="year"
                        onChange={(e)=>{
                        setYear(e.target.value)
                    }}/>                     
                    <label>id</label>
                    <input
                        type="text"
                        name="id"
                        onChange={(e)=>{
                        setId(e.target.value)
                    }}/>                
                    <label>key</label>
                    <input
                        type="text"
                        name="key"
                        onChange={(e)=>{
                        setKey(e.target.value)
                    }}/>                
                    <button type="submit">send</button>              
                </form>            
            </div>
            <div>
                <h3>FORM INTERMEDIATE SET THIRDPARTY</h3>
                <form className="formRegister" onSubmit={(e)=>submitState(e,'set/thirdParty')}>
                    <label>json</label>                
                    <textarea
                        cols='60' rows='8'
                        type="text"
                        name="json"
                        onChange={(e)=>{
                        setJson(e.target.value)
                    }}/>                     
                    <label>id</label>
                    <input
                        type="text"
                        name="id"
                        onChange={(e)=>{
                        setId(e.target.value)
                    }}/>                
                    <label>key</label>
                    <input
                        type="text"
                        name="key"
                        onChange={(e)=>{
                        setKey(e.target.value)
                    }}/>                
                    <button type="submit">send</button>             
                </form>            
            </div>
            <div>
                <h3>FORM INTERMEDIATE SUMMARY BALANCESHEET</h3>
                <form className="formRegister" onSubmit={(e)=>submitState(e,'summary/balanceSheet')}>
                    <label>json</label>                
                    <textarea
                        cols='60' rows='8'
                        type="text"
                        name="json"
                        onChange={(e)=>{
                        setJson(e.target.value)
                    }}/>                     
                    <label>id</label>
                    <input
                        type="text"
                        name="id"
                        onChange={(e)=>{
                        setId(e.target.value)
                    }}/>                
                    <label>key</label>
                    <input
                        type="text"
                        name="key"
                        onChange={(e)=>{
                        setKey(e.target.value)
                    }}/>                
                    <button type="submit">send</button>             
                </form>            
            </div>
            <div>
                <h3>FORM INTERMEDIATE SET productStock</h3>
                <form className="formRegister" onSubmit={(e)=>submitState(e,'summary/productStock')}>
                    <label>json</label>                
                    <textarea
                        cols='60' rows='8'
                        type="text"
                        name="json"
                        onChange={(e)=>{
                        setJson(e.target.value)
                    }}/>                     
                    <label>id</label>
                    <input
                        type="text"
                        name="id"
                        onChange={(e)=>{
                        setId(e.target.value)
                    }}/>                
                    <label>key</label>
                    <input
                        type="text"
                        name="key"
                        onChange={(e)=>{
                        setKey(e.target.value)
                    }}/>                
                    <button type="submit">send</button>             
                </form>            
            </div>
        </React.Fragment>
        
    )
}

export default Form;