 async function obtenerDatos() {
     const res = await fetch('https://mindicador.cl/api');
     const data = await res.json();

     return data;
}


async function obtenerDatosHistoricos(moneda, fecha){
    const res = await fetch(`https://mindicador.cl/api/${moneda}/${fecha}`);
    const data = await res.json();

    return data;

}

async function construyeSelect() {
    const data = await obtenerDatos();
    
   
    const monedas = (Object.keys(data));
    let html = '<select name="moneda" id="moneda">';
    for (const codigo_moneda of monedas){
        const  moneda = data[codigo_moneda]
       // const moneda = data[codigo_moneda];
        if(moneda.unidad_medida == 'Pesos') {
           html+=  `<option value="${moneda.codigo}-${moneda.valor}">${moneda.nombre}</option>`;
        }
        
    }
    html += '</select>'

    const selector = document.querySelector('#selector');
    selector.innerHTML = html;     
}


function dibujaGrafico(fechas, valores){
    const ctx = document.querySelector('#myChart');
       

    const data = {
      labels: fechas,
      datasets: [{
          label: 'Historico',
          data: valores,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
    }]
};
  
    new Chart(ctx, {
      type: 'line',
      data: data,

    });
}



const btnCalcular = document.querySelector('#btnCalcular');

btnCalcular.addEventListener('click', async function (){
    const valor = document.querySelector('#valor').value;
    tasaYMoneda = document.querySelector('#moneda').value.split('-');


    const valorConvertido = valor/tasaYMoneda[1];

    document.querySelector('#resultado').innerHTML = valorConvertido.toFixed(2);


    const codigoMoneda = tasaYMoneda[0];
    const fechaActual = new Date();
   
    let fechas = [];  
    let valores = [];
   
    let ultimoValor = 0;
    for(i = 10;i > 0;i--){
       const dia = fechaActual.getDate()-i;
       const mes = fechaActual.getMonth()+1;
       const aso = fechaActual.getFullYear();

       const fechaConsulta = `${dia}-${mes}-${aso}`;
       

       const dataHistorica = await obtenerDatosHistoricos(codigoMoneda, fechaConsulta);
      
       
       
       fechas.push(fechaConsulta); 
       if (dataHistorica.serie.length > 0){   
           valores.push(dataHistorica.serie[0].valor);
           ultimoValor = dataHistorica.serie[0].valor;
       } else {
            valores.push(ultimoValor);
          }
       }


    dibujaGrafico(fechas, valores );

});


construyeSelect();








































// ////////////////////////

// const employees = ["Alexander", "Anna" , "Zion"]


// const results = []
// for (let i = 0; i < employees.length; i++){
//     if(employees[i].length > 4)
//     results.push(employees[i])
// }

// console.log(results)

// /////////////////////////

// const results2 = []
// employees.forEach(employee => {
//     if(employee.length > 4)
//        result2.push(employee)
// })

// const rusults3 =  employees.filter(employee => employee.length > 4)
// console.log(results3)


// ///////////////////


// const array1 = ['a','b','c'];


// for (const element of array1) {
//     console.log(element);
// }


// const  results4 = []
// for (const employee of employees) {
//     if (employee.length > 4)
//          results4.push(employee)
// }

