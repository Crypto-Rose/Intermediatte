const moment = require('moment');
const db = require('../../connect')
let day = moment().format();

const clientProcess = (id_client) => {
    const consultClient = "SELECT code FROM clients WHERE client=?"
    return new Promise ((resolve,reject)=>{
        db.query(consultClient,[id_client], (err,result) => {                
            if(err !== null){                
                reject(new DOMException("User not found"))
            }   else {
                resolve(result[0].code)
            }                
        })
    })
}

const client = async (id) => {     
    return await clientProcess(id)    
}

const insertHistory = (code,status,json,response,client,year) => {
    const sqlInsertHistory = "INSERT INTO history_services (date,id_service,state,json,response,id_client,year) VALUES (?,?,?,?,?,?,?)"
    db.query(sqlInsertHistory,[day,code,status,json,response,client,year]            )   
}

module.exports = { client,insertHistory }
