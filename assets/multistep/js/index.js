
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
            final:`<h3 class="display-6 text-center" style="width:100%!important">Resultados</h3>
            <div id="resultsMTC"></div>`,
            modalSize:'lg',
            finalLabel:'Resultados',
            prevText:'Atras',
            finishText:'Cerrar'
        });
        
    }
    function valuesFromMTC(){
            operation = [];
            groupNumbers= $("input[name='groupNumbers[]']:checked").val();
            columns= $("input[name='columns[]']:checked").val();
            $('input[name="operation[]"]:checked').each(function() {
            operation.push($(this).val());
            });
          $("#resultsMTC").html(centralTendence(groupNumbers,columns,operation));

    }
    
    function tablaDeFrecuencias(){
        $('.modal').MultiStep({
            title:'<h3 class="display-6 text-center" style="width:90%!important">Medidas de Dispercion</h3>',
        	data:[{
        		content:'datos agrupados',
                label:'Custom label'
        	},{
        		content:'This is a multi-step modal'
        	},{
                content:`You can have skip options`,
                skip:true
            },{
        		content:`<small>You can include html content as well!</small><br><br>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                `,
        		skip:true
        	},{
        		content:`This is the end<br>Hold your breath and count to ten`,
        	}],
            final:'You can have your own final message',
            modalSize:'lg'
        });
    }
    function medidasDispersion(){
        $('.modal').MultiStep({
            title:'<h3 class="display-6 text-center" style="width:90%!important">Medidas de posicion</h3>',
        	data:[{
        		content:'datos agrupados',
                label:'Custom label'
        	},{
        		content:'This is a multi-step modal'
        	},{
                content:`You can have skip options`,
                skip:true
            },{
        		content:`<small>You can include html content as well!</small><br><br>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                `,
        		skip:true
        	},{
        		content:`This is the end<br>Hold your breath and count to ten`,
        	}],
            final:'You can have your own final message',
            modalSize:'lg'
        });
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
           final:`<h3 class="display-6 text-center" style="width:100%!important">Resultados</h3>
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