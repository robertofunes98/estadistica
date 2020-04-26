
//document.getElementsByClassName("finish_modal").addEventListener("click",function(){ alert("Hello World!"); });
var groupNumbers;
var columns;
var operation = [];

var selected = new Array();
$(document).ready(function() {
  $('input:checkbox:checked').each(function() {
     selected.push($(this).val());
  });
});

function medidasTendenciaCentral(){
    $('.modal').MultiStep({
        title:'<h3 class="display-6 text-center" style="width:90%!important">Medidas de tendencia central</h3>',
        data:[{
            content:`
            <div>
                <p>Usa datos agrupados</p>
                <div class="inputGroup">
                    <input id="no" name="groupNumbers[]" type="radio" checked value="no">
                    <label for="no">No</label>
                </div>
                <div class="inputGroup">
                    <input id="si" name="groupNumbers[]" type="radio" value="si"/>
                    <label for="si">Si</label>
                </div>
            </div>`,
            label:'Datos agrupados',
            nextText:"Siguiente",
            prevText:'Atras'

        },{
            content:`
                <div id="selectColumns">
                    
                </div>`,
                label:'Seleccionar columnas',
                nextText:"Siguiente",
                prevText:'Atras'
        },{
            content:`
            <form id="operationsMTC">
            <div class="inputGroup">
                <input id="operation1" name="operation[]" type="checkbox" value="1"/>
                <label for="operation1">Mediana</label>
            </div>
            <div class="inputGroup">
                <input id="operation2" name="operation[]" type="checkbox" value="2"/>
                <label for="operation2">Moda</label>
            </div>
          
            <div class="inputGroup">
                <input id="operation3" name="operation[]" type="checkbox" value="3"/>
                <label for="operation3">Media</label>
            </div>
            </form>`,
            label:'Personalizar resultados',
            nextText:"Calcular!",
            prevText:'Atras'
        }],
        final:`
        <div id="resultsMTC"></div>`,
        modalSize:'lg',
        finalLabel:'Resultados',
        prevText:'Atras',
        finishText:'Cerrar'
    });

}
function valuesFromMTC(){
        operation = [];
        columns = [];
        groupNumbers= $("input[name='groupNumbers[]']:checked").val();
        
        $('input[name="columns[]"]:checked').each(function() {
            columns.push($(this).val());
            });
        $('input[name="operation[]"]:checked').each(function() {
        operation.push($(this).val());
        });
      $("#resultsMTC").html(centralTendence(groupNumbers,columns,operation));
}

function getValuesForFrequencyTable(){
    columns = [];
    groupNumbers= $("input[name='groupNumbers[]']:checked").val();
    columnsRequired = $("input[name='columnsRequired[]']:checked").val();

    $('input[name="columns[]"]:checked').each(function() {
        columns.push($(this).val());
    });

    $("#resultsFREQTABLE").html(freqTable(groupNumbers,columnsRequired,columns));
}

function tablaDeFrecuencias(){
    $('.modal').MultiStep({
        title:'<h3 class="display-6 text-center" style="width:90%!important">Tabla de frequencias</h3>',
        data:[
            {
                content:`
                <div>
                    <p>¿Que tipo de tabla usará?</p>
                    <div class="inputGroup">
                        <input id="groupData" name="groupNumbers[]" type="radio" checked value="groupData">
                        <label for="groupData">Para datos agrupados</label>
                    </div>
                    <div class="inputGroup">
                        <input id="ungroupData" name="groupNumbers[]" type="radio" value="ungroupData"/>
                        <label for="ungroupData">Para datos no agrupados</label>
                    </div>
                </div>`,
                label:'Tipo de tabla',
                nextText:"Siguiente",
                prevText:'Atras'

            },{
                content:`
                <div>
                    <p>¿Que forma de evaluacion de las variables usará?</p>
                    
                    <div class="inputGroup">
                        <input id="definedvariables" name="columnsRequired[]" type="radio" checked value="si">
                        <label for="definedvariables">Variables definidas con valor unico</label>
                    </div>
                    <div class="inputGroup">
                        <input id="unworkedData" name="columnsRequired[]" type="radio" value="no"/>
                        <label for="unworkedData">Datos no trabajados en una sola columna</label>
                    </div>
                </div>`,
                label:'Tipo de variables',
                nextText:"Siguiente",
                prevText:'Atras'
            },{
                content:`
                   <div id="columnsTable">
                   </div>
               `,
                label:'Seleccion de columnas',
                nextText:"Siguiente",
                prevText:'Atras'
            }],
        final:`
            <div id="resultsFREQTABLE"></div>`,
        modalSize:'lg',
        finalLabel:'Resultados',
        prevText:'Atras',
        finishText:'Cerrar'
    });




}
function medidasDispersion(){

    $('.modal').MultiStep({
        title:'<h3 class="display-6 text-center" style="width:90%!important">Medidas de dispersión</h3>',
        data:[
            {
                content:`
                <div>
                    <p>Usa datos agrupados</p>
                    <div class="inputGroup">
                        <input id="no" name="groupNumbers[]" type="radio" checked value="no">
                        <label for="no">No</label>
                    </div>
                    <div class="inputGroup">
                        <input id="si" name="groupNumbers[]" type="radio" value="si"/>
                        <label for="si">Si</label>
                    </div>
                </div>`,
                label:'Datos agrupados',
                nextText:"Siguiente",
                prevText:'Atras'

            },{
                content:`
                <div id="selectColumns">
                    
                </div>`,
                label:'Seleccionar columnas',
                nextText:"Siguiente",
                prevText:'Atras'
            },{
                content:`
                <div id="operationsDISP">
                    
                    <div class="inputGroup">
                        <input id="operation2" name="operation[]" type="checkbox" value="2"/>
                        <label for="operation2">Desviacion estándar</label>
                    </div>
                    <div class="inputGroup">
                        <input id="operation3" name="operation[]" type="checkbox" value="3"/>
                        <label for="operation3">Varianza</label>
                    </div>
                </div>`,
                label:'Personalizar resultados',
                nextText:"Calcular!",
                prevText:'Atras'
            }],
            final:`
            <div id="resultsDISP"></div>`,
            modalSize:'lg',
            finalLabel:'Resultados',
            prevText:'Atras',
            finishText:'Cerrar'
    });
}

function valuesFromMDISP(){
    operation = [];
    columns =[];
    groupNumbers= $("input[name='groupNumbers[]']:checked").val();
    $("input[name='columns[]']:checked").each(function() {
        columns.push($(this).val());
        });
    $('input[name="operation[]"]:checked').each(function() {
    operation.push($(this).val());
    });
  $("#resultsDISP").html(dispersionMeasure(groupNumbers,columns,operation));

}

function medidasPosicion(){
    $('.modal').MultiStep({
        title:'<h3 class="display-6 text-center" style="width:90%!important">Medidas de posición</h3>',
        data:[{
             content:`
            <div>
                <p>Seleccione la columna</p>
                <div class="inputGroup">
                    <input id="0" name="columnsPOS[]" type="radio" checked value="0"/>
                    <label for="0">A</label>
                </div>
                <div class="inputGroup">
                    <input id="1" name="columnsPOS[]" type="radio" value="1"/>
                    <label for="1">B</label>
                </div>
                <div class="inputGroup">
                <input id="2" name="columnsPOS[]" type="radio" value="2" />
                <label for="2">C</label>
            </div>
            </div>`,
            label:'Seleccionar columnas',
            nextText:"Siguiente",
            prevText:'Atras'
        },{
            content:`
            <form id="operationsMTC">
            <div class="inputGroup">
                <input id="operation1" name="operationPOS[]" type="checkbox" value="1" />
                <label for="operation1">Decil</label>
            </div>
         

            <div class="inputGroup">
                <input id="operation2" name="operationPOS[]" type="checkbox" value="2""/>
                <label for="operation2">Percentil</label>
            </div>
           
            
            <div class="inputGroup">
                <input id="operation3" name="operationPOS[]" type="checkbox" value="3"/>
                <label for="operation3">Cuartil</label>
            </div>
            <div class="inputGroup">
                <input id="operation4" name="operationPOS[]" type="checkbox" value="4"/>
                <label for="operation4">Quintil</label>
            </div>
           
            </form>`,
            label:'Personalizar resultados',
            nextText:"Calcular!",
            prevText:'Atras'
        }],
       final:`
        <div id="resultsPOS"></div>`,
        modalSize:'lg',
        finalLabel:'Resultados',
        prevText:'Atras',
        finishText:'Cerrar'
    });
}
function valuesFromPOS(){
    operation = [];
    //groupNumbers= $("input[name='groupNumbers[]']:checked").val();
    columns= $("input[name='columnsPOS[]']:checked").val();
    $('input[name="operationPOS[]"]:checked').each(function() {
    operation.push($(this).val());
    });
  $("#resultsPOS").html(positionMeasure(columns,operation));

}

function columnsVerify(multi){
    var columns="";
    if (multi) {
        columns=`
    <p>Seleccione las columnas</p>
    <div class="inputGroup">
        <input id="0" name="columns[]" type="checkbox" value="0" onclick="contaCheckbox(this)" />
        <label for="0">A</label>
    </div>
    <div class="inputGroup">
        <input id="1" name="columns[]" type="checkbox" value="1" onclick="contaCheckbox(this)"/>
        <label for="1">B</label>
    </div>
    <div class="inputGroup">
        <input id="2" name="columns[]" type="checkbox" value="2" onclick="contaCheckbox(this)"/>
        <label for="2">C</label>
    </div>
   `;
    }else{
        columns=`
        <p>Seleccione la columna</p>
        <div class="inputGroup">
            <input id="0" name="columns[]" type="radio" checked value="0"/>
            <label for="0">A</label>
        </div>
        <div class="inputGroup">
            <input id="1" name="columns[]" type="radio" value="1"/>
            <label for="1">B</label>
        </div>
        <div class="inputGroup">
            <input id="2" name="columns[]" type="radio" value="2" />
            <label for="2">C</label>
        </div>`;

        }
    $("#selectColumns").html(columns);

  //  $("#operationsDISP").html(opertions);
}
function columnsTable(multiColumns){
    var html = "";
    if(multiColumns){
        html = `  
        <!--Esto se debe mostrar si elige variables definidas con valor unico, debe ser de multiple eleccion-->
        <div>
        <p>Seleccione la columna</p>
        <div class="inputGroup">
            <input id="0" name="columns[]" type="checkbox" checked value="0"/>
            <label for="0">A</label>
        </div>
        <div class="inputGroup">
            <input id="1" name="columns[]" type="checkbox" value="1"/>
            <label for="1">B</label>
        </div>
        <div class="inputGroup">
        <input id="2" name="columns[]" type="checkbox" value="2" />
        <label for="2">C</label>
        </div>
    </div>` ;
    }else{
        html =`   
        <!--Esto se debe mostrar si elige Datos no trabajados en una sola columna, debe ser de eleccion unica-->
        <div>
            <p>Seleccione la columna</p>
            <div class="inputGroup">
                <input id="0" name="columns[]" type="radio" checked value="0"/>
                <label for="0">A</label>
            </div>
            <div class="inputGroup">
                <input id="1" name="columns[]" type="radio" value="1"/>
                <label for="1">B</label>
            </div>
            <div class="inputGroup">
            <input id="2" name="columns[]" type="radio" value="2" />
            <label for="2">C</label>
            </div>
        </div>`;
    }
    $("#columnsTable").html(html);
}
//Validador de checkboxes
function contaCheckbox(checkItem){
    var checkboxes = $("input[name='columns[]']:checked");
    var cont = 0;
        for (var x=0; x < checkboxes.length; x++) {
            if (checkboxes[x].checked) {
            cont = cont + 1;
            }
        }
        if(cont>2 && checkItem!=null){
            checkItem.checked = false;
            alert("Solo puede seleccionar 2 columnas");
        }
        return cont;
}

