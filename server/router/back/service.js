
const signS = require('../firmed/Signature') 
const qs = require('qs');

function chooseService(codeservice,info,json,client,key){
    let data = 0
    //const jsonString = JSON.parse(JSON.stringify(json))                        
    //const jsonConvert = JSON.parse(jsonString); 
    try{           
        switch(codeservice){
            case 1: 

                data= 'ESto es una consulta'
            break;
            case 2: 
                data= 'ESto es una consulta'
            break;
            case 3: 
                data= 'ESto es una consulta'
            break;
            case 4: 
                data= 'ESto es una consulta'
            break;
            case 5: 
                data= 'ESto es una consulta'
            break;
            case 6: 
                data= 'ESto es una consulta'
            break;
            case 7: 
                data= 'ESto es una consulta'
            break;
            case 8:                
                try{
                    if(info.year !== null && info.id !== null && info.date !== null){
                        
                        const dayFormat = new Date(info.date).valueOf()                                               
                        const firm = info.year+'|'+info.id+'|'+dayFormat;
                        const signature = signS.sign(firm,key)                    
                        const parametersJson = qs.stringify({"year":info.year,"identity":info.id,"id":client,"date":dayFormat,"sign":signature});    
                        return parametersJson
                    }
                }catch(err){
                    console.log(err)
                    return false
                }
            break;
        }
    }catch(error){
    }    
    return data    
}

module.exports.chooseService = chooseService