const express = require('express')
const axios = require('axios');
const balanceSheet = require('../general/structure/summary/BalanceSheet')
const productStock = require('../general/structure/summary/ProductStock')
const generalClient = require('../general/general')
let router = express.Router();

router
.route("/balanceSheet")
.post((req,res) => {
    try {
        const json = req.body.json
        const id=  req.body.id       
        const key=  req.body.key
        const jsonConvert = balanceSheet.jsonConvert(json,id,key)            
        const parameters = jsonConvert    
        generalClient.client(id)
        .then((response) => {
            const clientID = response
            console.log(parameters)
            const requestOptions = {
                method: 'post',
                url: 'http://kansas.helisa.com:9590/KansasWS/summary/balanceSheet',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',                                                    
                },
                data: parameters
            };  
            axios(requestOptions)
            .then(response => {
                console.log(response)
                return response
            } )                   
            .then(data => {      
                console.log(data)
                generalClient.insertHistory(6,data.status,json,JSON.stringify(data.data),clientID,null)                   
                res.status(data.status).send(data.data);                
            })
            .catch(error => {
                console.log(error)
                if(error.response){
                    generalClient.insertHistory(6,error.response.status,json,JSON.stringify(error.response.data),clientID,null)
                    res.status(error.response.status).send( error.response.data)
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
.route("/productStock")
.post((req,res) => {
    try {
        const json = req.body.json
        const id=  req.body.id       
        const key=  req.body.key
        const jsonConvert = productStock.jsonConvert(json,id,key)            
        const parameters = jsonConvert 
        generalClient.client(id)    
        .then((response) => {
            const clientID = response
            const requestOptions = {
                method: 'post',
                url: 'http://kansas.helisa.com:9590/KansasWS/summary/productStock',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',                                                    
                },
                data: parameters
            };  
            axios(requestOptions)
            .then(response => response)                   
            .then(data => {         
                generalClient.insertHistory(7,data.status,json,JSON.stringify(data.data),clientID,null)       
                return res.status(data.status).send(data.data);
            })
            .catch(error => {
                console.log(error)
                if(error.response){
                    generalClient.insertHistory(7,error.response.status,json,JSON.stringify(error.response.data),clientID,null)
                    res.status(error.response.status).send( error.response.data)
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


