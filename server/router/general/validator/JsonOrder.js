const signS = require('../../firmed/Signature')
const qs = require('qs');

function jsonOrder(json,year,id,key) {
    

        if (json && year && id && key) {
            const jsonData = JSON.stringify(json)  
            const signature = signS.sign(jsonData,key)
            //const parametersJson = 'json='+jsonData+'&year='+getJson.year+'&id='+getJson.id+'&sign='+signature;
            const parametersJson = qs.stringify({"json":jsonData,"year":year,"id":id,"sign":signature});
            return parametersJson
        } else {
            return 'Invalited Json, second page'
        }
    }


module.exports.jsonOrder = jsonOrder
