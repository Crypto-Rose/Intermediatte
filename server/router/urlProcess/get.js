const express = require('express')
const moment = require('moment');
const axios = require('axios')
const db = require('../../connect')
const thirdParty = require('../general/structure/get/ThirdParty')
let router = express.Router();
let day = moment().format();

function insertHistory(code_service,status,response,year,id,client,date){  
    let dateFormat = new Date(parseInt(date))    
    const sqlInsertHistory = "INSERT INTO history_services (date,id_service,state,response,id_client,year,identification,date_petition) VALUES (?,?,?,?,?,?,?,?)"
    db.query(sqlInsertHistory,[day,code_service,status,response,client,year,id,dateFormat])    
}

router
.route("/thirdParty")
.post((req,res) => {       
    try{    
        const jsonConvert = thirdParty.jsonConvert(req.body.year,req.body.identity,req.body.id,req.body.date,req.body.key)            
        const consultClient = "SELECT code FROM clients WHERE client=?"
        db.query(consultClient,[req.body.id], (err,result) => {
            if(err){                    
                res.status(404).send('User not found')
            }else {        
                const requestOptions = {
                    method: 'post',
                    url: 'http://kansas.helisa.com:9590/KansasWS/get/thirdParty2_0',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',                                                    
                    },
                    data: jsonConvert
                };  
                axios(requestOptions)    
                .then(response => response)                   
                .then(data => {                            
                    insertHistory(8,data.status,JSON.stringify(data.data),req.body.year,req.body.identity,result[0].code,req.body.date)
                    return res.status(data.status).send(data.data);
                })
                .catch(error => {
                    console.log(error)
                    if(error.response){
                        insertHistory(8,error.response.status,JSON.stringify(error.response.data),req.body.year,req.body.identity,result[0].code,req.body.date)
                        res.status(error.response.status).send(error.response.data)
                    }                    
                })            
            }
        })
    }catch(e){
        return res.status(500).send('Hubo un problema, verifique sus datos.')
    }             
})

module.exports = router;
