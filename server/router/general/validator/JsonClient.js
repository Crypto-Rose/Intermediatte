const signS = require('../../firmed/Signature')
const qs = require('qs');

function jsonClient(json,id,key) {

        const getJson = json   
        const getId = id
        const getKey = key    
        if (getJson && getId && getKey) {
            const jsonData = JSON.stringify(getJson)  
            const signature = signS.sign(jsonData,getKey)
            //const parametersJson = 'json=' + jsonData + '&id=' + getJson.id + '&sign=' + signature;           
            const parametersJson = qs.stringify({"json":jsonData,"id":getId,"sign":signature});
            return parametersJson
        } else {
            return 'Invalited Json, second page'
        }
}

module.exports.jsonClient = jsonClient
