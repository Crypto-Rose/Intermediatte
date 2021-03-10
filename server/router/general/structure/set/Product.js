const validator = require('../../validator/JsonProduct')
function jsonConvert(json,year,id,key){
    try{            
        const handle = json; 
        const handleYear = year
        const handleId = id; 
        const handleKey = key;  

        const jsonString = JSON.parse(JSON.stringify(handle))             
        const jsonConvert = (JSON.parse(jsonString));   
        console.log(jsonConvert)
        const jsonComplete= validator.jsonProduct(jsonConvert,handleYear,handleId,handleKey)
        return jsonComplete
    }catch(error){
        console.log(error)
        return 'Invalid'  
    }        
    
}

module.exports.jsonConvert = jsonConvert


