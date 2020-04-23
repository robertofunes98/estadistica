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

function generarTabla1()
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

function getBaseLog(base, number) 
{
    return Math.log(number) / Math.log(base);
}

function rsound(number)
{
    return Math.round(number * 100) / 100;
}