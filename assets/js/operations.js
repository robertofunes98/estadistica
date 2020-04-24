var htDataGrid;
var headers;

$( document ).ready(function() {
    initGrid();
});

function initGrid()
{
    headers = ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6', 'Variable 7'];
    

    var data = new Array(20);

    for (let i = 0; i < data.length; i++) {
        data[i]=new Array(15);
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
        autoColumnSize: true
    });
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

function generateFrequencyTableForCualitative()
{
    var header = prompt("Que variable desea evaluar?");

    var evaluationData = htDataGrid.getSourceDataAtCol(header);

    var evaluationDataClean = evaluationData.filter(Boolean);

    evaluationDataClean.sort(function(a, b){return a-b});

    var countOfUniqueElements = countUnique(evaluationDataClean);

    let totalFrequency = 0, totalRelativeFrequency=0;

    if(countOfUniqueElements.size <= 10)
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

        var result = "La amplitud o rango es: "+null+
            `<br>El numero de clases es: `+countOfUniqueElements.size+
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

        document.getElementById('response').innerHTML=result+result2;
    }
    else
    {
        var range = evaluationDataClean[evaluationDataClean.length-1] - evaluationDataClean[0];
    
        var classNumber = Math.round(1 + 3.322 * Math.round(getBaseLog(10, evaluationDataClean.length)));

        var classWidth = Math.ceil(range/classNumber);

        //TODO: asdasd
        var rawClassNumber = 1 + 3.322 * getBaseLog(10, evaluationDataClean.length);
        var rawClassWidth = range/classNumber;

        var frequencyData =
        [
            ['Clase', 'Frecuencia', 'Frecuencia relativa']
        ];

        var classvalue = parseInt(evaluationDataClean[0]);

        for(let i=0; i < classNumber; i++)
        {
            var frequencyCounter = 0;

            for(let j=0; j < evaluationDataClean.length; j++)
            {
                if(evaluationDataClean[j] >= classvalue && evaluationDataClean[j] < classvalue+classWidth)
                {
                    frequencyCounter++;
                }
            }

            totalFrequency+=frequencyCounter;
            totalRelativeFrequency+=(frequencyCounter/evaluationDataClean.length);

            var classLimit = classvalue+classWidth;

            frequencyData.push([classvalue + '-' + classLimit, frequencyCounter, frequencyCounter/evaluationDataClean.length]);

            classvalue+=classWidth;
        }

        var result = "La amplitud o rango es: "+range+
        `<br>El numero de clases es: `+classNumber+
        `<br>El ancho de clase es: `+ classWidth+
        `<br><br> rawClassNumber = `+rawClassNumber+` -   rawClassWidth = `+rawClassWidth+"<br><br>";

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

        document.getElementById('response').innerHTML=result+result2;
    }
}


function generateFrequencyTableForCuantitative(variablesToEvaluate)
{
    var evaluationDataClean = [];
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

    document.getElementById('response').innerHTML=result+result2;

}



function getBaseLog(base, number)
{
    return Math.log(number) / Math.log(base);
}

function centralTendence(agroupNumbers,columns,operations){
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
    //Valido si selecciono numeros agrupados
        if(agroupNumbers=="no"){
            //Si no selecciono recorro el arreglo de operaciones que selecciono
            operations.forEach(element => {
                switch(element){
                    //Caso Mediana
                    case "1":
                    var temp="";
                        //Validaciones de errores
                        if(jStat.median(dataToWork)+""=="NaN" || jStat.median(dataToWork)===NaN || jStat.median(dataToWork)===undefined){
                            temp+="Error, verifique que ha insertado numeros o seleccionado la columna correspondiente";
                        }
                        else{
                            //añado la respuesta a lo que se va mostrar
                            temp+=jStat.median(dataToWork);
                        }
                    html += `<li>Mediana: ` +temp+` </li>`;
                    break;
                    //Caso Moda
                    case "2":
                    var temp="";
                        //Validaciones de errores
                        if(jStat.mode(dataToWork)+""=="NaN" || jStat.mode(dataToWork)===NaN || jStat.mode(dataToWork)===undefined){
                            temp+="Error, verifique que ha insertado numeros o seleccionado la columna correspondiente";
                        }
                        else{
                            //añado la respuesta a lo que se va mostrar
                            temp+=jStat.mode(dataToWork);
                        }
                    html += `<li>Moda: ` +temp+` </li>`;
                    break;
                    //Caso media
                    case "3":
                    var temp="";
                        //Validaciones de errores
                        if( jStat.mean(dataToWork)+""=="NaN" || jStat.mean(dataToWork)===NaN || jStat.mean(dataToWork)===undefined){
                            temp+="Error, verifique que ha insertado numeros o seleccionado la columna correspondiente";
                        }
                        else{
                            temp+=jStat.mean(dataToWork)+"";
                        }
                        //añado la respuesta a lo que se va mostrar
                    html += `<li>Media: ` +temp+` </li>`;
                    break;
                    default:
                        html+="Algo esta jodido"+operations;
                        break;
                }
            });
        }else{
            //Aca entraria si es de datos agrupados
            html+="Aca no ";
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
                        var temp="<table class='table'> <thead class='thead-dark'><tr><th>Percentil</th>";
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
                            console.log(decilValue[a]-decilValue[a-1]);
                            if((decilValue[a]==decilValue[a-1]) || a==0){
                                temp2+="<td>0</td>";
                            }else{
                               temp2+="<td>"+(decilValue[a]-decilValue[a-1])+"</td>";
                            }
                           a++;
                        } 

                        temp+="</tr><tr><th>IQR</th>"+temp2+"</tr></table>";

                        //Validaciones de errores
                        if(per+""=="NaN" || per===NaN || per===undefined){
                            temp="Error, verifique que ha insertado numeros o seleccionado la columna correspondiente";
                        }
                    
                        html += `<li>Deciles` +temp+` </li>`;
                    break;

                    //Caso Percentil
                    case "2":
                    var temp="<div style='display: inline-block;'><table class='table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black' ><tr><th>Percentil</th><th>Valor</th><th>IQR</th></tr></thead>";
                    //Ordena el arreglo
                    dataToWork.sort(function(a,b){return a - b;});
                    var len =  dataToWork.length;
                    var values = new Array();;
                        //Cuerpo de la tabla 
                        for(i=0.01;i<=1;i+=0.01){
                            //Generacion de las tablas
                           if(i.toFixed(2)==0.11)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th><th>IQR</th></tr></thead>";
                            if(i.toFixed(2)==0.21)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th><th>IQR</th></tr></thead>";
                            if(i.toFixed(2)==0.31)
                                    temp+="</table></div><br><div style='display: inline-block;'> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th><th>IQR</th></tr></thead>";
                            if(i.toFixed(2)==0.41) 
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th><th>IQR</th></tr></thead>";
                            if(i.toFixed(2)==0.51)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th><th>IQR</th></tr></thead>";
                            if(i.toFixed(2)==0.61)
                                    temp+="</table> </div><br><div style='display: inline-block;'><table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th><th>IQR</th></tr></thead>";
                            if(i.toFixed(2)==0.71)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th><th>IQR</th></tr></thead>";
                            if(i.toFixed(2)==0.81)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th><th>IQR</th></tr></thead>";
                            if(i.toFixed(2)==0.91)
                                    temp+="</table> <table class=' table-hover table-bordered' style='display: inline-block;'><thead class='thead-dark header-custom-black''><tr><th>Percentil</th><th>Valor</th><th>IQR</th></tr></thead>";
                            
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
                           // console.log(pos);
                            if(values[pos]== values[pos-1] || pos==0){
                                    pos = 0;
                            }
                            else{
                                pos=values[pos]-values[pos-1];
                            }
                            //Aca se genera cala linea, dentro de las tablas                           
                            temp+="<tr><td>"+ (roundNumber(i,2)*100).toFixed()+"</td><td>"+per+"</td><td>"+pos+"</td></tr>";
                        }
                        if(values[pos]== values[pos-1] || pos==0 ){
                                pos = 0;
                        }
                        else{
                            pos=values[pos]-values[pos-1];
                        } 
                        temp+="<tr><td>"+ (roundNumber(i,2)*100).toFixed()+"</td><td>"+per+"</td><td>"+pos+"</td></tr>";

                        //Validaciones de errores
                        if(per+""=="NaN" || per===NaN || per===undefined || per+""=="undefined"){
                            temp="Error, verifique que ha insertado numeros o seleccionado la columna correspondiente";
                        }
                        
                    html += `<li>Percentil</li><br>` +temp+` `;
                    break;
                    //Caso Cuartil
                    case "3":
                    var temp="";
                    var quartilesValues = ["25%","50%","75%"];
                        //Validaciones de errores
                        if( jStat.quartiles(dataToWork)+""=="NaN" || jStat.quartiles(dataToWork)===NaN || jStat.quartiles(dataToWork)===undefined){
                            temp+="Error, verifique que ha insertado numeros o seleccionado la columna correspondiente";
                        }
                        else{
                            temp+=jStat.quartiles(dataToWork)+"";
                        }
                        var iqr = new Array();
                        iqr = temp.split(",");
                        console.log(iqr);
                        temp="<table class='table '><thead class='thead-dark'><tr><th>Cuartil</th><th>Valor</th><th>IQR</th></tr></thead>";
                        for(i=0;i<iqr.length;i++){
                            var temp2 =0;
                            if(i==0 || iqr[i] == iqr[i-1] ){
                                temp2 =0;
                            }else{
                                temp2=iqr[i]-iqr[i-1];
                            }
                            temp+="<tr><td>"+i+" ("+quartilesValues[i]+") </td><td>"+iqr[i]+"</td><td>"+temp2+"</td></tr>";
                        }
                        temp+="</table>";
                        //añado la respuesta a lo que se va mostrar
                    html += `<li>Cuartiles:  </li>
                    `+temp;
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

                        temp+="</tr><tr><th>IQR</th>"+temp2+"</tr></table>";

                        //Validaciones de errores
                        if(per+""=="NaN" || per===NaN || per===undefined){
                            temp="Error, verifique que ha insertado numeros o seleccionado la columna correspondiente";
                        }
                    
                        html += `<li>Quintil </li>`+temp;
                        break;
                        //Caso rango intercuartil
                        case "5":
                            var temp="";
                                //Validaciones de errores
                                if( jStat.mean(dataToWork)+""=="NaN" || jStat.mean(dataToWork)===NaN || jStat.mean(dataToWork)===undefined){
                                    temp+="Error, verifique que ha insertado numeros o seleccionado la columna correspondiente";
                                }
                                else{
                                    temp+=jStat.mean(dataToWork)+"";
                                }
                                //añado la respuesta a lo que se va mostrar
                            html += `<li>Intercuartil - no funciona aun: ` +temp+` </li>`;
                            break;
                    default:
                        html+="Algo esta jodido"+operations;
                        break;
                }
            });
      
    html +=`</ul>`;
    return html;
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
