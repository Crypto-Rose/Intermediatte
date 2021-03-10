const XLSX = require('xlsx')

const readUploadedFileAsText = (file) => {
    let fileReader = new FileReader();

    return new Promise((resolve,reject) => {
        fileReader.onerror = () => {
            fileReader.abort()
            reject(new DOMException("Problem parsing input file"))
        }
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.readAsBinaryString(file)
        
    })
}

const ExcelExport = async (file,header) =>{
    const fileContent = await readUploadedFileAsText(file)   
    let workbook = XLSX.read(fileContent,{type:"binary"});
    const wsName = workbook.SheetNames[0];
    let ws = workbook.Sheets[wsName]    
    return XLSX.utils.sheet_to_json(ws,{skipHeader:false,header:header}) 
}

export default ExcelExport