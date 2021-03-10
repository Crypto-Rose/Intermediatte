const validator = require('../../validator/JsonClient')
function jsonConvert(json,id,key){
    try{            
        const handle = json; 
        const handleId = id; 
        const handleKey = key; 
        
        const jsonString = JSON.parse(JSON.stringify(handle))             
        const jsonConvert = JSON.parse(jsonString);           
        const jsonComplete= validator.jsonClient(jsonConvert,handleId,handleKey)
        return jsonComplete
    }catch(error){
        return 'Invalid'  
    }        
    
}

module.exports.jsonConvert = jsonConvert