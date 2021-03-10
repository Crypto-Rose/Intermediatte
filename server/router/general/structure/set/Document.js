const validator = require('../../validator/JsonDocument')
function jsonConvert(json,id,key){
    try{            
        const handle = json; 
        const handleId = id; 
        const handleKey = key; 

        console.log(handle)                               
        const jsonString = JSON.parse(JSON.stringify(handle))             
        const jsonConvert = JSON.parse(jsonString);   
        console.log(jsonConvert)
        const jsonComplete= validator.jsonDocument(jsonConvert,handleId,handleKey)
        return jsonComplete
    }catch(error){
        console.log(error)
        return 'Invalid'  
    }        
    
}

module.exports.jsonConvert = jsonConvert
