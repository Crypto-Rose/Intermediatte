
const express = require('express')
const db = require('../../connect')
const moment = require('moment');
const bcrypt = require('bcrypt');
const convertInformation = require('./convertInformation');
const saltRounds = 10
let day = moment().format();
let router = express.Router();

function insertHistory(code,status,json,response,client,year){
    const sqlInsertHistory = "INSERT INTO history_services (date,id_service,state,json,response,id_client,year) VALUES (?,?,?,?,?,?,?)"
    db.query(sqlInsertHistory,[day,code,status,json,response,client,year])   
}

function insertConsultHistory(code,status,response,year,id,client,date){

    const sqlInsertHistory = "INSERT INTO history_services (date,id_service,state,response,id_client,year,identification,date_petition) VALUES (?,?,?,?,?,?,?,?)"
    db.query(sqlInsertHistory,[day,code,status,response,client,year,id,date])   
}



router
.route("/api/insert")
.post((req,res) => {
    const state = req.body.state
    const sqlInsertState = "INSERT INTO states (name) VALUES (?);"
    db.query(sqlInsertState,[state],(err,result) => {
        console.log(result)
    })    
})


router 
.route("/register")
.post((req,res) => {
    const user = req.body.user
    const pass = req.body.password
    const client = req.body.client
    const key = req.body.key    
    const email = req.body.email

    const consultClient = "SELECT email FROM clients WHERE user=?";  
    db.query(consultClient,user,(err,result) => {               
        if(err){
            res.send({err: err})
        }             
        if(result.length > 0){           
            res.status(202).send({message: "User Exists"})                       
        } else {
            bcrypt.hash(pass,saltRounds, (err, hash) => {        
                if(err)
                    console.log(err)
                const registerClient = "INSERT INTO clients(date,client,`key`,user,password,state,email) VALUES (?,?,?,?,?,?,?)"
                db.query(registerClient,[day,client,key,user,hash,1,email],(err,result) => {               
                    console.log(err,result)                     
                });
            }) 
        }
    })     
})

router 
.route("/saveInfoClient")
.put((req,res) => {
    const user = req.body.user
    const client = req.body.client
    const email = req.body.email
    let verifyExist = 0
    console.log(user,email,client)
    const consultClient = "SELECT email,user FROM clients WHERE email!=?";  
    db.query(consultClient,client,(err,result) => {               
        if(err){          
            res.send({err: err})
        } 
        if(result.length > 0){   
            for(let i in result){
                if(result[i].email === email){

                    verifyExist = false
                    res.status(202).send('Email exists')

                } else if(result[i].user === user){

                    verifyExist = false
                    res.status(202).send('User exists')

                } else {
                    verifyExist = true
                }
            }                      
            
            if(verifyExist){
                const updateClient = "UPDATE clients SET user=?,email=? WHERE email=?"
                db.query(updateClient,[user,email,client],(err,result) => {               
                    res.status(200).send(result)                  
                });   
            }                                      
        }        
        /*if(result.length > 0){           
            const registerClient = "UPDATE clients SET user WHERE   INSERT INTO clients(date,client,`key`,user,password,state,email) VALUES (?,?,?,?,?,?,?)"
            db.query(registerClient,[day,client,key,user,hash,1,email],(err,result) => {               
                console.log(err,result)                     
            });   
        }  */                     
    })     
})

router
.route("/petitionGeneral")
.post(async (req,res) => {   
    const json = req.body.json
    const code = req.body.serviceCode
    const user = req.body.client
    console.log(user)
    try{
        const consultClient = "SELECT code,client,`key` FROM clients WHERE email=?"
        db.query(consultClient,[user], (err,result) => {            
            if(err){                    
                res.status(404).send('User not found')
            }
            const client = result[0].client
            const key = result[0].key
            const codeClient = result[0].code
            const convertJson = convertInformation.convertJsonAtKansas(json,client,key)
            console.log(convertJson)
            if(!convertJson){
                res.status(409).send('Datos invalidos en el Json') 
            }         
            const parametersKansas = convertJson  
            const consultService = "SELECT url FROM services WHERE code=?"
            db.query(consultService,[code], async(err,result) => {                  
                const serviceUrl= result[0].url
                await convertInformation.sendDataAtKansas(serviceUrl,parametersKansas)
                .then(response => response)                   
                .then(data => {   
                    insertHistory(code,data.status,json,JSON.stringify(data.data),codeClient)                                      
                    if(data.status !== 200 || code === 6 || code === 7){
                        res.status(data.status).send(data.data);                        
                    } else {
                        res.status(data.status).send('El proceso se completo exitosamente');
                    }                                                                                                          
                })
                .catch(error => {
                    console.log(error)
                    if(error.response){
                        insertHistory(code,error.response.status,json,JSON.stringify(error.response.data),codeClient) 
                        res.status(error.response.status).send(error.response.data)
                    }                        
                }) 
            })                       
        }) 
    }catch(e){        
        res.status(500).send('Error, Json invalido')                    
    }     
})


router
.route("/petitionYear")
.post((req,res) => {
    const json = req.body.json
    const code = req.body.serviceCode
    const user = req.body.client
    const year = req.body.year
    
    try{
        const consultClient = "SELECT code,client,`key` FROM clients WHERE email=?"
        db.query(consultClient,[user], (err,result) => {            
            if(err){                    
                res.status(404).send('User not found')
            }
            const client = result[0].client
            const key = result[0].key
            const codeClient = result[0].code
            const convertJson = convertInformation.convertAtKansas(json,year,client,key)
            if(!convertJson){
                res.status(409).send('Datos invalidos en el Json') 
            }  
            const parametersKansas = convertJson  
            const consultService = "SELECT url FROM services WHERE code=?"
            db.query(consultService,[code], (err,result) => {                  
                const serviceUrl= result[0].url
                convertInformation.sendDataAtKansas(serviceUrl,parametersKansas)
                .then(response => response)                   
                .then(data => {                                       
                    insertHistory(code,data.status,json,JSON.stringify(data.data),codeClient,year)      
                            
                    if(data.status !== 200 || code === 6){
                        res.status(data.status).send(data.data);                            
                    }                                           
                    res.status(data.status).send('El proceso se completo exitosamente');                                               
                })
                .catch(error => {
                    if(error.response){
                        insertHistory(code,error.response.status,json,JSON.stringify(error.response.data),codeClient,year) 
                        res.status(error.response.status).send(error.response.data)
                    }                        
                }) 
            })                       
        }) 
    }catch(e){        
        res.status(500).send('Error, Json invalido')                    
    }     
})


router
.route("/petitionConsult")
.post((req,res) => {
    const serviceCode = req.body.serviceCode
    const client = req.body.client
    const year = req.body.info.year
    const id = req.body.info.id
    const date = req.body.info.date

    try{
        const consultClient = "SELECT code,client,`key` FROM clients WHERE email=?"
        db.query(consultClient,[client], (err,result) => {
            if(err){                    
                res.status(202).send('Error al validar datos')
            }
            const codeClient = result[0].code
            const client = result[0].client
            const key = result[0].key
            const dayFormat = new Date(date).valueOf()
            const convertJson = convertInformation.convertDataAtKansas(year,id,client,dayFormat,key )
            if(!convertJson){
                res.status(409).send('Datos invalidos en el Json') 
            }
            const parametersKansas = convertJson
            const consultService = "SELECT url FROM services WHERE code=?" 
            db.query(consultService,serviceCode, (err,result) => {
                const url = result[0].url
                convertInformation.sendDataAtKansas(url,parametersKansas)  
                .then(response => response)                   
                .then(data => {  
                    insertConsultHistory(serviceCode,data.status,JSON.stringify(data.data),year,id,codeClient,date)                                                                                       
                    return res.status(data.status).send(data.data);                           
                })
                .catch(error => {
                    console.log(error)
                    if(error.response){
                        insertConsultHistory(serviceCode,error.response.status,JSON.stringify(error.response.data),year,id,codeClient,date) 
                        res.status(error.response.status).send(error.response.data)
                    }                        
                })
            })                                                    
        })
    }catch(e){       
        res.status(500).send('Error, Json invalido')                    
    }     
})


router
.route("/petitionFile")
.post((req,res) => {
    const multipleJsons = req.body.multipleJsons
    const serviceCode = req.body.serviceCode
    const clientPm = req.body.client
    let responseGood = []
    
    try{
        const consultClient = "SELECT code,client,`key` FROM clients WHERE email=?"
        db.query(consultClient,[clientPm], (err,result) => {
            if(err){                    
                res.status(202).send('Error al validar datos')
            }else {                     
                for(let keys in multipleJsons){
                    convertInformation.convertJsonAtKansas(multipleJsons[keys],result[0].client,result[0].key )                                                                                                                  
                    .then(data => {  
                        const parametersKansas = data                         
                        const consultService = "SELECT url FROM services WHERE code=?" 
                        db.query(consultService,serviceCode, (err,result) => {
                            const url = result[0].url
                            convertInformation.sendDataAtKansas(url,parametersKansas)
                            .then(response =>{  
                                responseGood.push(response.status)  
                                if(multipleJsons.length === responseGood.length) 
                                    res.status(200).json({status:responseGood})   
                            })                                                              
                            .catch(err => {                               
                                if(err.response){
                                    responseGood.push(err.response.status)                                         
                                    if(multipleJsons.length === responseGood.length) 
                                        res.status(200).json({status:responseGood})                            
                                }                                    
                            })                        
                        })
                    })
                    .catch(error => {
                        console.log(error) 
                        res.status(409).send('Datos invalidos en el Json')                      
                    })                                              
                }
            }
        })
    }catch(e){       
        res.status(500).send('Error, Json invalido')                    
    }     
})



    module.exports = router




/*
function updateHistory(code,status,json,response,year){
    
    const upd = "UPDATE history_services SET date=?,state=?,json=?,year=?,response=? WHERE code=?"
    db.query(upd,[day,status,json,response,year,code])
}


function updateConsultHistory(code,status,response,year,id,date,json){
    let dateFormat = 0
    console.log(date)
    if(date !== undefined)
        dateFormat = moment(date,"YYYY-MM-DD HH:mm").format()
    else 
        dateFormat = null
        
    const upd = "UPDATE history_services SET date=?,state=?,response=?,year=?,identification=?,date_petition=?,json=? WHERE code=?"
    db.query(upd,[day,status,response,year,id,dateFormat,json,code])
}

router
.route("/petition")
.put((req,res) => {

    const codeJson = req.body.codeJson  
    const serviceCode = req.body.serviceCode
    console.log(serviceCode)
    const client = req.body.client
    const json = req.body.json

    let resultService=false

    try{                          
        const consultClient = "SELECT client,`key` FROM clients WHERE email=?"
        db.query(consultClient,[client], (err,result) => {
            if(err){                    
                res.status(202).send('Error al validar datos')
            }else {                   
                const client = result[0].client
                const key = result[0].key
                const jsonString = JSON.parse(JSON.stringify(json))                        
                const jsonConvert = JSON.parse(jsonString);                
            
                if (jsonConvert) {   
                    const consultService = "SELECT url FROM services WHERE code=?"                                                                                                                                                     
                    db.query(consultService,serviceCode, (err,result) => {                                                
                        const url = result[0].url
                        const signature = signS.sign(jsonString,key)                    
                        const parametersJson = qs.stringify({"json":jsonString,"id":client,"sign":signature});      
                        const requestOptions = {
                            method: 'post',
                            url: 'http://kansas.helisa.com:9590/KansasWS/'+url,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',                                                    
                            },
                            data: parametersJson
                        };                                      
                        axios(requestOptions)
                        .then(response => {                                          
                            return response
                        })                   
                        .then(data => {  
                            console.log(data)      
                            updateHistory(codeJson,data.status,json,JSON.stringify(data.data))                                          
                            if(data.status !== 200)                                      
                                return res.status(data.status).send(data.data);
                            else 
                                return res.status(data.status).send('El proceso se completo exitosamente');
                        })
                        .catch(error => {
                            console.log(error)
                            updateHistory(codeJson,error.response.status,json,JSON.stringify(error.response.data)) 
                            res.status(error.response.status).send(error.response.data)
                        })
                    })                                
                } else {
                    res.status(409).send('Datos invalidos en el Json')            
                }          
            }                        
        }) 
        
    }catch(e){        
        res.status(500).send('Error, Json invalido')                    
    }    

    router
.route("/consultPetition")
.put((req,res) => {

    const serviceCode = req.body.serviceCode
    const client = req.body.client
    const year = req.body.info.year
    const id = req.body.info.id
    const date = req.body.info.date
    const json = req.body.info.json
    const code = req.body.info.code
    let parametersJson = 0
    let jsonConvert = 0

    try{                          
        const consultClient = "SELECT client,`key` FROM clients WHERE email=?"
        db.query(consultClient,[client], (err,result) => {
            if(err){                    
                res.status(202).send('Error al validar datos')
            }else {                   
                const client = result[0].client
                const key = result[0].key
                if(!json){
                    const dayFormat = new Date(date).valueOf()                                               
                    const firm = year+'|'+id+'|'+dayFormat;
                    const signature = signS.sign(firm,key)                    
                    parametersJson = qs.stringify({"year":year,"identity":id,"id":client,"date":dayFormat,"sign":signature});    
                }else {
                    const jsonString = JSON.parse(JSON.stringify(json)) 
                    jsonConvert = JSON.parse(jsonString);                                          
                    const signature = signS.sign(jsonString,key)                    
                    parametersJson = qs.stringify({"json":jsonString,"id":client,"sign":signature});    
                }
            
                if ((year !== null && id !== null && date !== null) || jsonConvert) {   
                    const consultService = "SELECT url FROM services WHERE code=?"                                                                                                                                                     
                    db.query(consultService,serviceCode, (err,result) => {                                                
                        const url = result[0].url
                        const requestOptions = {
                            method: 'post',
                            url: 'http://kansas.helisa.com:9590/KansasWS/'+url,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',                                                    
                            },
                            data: parametersJson
                        };                                      
                        axios(requestOptions)
                        .then(response => {                                          
                            return response
                        })                   
                        .then(data => {  
                            console.log(data)
                            updateConsultHistory(code,data.status,JSON.stringify(data.data),year,id,date,json)                                                                                       
                            return res.status(data.status).send(data.data);                           
                        })
                        .catch(error => {
                            console.log(error)
                            updateConsultHistory(code,error.response.status,JSON.stringify(error.response.data),year,id,date,json) 
                            res.status(error.response.status).send(error.response.data)
                        })
                    })                                
                } else {
                    res.status(409).send('Datos invalidos en el Json')            
                }          
            }                        
        }) 
        
    }catch(e){        
        res.status(500).send('Error, Json invalido')                    
    }    
})

})*/