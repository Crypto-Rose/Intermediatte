
function color(data){       
    switch(data){
        case "200": 
            return "btn btn-outline-success"
        case "202":
            return "btn btn-outline-primary"
        case "409":
            return "btn btn-outline-info"
        case "423":
            return "btn btn-outline-dark"
        case "500":
            return "btn btn-outline-warning"
        default:
            return "btn btn-outline-secondary"
    }         
}

function informativeText(data){
    switch(data){
        case 200: 
            return "finalizo con exito"
        case 202: 
            return "contiene un error en el json"
        case 409:
            return "contiene conflictos con los tipos de datos"
        case 423:
            return "fue enviada cuando teniamos problemas internos, intentelo de nuevo mas tarde"
        case 500:
            return "contiene problemas con los datos enviados"
        default:
            return "contiene algun error"
    }                
}

function colorInformative(data){
    switch(data){
        case 200: 
            return "#0eb50b"
        case 202: 
            return "#e08600"
        case 409:
            return "#b50bb0"
        case 423:
            return "#1568ff"
        case 500:
            return "#b50b0b"
        default:
            return "#000"
    }                
}

export {informativeText,color,colorInformative}