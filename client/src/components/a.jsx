useEffect(()=>{
    console.log('ENTRA',props.listData)
    let resultado = [];
    props.listData.reduce(function(res, value) {

        // Creamos la posición del array para cada mes
        let mes = new Date(value.date).getMonth();
        resultado.push(value)
       
        if (!res[mes]) {
            res[mes] = { Mes: mes};
            
            // Inicializamos a 0 el valor de cada key
            Object.keys(value).forEach(function(key) {
                if(key != 'fecha'){
                    res[mes][key] = 0;
                }
            })
            console.log(res[mes])
            //resultado.push(res[mes])
        }
        
        // Sumamos el valor de cada clave dentro de un bucle
        Object.keys(value).forEach(function(key) {
            if(key != 'fecha'){
                res[mes][key] += value[key];
            }
        })

        return res;
    }, {});

    // Resultado:

    console.log(resultado)
},[])








let resultado = [];            
let a = props.listData.reduce(function(res, value) {
    const date = moment(value.date).format();   
    console.log(date)
    
    let mes = moment(date).format("M"); 
    res[mes] = { Mes: mes};
    console.log(res[mes])

}, {});
console.log(resultado,a)





let aux = {};
let count = 0
//Recorremos el res 
resultado.forEach(x => {
    if (!aux.hasOwnProperty(x.Mes)) {
        console.log(x.Mes)
        count++
        aux[x.Mes] = [];
    } 
    aux[x.Mes].push({
        mes: x.Mes,
        code: x.code,
        date: x.date,
        dete_petition: x.dete_petition,
        identification: x.identification,
        json: x.json,
        response: x.response,
        state: x.state,
        year: x.year
    });
});   