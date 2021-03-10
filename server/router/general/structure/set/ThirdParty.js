const validator = require('../../validator/JsonThirdParty')
function jsonConvert(json,id,key){
    try{                                      
        const jsonString = JSON.parse(JSON.stringify(json))             
        const jsonConvert = JSON.parse(jsonString);   
        const jsonComplete= validator.jsonThirdParty(jsonConvert,id,key)
        return jsonComplete
    }catch(error){
        console.log(error)
        return 'Invalid'  
    }            
}

module.exports.jsonConvert = jsonConvert


