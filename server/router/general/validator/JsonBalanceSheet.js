const signS = require('../../firmed/Signature')
const qs = require('qs');

function jsonBalanceSheet(json,id,key) {

    if (json && id && key) {
        const jsonData = JSON.stringify(json)  
        const signature = signS.sign(jsonData,key)
        console.log(jsonData)
        //const parametersJson = 'json=' + jsonData + '&id=' + getJson.id + '&sign=' + signature + '';
        const parametersJson = qs.stringify({"json":jsonData,"id":id,"sign":signature});
        console.log(parametersJson)
        return parametersJson
    } else {
        return 'Invalited Json, second page'
    }
}

    module.exports.jsonBalanceSheet = jsonBalanceSheet
