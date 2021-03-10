const validator = require('../../validator/JsonBalanceSheet')
function jsonConvert(json,id,key){
    try{                                           
        const jsonString = JSON.parse(JSON.stringify(json))             
        const jsonConvert = (JSON.parse(jsonString));   
        const jsonComplete= validator.jsonBalanceSheet(jsonConvert,id,key)
        console.log(jsonComplete)
        return jsonComplete
    }catch(error){
        console.log(error)
        return 'Invalid'  
    }        
    
}

module.exports.jsonConvert = jsonConvert


