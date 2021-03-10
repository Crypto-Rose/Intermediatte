const changeDatainImport = (data,code) => {

    switch(code){
        case 1: 
            data.client["documentTypeTag"] = data.client.documentType.tag
            data.client["natureValue"] = data.client.nature.value            
            data.client["regimenTag"] = data.client.regimen.tag

            delete data.client["documentType"]  
            delete data.client["nature"]  
            delete data.client["regimen"]                     
            return data.client
        case 2: 
            data.document["dateDay"] = data.document.date.day
            data.document["dateMonth"] = data.document.date.month
            data.document["dateYear"] = data.document.date.year
            data.document["documentType"] = data.document.document.type
            data.document["documentNumber"] = data.document.document.number
            for(let i = 0; i < data.document.transactions.length; i++ ){
                if(data.document.transactions[i].originDocument)
                    data.document[[i]+"-transactions_originDocument"] = data.document.transactions[i].originDocument
                if(data.document.transactions[i].matchCode)
                    data.document[[i]+"-transactions_matchCode"] = data.document.transactions[i].matchCode
                if(data.document.transactions[i].nature.tag)
                    data.document[[i]+"-transactions_nature_Tag"] = data.document.transactions[i].nature.tag
                if(data.document.transactions[i].constCenter)
                    data.document[[i]+"-transactions_cost_Center"] = data.document.transactions[i].constCenter
                if(data.document.transactions[i].concept)
                    data.document[[i]+"-transactions_concept"] = data.document.transactions[i].concept
                if(data.document.transactions[i].accountingClass.value)
                    data.document[[i]+"-transactions_accountingClass_value"] = data.document.transactions[i].accountingClass.value
                if(data.document.transactions[i].value)
                    data.document[[i]+"-transactions_value"] = data.document.transactions[i].value
                if(data.document.transactions[i].idThirdParty)
                    data.document[[i]+"-transactions_idThirdParty"] = data.document.transactions[i].idThirdParty
                if(data.document.transactions[i].account)
                    data.document[[i]+"-transactions_account"] = data.document.transactions[i].account
                if(data.document.transactions[i].userCode)
                    data.document[[i]+"-transactions_userCode"] = data.document.transactions[i].userCode
                if(data.document.transactions[i].taxBase)
                    data.document[[i]+"-transactions_taxBase"] = data.document.transactions[i].taxBase
                if(data.document.transactions[i].businessCode)
                    data.document[[i]+"-transactions_businessCode"] = data.document.transactions[i].businessCode
                if(data.document.transactions[i].bankAccount)
                    data.document[[i]+"-transactions_bankAccount"] = data.document.transactions[i].bankAccount
                if(data.document.transactions[i].bankCheck)
                    data.document[[i]+"-transactions_bankCheck"] = data.document.transactions[i].bankCheck
                if(data.document.transactions[i].bankOperation)
                    data.document[[i]+"-transactions_bankOperation"] = data.document.transactions[i].bankOperation
                if(data.document.transactions[i].bankCheckDate){
                    data.document[[i]+"-transactions_bankCheckDate_day"] = data.document.transactions[i].bankCheckDate.day
                    data.document[[i]+"-transactions_bankCheckDate_month"] = data.document.transactions[i].bankCheckDate.month
                    data.document[[i]+"-transactions_bankCheckDate_year"] = data.document.transactions[i].bankCheckDate.year                            
                } 
                if(data.document.transactions[i].accountingTransactionClient){
                    data.document[[i]+"-transactions_accountingTransactionClient_clientCode"] = data.document.transactions[i].bankCheckDate.clientCode
                    data.document[[i]+"-transactions_bankCheckDate_Month"] = data.document.transactions[i].bankCheckDate.month
                    data.document[[i]+"-transactions_bankCheckDate_Year"] = data.document.transactions[i].bankCheckDate.year                            
                } 

                if(data.document.transactions[i].accountingTransactionSupplier){
                    data.document[[i]+"-transactions_accountingTransactionSupplier_supplierCode"] = data.document.transactions[i].accountingTransactionSupplier.supplierCode
                    if(data.document.transactions[i].accountingTransactionSupplier.expirationDate){
                        data.document[[i]+"-transactions_accountingTransactionSupplier_expirationDate_day"] = data.document.transactions[i].accountingTransactionSupplier.expirationDate.day
                        data.document[[i]+"-transactions_accountingTransactionSupplier_expirationDate_month"] = data.document.transactions[i].accountingTransactionSupplier.expirationDate.month
                        data.document[[i]+"-transactions_accountingTransactionSupplier_expirationDate_year"] = data.document.transactions[i].accountingTransactionSupplier.expirationDate.year
                    }
                    data.document[[i]+"-transactions_accountingTransactionSupplier_paymentForm"] = data.document.transactions[i].accountingTransactionSupplier.paymentForm
                    data.document[[i]+"-transactions_accountingTransactionSupplier_affectDocument"] = data.document.transactions[i].accountingTransactionSupplier.affectDocument                            
                    if(data.document.transactions[i].accountingTransactionSupplier.affectDate){
                        data.document[[i]+"-transactions_accountingTransactionSupplier_affectDate_day"] = data.document.transactions[i].accountingTransactionSupplier.affectDate.day
                        data.document[[i]+"-transactions_accountingTransactionSupplier_affectDate_month"] = data.document.transactions[i].accountingTransactionSupplier.affectDate.month
                        data.document[[i]+"-transactions_accountingTransactionSupplier_affectDate_year"] = data.document.transactions[i].accountingTransactionSupplier.affectDate.year
                    }
                    data.document[[i]+"-transactions_accountingTransactionSupplier_affectFee"] = data.document.transactions[i].accountingTransactionSupplier.affectFee
                }                                        
            }            
            return data.document
        default:
            return 0
    }
}

const header = (codeServices) => { 
    let previousHeader = 0
    switch(codeServices){
        case 1:
            previousHeader = ["portfolio","id","checkDigit","documentTypeTag","name","address","telephones","cellphone","fax","city","email","zone","group","free1","free2","toleranceDays","maxCredit","regimenTag","paymentForm","cree","economicActivity","natureValue","firstName","secondName","firstLastName","secondLastName","year","applyRteFte","applyMaxRteFte","applyMaxRteIva","applyMaxRteIca","areaIca","contactName","contactPhone","contactEmail","idVendor","accountPortfolio","priceListServices","priceListArticules"]
        break;
        case 2:
        break;
        case 6:
        break;
        case 8:
        break;
        default:
            previousHeader = []
        break;
    }
    return previousHeader
}


const changeDataInFile = (serviceCode,json) =>{   

    let multipleJsons = []
    switch(serviceCode){
        case 1:
            for (let key = 1; key < json.length; key++){

                json[key]["id"] = String(json[key].id) 
        
                if(json[key].checkDigit){
                    json[key]["checkDigit"] = String(json[key].checkDigit)
                }
        
                if(json[key].telephones){
                    json[key]["telephones"] = String(json[key].telephones)
                }
                
                if(json[key].city){
                    json[key]["city"] = String(json[key].city)
                }
        
                if(json[key].documentTypeTag){
                    json[key]["documentType"] = {tag:json[key].documentTypeTag}
                    delete  json[key]["documentTypeTag"] 
                }
                
                if(json[key].regimenTag){
                    json[key]["regimen"] = {tag:json[key].regimenTag}
                    delete  json[key]["regimenTag"] 
                } 
                
        
                if(json[key].natureValue){
                    json[key]["nature"] = {value:json[key].natureValue}
                    delete json[key]["natureValue"] 
                }  

                if(json[key].contactPhone){
                    json[key]["contactPhone"] = String(json[key].contactPhone)
                }
        
                if(json[key].accountPortfolio){
                    json[key]["accountPortfolio"] = String(json[key].accountPortfolio)
                }
        
                if(json[key].idVendor){
                    json[key]["idVendor"] = String(json[key].idVendor)
                }
        
                multipleJsons.push({client:json[key]})                
            }
        break;
        case 2:
        break;
        case 6:
        break;
        case 8:
        break;
        default:
            multipleJsons = []
        break;
    }

    return multipleJsons
}


module.exports = { changeDatainImport,changeDataInFile,header }