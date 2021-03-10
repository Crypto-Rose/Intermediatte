const general="http://localhost:3000"

function service(code) {    
    let url = ''

    switch(code){
        case 1:
            url={ pathname: '/home/services/client' }
        break;
        case 2:
            url={ pathname: '/home/services/document' }
        break;
        case 3:
            url={ pathname: '/home/services/order' }
        break;
        case 4:
            url={ pathname: '/home/services/product' }
        break;
        case 5:
            url={ pathname: '/home/services/iu/thirdParty' }
        break;
        case 6:
            url={ pathname: '/home/services/balanceSheet' }
        break;
        case 7:
            url={ pathname: '/home/services/productStock' }
        break;
        case 8:
            url={ pathname: '/home/services/thirdParty' }
        break;    
        default:
            url={ pathname: '/home' }
        break;   
    }
    return url;
}

function serviceCode(service) {    
    let code = ''

    switch(service){
        case 'client':
            code=1
        break;
        case 'document':
            code=2
        break;
        case 'order':
            code=3
        break;
        case 'product':
            code=4
        break;
        case 'iu':
            code=5
        break;
        case 'balanceSheet':
            code=6
        break;
        case 'productStock':
            code=7
        break;
        case 'thirdParty':
            code=8
        break;    
        default:
            code=0
        break;   
    }
    return code;
}

module.exports = { general,service,serviceCode }