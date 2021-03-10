const XLSX = require('xlsx')
const { saveAs } = require('file-saver') 

function saveAsExcel(dataComplet){
    const worksheet = XLSX.utils.json_to_sheet([dataComplet]);
    const workbook = {
        Sheets:{
            'data':worksheet
        },
        SheetNames:['data']
    }
    const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'})
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data = new Blob([excelBuffer],{type: EXCEL_TYPE})
    saveAs(data,'KANSAS_export_'+new Date().getTime()+EXCEL_EXTENSION)
}

module.exports = { saveAsExcel }