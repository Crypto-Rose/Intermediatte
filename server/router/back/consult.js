const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../../connect')
const signS = require('../firmed/Signature'); 
const axios = require('axios');
let router = express.Router();


router
.route("/state")
.get((req,res) => { 
    const sqlSelectState = "SELECT code,name FROM states";  
    db.query(sqlSelectState,(err,result) => {
        return res.send(result)         
    })  
})

router
.route("/history")
.post((req,res) => { 
    const code = req.body.serviceCode
    const client = req.body.client
    const consultClient = 'SELECT code FROM clients WHERE email=?'
    db.query(consultClient,client,(error,response)=>{

        if(error)
            console.log(error)

        if(response.length > 0){            
            const sqlSelectHistory = "SELECT code,date,json,response,state,year,identification,date_petition FROM history_services WHERE id_service=? AND id_client=? ORDER BY date DESC";  
            db.query(sqlSelectHistory,[code,response[0].code],(err,result) => {  
                if(err)
                    console.log(err)
                return res.send(result)        
            }) 
        }
    })    
})

router
.route("/login")
.post((req,res) => {
    const password = req.body.password
    const user = req.body.user

    const sqlSelectHistory = "SELECT email,password FROM clients WHERE user=? AND state=?";  
    db.query(sqlSelectHistory,[user,1],(err,result) => {               
        if(err){
            res.send({err: err})
        }             
        if(result.length > 0){
            bcrypt.compare(password, result[0].password,(error,response) =>{
                if(response){
                    req.session.user = result
                    req.session.save();                    
                    res.status(200).send(result)
                } else {
                    res.status(202).send({message: "Wrong user/pass combination!!!"})        
                }                       
            })
        } else {
            res.status(202).send({message: "User doesn't exist"})
        }
    });
})

router
.route("/verifyEmail")
.post((req,res) => {     
    const email = req.body.email        
    if(email){
        const consultEmail = "SELECT code FROM clients WHERE email=?";  
        db.query(consultEmail,[email],(err,result) => {          
            if(result.length > 0)
                res.status(200).send(result)  
            else 
                res.status(404).send('Usuario no encontrado, vuelva a intentar')  
        })          
    }
   
})

router
.route("/service")
.get((req,res) => { 
    const sqlSelectState = "SELECT code,name AS title,url,category FROM services";  
    db.query(sqlSelectState,(err,result) => {       
        return res.send(result)         
    })  
})

router
.route("/status")
.post((req,res) => { 
    const client = req.body.client        
    const state = req.body.state  
    const consultClient = 'SELECT code FROM clients WHERE email=?'
    db.query(consultClient,client,(error,response)=>{
        if(error === null){
            const code_client = response[0].code
            const sqlSelectState = "SELECT hs.code,hs.date,hs.id_service,hs.state,hs.json,hs.response,s.name AS nameService,hs.year,hs.identification,hs.date_petition FROM history_services hs LEFT JOIN services s ON s.code=hs.id_service WHERE hs.id_client=? AND hs.state=?";  
            db.query(sqlSelectState,[code_client,state],(err,result) => { 
                if(err){
                    console.log(err)      
                    return
                }                    
                return res.send(result)         
            })  
        }
    })    
})

router
.route("/perfil")
.post((req,res) => { 
    const client = req.body.client           
    const consultClient = 'SELECT date,client AS id,`key`,user,state,email,name FROM clients WHERE email=?'
    db.query(consultClient,[client],(err,result) => { 
        if(err){
            console.log(err)      
            return
        }                    
        res.send(result)         
    })     
})

router
.route("/verifyConnection")
.post((req,res) => {     
    const client = req.body.client        
    
    const consultConnection = "SELECT client,`key` FROM clients WHERE email=?";  
    db.query(consultConnection,[client],(err,result) => {          
        console.log(err,result)
        if(err){
            res.status(202).send('Hubo un problema')
        }
        console.log('id='+(result[0].client))
        const signature = signS.sign('id='+(result[0].client),result[0].key)
        console.log(signature)

        const requestOptions = {
            method: 'get',
            url: 'http://200.7.97.54:9590/KansasWS/get/test?id='+result[0].client+'&sign='+signature,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',  
                'Access-Control-Allow-Origin':'*',    
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
                'Access-Control-Allow-Headers':'*'                                           
            },          
        };  
        axios(requestOptions)
        .then(response => response)                   
        .then(data => {  
            console.log(data)
            res.status(200).send(data.data)
        })
        .catch(error => {
            console.log(error)
            res.status(202).send(error)            
        })

    })             
})

module.exports = router;
