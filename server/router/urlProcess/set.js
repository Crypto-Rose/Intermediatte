const express = require('express')
const moment = require('moment');
const axios = require('axios');
const db = require('../../connect')
const client = require('../general/structure/set/Client')
const documents = require('../general/structure/set/Document')
const order = require('../general/structure/set/Order')
const product = require('../general/structure/set/Product')
const thirdParty = require('../general/structure/set/ThirdParty')
const generalClient = require('../general/general')
let router = express.Router();
let day = moment().format();

function insertHistory(code,status,json,response,client,year){
    const sqlInsertHistory = "INSERT INTO history_services (date,id_service,state,json,response,id_client,year) VALUES (?,?,?,?,?,?,?)"
    db.query(sqlInsertHistory,[day,code,status,json,response,client,year])   
}

router
.route("/client")
.post((req,res) => {
    try{
        const json = req.body.json
        const id=  req.body.id       
        const key=  req.body.key
        const jsonConvert = client.jsonConvert(json,id,key)            
        const parameters = jsonConvert   
        generalClient.client(id)        
        .then((response) => {
            const clientID = response                             
            const requestOptions = {
                method: 'post',
                url: 'http://kansas.helisa.com:9590/KansasWS/set/client2_0',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',                                                    
                },
                data: parameters
            }; 
            axios(requestOptions)
            .then(response =>response)                   
            .then(data => {                        
                insertHistory(1,data.status,json,JSON.stringify(data.data),clientID,null)                
                if(data.status !== 200){
                    res.status(data.status).send(data.data);                    
                }                
                res.status(data.status).send('El proceso se completo exitosamente');
            })
            .catch(error => {
                console.log(error)
                if(error.response){
                    insertHistory(1,error.response.status,json,JSON.stringify(error.response.data),clientID,null)
                    res.status(error.response.status).send(error.response.data)
                }
                    
            })                                          
        })
        .catch((err) => {
            console.log(err)
            res.status(404).send('User not found')

        })      
        
    }catch(e){
        console.log(e)
        res.status(500).send('Hubo un problema, verifique sus datos.')
    }   
})

router
.route("/document")
.post((req,res)=>{
    try{
        const json = req.body.json
        const id=  req.body.id       
        const key=  req.body.key
        const jsonConvert = documents.jsonConvert(json,id,key)            
        const parameters = jsonConvert    
        generalClient.client(id)
        .then((response) => {
            const clientID = response   
            const requestOptions = {
                method: 'post',
                url: 'http://kansas.helisa.com:9590/KansasWS/set/document',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',                                                    
                },
                data: parameters
            };  
            axios(requestOptions)
            .then(response => response)                   
            .then(data => {   
                insertHistory(2,data.status,json,JSON.stringify(data.data),clientID,null)     
                if(data.status !== 200){
                    res.status(data.status).send(data.data);
                }                                  
                res.status(data.status).send('El proceso se completo exitosamente');
            })
            .catch(error => {
                console.log(error)
                if(error.response){
                    insertHistory(2,error.response.status,json,JSON.stringify(error.response.data),clientID,null)
                    res.status(error.response.status).send(error.response.data)
                }                
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(404).send('User not found')
        })        
    }catch(e){
        console.log(e)
        res.status(500).send('Hubo un problema, verifique sus datos.')
    }    
})

router
.route("/order")
.post((req,res)=>{
    try {
        const json = req.body.json
        const year = req.body.year
        const id=  req.body.id       
        const key=  req.body.key
        const jsonConvert = order.jsonConvert(json,year,id,key)            
        const parameters = jsonConvert  
        generalClient.client(id)        
        .then((response) => { 
            const clientID = response    
            const requestOptions = {
                method: 'post',
                url: 'http://kansas.helisa.com:9590/KansasWS/set/order',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',                                                    
                },
                data: parameters
            };  
            axios(requestOptions)
            .then(response => response)                   
            .then(data => {        
                insertHistory(3,data.status,json,JSON.stringify(data.data),clientID,year)
                if(data.status !== 200){
                    res.status(data.status).send(data.data);
                }                                                                          
                res.status(data.status).send('El proceso se completo exitosamente');
            })
            .catch(error => {
                if(error.response){
                    insertHistory(3,error.response.status,json,JSON.stringify(error.response.data),clientID,year)
                    res.status(error.response.status).send(error.response.data)
                }                
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(404).send('User not found')

        })     

    }catch(e){
        console.log(e)
        res.status(500).send('Hubo un problema, verifique sus datos.')
    }       
})

router
.route("/product")
.post((req,res)=>{
    try{
        const json = req.body.json
        const year = req.body.year
        const id=  req.body.id       
        const key=  req.body.key
        const jsonConvert = product.jsonConvert(json,year,id,key)            
        const parameters = jsonConvert    
        generalClient.client(id)        
        .then((response) => { 
            const clientID = response 
            const requestOptions = {
                method: 'post',
                url: 'http://kansas.helisa.com:9590/KansasWS/set/productFE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',                                                    
                },
                data: parameters
            };  
            axios(requestOptions)
            .then(response => response)                   
            .then(data => {       
                insertHistory(4,data.status,json,JSON.stringify(data.data),clientID,year) 
                if(data.status !== 200){
                    res.status(data.status).send(data.data);
                }                                   
                res.status(data.status).send('El proceso se completo exitosamente');
            })
            .catch(error => {
                if(error.response){
                    insertHistory(4,error.response.status,json,JSON.stringify(error.response.data),clientID,year)
                    res.status(error.response.status).send(error.response.data)   
                }                
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(404).send('User not found')

        })   
    }catch(e){
        console.log(e)
        res.status(500).send('Hubo un problema, verifique sus datos.')
    }             
})

router
.route("/thirdParty")
.post((req,res)=>{
    try {
        const json = req.body.json
        const id=  req.body.id       
        const key=  req.body.key
        
        const jsonConvert = thirdParty.jsonConvert(json,id,key)            
        const parameters = jsonConvert 
        generalClient.client(id)     
        .then((response) => {
            const clientID = response  
            const requestOptions = {
                method: 'post',
                url: 'http://kansas.helisa.com:9590/KansasWS/set/thirdParty2_0',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',                                                    
                },
                data: parameters
            }; 
            axios(requestOptions)
            .then(response => response)                   
            .then(data => {  
                console.log(data)      
                insertHistory(5,data.status,json,JSON.stringify(data.data),clientID,null)
                if(data.status !== 200){
                    res.status(data.status).send(data.data);                                    
                }                     
                res.status(data.status).send('El proceso se completo exitosamente');
            })
            .catch(error => {
                console.log(error)
                if(error.response){
                    insertHistory(5,error.response.status,json,JSON.stringify(error.response.data),clientID,null)
                    res.status(error.response.status).send(error.response.data)
                }                
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(404).send('User not found')

        }) 
    }catch(e){
        console.log(e)
        res.status(500).send('Hubo un problema, verifique sus datos.')
    }  

})

module.exports = router;