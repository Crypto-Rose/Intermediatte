const signS = require('../../../firmed/Signature')
const qs = require('qs');

function jsonConvert(year,identity,id,date,key){
    try{   
        const dataSign = year+'|'+identity+'|'+date
        const signature = signS.sign(dataSign,key)
        const parametersJson = qs.stringify({"year":year,"identity":identity,"id":id,"date":date,"sign":signature});                 
        return parametersJson
    }catch(error){
        return 'Invalid'  
    }        
}

module.exports.jsonConvert = jsonConvert


