const qs = require('qs');
const axios = require('axios')
const signS = require('../firmed/Signature') 

const convertJsonAtKansas = (dataOfJson,client,key) => {
    const jsonString = JSON.stringify(dataOfJson)   
    jsonConvert = JSON.parse(jsonString);    
    const signature = signS.sign(jsonConvert,key)  
    console.log(jsonConvert,client,signature)  
    return qs.stringify({"json":jsonConvert,"id":client,"sign":signature});     

}

const convertAtKansas = (dataOfJson,year,client,key) => {
    const jsonString = JSON.stringify(dataOfJson)   
    jsonConvert = JSON.parse(jsonString);    
    const signature = signS.sign(jsonConvert,key)  
    console.log(jsonConvert)  
    return qs.stringify({"json":jsonConvert,"year":year,"id":client,"sign":signature});     

}

const convertDataAtKansas = (year,id,client,date,key) => {
    const dayFormat = new Date(date).valueOf()                                               
    const firm = year+'|'+id+'|'+dayFormat;
    const signature = signS.sign(firm,key)                    
    return qs.stringify({"year":year,"identity":id,"id":client,"date":dayFormat,"sign":signature});    

}

const sendDataAtKansas=( async (url,parametersKansas)=>{
    console.log(parametersKansas)  
    const resulut = await axios({
        method: 'post',
        url: 'http://kansas.helisa.com:9590/KansasWS/'+url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',  
            'Access-Control-Allow-Origin':'*',    
            'Access-Control-Allow-Methods': 'GET, POST, PUT',
            'Access-Control-Allow-Headers':'*'                             
        },
        data: parametersKansas
    })  
    return resulut;
})




module.exports = { convertJsonAtKansas,sendDataAtKansas,convertDataAtKansas,convertAtKansas }