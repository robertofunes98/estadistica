var htDataGrid;
var headers;

//varables para medidas de tendencia central
let totalDataCount=0;

$( document ).ready(function() {
    initGrid();
    
});

function initGrid()
{
    headers = ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6', 'Variable 7'];

    var data = new Array(30);

    for (let i = 0; i < data.length; i++) {
        data[i]=new Array(26);
    }

    var container = document.getElementById('dataGrid');

    htDataGrid = new Handsontable(container, {
        data:data,
        rowHeaders: true,
        colHeaders: true,
        filters: true,
        dropdownMenu: true,
        licenseKey: 'non-commercial-and-evaluation',
        manualColumnResize: true,
        outsideClickDeselects: false,
        bindRowsWithHeaders: 'strict',
        autoColumnSize: true,
        language: 'es-MX'/*,
        /*afterChange: (changes) => {
            changes.forEach(([row, prop, oldValue, newValue]) => {
                checkColumns();
            });
          }*/
    });

    console.log("data grid iniciado ");
}

function checkColumns(){
    $('#cbxOptions').val(null).trigger('change');
   
    var columnsWithData = [];
    for (let index = 0; index < 26; index++) {
        var evaluationData = htDataGrid.getSourceDataAtCol(index);
        

        evaluationData.forEach(element => {
            if(element!=undefined && element!=NaN){
                if(columnsWithData.indexOf(index)==-1){
                    columnsWithData.push(index);
                    
                    $("#cbxOptions").append("<option value='"+index+"' id='"+index+"'>"+htDataGrid.getColHeader(index)+"</option>");
                }
            }
        });
    }
    console.log(columnsWithData);
  
    
   return columnsWithData;

}
function changeVariableName()
{

    var number = htDataGrid.getSelected();

    number[0][1,3]

    if(number[0][1] == number[0][3])
    {
        var inputVariableName = document.getElementById('variableName');

        headers[number[0][1]]=inputVariableName.value;
        //temporalmente cree en base a otros procesos que halle en la doc
        //no he hallado una propia que de la documentacion pero funciona
        htDataGrid.updateSettings({
            colHeaders: headers
        });

        htDataGrid.getPlugin('AutoColumnSize').recalculateAllColumnsWidth();

        htDataGrid.render();

        inputVariableName.value = "";

        alert("la variable ha sido renombrada");
    }
}

function countUnique(iterable) {
    return new Set(iterable);
}

function getInfoFromNonWorkedData(colIndex)
{
    let evaluationData = htDataGrid.getSourceDataAtCol(colIndex);

    let evaluationDataClean = evaluationData.filter(Boolean);

    let isCualitativeData, cualitative, cuantitative;

    cualitative=0;
    cuantitative=0;

    evaluationDataClean.forEach(element => {
        if(isNaN(element))
        {
            if(typeof element === 'string')
                cualitative++;
            else
            {
                alert("Revise el tipo de datos, hay datos imposibles de evaluar");
                return;
            }
        }
        else
            cuantitative++;
    });

    if(cualitative > 0 && cuantitative > 0)
    {
        alert("Revise el tipo de datos, hay datos cualitativos y cunatitativos en la misma variable");
        return;
    }
    else
        isCualitativeData = cualitative > 0;

    if(isCualitativeData)
        evaluationDataClean.sort();
    else
        evaluationDataClean.sort(function(a, b){return a-b});


    return [evaluationDataClean, new Set(evaluationDataClean), isCualitativeData];
}

function generateFrequencyTableForNonWorkedData(colIndex)
{
    let dataInfo = getInfoFromNonWorkedData(colIndex);

    let evaluationDataClean = dataInfo[0];

    let countOfUniqueElements = dataInfo[1];

    let isCualitativeData = dataInfo[2];


    let totalFrequency = 0, totalRelativeFrequency=0;

    if(countOfUniqueElements.size <= 10 || isCualitativeData)
    {
        var frequencyData =
        [
            ['Clase', 'Frecuencia', 'Frecuencia relativa']
        ];

        countOfUniqueElements.forEach((element) => {
            var frequencyCounter = 0;

            for(let j=0; j < evaluationDataClean.length; j++)
            {
                if(evaluationDataClean[j] === element)
                {
                    frequencyCounter++;
                }
            }

            totalFrequency+=frequencyCounter;
            totalRelativeFrequency+=(frequencyCounter/evaluationDataClean.length);

            frequencyData.push([element, frequencyCounter, frequencyCounter/evaluationDataClean.length]);
        });

        let result2="";

        result2 += "<table class='table table-striped table-dark'>"

        for (let index = 0; index < frequencyData.length; index++) {

            result2 +=
                `<tr>
                <td>`+frequencyData[index][0]+`</td>
                <td>`+frequencyData[index][1]+`</td>
                <td>`+frequencyData[index][2]+`</td>
            </tr>`;

        }
        result2 +=
            `<tr>
                <td>Total</td>
                <td>`+totalFrequency+`</td>
                <td>`+totalRelativeFrequency+`</td>
            </tr>`;


        result2 += "</table>"

        return result2;
    }
    else
    {
        let frequencyData = generateFrequencyArrayForGroupedData(evaluationDataClean);

        for (let i=1; i<frequencyData.length; i++)
        {
            totalFrequency+=frequencyData[i][2];

            totalRelativeFrequency+=frequencyData[i][3];
        }

        //TODO: asi se procesa la mediana
        let median = medianForGroupedData(frequencyData, evaluationDataClean.length);
        //TODO: asi se procesa la moda
        let mode = modeForGroupedData(frequencyData);
        //TODO: asi se procesa la media
        let resultAverageForGroupeddata = averageForGroupedData(frequencyData, evaluationDataClean.length);

        //TODO: eliminar este TODO
        console.log("mediana: "+median+"; moda: "+mode+"; media: "+resultAverageForGroupeddata);


        let result2="";

        result2 += "<table class='table table-striped table-dark'>"

        for (let index = 0; index < frequencyData.length; index++) {

            result2 +=
            `<tr>
                <td>`+(index === 0 ? frequencyData[index][0] : frequencyData[index][0][0]+'-'+frequencyData[index][0][1] )+`</td>
                <td>`+frequencyData[index][1]+`</td>
                <td>`+frequencyData[index][2]+`</td>
                <td>`+ (index === 0 ? frequencyData[index][3] : roundToXDecimals(frequencyData[index][3], 2)) +`</td>
                <td>`+frequencyData[index][4]+`</td>
            </tr>`;

        }

        result2 +=
            `<tr>
                <td>Total</td>
                <td></td>
                <td>`+totalFrequency+`</td>
                <td>`+roundToXDecimals(totalRelativeFrequency, 2)+`</td>
                <td></td>
            </tr>`;

        result2 += "</table>"

        return result2;
    }
}

function calculateMeasuresOfCentralTendency(colIndex)
{

    let dataInfo = getInfoFromNonWorkedData(colIndex);

    let evaluationDataClean = dataInfo[0];

    let countOfUniqueElements = dataInfo[1];

    let isCualitativeData = dataInfo[2];

    if(isCualitativeData)
    {
        alert("Las medidas de tencian central para datos agrupados solo se pueden calcular con variables cuantitativas");
        return;
    }

    if(countOfUniqueElements.size <= 10)
    {
        alert("Solo hay 10 elementos distintos. Para que nuestro sistema genere las clases neceitamos que proporcione al menos 11 elementos distintos");
        return;
    }

    let frequencyData = generateFrequencyArrayForGroupedData(evaluationDataClean);

    //TODO: asi se procesa la mediana
    let median = medianForGroupedData(frequencyData, evaluationDataClean.length);
    //TODO: asi se procesa la moda
    let mode = modeForGroupedData(frequencyData);
    //TODO: asi se procesa la media
    let resultAverageForGroupeddata = averageForGroupedData(frequencyData, evaluationDataClean.length);

    return [median, mode, resultAverageForGroupeddata];
}

function isFloat(n) {
    return n % 1 !== 0;
}

function countDecimals(number){
    let parts = number.split(".");

    return parts[1].length;
}

/**
 * Recibe un arreglo de datos numerico
 * Retorna la informacion basica de las series o clases de un arreglo de datos limpio
 * retorna un objeto que contiene [rango, numero de clases, ancho de clases, numero maximo de decimales que contienen los datos en el arreglo recibido]*/
function getBasicSeriesData(evaluationDataClean)
{
    let range = evaluationDataClean[evaluationDataClean.length - 1] - evaluationDataClean[0];

    let classNumber = 0;

    let dataIsInt = true;

    let decimalsCount=0;

    let continueOperating=true;
    let operationType = 0;

    let classWidth;

    while(continueOperating)
    {
        if(operationType===0)
            classNumber = Math.round(1 + (3.322 * (getBaseLog(10, evaluationDataClean.length))));
        else if(operationType===1)
            classNumber = Math.ceil(1 + (3.322 * (getBaseLog(10, evaluationDataClean.length))));
        else
            classNumber = Math.floor(1 + (3.322 * (getBaseLog(10, evaluationDataClean.length))));

        evaluationDataClean.forEach(element => {
            if(isFloat(element))
            {
                dataIsInt=false;

                if(countDecimals(element) > decimalsCount)
                    decimalsCount=countDecimals(element);
            }
        });

        if(dataIsInt)
            classWidth = Math.round(range / classNumber);
        else
        {
            classWidth = roundToXDecimals(range / classNumber, decimalsCount);
        }

        if(((classWidth * classNumber) + Number(evaluationDataClean[0])) > Number(evaluationDataClean[evaluationDataClean.length - 1]) || operationType === 3)
            continueOperating=false;

        operationType++;
    }

    return [range, classNumber, classWidth, decimalsCount];
}

function generateFrequencyArrayForGroupedData(evaluationDataClean)
{
    let infoData = getBasicSeriesData(evaluationDataClean);

    let classNumber = infoData[1];

    let classWidth = infoData[2];

    let decimalsCount = infoData[3];

    let frequencyData =
        [
            ['Clase', 'Marca clase','Frecuencia absoluta', 'Frecuencia relativa', 'Frecuencia acumulada']
        ];

    let classvalue = Number(evaluationDataClean[0]);

    let acumulatedfrequency = 0;

    for(let i=0; i < classNumber; i++)
    {
        let frequencyCounter = 0;

        for(let j=0; j < evaluationDataClean.length; j++)
        {
            if(evaluationDataClean[j] >= classvalue && evaluationDataClean[j] < classvalue+classWidth)
            {
                frequencyCounter++;
            }
        }

        let classLimit = roundToXDecimals(classvalue + classWidth,decimalsCount);

        acumulatedfrequency+=frequencyCounter;

        frequencyData.push(
            [
                [roundToXDecimals(classvalue, decimalsCount), classLimit],
                roundToXDecimals((classvalue + classLimit)/2, 2),
                frequencyCounter,
                frequencyCounter/evaluationDataClean.length,
                acumulatedfrequency
            ]
        );

        classvalue+=classWidth;
    }

    return frequencyData;
}


function generateFrequencyTableForWorkedData(variablesToEvaluate)
{
    let evaluationDataClean = [];
    var evaluationVariableNameClean = [];

    variablesToEvaluate.forEach(element => {
        var evaluationData = htDataGrid.getSourceDataAtCol(element);

        var evaluationVariableName = htDataGrid.getColHeader(element);

        var temp = evaluationData.filter(Boolean);

        if(temp.length !== 1)
        {
            alert("Por favor revise sus variables que esten completas y que no tengan mas de un valor");
            return;
        }
        else
        {
            evaluationDataClean.push(temp[0]);
            evaluationVariableNameClean.push(evaluationVariableName)
        }
    });

    let totalFrequency = 0.0, totalRelativeFrequency=0;

    var frequencyData =
        [
            ['Clase', 'Frecuencia', 'Frecuencia relativa']
        ];

    evaluationDataClean.forEach((element) => {
        totalFrequency += parseFloat(element);
    });

    for (let i = 0; i < evaluationDataClean.length; i++) {

        totalRelativeFrequency+=(evaluationDataClean[i]/totalFrequency);

        frequencyData.push([evaluationVariableNameClean[i], evaluationDataClean[i], evaluationDataClean[i]/totalFrequency]);
    }

    var result = "La amplitud o rango es: "+null+
        `<br>El numero de clases es: `+evaluationDataClean.length+
        `<br>El ancho de clase es: `+ null+
        `<br><br>`;

    var result2="";

    result2 += "<table class='table table-striped table-dark'>"

    for (let index = 0; index < frequencyData.length; index++) {

        result2 +=
            `<tr>
            <td>`+frequencyData[index][0]+`</td>
            <td>`+frequencyData[index][1]+`</td>
            <td>`+frequencyData[index][2]+`</td>
        </tr>`;

    }
    result2 +=
        `<tr>
            <td>Total</td>
            <td>`+totalFrequency+`</td>
            <td>`+totalRelativeFrequency+`</td>
        </tr>`;


    result2 += "</table>"

    return result2;

}



/**
 * intervalN2 es un array de dos posiciones numericas [number, number]
 * average es el promedio de los datos
 * **/
function medianForGroupedData(data, totalCountOfElements) {

    let N2 = totalCountOfElements/2;

    let median=0;

    let intervalAmplitude = data[1][0][1] - data[1][0][0];

    for(let i=1; i < data.length; i++)
    {
        //es el intervalo mediano
        if(data[i][4] > N2 && median === 0)
        {
            median = data[i][0][0] + (((N2 - data[i-1][4]) / data[i][4]) * intervalAmplitude);
        }
    }

    return roundToXDecimals(median,2);
}

function modeForGroupedData(data) {

    let modalInterval=0;

    let higherValue=0;

    for(let i=1; i < data.length; i++)
    {
        if(data[i][2] > higherValue)
        {
            modalInterval=i;
            higherValue=data[i][2];
        }
    }

    let mode = data[modalInterval][0][0] + (
        (
            (data[modalInterval][2] - data[modalInterval-1][2]) /
            ((data[modalInterval][2] - data[modalInterval-1][2]) + (data[modalInterval][2] - data[modalInterval+1][2]))
        ) * (data[modalInterval][0][1]-data[modalInterval][0][0])
    );

    return roundToXDecimals(mode,2);
}

function averageForGroupedData(data, N) {
    let sum=0;

    for(let i=1; i < data.length; i++)
    {
        sum+= parseFloat(parseFloat(data[i][1]) * parseFloat(data[i][2]));
    }

    let average = sum/N;


    return roundToXDecimals(average,2);
}

function getBaseLog(base, number)
{
    return Math.log(number) / Math.log(base);
}

function roundToXDecimals(number, decimals)
{
    let aux = "1";
    for(let i = 0; i < decimals; i++)
        aux+="0";

    return Math.round(number * parseInt(aux))/parseInt(aux);
}

function centralTendence(agroupNumbers,columns,operations){
    //Valido si selecciono numeros agrupados
        if(agroupNumbers=="no"){
            var evaluationData = htDataGrid.getSourceDataAtCol(columns);

            var dataToWork = [];
            //Variable donde se almacenara las respuestas
            var html = ` <ul class="list-unstyled"> `
            //Evaluo cuales son indefinidas y las que no las añado en un arreglo para trabajarlas
            evaluationData.forEach(element => {
                if(element!=undefined && element!=NaN){
                    dataToWork.push(parseFloat(element));
                }
            });
        
            console.log(dataToWork);
            //Si no selecciono recorro el arreglo de operaciones que selecciono
            operations.forEach(element => {
                switch(element){
                    //Caso Mediana
                    case "1":
                    var temp="";
                        //Validaciones de errores
                        if(jStat.median(dataToWork)+""=="NaN" || jStat.median(dataToWork)===NaN || jStat.median(dataToWork)===undefined){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        else{
                            //añado la respuesta a lo que se va mostrar
                            temp+=jStat.median(dataToWork);
                        }
                    html += `<li><h3 class='display-7'>Mediana:</h3> ` +temp+` </li>`;
                    break;
                    //Caso Moda
                    case "2":
                    var temp="";
                        //Validaciones de errores
                        if(jStat.mode(dataToWork)+""=="NaN" || jStat.mode(dataToWork)===NaN || jStat.mode(dataToWork)===undefined){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        else{
                            //añado la respuesta a lo que se va mostrar
                            temp+=jStat.mode(dataToWork);
                        }
                    html += `<li><h3 class='display-7'>Moda:</h3>  ` +temp+` </li>`;
                    break;
                    //Caso media
                    case "3":
                    var temp="";
                        //Validaciones de errores
                        if( jStat.mean(dataToWork)+""=="NaN" || jStat.mean(dataToWork)===NaN || jStat.mean(dataToWork)===undefined){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        else{
                            temp+=jStat.mean(dataToWork)+"";
                        }
                        //añado la respuesta a lo que se va mostrar
                    html += `<li><h3 class='display-7'>Media:</h3> ` +temp+` </li>`;
                    break;
                    default:
                        html+="Algo salió mal "+operations;
                        break;
                }
            });
        }else{
           //Aca entraria si es de datos agrupados
           var evaluationData1 = htDataGrid.getSourceDataAtCol(columns[0]);
          // var evaluationData2 = htDataGrid.getSourceDataAtCol(columns[1]);
        
           var dataToWork1 = [];
           var dataToWork2 = [];
           //Variable donde se almacenara las respuestas
           var html = ` <ul class="list-unstyled"> `
           //Evaluo cuales son indefinidas y las que no las añado en un arreglo para trabajarlas
           evaluationData1.forEach(element => {
               if(element!=undefined && element!=NaN){
                   dataToWork1.push(element);
               }
           });
          /* evaluationData2.forEach(element => {
               if(element!=undefined && element!=NaN){
                   dataToWork2.push(parseFloat(element));
               }
           });*/
           console.log(dataToWork1);
           var calcsMTCAgroup = calculateMeasuresOfCentralTendency(columns[0]);
          // console.log(dataToWork1);
           //Si no selecciono recorro el arreglo de operaciones que selecciono
           operation.forEach(element => {
               switch(element){
              
                   //Caso Mediana
                   case "1":
                    var temp=""+calcsMTCAgroup[0];
                   /*     //Validaciones de errores
                        if(jStat.median(dataToWork1,dataToWork2)+""=="NaN" || jStat.median(dataToWork1,dataToWork2)===NaN || jStat.median(dataToWork1,dataToWork2)===undefined){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        else{
                            //añado la respuesta a lo que se va mostrar
                            temp+=jStat.median(dataToWork1,dataToWork2).toFixed(2);
                        }*/
                    html += `<li><h3 class='display-7'>Mediana:</h3> ` +temp+` </li>`;
                    break;
                    //Caso Moda
                    case "2":
                    var temp=""+calcsMTCAgroup[1];
                       /* //Validaciones de errores
                        if(jStat.mode(dataToWork1,dataToWork2)+""=="NaN" || jStat.mode(dataToWork1,dataToWork2)===NaN || jStat.mode(dataToWork1,dataToWork2)===undefined){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        else{
                            //añado la respuesta a lo que se va mostrar
                            temp+=jStat.mode(dataToWork1,dataToWork2).toFixed(2);
                        }*/
                    html += `<li><h3 class='display-7'>Moda:</h3> ` +temp+` </li>`;
                    break;
                    //Caso media
                    case "3":
                    var temp=""+calcsMTCAgroup[2];
                        /*//Validaciones de errores
                        if( jStat.mean(dataToWork1,dataToWork2)+""=="NaN" || jStat.mean(dataToWork1,dataToWork2)===NaN || jStat.mean(dataToWork1,dataToWork2)===undefined){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        else{
                            temp+=jStat.mean(dataToWork1,dataToWork2).toFixed(2)+"";
                        }
                        //añado la respuesta a lo que se va mostrar*/
                    html += `<li><h3 class='display-7'>Media:</h3> ` +temp+` </li>`;
                    break;
                    default:
                        html+="Algo salió mal "+operations;
                        break;
               }
           });
       }

    html +=`</ul>`;
    return html;
}

function positionMeasure(columns,operations){
    var evaluationData = htDataGrid.getSourceDataAtCol(columns);

    var dataToWork = [];
    //Variable donde se almacenara las respuestas
    var html = ` <ul class="list-unstyled"> `
    //Evaluo cuales son indefinidas y las que no las añado en un arreglo para trabajarlas
    evaluationData.forEach(element => {
        if(element!=undefined){
            dataToWork.push(parseFloat(element));
        }
    });

    console.log(dataToWork);
 
            //Si no selecciono recorro el arreglo de operaciones que selecciono
            operations.forEach(element => {
                switch(element){
                    //Caso Decil
                    case "1":
                        var decilValue= new Array();
                        var temp="<table class='table'> <thead class='thead-dark'><tr><th>Decil</th>";
                        //Ordena el arreglo
                        dataToWork.sort(function(a,b){return a - b;});
                        var len =  dataToWork.length;

                        //Cabeceras
                        for(i=0.1;i<=1;i+=0.1){
                            temp+="<th><strong>"+(i*10).toFixed()+"</strong></th>";
                        }
                        temp+="</tr></thead><tr><th>Valor</th>";

                        var a=0;
                        var temp2="";
                        //Cuerpo de la tabla 
                        for(i=0.1;i<=1;i+=0.1){
                            //Si llega ala ultima posicion del iterador, que agarre el ultimo valor del arreglo
                            if(i.toFixed()==1){
                                var per = Math.ceil(len*i)-1;
                            }
                            else{
                                var per =  Math.floor(len*i) - 1;
                            }
                            //Quitar decimales para obtener la posicion en el arreglo
                            per = per.toFixed();
                            if(per==-1){
                                per=0;
                            }
                            per = dataToWork[per];
                            temp+="<td>"+per+"</td>";

                            decilValue.push(per);
                            
                            
                           a++;
                        } 
                        temp2 = decilValue[a-2]-decilValue[0];
                        temp+="<tr></table>";
                        //Validaciones de errores
                        if(per+""=="NaN" || per===NaN || per===undefined){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        html += `<li><h3 class="display-6">Deciles</h3></li><hr><br><h3 class="display-7"> El rango inter decil es ≈ <strong>`+temp2 +`</strong></h3><br>`+temp+` `;
                        
                    break;

                    //Caso Percentil
                    case "2":
                    var temp="<div style='display: inline-block;'><table class='table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black' ><tr><th>Percentil</th><th>Valor</th></tr></thead>";
                    //Ordena el arreglo
                    dataToWork.sort(function(a,b){return a - b;});
                    var len =  dataToWork.length;
                    var values = new Array();;
                        //Cuerpo de la tabla 
                        for(i=0.01;i<=1;i+=0.01){
                            //Generacion de las tablas
                           if(i.toFixed(2)==0.11)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th></tr></thead>";
                            if(i.toFixed(2)==0.21)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th></tr></thead>";
                            if(i.toFixed(2)==0.31)
                                    temp+="</table></div><br><div style='display: inline-block;'> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th></tr></thead>";
                            if(i.toFixed(2)==0.41) 
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th></tr></thead>";
                            if(i.toFixed(2)==0.51)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th></tr></thead>";
                            if(i.toFixed(2)==0.61)
                                    temp+="</table> </div><br><div style='display: inline-block;'><table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th></tr></thead>";
                            if(i.toFixed(2)==0.71)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th></tr></thead>";
                            if(i.toFixed(2)==0.81)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th></tr></thead>";
                            if(i.toFixed(2)==0.91)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th></tr></thead>";
                            
                            //Si llega ala ultima posicion del iterador, que agarre el ultimo valor del arreglo
                            if(i.toFixed(1)==1){
                                var per = Math.ceil(len*i)-1;
                            }
                            else{
                                var per =  Math.floor(len*i) - 1;
                            }

                            //Quitar decimales para obtener la posicion en el arreglo
                            per = per.toFixed();
                            if(per==-1){
                                per=0;
                            }
                            //Obtengo el valor del percentil
                            per = dataToWork[per];
                            //Lo inserto en el arreglo
                            values.push(per);
                            //Obtengo el iterador anterior para consultar si la posicion es diferente y asi asignar un 0
                            var pos= ((i*100)-1).toFixed();
                           
                            //Aca se genera cala linea, dentro de las tablas                           
                            temp+="<tr><td>"+ (roundNumber(i,2)*100).toFixed()+"</td><td>"+per+"</td></tr>";
                        }
                            pos=values[pos-2]-values[0];
                        
                        temp+="<tr><td>"+ (roundNumber(i,2)*100).toFixed()+"</td><td>"+per+"</td></tr></table></div>";

                        //Validaciones de errores
                        if(per+""=="NaN" || per===NaN || per===undefined || per+""=="undefined"){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        
                    html += `<li><h3 class="display-6">Percentiles</h3></li><hr><br><h3 class="display-7"> El rango inter percentil es ≈ <strong>`+pos +`</strong></h3><br>`+temp+` `;
                    break;
                    //Caso Cuartil
                    case "3":
                    var temp="";
                    var quartilesValues = ["25%","50%","75%"];
                        //Validaciones de errores
                        if( jStat.quartiles(dataToWork)+""=="NaN" || jStat.quartiles(dataToWork)===NaN || jStat.quartiles(dataToWork)===undefined){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        else{
                            temp+=jStat.quartiles(dataToWork)+"";
                        }
                        var iqr = new Array();
                        iqr = temp.split(",");
                        console.log(iqr);
                        temp="<table class='table '><thead class='thead-dark'><tr><th>Cuartil</th><th>Valor</th></tr></thead>";
                        for(i=0;i<iqr.length;i++){
                            var temp2 =0;
                            if(i==0 || iqr[i] == iqr[i-1] ){
                                temp2 =0;
                            }else{
                                temp2=iqr[i]-iqr[i-1];
                            }
                            temp+="<tr><td>"+(i+1)+" ("+quartilesValues[i]+") </td><td>"+iqr[i]+"</td></tr>";
                        }
                        temp2=iqr[i-1]-iqr[0];
                        temp+="</table>";
                        //añado la respuesta a lo que se va mostrar
                        html += `<li><h3 class="display-6">Cuartiles</h3></li><hr><br><h3 class="display-7"> El rango inter cuartil es ≈ <strong>`+temp2 +`</strong></h3><br>`+temp+` `;
                
                    break;
                    //Caso Quintil
                    case "4":
                        var temp="<table class='table'> <thead class='thead-dark'><tr><th>Quintil</th>";
                        //Ordena el arreglo
                        dataToWork.sort(function(a,b){return a - b;});
                        var len =  dataToWork.length;
                        var quintilValue= new Array();
                        //Cabeceras
                        for(i=1;i<=5;i+=1){
                            temp+="<th><strong>"+(i).toFixed()+"</strong></th>";
                        }
                        temp+="</tr></thead><tr><th>Valor</th>";
                        var temp2="";
                        //Cuerpo de la tabla 
                        a=0;
                        for(i=0.2;i<=1;i+=0.2){
                            //Si llega ala ultima posicion del iterador, que agarre el ultimo valor del arreglo
                            if(i.toFixed()==1){
                                var per = Math.floor(len*i)-1;
                            }
                            else{
                                var per =  Math.floor(len*i) - 1;
                            }
                            
                            //Quitar decimales para obtener la posicion en el arreglo
                            per = per.toFixed();
                            if(per==-1){
                                per=0;
                            }
                            per = dataToWork[per];

                            quintilValue.push(per);
                            console.log(quintilValue);
                            if((quintilValue[a]==quintilValue[a-1]) || a==0){
                                temp2+="<td>0</td>";
                            }else{
                               temp2+="<td>"+(quintilValue[a]-quintilValue[a-1])+"</td>";
                            }
                           
                            temp+="<td>"+per+"</td>";
                            a++;
                        } 
                        temp2= quintilValue[a-2]-quintilValue[0];
                        temp+="</tr></table>";

                        //Validaciones de errores
                        if(per+""=="NaN" || per===NaN || per===undefined){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        html += `<li><h3 class="display-6">Quintiles</h3></li><hr><br><h3 class="display-7"> El rango inter quintil es ≈ <strong>`+temp2 +`</strong></h3><br>`+temp+` `;
                        
                        break;
                        //Caso rango intercuartil
                        case "5":
                            var temp="";
                                //Validaciones de errores
                                if( jStat.mean(dataToWork)+""=="NaN" || jStat.mean(dataToWork)===NaN || jStat.mean(dataToWork)===undefined){
                                   temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                                }
                                else{
                                    temp+=jStat.mean(dataToWork)+"";
                                }
                                //añado la respuesta a lo que se va mostrar
                            html += `<li>Intercuartil - no funciona aun: ` +temp+` </li>`;
                            break;
                    default:
                        html+="Algo salió mal "+operations;
                        break;
                }
            });
      
    html +=`</ul>`;
    return html;
}

function dispersionMeasure(groupNumbers,columns,operation,znumber){
    console.log(groupNumbers);
    //Valido si selecciono numeros agrupados
        if(groupNumbers=="no"){

            var evaluationData = htDataGrid.getSourceDataAtCol(columns);

            var dataToWork = [];
            //Variable donde se almacenara las respuestas
            var html = ` <ul class="list-unstyled"> `
            //Evaluo cuales son indefinidas y las que no las añado en un arreglo para trabajarlas
            evaluationData.forEach(element => {
                if(element!=undefined){
                    dataToWork.push(parseFloat(element));
                }
            });

            console.log(operation);


            //Si no selecciono recorro el arreglo de operaciones que selecciono
            operation.forEach(element => {
                switch(element){
                    
                    //Caso Desviacion standard
                    case "2":
                    var temp="";
                        //Validaciones de errores
                        if(jStat.stdev(dataToWork)+""=="NaN" || jStat.stdev(dataToWork)===NaN || jStat.stdev(dataToWork)===undefined){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        else{
                            //añado la respuesta a lo que se va mostrar
                            temp+=jStat.stdev(dataToWork).toFixed(2);
                        }
                  html += `<li><h3 class="display-6">Desviación Estándar</h3></li><hr><br><h3 class="display-7"> La desviación estándar de los datos proporcionados ≈ <strong>`+temp +`</strong></h3><br>`;
                  
                    break;
                    //Caso Varianza
                    case "3":
                    var temp="";
                        //Validaciones de errores
                        if( jStat.variance(dataToWork)+""=="NaN" || jStat.variance(dataToWork)===NaN || jStat.variance(dataToWork)===undefined){
                           temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        else{
                            temp+=jStat.variance(dataToWork).toFixed(2)+"";
                        }
                        //añado la respuesta a lo que se va mostrar
                    html += `<li><h3 class="display-6">Varianza</h3></li><hr><br><h3 class="display-7"> La varianza de los datos proporcionados ≈ <strong>`+temp +`</strong></h3>`;
                    
                    break;


                     //Caso PUNTAJE Z
                     case "4":
                        var temp="";
                        if(znumber!=null || znumber!=0 || znumber!=""){
                            //Validaciones de errores
                            if( jStat.zscore(znumber,dataToWork)+""=="NaN" || jStat.zscore(znumber,dataToWork)===NaN || jStat.zscore(znumber,dataToWork)===undefined){
                                temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                            }
                            else{
                                temp+=jStat.zscore(znumber,dataToWork).toFixed(2)+"";
                            }
                           
                        }else{
                            temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                            
                        }
                            //añado la respuesta a lo que se va mostrar
                            html += `<li><h3 class="display-6">Puntaje Z</h3></li><hr><br><h3 class="display-7"> La varianza de los datos proporcionados ≈ <strong>`+temp +`</strong></h3>`;
 
                        break;
                    default:
                        html+="Algo salió mal "+operations;
                        break;
                }
            });
        }else{
            //Aca entraria si es de datos agrupados
            var evaluationData1 = htDataGrid.getSourceDataAtCol(columns[0]);
            var evaluationData2 = htDataGrid.getSourceDataAtCol(columns[1]);
           

          

            var dataToWork1 = [];
            var dataToWork2 = [];
            //Variable donde se almacenara las respuestas
            var html = ` <ul class="list-unstyled"> `
            //Evaluo cuales son indefinidas y las que no las añado en un arreglo para trabajarlas
            evaluationData1.forEach(element => {
                if(element!=undefined){
                    dataToWork1.push(parseFloat(element));
                }
            });
            evaluationData2.forEach(element => {
                if(element!=undefined){
                    dataToWork2.push(parseFloat(element));
                }
            });
            
            //Si no selecciono recorro el arreglo de operaciones que selecciono
            operation.forEach(element => {
                switch(element){
                  
                    //Caso Desviacion standard
                    case "2":
                    var temp="";
                        //Validaciones de errores
                        if(jStat.pooledstdev([dataToWork1,dataToWork2])+""=="NaN" || jStat.pooledstdev([dataToWork1,dataToWork2])===NaN || jStat.pooledstdev([dataToWork1,dataToWork2])===undefined){
                            temp+="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        else{
                            //añado la respuesta a lo que se va mostrar
                            temp=jStat.pooledstdev([dataToWork1,dataToWork2]).toFixed(2);
                            temp+='<h3 class="display-7"> La desviación estándar de los datos proporcionados ≈ <strong>'+temp +'</strong></h3>';
                        }
                        //añado la respuesta a lo que se va mostrar
                    html += `<li><h3 class="display-6">Desviación Estándar Agrupada</h3></li><hr><br>`+temp;
                    break;
                    //Caso Varianza
                    case "3":
                    var temp="";
                        //Validaciones de errores
                        if( jStat.pooledvariance([dataToWork1,dataToWork2])+""=="NaN" || jStat.pooledvariance([dataToWork1,dataToWork2])===NaN || jStat.pooledvariance([dataToWork1,dataToWork2])===undefined){
                            temp="Error, verifique lo siguiente:<br> Que ha insertado numeros en las columnas. <br> Ha seleccionado las columnas correspondientes. <br>Las columnas seleccionadas tienen la misma cantidad de valores";
                        }
                        else{
                            temp=jStat.pooledvariance([dataToWork1,dataToWork2]).toFixed(2)+"";
                            temp+='<h3 class="display-7"> La varianza de los datos proporcionados ≈ <strong>'+temp +'</strong></h3>';
                        }
                        //añado la respuesta a lo que se va mostrar
                    html += `<li><h3 class="display-6">Varianza Agrupada</h3></li><hr><br>`+temp;
                    
                    break;
                    default:
                        html+="Algo salió mal "+operations;
                        break;
                }
            });
        }
       
        html +=`</ul>`;
        return html;
        
}


function freqTable(groupNumbers,columnsRequired,columns){
    console.log(columns);
    if(columnsRequired === "si"){
        $table = generateFrequencyTableForWorkedData(columns);
    }else if(columnsRequired=== "no"){
        $table = generateFrequencyTableForNonWorkedData(columns[0]);
    }
   return $table;
}

function roundNumber(num, scale) {
    if(!("" + num).includes("e")) {
      return +(Math.round(num + "e+" + scale)  + "e-" + scale);
    } else {
      var arr = ("" + num).split("e");
      var sig = ""
      if(+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
}


function stringArrayToNumber(evaluationDataClean)
{
    for (let i = 0; i<evaluationDataClean.length; i++)
    {
        evaluationDataClean[i] = Number(evaluationDataClean[i]);
    }
    return evaluationDataClean;
}

  //TODO: probando graficos
function generateHistogram(colIndex)
{
    let dataInfo = getInfoFromNonWorkedData(colIndex);

    let evaluationDataClean = dataInfo[0];

    let countOfUniqueElements = dataInfo[1];

    let isCualitativeData = dataInfo[2];

    if(countOfUniqueElements.size <= 10 || isCualitativeData)
    {
        let frequencyData = [];

        countOfUniqueElements.forEach(element => {
            let frequencyCounter = 0;

            for(let j=0; j < evaluationDataClean.length; j++)
            {
                if(evaluationDataClean[j] === element)
                {
                    frequencyCounter++;
                }
            }

            frequencyData.push(frequencyCounter);
        });

        let evaluateDataArray = Array.from(countOfUniqueElements);

        let histogramLineArray = getHistogramLineArray([evaluateDataArray, frequencyData], true);

        Highcharts.chart('histogramContainer', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Histogram using a column chart'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: evaluateDataArray,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0,
                    borderWidth: 0,
                    groupPadding: 0,
                    shadow: false
                }
            },
            series: [
                {
                    name: 'Dato',
                    data: frequencyData
                },
                {
                    type: 'line',
                    lineWidth: 1,
                    name: '',
                    color: 'rgba(212,53,19,.75)',
                    fillColor: 'rgba(212,53,19,.15)',
                    data: histogramLineArray
                }
            ]
        });

    }
    else
    {
        let infoData = getBasicSeriesData(evaluationDataClean);

        let classNumber = infoData[1];

        let classWidth = infoData[2];

        let histogramLineArray = getHistogramLineArray(evaluationDataClean, false);

        evaluationDataClean = stringArrayToNumber(evaluationDataClean);

        Highcharts.chart('graphicContainer', {
            title: {
                text: 'Histograma'
            },

            xAxis: [{
                title: { text: 'datos' },
                alignTicks: false
            }, {
                title: { text: 'Histograma' },
                alignTicks: false,
                opposite: true
            }],

            yAxis: [{
                title: { text: 'Data' }
            }, {
                title: { text: 'Frecuencia' },
                opposite: true
            }],

            plotOptions: {
                histogram: {
                    binsNumber: classNumber,
                    binWidth: classWidth
                }
            },

            series: [{
                name: 'Histogram',
                type: 'histogram',
                xAxis: 1,
                yAxis: 1,
                baseSeries: 's1',
                zIndex: -1
            }, {
                name: 'Data',
                type: 'scatter',
                data: evaluationDataClean,
                id: 's1',
                marker: {
                    radius: 1.5
                },
                visible:false
            },
            {
                type: 'line',
                lineWidth: 1,
                name: 'Normal Distribution',
                color: 'rgba(212,53,19,.75)',
                fillColor: 'rgba(212,53,19,.15)',
                data: histogramLineArray,
                xAxis: 1,
                yAxis: 1
            }
            ]
        });
    }
}

function getHistogramLineArray(evaluationDataClean, isCualitative)
{
    if(isCualitative)
    {
        let histogramLineArray = [];

        //iniciamos en 0 ya que es data cualitativa, en este no se agregan cabeceras
        for(let i = 0; i < evaluationDataClean[0].length; i++)
        {
            histogramLineArray.push(
                [i, evaluationDataClean[1][i]]
            );
        }

        return histogramLineArray;
    }
    else
    {
        let frequencyData = generateFrequencyArrayForGroupedData(evaluationDataClean);

        let histogramLineArray = [];

        //iniciamos en 1 ya que el arreglo de frecuencias trae en la primera fila solo las cabeceras que son string, por eso ignoramos la posicion 0
        for(let i = 1; i < frequencyData.length; i++)
        {
            histogramLineArray.push(
                [
                    ((frequencyData[i][0][1] + frequencyData[i][0][0])/2),
                    frequencyData[i][2]
                ]
            );
        }

        return histogramLineArray;
    }
}


//TODO: Probando generar caja y bigotes

function generateBoxPlot(colIndex)
{
    let dataInfo = getInfoFromNonWorkedData(colIndex);

    let evaluationDataClean = dataInfo[0];

    evaluationDataClean = stringArrayToNumber(evaluationDataClean);

    let quartiles = quartielsCorrectly(evaluationDataClean);

    Highcharts.chart('graphicContainer', {


        chart: {
            type: 'boxplot',
            inverted: true
        },

        title: {
            text: 'Highcharts Box Plot Example'
        },

        legend: {
            enabled: false
        },

        xAxis: {
            categories: ['1'],
            title: {
                text: 'Experiment No.'
            }
        },

        yAxis: {
            title: {
                text: 'Observations'
            }
        },

        series: [{
            name: 'Observations',
            data: [
                quartiles
            ],
            tooltip: {
                headerFormat: '<em>Experiment No {point.key}</em><br/>'
            }
        }]

    });
}


function quartielsCorrectly(array)
{
    let x1 =  array[0];
    let x2 =  jStat.percentile(array, 0.25, true);
    let x3 =  jStat.percentile(array, 0.50, true);
    let x4 =  jStat.percentile(array, 0.75, true);
    let x5 =  array[array.length -1];

    return [x1,x2,x3,x4,x5];
}


function generateBellCurve(colIndex)
{
    var data = htDataGrid.getSourceDataAtCol(colIndex);

    let dataInfo = getInfoFromNonWorkedData(colIndex);

    let evaluationDataClean = dataInfo[0];

    evaluationDataClean = stringArrayToNumber(evaluationDataClean);

    Highcharts.chart('graphicContainer', {

        title: {
            text: 'Bell curve'
        },

        xAxis: [{
            title: {
                text: 'Data'
            },
            alignTicks: false
        }, {
            title: {
                text: 'Bell curve'
            },
            alignTicks: false,
            opposite: true
        }],

        yAxis: [{
            title: { text: 'Data' }
        }, {
            title: { text: 'Bell curve' },
            opposite: true
        }],

        series: [{
            name: 'Bell curve',
            type: 'bellcurve',
            xAxis: 1,
            yAxis: 1,
            baseSeries: 1,
            zIndex: -1
        }, {
            name: 'Data',
            type: 'scatter',
            data: evaluationDataClean,
            accessibility: {
                exposeAsGroupOnly: true
            },
            marker: {
                radius: 1.5
            },
            visible:false
        }]
    });
}